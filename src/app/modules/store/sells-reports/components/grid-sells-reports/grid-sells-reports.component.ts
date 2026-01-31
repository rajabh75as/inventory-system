import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MehrGridComponent} from "@mehr/mehr-grid";
import {SellsReportsService} from "../../services/sells-reports.service";
import {Subject, takeUntil} from "rxjs";


@Component({
  selector: 'app-grid-sells-reports',
  templateUrl: './grid-sells-reports.component.html',
  styleUrls: ['grid-sells-reports.component.scss']
})
export class GridSellsReportsComponent implements OnInit, OnDestroy {
  @ViewChild('GridSalesReports') grid?: MehrGridComponent;
  columnDefs: any[] = [];
  rowData: any;
  frameworkComponents: any;
  filter: any = {};

  private _destroy = new Subject<void>();

  constructor(
    private sellsReportsService: SellsReportsService,
  ) {
  }

  ngOnInit(): void {
    this.initGrid();
  }
  categoryMap: { [key: string]: string } = {
    Accessory: 'سایر قطعات',
    GasAccessory: 'لوازم گاز',
    Hose: 'شلنگ ها',
    HydraulicFitting: 'اتصالات هیدرولیک',
    WaterFitting: 'اتصالات آب'
  };
  initGrid() {
    this.columnDefs = [
      {
        headerName: 'ردیف',
        width: 70,
        valueGetter: 'node.rowIndex + 1'
      },

      {
        headerName: 'دسته‌بندی',
        width: 150,
        sortable: true,
        valueGetter: (params: any) => {
          const category = params?.data?.category;
          return this.categoryMap[category] ?? category;
        }
      },

      {
        headerName: 'نام کالا',
        field: 'itemName',
        sortable: true,
        filter: 'agTextColumnFilter',
        width: 220
      },

      {
        headerName: 'تاریخ فروش',
        field: 'saleDate',
        width: 140,
        sortable: true,
        valueFormatter: (p: any) =>
          p.value ? new Date(p.value).toLocaleDateString('fa-IR') : ''
      },

      {
        headerName: 'مقدار فروش',
        field: 'quantity',
        width: 120
      },

      {
        headerName: 'قیمت واحد',
        field: 'sellPricePerUnit',
        width: 130
      },

      {
        headerName: 'مبلغ کل',
        field: 'totalSellPrice',
        width: 150
      },

      {
        headerName: 'سود',
        field: 'profit',
        width: 120
      }
    ];
  }

  onGetGrid(event: any) {
    this.filter = {
      pageNumber: event.startRow + 1,
      pageSize: event.endRow
    };
    for (const i in event.filterModel) {
      let item = event.filterModel[i];
      this.filter[item.columnName] = item.filterValue;
    }
    this.sellsReportsService.getAll(this.filter).pipe(takeUntil(this._destroy)).subscribe(res => {
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
