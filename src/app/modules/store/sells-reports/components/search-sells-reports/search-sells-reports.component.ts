import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FilterGridService, IFilterModel} from '@mehr/mehr-filter-grid';
import {Subject} from 'rxjs';
import {Utilities} from "../../../shared/utilities/utilities";

@Component({
  selector: 'app-search-sells-reports',
  templateUrl: './search-sells-reports.component.html'
})
export class SearchSellsReportsComponent implements AfterViewInit, OnInit, OnDestroy {
  model: IFilterModel = {
    itemType: {
      filterValue: '',
      columnName: 'itemType',
      label: 'نوع کالا',
      inputColumnName: 'itemType'
    },
    itemName: {
      filterValue: '',
      columnName: 'itemName',
      label: 'نام کالا',
      inputColumnName: 'itemName'
    },
    fromDate: {
      filterValue: '',
      columnName: 'fromDate',
      label: 'از تاریخ',
      inputColumnName: 'fromDate'
    },
    toDate: {
      filterValue: '',
      columnName: 'toDate',
      label: 'تا تاریخ',
      inputColumnName: 'toDate'
    }
  };
  toDay: string;
  miladyFromDate: string = '';
  itemTypeTypeDrop = [
    {id: 'hose', name: 'شلنگ'},
    {id: 'fitting', name: 'اتصالات'},
    {id: 'accessory', name: 'سایر قطعات'},
    {id: 'gasAccessory', name: 'لوازم گاز'},
    {id: 'hydraulicFitting', name: 'اتصالات هیدرولیک'},
    {id: 'waterFitting', name: 'اتصالات آب'},
  ];

  isOpen = true;
  private _destroy = new Subject<void>();

  constructor(private filterService: FilterGridService) {
  }

  search(): void {
    this.filterService.setFilterRequestCall(this.model);
  }

  ngOnInit(): void {
    this.toDay = Utilities.getCurrentDate();
    this.showDates();
  }
  showDates() {
    this.model.toDate.filterValue = Utilities.getCurrentDate();
    this.model.fromDate.filterValue = Utilities.getCustomCurrentDate(7);
  }
  ngAfterViewInit(): void {
    this.setToday();
  }

  setToday(): void {
    const today = new Date().toISOString().substring(0, 10);
    this.model.fromDate.filterValue = today;
    this.model.toDate.filterValue = today;

    this.search();
  }

  reset(): void {
    Object.keys(this.model).forEach(key => {
      this.model[key].filterValue = '';
    });
    this.search();
  }

  setQuickDate(days: number): void {
    const to = new Date();
    const from = new Date();
    from.setDate(to.getDate() - days);

    this.model.fromDate.filterValue = from.toISOString().substring(0, 10);
    this.model.toDate.filterValue = to.toISOString().substring(0, 10);

    this.search();
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }

  changeFromDate($event: any) {
    this.miladyFromDate = $event.gregorian
  }
}
