import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiConst } from '../constants/api-const';
import { CategoriesI, SubCategoriesI } from '../interfaces/categories';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private http: HttpClient) { }

  GetCategories(): Observable<CategoriesI[]> {
    return this.http.get(ApiConst.GET_CATEGORIES) as Observable<CategoriesI[]>;
  }

  GetSubCategoriesWithCategoryId(obj: {subCategoryName?: string, categoryName?: string, categoryId?: string}): Observable<SubCategoriesI[]> {

    let newObj: any = obj;
    if(obj.categoryName) {newObj['category'] = obj.categoryName; delete newObj['categoryName'];}
    return this.http.get(ApiConst.GET_SUB_CATEGORIES_WITH_CATEGORYID, { params: newObj }) as Observable<SubCategoriesI[]>;
  }

  AddSubCategory(categoryId: number | string, subCategoryName: string) {
    return this.http.post(ApiConst.ADD_SUB_CATEGORY, { categoryId, subCategoryName })
  }

}
