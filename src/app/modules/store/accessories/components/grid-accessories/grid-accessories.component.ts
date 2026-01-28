import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridButtonsComponent, MehrGridComponent} from "@mehr/mehr-grid";
import {AccessoriesService} from "../../services/accessories.service";
import {Router} from "@angular/router";
import {DocumentFilter} from "../../../shared/models/document.model";
import {Subject, takeUntil} from "rxjs";
import {AlertService} from "@mehr/mehr-core";
import {ConfirmPopupService} from "@mehr/mehr-confirm-popup";
import {IAccessoriesSearch} from "../../models/accessories.model";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {IncreaseStockModalComponent} from "../../../shared/components/increase-stock-modal/increase-stock-modal.component";
import {SellModalComponent} from "../../../shared/components/sell-modal/sell-modal.component";


@Component({
  selector: 'app-grid-accessories',
  templateUrl: './grid-accessories.component.html',
  styleUrls:['grid-accessories.component.scss']
})
export class GridAccessoriesComponent implements OnInit ,OnDestroy{
  @ViewChild('GridRealCustomersComponent') grid: MehrGridComponent | undefined;
  public columnDefs: any = [];
  public rowData: any;
  public frameworkComponents: any;
  private paramRequest: any;
  filterData: DocumentFilter = {};
  filter:IAccessoriesSearch;
  sortOption:any = null;
  private _destroy = new Subject<void>();
  constructor(private accessoriesService: AccessoriesService,
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
      this.router.navigate([`/store/accessories/edit/${id}`]);
    }
    if (event.act === 'sell') {
       const modalRef = this.modalService.open(SellModalComponent, { size: 'lg' });
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'accessory',
        maxCount: data.count
      };

      modalRef.result.then(res => {
        if (res === true) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {});
    }
    if (event?.act === 'delete') {
      this.confirmService?.confirm('آیا از حذف این قطعه مطمئن هستید؟',false)?.then((res: boolean) =>{
        if(res){
          this.accessoriesService?.delete(id)?.pipe(takeUntil(this._destroy))?.subscribe(() => {
            this.grid?.reloadAgGrid();
            this.alertService?.success('اطلاعات با موفقیت حذف شد');
          });
        }
      })
    }
    if (event.act === 'increaseStock') {
      const modalRef = this.modalService.open(IncreaseStockModalComponent, { size: 'lg' });
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'accessory'
      };
      modalRef.result.then((result) => {
        if (result === true) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {});
    }
  }

  gridOption() {
    this.columnDefs = [
      {
        headerName: 'عملیات',
        cellRenderer: 'detailButton',
        cellStyle: this.changeRowColor,
        minWidth: 85,
        sortable: true,
        cellRendererParams: {
          onClick: this.onOperationButton.bind(this),
          buttons: [
            {
              icon: 'fa-shopping-cart',
              label: 'فروش',
              action: 'sell',
              colorBtn: 'blue',
              disabled: (row: any) => row.count < 1
            },
            {
              icon: 'fa-plus-circle',
              label: 'افزایش موجودی',
              action: 'increaseStock',
              colorBtn: 'green',
            },
            {
              icon: 'fa-pencil',
              label: 'ویرایش',
              action: 'edit',
              colorBtn: 'orange',
            },
            {
              icon: 'fa-trash',
              label: 'حذف',
              action: 'delete',
              colorBtn: 'red',
            },
          ],
        },
      },
      {
        headerName: 'ردیف',
        width: 60,
        valueGetter: 'node.rowIndex + 1',
        cellStyle: this.changeRowColor,
      },
      {
        headerName: 'کد قطعه',
        field: 'code',
        width: 120,
        filter: 'code',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'نام قطعه',
        field: 'name',
        width: 120,
        filter: 'name',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'مناسب برای',
        field: 'compatibleHoseSize',
        width: 120,
        filter: 'compatibleHoseSize',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'توضیحات',
        field: 'description',
        width: 120,
        filter: 'description',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'موجودی',
        field: 'count',
        width: 120,
        filter: 'count',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'قفسه',
        field: 'shelf',
        width: 120,
        filter: 'shelf',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'ردیف',
        field: 'row',
        width: 70,
        filter: 'row',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'ستون',
        field: 'column',
        width: 120,
        filter: 'column',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
      {
        headerName: 'قیمت ورود',
        field: 'enterPrice',
        width: 120,
        filter: 'enterPrice',
        cellStyle: this.changeRowColor,
        sortable: true,
      },
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
    this.accessoriesService.getAll(this.filter).pipe(takeUntil(this._destroy)).subscribe(res => {
      this.rowData = {rowDatas: res?.items, total: res?.totalCount};
      this.grid?.sizeColumnsToFit();
    });
  }
  refresh(){
    this.grid?.reloadAgGrid();
  }
  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
