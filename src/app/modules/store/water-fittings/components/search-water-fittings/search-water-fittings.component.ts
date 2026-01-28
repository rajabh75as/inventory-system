import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterGridService, IFilterModel } from "@mehr/mehr-filter-grid";
import { Subject } from "rxjs";

@Component({
  selector: 'app-search-water-fittings',
  templateUrl: './search-water-fittings.component.html'
})
export class SearchWaterFittingsComponent implements OnInit, OnDestroy {
  model: IFilterModel = {
    code: {
      filterValue: '',
      columnName: 'code',
      label: 'کد قطعه',
      inputColumnName: 'code'
    },
    type: {
      filterValue: '',
      columnName: 'type',
      label: 'نوع اتصال',
      inputColumnName: 'type'
    },
    sizeInch: {
      filterValue: '',
      columnName: 'sizeInch',
      label: 'اندازه (اینچ)',
      inputColumnName: 'sizeInch'
    },
    material: {
      filterValue: '',
      columnName: 'material',
      label: 'جنس',
      inputColumnName: 'material'
    }
  };

  // منوهای کشویی (دراپ‌داون)
  typeDrop = [
    { id: 'Elbow', name: 'زانو' },
    { id: 'Tee', name: 'سه‌راهی' },
    { id: 'Reducer', name: 'کاهنده' },
    { id: 'Coupling', name: 'کوپلینگ' },
    { id: 'Adapter', name: 'آداپتور' },
    { id: 'Union', name: 'اتصال' },
    { id: 'Cap', name: 'درپوش' },
    { id: 'Nipple', name: 'نیپل' }
  ];

  sizeDrop = [
    { id: '1/4', name: '۱/۴ اینچ' },
    { id: '3/8', name: '۳/۸ اینچ' },
    { id: '1/2', name: '۱/۲ اینچ' },
    { id: '3/4', name: '۳/۴ اینچ' },
    { id: '1', name: '۱ اینچ' },
    { id: '1_1/4', name: '۱/۱ ۴ اینچ' },
    { id: '1_1/2', name: '۱/۱ ۲ اینچ' },
    { id: '2', name: '۲ اینچ' }
  ];

  materialDrop = [
    { id: 'Brass', name: 'برنجی' },
    { id: 'Copper', name: 'مسی' },
    { id: 'PVC', name: 'پی‌وی‌سی' },
    { id: 'Galvanized', name: 'گالوانیزه' },
    { id: 'StainlessSteel', name: 'استیل' },
    { id: 'PPR', name: 'پی‌پی‌آر' }
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
