import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { GridButtonsComponent, MehrGridComponent } from "@mehr/mehr-grid";
import { GasAccessoriesService } from "../../services/gas-accessories.service";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { AlertService } from "@mehr/mehr-core";
import { ConfirmPopupService } from "@mehr/mehr-confirm-popup";
import { IGasAccessorySearch } from "../../models/gas-accessories.model";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { IncreaseStockModalComponent } from "../../../shared/components/increase-stock-modal/increase-stock-modal.component";
import {SellModalComponent} from "../../../shared/components/sell-modal/sell-modal.component";

@Component({
  selector: 'app-grid-gas-accessories',
  templateUrl: './grid-gas-accessories.component.html',
  styleUrls: ['./grid-gas-accessories.component.scss']
})
export class GridGasAccessoriesComponent implements OnInit, OnDestroy {

  @ViewChild('GridRealCustomersComponent') grid: MehrGridComponent | undefined;

  public columnDefs: any[] = [];
  public rowData: any;
  public frameworkComponents: any;

  filter!: IGasAccessorySearch;
  private _destroy = new Subject<void>();

  constructor(
    private gasAccessoriesService: GasAccessoriesService,
    private alertService: AlertService,
    private modalService: NgbModal,
    private confirmService: ConfirmPopupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initGridColumns();
  }

  onOperationButton(event: any) {
    const id = event.rowData.id;
    const data = event.rowData
    if (event.act === 'edit') {
      this.router.navigate([`/store/gas-accessories/edit/${id}`]);
    }
    if (event.act === 'sell') {
           const modalRef = this.modalService.open(SellModalComponent, { size: 'lg' });
      modalRef.componentInstance.data = {
        id: id,
        itemType: 'gasAccessory',
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
            this.gasAccessoriesService.delete(id)
              .pipe(takeUntil(this._destroy))
              .subscribe(() => {
                this.grid?.reloadAgGrid();
                this.alertService.success('با موفقیت حذف شد');
              });
          }
        });
    }

    if (event.act === 'increaseStock') {
      const modalRef = this.modalService.open(IncreaseStockModalComponent, { size: 'lg' });
      modalRef.componentInstance.data = {
        id,
        itemType: 'gasAccessory'
      };
      modalRef.result.then(res => {
        if (res) {
          this.grid?.reloadAgGrid();
        }
      }).catch(() => {});
    }
  }

  initGridColumns() {
    this.columnDefs = [
      {
        headerName: 'عملیات',
        cellRenderer: 'detailButton',
        minWidth: 90,
        cellRendererParams: {
          onClick: this.onOperationButton.bind(this),
          buttons: [
            {icon: 'fa-shopping-cart', label: 'فروش', action: 'sell', colorBtn: 'blue', disabled: (row: any) => row.count < 1},
            { icon: 'fa-plus-circle', label: 'افزایش موجودی', action: 'increaseStock', colorBtn: 'green' },
            { icon: 'fa-pencil', label: 'ویرایش', action: 'edit', colorBtn: 'orange' },
            { icon: 'fa-trash', label: 'حذف', action: 'delete', colorBtn: 'red' }
          ]
        }
      },
      { headerName: 'ردیف', width: 60, valueGetter: 'node.rowIndex + 1' },
      { headerName: 'کد کالا', field: 'code', width: 120 },
      { headerName: 'نام کالا', field: 'name', width: 150 },
      { headerName: 'نوع', field: 'type', width: 120 },
      { headerName: 'سایز', field: 'size', width: 100 },
      { headerName: 'جنس', field: 'material', width: 120 },
      { headerName: 'توضیحات', field: 'description', width: 180 },
      { headerName: 'موجودی', field: 'count', width: 100 },
      { headerName: 'قیمت ورود', field: 'enterPrice', width: 120 },
      { headerName: 'قفسه', field: 'shelf', width: 80 },
      { headerName: 'ردیف', field: 'row', width: 80 },
      { headerName: 'ستون', field: 'column', width: 80 },
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

    this.gasAccessoriesService.getAll(this.filter)
      .pipe(takeUntil(this._destroy))
      .subscribe(res => {
        this.rowData = {
          rowDatas: res.items,
          total: res.totalCount
        };
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
