import {BaseHttpService} from '@mehr/mehr-core-x';
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import { IAccessory, IAccessoriesResponse, IAccessoriesSearch } from "../models/accessories.model";

@Injectable({
  providedIn: 'root'
})
export class AccessoriesService {
  private accessoriesUrl: string = environment.Inventory + 'Accessories';

  constructor(private baseHttp: BaseHttpService) {}
  getAll(filter: IAccessoriesSearch): Observable<IAccessoriesResponse> {
    const PageNumber = filter.pageNumber ? `&PageNumber=${filter.pageNumber}` : '';
    const PageSize = filter.pageSize ? `&PageSize=${filter.pageSize}` : '';
    const Code = filter.code ? `&Code=${filter.code}` : '';
    const Name = filter.name ? `&Name=${filter.name}` : '';
    const Type = filter.type ? `&Type=${filter.type}` : '';
    const CompatibleHoseSize = filter.compatibleHoseSize ? `&CompatibleHoseSize=${filter.compatibleHoseSize}` : '';
    return this.baseHttp.get(`${this.accessoriesUrl}?${PageSize}${PageNumber}${Name}${Type}${Code}${CompatibleHoseSize}`);
  }
  getById(id: number): Observable<IAccessory> {
    return this.baseHttp.get(`${this.accessoriesUrl}/${id}`);
  }
  create(data: IAccessory): Observable<any> {
    return this.baseHttp.post(this.accessoriesUrl, data);
  }
  update(id: number, data: IAccessory): Observable<any> {
    return this.baseHttp.put(`${this.accessoriesUrl}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.baseHttp.delete(`${this.accessoriesUrl}/${id}`);
  }
  increaseStock(id: number, addedCount: number, newEnterPrice: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      addedCount: addedCount.toString(),
      newEnterPrice: newEnterPrice.toString()
    });
    return this.baseHttp.post(`${this.accessoriesUrl}/IncreaseStock?${params.toString()}`, {});
    }
  sell(id: number, quantity: number, sellPricePerUnit: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      quantity: quantity.toString(),
      sellPricePerUnit: sellPricePerUnit.toString()
    });

    return this.baseHttp.post(
      `${this.accessoriesUrl}/Sell?${params.toString()}`,
      {}
    );
  }
}
