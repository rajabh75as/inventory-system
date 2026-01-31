import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '@mehr/mehr-core-x';
import { environment } from '../../../../../environments/environment';
import {
  ISellReportsResponse,
  ISellReportsSearch
} from '../models/sells-reports.model';
import {IAccessoriesResponse, IAccessoriesSearch} from "../../accessories/models/accessories.model";

@Injectable({
  providedIn: 'root'
})
export class SellsReportsService {

  private reportsUrl = environment.Inventory + 'Reports';

  constructor(private baseHttp: BaseHttpService) {}
  getAll(filter: ISellReportsSearch): Observable<ISellReportsResponse> {
    const PageNumber = filter.pageNumber ? `&PageNumber=${filter.pageNumber}` : '';
    const PageSize = filter.pageSize ? `&PageSize=${filter.pageSize}` : '';
    const FromDate = filter.fromDate ? `&FromDate=${filter.fromDate}` : '';
    const ToDate = filter.toDate ? `&ToDate=${filter.toDate}` : '';
    const ItemName = filter.itemName ? `&ItemName=${filter.itemName}` : '';
    const ItemType = filter.itemType ? `&ItemType=${filter.itemType}` : '';
    return this.baseHttp.get(`${this.reportsUrl}/Sales?${PageSize}${PageNumber}${ToDate}${ItemName}${FromDate}${ItemType}`);
  }
}
