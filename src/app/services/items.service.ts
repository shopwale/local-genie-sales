import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConst } from '../constants/api-const';
import { ItemsI, ItemsResponseI, MeasurementI } from '../interfaces/items';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  constructor(private http: HttpClient) { }

  getItemsByServiceProviderId(serviceProviderId: string | number): Observable<ItemsResponseI[]> {
    return this.http.get(ApiConst.GET_ITEMS, { params: { serviceProviderId } }) as Observable<ItemsResponseI[]>;
  }

  getMeasurements(): Observable<MeasurementI[]> {
    return this.http.get(ApiConst.GET_MEASUREMENTS) as Observable<MeasurementI[]>;
  }

  getItemsByCategoryAndSubcategory(categoryId: number, subCategoryId: number, itemName: string): Observable<ItemsI[]> {
    return this.http.get(ApiConst.GET_ITEMS_BY_CATEGORY_AND_SUBCATEGORY, { params: { categoryId, subCategoryId, itemName } }) as Observable<ItemsI[]>;
  }

  updateItemPrice(itemId: number, serviceProviderId: number, price: number): Observable<ItemsI[]> {
    return this.http.patch(ApiConst.UPDATE_ITEM, {  itemId, serviceProviderId, price }) as Observable<ItemsI[]>;
  }

  addItem(categoryId: number, subCategoryId: number, measurementId: number, itemName: string): Observable<ItemsI[]> {
    return this.http.post(ApiConst.ADD_ITEM, {  itemName, categoryId, subCategoryId, measurementId }) as Observable<ItemsI[]>;
  }
}
