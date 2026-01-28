import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterGridService, IFilterModel } from "@mehr/mehr-filter-grid";
import { Subject } from "rxjs";

@Component({
  selector: 'app-search-accessories',
  templateUrl: './search-accessories.component.html'
})
export class SearchAccessoriesComponent implements OnInit, OnDestroy {
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
    compatibleHoseSize: {
      filterValue: '',
      columnName: 'compatibleHoseSize',
      label: 'اندازه مناسب شیلنگ',
      inputColumnName: 'compatibleHoseSize'
    },
  };
  typeDrop = [
    { id: 'Shell', name: 'پوسته' },
    { id: 'Spring', name: 'فنر' },
    { id: 'Gasket', name: 'گسکت' },
    { id: 'O-Ring', name: 'اورینگ' },
    { id: 'Washer', name: 'واشر' },
    { id: 'Clip', name: 'کلیپ' },
    { id: 'Bracket', name: 'براکت' },
    { id: 'Clamp', name: 'بست' },
    { id: 'Connector', name: 'اتصال' },
    { id: 'Adapter', name: 'آداپتور' },
    { id: 'Reducer', name: 'کاهنده' }
  ];

  hoseSizeDrop = [
    { id: '1/4', name: '۱/۴ اینچ' },
    { id: '3/8', name: '۳/۸ اینچ' },
    { id: '1/2', name: '۱/۲ اینچ' },
    { id: '3/4', name: '۳/۴ اینچ' },
    { id: '1', name: '۱ اینچ' },
    { id: '1_1/4', name: '۱/۱ ۴ اینچ' },
    { id: '1_1/2', name: '۱/۱ ۲ اینچ' },
    { id: '2', name: '۲ اینچ' },
    { id: '2_1/2', name: '۲/۱ ۲ اینچ' },
    { id: '3', name: '۳ اینچ' },
    { id: '4', name: '۴ اینچ' }
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
