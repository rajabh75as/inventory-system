import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterGridService, IFilterModel } from "@mehr/mehr-filter-grid";
import { Subject } from "rxjs";

@Component({
  selector: 'app-search-hoses',
  templateUrl: './search-hoses.component.html'
})
export class SearchHosesComponent implements OnInit, OnDestroy {
  model: IFilterModel = {
    code: {
      filterValue: '',
      columnName: 'code',
      label: 'کد شلنگ',
      inputColumnName: 'code'
    },
    sizeInch: {
      filterValue: '',
      columnName: 'sizeInch',
      label: 'اندازه (اینچ)',
      inputColumnName: 'sizeInch'
    },
    standard: {
      filterValue: '',
      columnName: 'standard',
      label: 'استاندارد',
      inputColumnName: 'standard'
    },
    brand: {
      filterValue: '',
      columnName: 'brand',
      label: 'برند',
      inputColumnName: 'brand'
    },
    application: {
      filterValue: '',
      columnName: 'application',
      label: 'کاربرد',
      inputColumnName: 'application'
    }
  };

  sizeDrop = [
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
    { id: '4', name: '۴ اینچ' },
    { id: '6', name: '۶ اینچ' },
    { id: '8', name: '۸ اینچ' }
  ];

  standardDrop = [
    { id: 'DIN', name: 'DIN (آلمانی)' },
    { id: 'ISO', name: 'ISO (بین‌المللی)' },
    { id: 'SAE', name: 'SAE (آمریکایی)' },
    { id: 'JIS', name: 'JIS (ژاپنی)' },
    { id: 'BS', name: 'BS (بریتانیایی)' },
    { id: 'ANSI', name: 'ANSI' },
    { id: 'EN', name: 'EN (اروپایی)' },
    { id: 'ASME', name: 'ASME' }
  ];

  brandDrop = [
    { id: 'Parker', name: 'پارکر' },
    { id: 'Gates', name: 'گیتس' },
    { id: 'Bridgestone', name: 'بریجستون' },
    { id: 'Yokohama', name: 'یوکوهاما' },
    { id: 'Manuli', name: 'مانولی' },
    { id: 'Alfagomma', name: 'الفاگوما' },
    { id: 'Piranha', name: 'پیرانا' },
    { id: 'Kuriyama', name: 'کوریاما' },
    { id: 'Semperit', name: 'سمپریت' },
    { id: 'Habasti', name: 'هاباستی' },
    { id: 'Iranian', name: 'ایرانی (داخلی)' }
  ];

  applicationDrop = [
    { id: 'Industrial', name: 'صنعتی' },
    { id: 'Hydraulic', name: 'هیدرولیک' },
    { id: 'Pneumatic', name: 'پنوماتیک' },
    { id: 'Water', name: 'آب' },
    { id: 'Oil', name: 'نفت و روغن' },
    { id: 'Chemical', name: 'شیمیایی' },
    { id: 'Food', name: 'صنایع غذایی' },
    { id: 'Marine', name: 'دریایی' },
    { id: 'Automotive', name: 'خودرویی' },
    { id: 'Agriculture', name: 'کشاورزی' },
    { id: 'Mining', name: 'معدن' },
    { id: 'Construction', name: 'ساختمانی' }
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
