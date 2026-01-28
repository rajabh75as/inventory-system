import {BaseHttpService} from '@mehr/mehr-core-x';
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import {IGasAccessorySearch, IGasAccessoriesResponse, IGasAccessory} from "../models/gas-accessories.model";

@Injectable({
  providedIn: 'root'
})
export class GasAccessoriesService {
  private gasAccessories: string = environment.Inventory + 'GasAccessories';

  constructor(private baseHttp: BaseHttpService) {
  }
  getAll(filter: IGasAccessorySearch): Observable<IGasAccessoriesResponse> {
    const PageSize = filter.pageSize ? `PageSize=${filter.pageSize}` : '';
    const PageNumber = filter.pageNumber ? `&PageNumber=${filter.pageNumber}` : '';
    const Code = filter.code ? `&Code=${filter.code}` : '';
    const Name = filter.name ? `&Name=${filter.name}` : '';
    const Type = filter.type ? `&Type=${filter.type}` : '';
    const Size = filter.size ? `&Size=${filter.size}` : '';
    const Material = filter.material ? `&Material=${filter.material}` : '';
    return this.baseHttp.get(`${this.gasAccessories}?${PageSize}${PageNumber}${Name}${Type}${Code}${Size}${Material}`);
  }
  getById(id: number): Observable<IGasAccessory> {
    return this.baseHttp.get(`${this.gasAccessories}/${id}`);
  }
  create(data: IGasAccessory): Observable<any> {
    return this.baseHttp.post(this.gasAccessories, data);
  }
  update(id: number, data: IGasAccessory): Observable<any> {
    return this.baseHttp.put(`${this.gasAccessories}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.baseHttp.delete(`${this.gasAccessories}/${id}`);
  }
  increaseStock(id: number, addedCount: number, newEnterPrice: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      addedCount: addedCount.toString(),
      newEnterPrice: newEnterPrice.toString()
    });
    return this.baseHttp.post(`${this.gasAccessories}/IncreaseStock?${params.toString()}`, {});
    }
  sell(id: number, quantity: number, sellPricePerUnit: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      quantity: quantity.toString(),
      sellPricePerUnit: sellPricePerUnit.toString()
    });

    return this.baseHttp.post(
      `${this.gasAccessories}/Sell?${params.toString()}`,
      {}
    );
  }
}
