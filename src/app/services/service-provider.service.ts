import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConst } from '../constants/api-const';
import { AddServiceProviderResponseI, ServiceProviderI } from '../interfaces/service-provider';

@Injectable({
  providedIn: 'root'
})
export class ServiceProviderService {

  constructor(private http: HttpClient) { }

  addServiceProvider(serviceProvider: ServiceProviderI): Observable<AddServiceProviderResponseI> {
    return this.http.post(ApiConst.ADD_SERVICE_PROVIDER, serviceProvider) as Observable<AddServiceProviderResponseI>;
  }

  getServiceProvider(serviceProvider: ServiceProviderI) {
    return this.http.post("", serviceProvider);
  }

  mapItemToServiceProvider(serviceProviderId: number, itemId: number, price: number = 0) {
    return this.http.post(ApiConst.MAP_SINGLE_ITEM_TO_SERVICE_PROVIDER, {serviceProviderId, itemId, price})
  }
}
