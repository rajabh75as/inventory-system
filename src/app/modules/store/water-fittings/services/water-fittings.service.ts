import {BaseHttpService} from '@mehr/mehr-core-x';
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import { IWaterFitting, IWaterFittingsResponse, IWaterFittingsSearch } from "../models/water-fittings.model";

@Injectable({
  providedIn: 'root'
})
export class WaterFittingsService {
  private waterFittings: string = environment.Inventory + 'WaterFittings';

  constructor(private baseHttp: BaseHttpService) {
  }

  getAll(filter: IWaterFittingsSearch): Observable<IWaterFittingsResponse> {
    const PageSize = filter.pageSize ? `PageSize=${filter.pageSize}` : '';
    const PageNumber = filter.pageNumber ? `&PageNumber=${filter.pageNumber}` : '';
    const Code = filter.code ? `&Code=${filter.code}` : '';
    const Type = filter.type ? `&Type=${filter.type}` : '';
    const SizeInch = filter.sizeInch ? `&SizeInch=${filter.sizeInch}` : '';
    const Material = filter.material ? `&Material=${filter.material}` : '';
    return this.baseHttp.get(`${this.waterFittings}?${PageSize}${PageNumber}${Type}${SizeInch}${Code}${Material}`);
  }

  getById(id: number): Observable<IWaterFitting> {
    return this.baseHttp.get(`${this.waterFittings}/${id}`);
  }

  create(data: IWaterFitting): Observable<any> {
    return this.baseHttp.post(this.waterFittings, data);
  }

  update(id: number, data: IWaterFitting): Observable<any> {
    return this.baseHttp.put(`${this.waterFittings}/${id}`, data);
  }

  delete(id: number): Observable<any> {
    return this.baseHttp.delete(`${this.waterFittings}/${id}`);
  }
  increaseStock(id: number, addedCount: number, newEnterPrice: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      addedCount: addedCount.toString(),
      newEnterPrice: newEnterPrice.toString()
    });
    return this.baseHttp.post(`${this.waterFittings}/IncreaseStock?${params.toString()}`, {});
  }
  sell(id: number, count: number, pricePerUnit: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      count: count.toString(),
      pricePerUnit: pricePerUnit.toString()
    });

    return this.baseHttp.post(`${this.waterFittings}/Sell?${params.toString()}`, {});
  }
}
