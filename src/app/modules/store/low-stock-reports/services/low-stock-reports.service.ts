import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseHttpService } from '@mehr/mehr-core-x';
import { environment } from '../../../../../environments/environment';
import {ILowStockResponse} from "../models/low-stock-reports.model";


@Injectable({
  providedIn: 'root'
})
export class LowStockReportsService {

  private reportsUrl = environment.Inventory + 'Reports';

  constructor(private baseHttp: BaseHttpService) {}
  getLowStockItems(): Observable<ILowStockResponse> {
    return this.baseHttp.get(`${this.reportsUrl}/LowStock`);
  }
}
