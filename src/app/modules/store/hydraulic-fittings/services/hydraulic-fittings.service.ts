import {BaseHttpService} from '@mehr/mehr-core-x';
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";

import { IHydraulicFitting, IHydraulicFittingsResponse, IHydraulicFittingsSearch } from "../models/hydraulic-fittings.model";

@Injectable({
  providedIn: 'root'
})
export class HydraulicFittingsService {
  private hydraulicFittings: string = environment.Inventory + 'HydraulicFittings';

  constructor(private baseHttp: BaseHttpService) {
  }

  getAll(filter: IHydraulicFittingsSearch): Observable<IHydraulicFittingsResponse> {
    const PageSize = filter.pageSize ? `PageSize=${filter.pageSize}` : '';
    const PageNumber = filter.pageNumber ? `&PageNumber=${filter.pageNumber}` : '';
    const Code = filter.code ? `&Code=${filter.code}` : '';
    const Size = filter.size ? `&Size=${filter.size}` : '';
    const Material = filter.material ? `&Material=${filter.material}` : '';
    const ThreadType = filter.threadType ? `&ThreadType=${filter.threadType}` : '';
    const Angle = filter.angle ? `&Angle=${filter.angle}` : '';
    const Gender = filter.gender ? `&Gender=${filter.gender}` : '';
    return this.baseHttp.get(`${this.hydraulicFittings}?${PageSize}${PageNumber}${ThreadType}${Angle}${Code}${Size}${Material}${Gender}`);
  }

  getById(id: number): Observable<IHydraulicFitting> {
    return this.baseHttp.get(`${this.hydraulicFittings}/${id}`);
  }

  create(data: IHydraulicFitting): Observable<any> {
    return this.baseHttp.post(this.hydraulicFittings, data);
  }

  update(id: number, data: IHydraulicFitting): Observable<any> {
    return this.baseHttp.put(`${this.hydraulicFittings}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.baseHttp.delete(`${this.hydraulicFittings}/${id}`);
  }
  increaseStock(id: number, addedCount: number, newEnterPrice: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      addedCount: addedCount.toString(),
      newEnterPrice: newEnterPrice.toString()
    });
    return this.baseHttp.post(`${this.hydraulicFittings}/IncreaseStock?${params.toString()}`, {});
  }
  sell(id: number, count: number, pricePerUnit: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      count: count.toString(),
      pricePerUnit: pricePerUnit.toString()
    });

    return this.baseHttp.post(`${this.hydraulicFittings}/Sell?${params.toString()}`, {});
  }
}
