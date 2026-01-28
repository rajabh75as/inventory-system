import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {GridButtonsComponent, MehrGridComponent} from "@mehr/mehr-grid";
import {WaterFittingsService} from "../../services/water-fittings.service";
import {Router} from "@angular/router";
import {Subject, takeUntil} from "rxjs";
import {AlertService} from "@mehr/mehr-core";
import {ConfirmPopupService} from "@mehr/mehr-confirm-popup";
import {IWaterFittingsSearch} from "../../models/water-fittings.model";
import {
  IncreaseStockModalComponent
} from "../../../shared/components/increase-stock-modal/increase-stock-modal.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {SellModalComponent} from "../../../shared/components/sell-modal/sell-modal.component";

@Component({
  selector: 'app-grid-water-fittings',
  templateUrl: './grid-water-fittings.component.html',
  styleUrls: ['./grid-water-fittings.component.scss']
})
export class GridWaterFittingsComponent implements OnInit, OnDestroy {

  @ViewChild('GridRealCustomersComponent') grid!: MehrGridComponent;

  public columnDefs: any[] = [];
  public rowData: any;
  public frameworkComponents: any;

  filter!: IWaterFittingsSearch;
  private _destroy = new Subject<void>();

  constructor(
    private waterFittingsService: WaterFittingsService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private confirmService: ConfirmPopupService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.initGridColumns();
  }

  onOperationButton(event: any) {
    const id = event.rowData.id;
    const data = event.rowData
    if (event.act === 'view') {
      this.router.navigate([`/store/water-fittings/view/${id}`]);
    }
    if (event.act === 'increaseStock') {
      const modalRef = this.modalService.open(IncreaseStockModalComponent, {size: 'lg'});
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'waterFitting'
      };
      modalRef.result.then((result) => {
        if (result === true) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {
      });
    }
    if (event.act === 'sell') {
       const modalRef = this.modalService.open(SellModalComponent, { size: 'lg' });
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'waterFitting',
        maxCount: data.count
      };

      modalRef.result.then(res => {
        if (res === true) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {});
    }
    if (event.act === 'delete') {
      this.confirmService.confirm('آیا از حذف این قطعه مطمئن هستید؟', false)
        ?.then((res: boolean) => {
          if (res) {
            this.waterFittingsService.delete(id)
              .pipe(takeUntil(this._destroy))
              .subscribe(() => {
                this.grid.reloadAgGrid();
                this.alertService.success('قطعه با موفقیت حذف شد');
              });
          }
        });
    }
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
  initGridColumns() {
    this.columnDefs = [
      {
        headerName: 'عملیات',
        cellRenderer: 'detailButton',
        cellStyle: this.changeRowColor,
        minWidth: 90,
        cellRendererParams: {
          onClick: this.onOperationButton.bind(this),
          buttons: [
            {icon: 'fa-shopping-cart', label: 'فروش', action: 'sell', colorBtn: 'blue', disabled: (row: any) => row.count < 1},
            {icon: 'fa-plus', label: 'افزایش موجودی', action: 'increaseStock', colorBtn: 'green'},
            {icon: 'fa-pencil', label: 'ویرایش', action: 'edit', colorBtn: 'orange'},
            {icon: 'fa-trash', label: 'حذف', action: 'delete', colorBtn: 'red'}
          ]
        }
      },
      {headerName: 'ردیف', width: 60, valueGetter: 'node.rowIndex + 1'},
      {headerName: 'کد قطعه', field: 'code', width: 120, cellStyle: this.changeRowColor,},
      {headerName: 'نوع اتصال', field: 'type', width: 120, cellStyle: this.changeRowColor,},          // زانو، سه راه، ...
      {headerName: 'سایز (اینچ)', field: 'sizeInch', width: 120, cellStyle: this.changeRowColor,},
      {headerName: 'جنس', field: 'material', width: 140, cellStyle: this.changeRowColor,},
      {headerName: 'توضیحات', field: 'description', width: 180, cellStyle: this.changeRowColor,},
      {headerName: 'موجودی', field: 'count', width: 100, cellStyle: this.changeRowColor,},
      {headerName: 'قیمت ورود', field: 'enterPrice', width: 120, cellStyle: this.changeRowColor,},
      {headerName: 'قفسه', field: 'shelf', width: 80, cellStyle: this.changeRowColor,},
      {headerName: 'ردیف', field: 'row', width: 80, cellStyle: this.changeRowColor,},
      {headerName: 'ستون', field: 'column', width: 80, cellStyle: this.changeRowColor,},
    ];

    this.frameworkComponents = {
      detailButton: GridButtonsComponent
    };
  }

  onGetGrid(event: any) {
    this.filter = {
      pageNumber: event.startRow + 1,
      pageSize: event.endRow
    };

    for (const key in event.filterModel) {
      const item = event.filterModel[key];
      this.filter[item.columnName] = item.filterValue;
    }

    this.waterFittingsService.getAll(this.filter)
      .pipe(takeUntil(this._destroy))
      .subscribe(res => {
        this.rowData = {
          rowDatas: res.items,
          total: res.totalCount
        };
        this.grid.sizeColumnsToFit();
      });
  }

  refresh() {
    this.grid.reloadAgGrid();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
