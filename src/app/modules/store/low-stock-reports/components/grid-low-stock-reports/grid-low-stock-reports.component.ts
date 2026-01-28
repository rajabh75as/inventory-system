import { Component, OnInit, ViewChild } from '@angular/core';
import { MehrGridComponent } from '@mehr/mehr-grid';
import {LowStockReportsService} from "../../services/low-stock-reports.service";

@Component({
  selector: 'app-grid-low-stock-reports',
  templateUrl: './grid-low-stock-reports.component.html',
  styleUrls: ['./grid-low-stock-reports.component.scss']
})
export class GridLowStockReportsComponent implements OnInit {

  @ViewChild('GridLowStock') grid!: MehrGridComponent;
  columnDefs: any[] = [];
  rowData: any;
  frameworkComponents: any;

  constructor(private lowStockReportsService: LowStockReportsService) {}

  ngOnInit(): void {
    this.initGrid();
  }
  categoryMap: { [key: string]: string } = {
    Accessory: 'سایر قطعات',
    GasAccessory: 'لوازم گاز',
    Hose: 'مدیریت شلنگ ها',
    HydraulicFitting: 'اتصالات هیدرولیک',
    WaterFitting: 'اتصالات آب'
  };


  changeRowColor(params: any) {
    const stock = params?.data?.stock;

    if (stock < 5) {
      return { 'background-color': '#F6D5D9FF' };
    }

    if (stock >= 5 && stock <= 10) {
      return { 'background-color': '#FFF3CD' };
    }

    return { 'background-color': 'white' };
  }

  initGrid() {
    this.columnDefs = [
      {
        headerName: 'ردیف',
        width: 70,
        valueGetter: 'node.rowIndex + 1',
        cellStyle: this.changeRowColor
      },
      {
        headerName: 'دسته‌بندی',
        width: 150,
        sortable: true,
        cellStyle: this.changeRowColor,
        valueGetter: (params: any) => {
          const category = params?.data?.category;
          return this.categoryMap[category] ?? category;
        }
      },
      {
        headerName: 'نام کالا',
        field: 'itemName',
        width: 250,
        sortable: true,
        cellStyle: this.changeRowColor
      },
      {
        headerName: 'موجودی',
        field: 'stock',
        width: 120,
        sortable: true,
        cellStyle: this.changeRowColor
      },
      {
        headerName: 'واحد',
        field: 'unit',
        width: 100,
        cellStyle: this.changeRowColor
      }
    ];
  }

  onGetGrid(event: any) {
    this.lowStockReportsService.getLowStockItems().subscribe(res => {
      this.rowData = {rowDatas: res.items, total: res.totalCount
      };
      this.grid?.sizeColumnsToFit();
    });
  }

  refresh() {
    this.grid?.reloadAgGrid();
  }
}
