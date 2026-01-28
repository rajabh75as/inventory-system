import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridButtonsComponent, MehrGridComponent} from "@mehr/mehr-grid";
import {HosesService} from "../../services/hoses.service";
import {Router} from "@angular/router";
import {DocumentFilter} from "../../../shared/models/document.model";
import {Subject, takeUntil} from "rxjs";
import {AlertService} from "@mehr/mehr-core";
import {ConfirmPopupService} from "@mehr/mehr-confirm-popup";
import {IHosesSearch} from "../../models/hoses.model";
import {
  IncreaseStockModalComponent
} from "../../../shared/components/increase-stock-modal/increase-stock-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SellModalComponent} from "../../../shared/components/sell-modal/sell-modal.component";


@Component({
  selector: 'app-grid-hoses',
  templateUrl: './grid-hoses.component.html',
  styleUrls: ['grid-hoses.component.scss']
})
export class GridHosesComponent implements OnInit, OnDestroy {
  @ViewChild('GridRealCustomersComponent') grid: MehrGridComponent | undefined;
  public columnDefs: any = [];
  public rowData: any;
  public frameworkComponents: any;
  private paramRequest: any;
  filterData: DocumentFilter = {};
  filter: IHosesSearch;
  sortOption: any = null;
  private _destroy = new Subject<void>();

  constructor(private hosesService: HosesService,
              private alertService: AlertService,
              private modalService: NgbModal,
              private confirmService: ConfirmPopupService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.gridOption();
  }

  changeRowColor(params: any) {
    const count = params?.data?.count;

    if (count < 5) {
      return { 'background-color': '#F6D5D9FF' };
    }

    if (count >= 5 && count <= 10) {
      return { 'background-color': '#FFF3CD' };
    }

    return { 'background-color': 'white' };
  }

  onOperationButton(event: any) {
    const data = event.rowData;
    const id = data.id;
    if (event.act === 'edit') {
      this.router.navigate([`/store/hoses/edit/${id}`]);
    }
    if (event.act === 'sell') {
        const modalRef = this.modalService.open(SellModalComponent, { size: 'lg' });
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'hose',
        maxCount: data.count
      };

      modalRef.result.then(res => {
        if (res === true) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {});
    }
    if (event.act === 'increaseStock') {
      const modalRef = this.modalService.open(IncreaseStockModalComponent, {size: 'lg'});
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'hose'
      };
      modalRef.result.then((result) => {
        if (result === true) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {
      });
    }
    if (event?.act === 'delete') {
      this.confirmService?.confirm('آیا از حذف این قطعه مطمئن هستید؟', false)?.then((res: boolean) => {
        if (res) {
          this.hosesService?.delete(id)?.pipe(takeUntil(this._destroy))?.subscribe(() => {
            this.grid?.reloadAgGrid();
            this.alertService?.success('اطلاعات با موفقیت حذف شد');
          });
        }
      })
    }
  }

  gridOption() {
    this.columnDefs = [
      {
        headerName: 'عملیات',
        cellRenderer: 'detailButton',
        cellStyle: this.changeRowColor,
        minWidth: 150,
        sortable: false,
        cellRendererParams: {
          onClick: this.onOperationButton.bind(this),
          buttons: [
            {icon: 'fa-shopping-cart', label: 'فروش', action: 'sell', colorBtn: 'blue', disabled: (row: any) => row.count < 1},
            {icon: 'fa-plus', label: 'افزایش موجودی', action: 'increaseStock', colorBtn: 'green'},
            {icon: 'fa-pencil', label: 'ویرایش', action: 'edit', colorBtn: 'orange'},
            {icon: 'fa-trash', label: 'حذف', action: 'delete', colorBtn: 'red'},
          ],
        },
      },
      {headerName: 'ردیف', width: 60, valueGetter: 'node.rowIndex + 1', cellStyle: this.changeRowColor,},
      {headerName: 'کد انبار', field: 'code', width: 120, filter: 'code', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'برند', field: 'brand', width: 120, filter: 'brand', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'سایز (اینچ)', field: 'sizeInch', width: 100, filter: 'sizeInch', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'استاندارد', field: 'standard', width: 100, filter: 'standard', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'متراژ موجود', field: 'metersInStock', width: 120, filter: 'metersInStock', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'کاربرد', field: 'application', width: 120, filter: 'application', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'توضیحات', field: 'description', width: 120, filter: 'description', sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'قفسه', field: 'shelf', width: 80, sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'ردیف', field: 'row', width: 80, sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'ستون', field: 'column', width: 80, sortable: true, cellStyle: this.changeRowColor,},
      {headerName: 'قیمت خرید (متری)', field: 'entryPricePerMeter', width: 150, sortable: true, cellStyle: this.changeRowColor,},
    ];
    this.frameworkComponents = {detailButton: GridButtonsComponent};
  }

  onGetGrid(event: any) {
    this.paramRequest = event;
    this.filter = {
      pageNumber: event.startRow + 1,
      pageSize: event.endRow
    };
    for (const i in event.filterModel) {
      let item = event.filterModel[i];
      this.filter[item.columnName] = item.filterValue;
    }
    if (this.sortOption) {
      this.filter.orderBy = this.sortOption?.OrderBy;
      this.filter.isAsc = this.sortOption?.IsAsc;
    }
    this.hosesService.getAll(this.filter).pipe(takeUntil(this._destroy)).subscribe(res => {
      this.rowData = {rowDatas: res.items, total: res?.totalCount};
      this.grid?.sizeColumnsToFit();
    });
  }

  refresh() {
    this.grid?.reloadAgGrid();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
