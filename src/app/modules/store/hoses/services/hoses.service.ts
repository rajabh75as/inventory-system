import {BaseHttpService} from '@mehr/mehr-core-x';
import {Injectable} from '@angular/core';
import {environment} from "../../../../../environments/environment";
import {Observable} from "rxjs";
import { IHose, IHosesResponse, IHosesSearch } from "../models/hoses.model";

@Injectable({
  providedIn: 'root'
})
export class HosesService {
  private hosesUrl: string = environment.Inventory + 'Hoses';

  constructor(private baseHttp: BaseHttpService) {
  }
  getAll(filter: IHosesSearch): Observable<IHosesResponse> {
    const PageNumber = filter.pageNumber ? `&PageNumber=${filter.pageNumber}` : '';
    const PageSize = filter.pageSize ? `&PageSize=${filter.pageSize}` : '';
    const Code = filter.code ? `&Code=${filter.code}` : '';
    const SizeInch = filter.sizeInch ? `&SizeInch=${filter.sizeInch}` : '';
    const Standard = filter.standard ? `&Standard=${filter.standard}` : '';
    const Brand = filter.brand ? `&Brand=${filter.brand}` : '';
    const Application = filter.application ? `&Application=${filter.application}` : '';
    return this.baseHttp.get(`${this.hosesUrl}?${PageSize}${PageNumber}${SizeInch}${Standard}${Code}${Application}${Brand}`);
  }
  getById(id: number): Observable<IHose> {
    return this.baseHttp.get(`${this.hosesUrl}/${id}`);
  }
  create(data: IHose): Observable<any> {
    return this.baseHttp.post(this.hosesUrl, data);
  }
  update(id: number, data: IHose): Observable<any> {
    return this.baseHttp.put(`${this.hosesUrl}/${id}`, data);
  }
  delete(id: number): Observable<any> {
    return this.baseHttp.delete(`${this.hosesUrl}/${id}`);
  }


  increaseStock(id: number, addedMeters: number, newEntryPricePerMeter: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      addedMeters: addedMeters.toString(),
      newEntryPricePerMeter: newEntryPricePerMeter.toString()
    });
    return this.baseHttp.post(`${this.hosesUrl}/IncreaseStock?${params.toString()}`, {});
    }
  sell(id: number, meters: number, sellPricePerMeter: number): Observable<any> {
    const params = new URLSearchParams({
      id: id.toString(),
      meters: meters.toString(),
      sellPricePerMeter: sellPricePerMeter.toString()
    });

    return this.baseHttp.post(`${this.hosesUrl}/Sell?${params.toString()}`, {});
  }
}
