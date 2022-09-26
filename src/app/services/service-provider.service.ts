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

  mapItemToServiceProvider(serviceProviderId: number, itemId: number, price: number = 0) {
    return this.http.post(ApiConst.MAP_SINGLE_ITEM_TO_SERVICE_PROVIDER, { serviceProviderId, itemId, price })
  }

  getServiceProviders(): Observable<ServiceProviderI[]> {
    return this.http.get(ApiConst.GET_SERVICE_PROVIDERS) as Observable<ServiceProviderI[]>;
  }

  getServiceProviderByBusinessCode(businessCode: string): Observable<ServiceProviderI> {
    return this.http.get(ApiConst.GET_SERVICE_PROVIDER_BY_BUSINESS_CODE, { params: { businessCode } }) as Observable<ServiceProviderI>;
  }

  getQrCode(qrCode: string): Observable<ServiceProviderI> {
    return this.http.get(qrCode) as Observable<ServiceProviderI>;
  }

}
