import { Component, OnDestroy, OnInit } from '@angular/core';
import { FilterGridService, IFilterModel } from "@mehr/mehr-filter-grid";
import { Subject } from "rxjs";

@Component({
  selector: 'app-search-hydraulic-fittings',
  templateUrl: './search-hydraulic-fittings.component.html'
})
export class SearchHydraulicFittingsComponent implements OnInit, OnDestroy {
  model: IFilterModel = {
    code: {
      filterValue: '',
      columnName: 'code',
      label: 'کد قطعه',
      inputColumnName: 'code'
    },
    threadType: {
      filterValue: '',
      columnName: 'threadType',
      label: 'نوع رزوه',
      inputColumnName: 'threadType'
    },
    size: {
      filterValue: '',
      columnName: 'size',
      label: 'اندازه',
      inputColumnName: 'size'
    },
    angle: {
      filterValue: '',
      columnName: 'angle',
      label: 'زاویه',
      inputColumnName: 'angle'
    },
    gender: {
      filterValue: '',
      columnName: 'gender',
      label: 'جنس اتصال',
      inputColumnName: 'gender'
    },
    material: {
      filterValue: '',
      columnName: 'material',
      label: 'جنس قطعه',
      inputColumnName: 'material'
    }
  };

  // دراپ داون لیست‌ها (اختیاری - اگر نیاز به select box دارید)
  threadTypeDrop = [
    { id: 'BSP', name: 'BSP' },
    { id: 'NPT', name: 'NPT' },
    { id: 'JIC', name: 'JIC' },
    { id: 'SAE', name: 'SAE' },
    { id: 'Metric', name: 'Metric' }
  ];

  angleDrop = [
    { id: '45', name: '۴۵ درجه' },
    { id: '90', name: '۹۰ درجه' },
    { id: '180', name: '۱۸۰ درجه' },
    { id: 'Straight', name: 'صاف' }
  ];

  genderDrop = [
    { id: 'Male', name: 'نر' },
    { id: 'Female', name: 'ماده' },
    { id: 'Both', name: 'هر دو' }
  ];

  materialDrop = [
    { id: 'Steel', name: 'فولادی' },
    { id: 'StainlessSteel', name: 'استیل' },
    { id: 'Brass', name: 'برنجی' },
    { id: 'Aluminum', name: 'آلومینیوم' }
  ];

  private _destroy = new Subject<void>();
  isOpen = true;

  constructor(private filterService: FilterGridService) {}

  ngOnInit(): void {
    // اگر نیاز به مقداردهی اولیه دارید
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
