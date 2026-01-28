import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterGridService, IFilterModel } from "@mehr/mehr-filter-grid";
import { Subject } from "rxjs";

@Component({
  selector: 'app-search-gas-accessories',
  templateUrl: './search-gas-accessories.component.html'
})
export class SearchGasAccessoriesComponent implements OnInit, OnDestroy {
  model: IFilterModel = {
    code: {
      filterValue: '',
      columnName: 'code',
      label: 'کد قطعه',
      inputColumnName: 'code'
    },
    name: {
      filterValue: '',
      columnName: 'name',
      label: 'نام قطعه',
      inputColumnName: 'name'
    },
    type: {
      filterValue: '',
      columnName: 'type',
      label: 'نوع قطعه',
      inputColumnName: 'type'
    },
    size: {
      filterValue: '',
      columnName: 'size',
      label: 'اندازه',
      inputColumnName: 'size'
    },
    material: {
      filterValue: '',
      columnName: 'material',
      label: 'جنس',
      inputColumnName: 'material'
    }
  };
  typeDrop = [
    { id: 'Valve', name: 'شیر' },
    { id: 'Regulator', name: 'رگلاتور' },
    { id: 'Gauge', name: 'گیج' },
    { id: 'Connector', name: 'اتصال' },
    { id: 'Adapter', name: 'آداپتور' },
    { id: 'Reducer', name: 'کاهنده' },
    { id: 'Tee', name: 'سه‌راهی' },
    { id: 'Elbow', name: 'زانو' },
    { id: 'Union', name: 'اتصال سریع' },
    { id: 'Cap', name: 'درپوش' },
    { id: 'Nipple', name: 'نیپل' },
    { id: 'Hose', name: 'شیلنگ' },
    { id: 'Fitting', name: 'اتصالات' }
  ];

  sizeDrop = [
    { id: '1/4', name: '۱/۴ اینچ' },
    { id: '3/8', name: '۳/۸ اینچ' },
    { id: '1/2', name: '۱/۲ اینچ' },
    { id: '3/4', name: '۳/۴ اینچ' },
    { id: '1', name: '۱ اینچ' },
    { id: '1_1/4', name: '۱/۱ ۴ اینچ' },
    { id: '1_1/2', name: '۱/۱ ۲ اینچ' },
    { id: '2', name: '۲ اینچ' },
    { id: 'DN15', name: 'DN15' },
    { id: 'DN20', name: 'DN20' },
    { id: 'DN25', name: 'DN25' },
    { id: 'DN32', name: 'DN32' },
    { id: 'DN40', name: 'DN40' }
  ];

  materialDrop = [
    { id: 'Brass', name: 'برنجی' },
    { id: 'Bronze', name: 'برنزی' },
    { id: 'StainlessSteel', name: 'استیل' },
    { id: 'GalvanizedSteel', name: 'فولاد گالوانیزه' },
    { id: 'Copper', name: 'مسی' },
    { id: 'Aluminum', name: 'آلومینیوم' },
    { id: 'CastIron', name: 'چدن' },
    { id: 'Plastic', name: 'پلاستیک' },
    { id: 'Composite', name: 'کامپوزیت' }
  ];

  private _destroy = new Subject<void>();
  isOpen = true;

  constructor(private filterService: FilterGridService) {}

  ngOnInit(): void {
  }

  search(): void {
    this.filterService.setFilterRequestCall(this.model);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  reset(): void {
    Object.keys(this.model).forEach(key => {
      this.model[key].filterValue = '';
    });
    this.search();
  }
}
