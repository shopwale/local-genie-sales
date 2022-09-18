import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemsI, ItemsResponseI, MeasurementI } from 'src/app/interfaces/items';
import { CategoriesService } from 'src/app/services/categories.service';
import { ItemsService } from 'src/app/services/items.service';
import { ServiceProviderService } from 'src/app/services/service-provider.service';

@Component({
  selector: 'lgs-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  serviceProviderId!: string | number;
  categoryId!: string | number;
  businesCode!: string;
  subCategoryName: string = "";
  categoryName: string = "";
  showSubcategoryList = false;
  disabledSubCategory = true;

  items: any[] = [];
  measurements: MeasurementI[] = [];

  subCategories: any[] = [];

  itemsObj: any;

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private serviceProviderService: ServiceProviderService,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      this.serviceProviderId = Number(params.get("serviceProviderId"));
      this.categoryId = Number(params.get("categoryId"));
      this.businesCode = String(params.get("businesCode"));
      this.getItemsByServiceProvider();
      this.getMeasurements();
    });
  }

  getMeasurements() {
    this.itemsService.getMeasurements()
      .subscribe(res => {
        this.measurements = res;
      }, err => {
        console.log(err);

      })
  }

  addSubCategory() {

    this.categoryService.AddSubCategory(this.categoryId, this.subCategoryName)
      .subscribe((res: any) => {
        // this.getItemsByServiceProvider();
        this.items.unshift({
          categoryId: this.categoryId,
          categoryName: this.categoryName,
          subCategoryName: this.subCategoryName,
          subCategoryId: res['subCategoryId'],
          measurementId: "",
          itemPrice: 0,
          subItems: [],
          isOpen: false,
          show: false,
          showList: false,
          loading: false
        });
        this.showSubcategoryList = false;
        this.subCategoryName = "";

      }, err => {
        console.log(err);
      })
  }

  getItemsByName(item: any) {
    item.showList = false;
    this.itemsService.getItemsByCategoryAndSubcategory(item.categoryId, item.subCategoryId, item.itemName)
      .subscribe(res => {
        const subItems = item.subItems.map((item: any) => item.itemName);

        item.itemsList = res.filter(_item => !subItems.includes(_item.itemName));
        console.log(item);
        item.showList = !!item.itemsList.length;

      });
  }

  selectSubCategory(subCategory: any) {
    console.log(subCategory);
    this.subCategoryName = "";
    this.showSubcategoryList = false;

    this.items.unshift({
          categoryId: this.categoryId,
          categoryName: this.categoryName,
      subCategoryName: subCategory.subCategoryName,
      subCategoryId: subCategory.subCategoryId,
      measurementId: "",
      itemPrice: 0,
      subItems: [],
      isOpen: false,
      show: false,
      showList: false,
      loading: false
    });
  }

  interval: any;
  getSubCategoriesByName() {
    console.log(this.subCategoryName);

    if (this.interval) clearTimeout(this.interval);

    this.interval = setTimeout(() => {

      this.categoryService.GetSubCategoriesWithCategoryId({ subCategoryName: this.subCategoryName, categoryId: this.categoryId as string })
        .subscribe(res => {
          const subCategories = this.items.map(item => item.subCategoryName);
          this.subCategories = res.filter(sub => !subCategories.includes(sub.subCategoryName));
          this.showSubcategoryList = !!this.subCategories.length;
        }, console.log)
    }, 300)

  }

  selectItem(selectedItem: any, item: any) {
    console.log(item, selectedItem);
    item.showList = false;
    item.itemName = "";
    this.serviceProviderService.mapItemToServiceProvider(Number(this.serviceProviderId), selectedItem.itemId, 0)
      .subscribe(res => {
        console.log(res);
        item.subItems.push({ ...selectedItem, ...{ subItems: "", price: 0, show: false } });

      })

  }

  toggleSubCategory() {
    this.subCategoryName = "";
    this.showSubcategoryList = !this.showSubcategoryList;
  }

  restoreItemPrice(item: ItemsResponseI) {
    item.price = JSON.parse(JSON.stringify(item.backPrice));
  }

  updateItemPrice(item: ItemsResponseI) {
    console.log(item);

    this.itemsService.updateItemPrice(item.itemId, Number(this.serviceProviderId), item.price)
      .subscribe(res => {
        console.log(res);
        item.backPrice = item.price;

      }, err => {
        console.log(err);

      })
  }

  addItem(item: any) {
    console.log(item);

    item.loading = true;
    this.itemsService.addItem(item.categoryId, item.subCategoryId, Number(item.measurementId), item.itemName)
      .subscribe((res: any) => {
        item.show = false;
        this.serviceProviderService.mapItemToServiceProvider(Number(this.serviceProviderId), res.itemId, item.itemPrice)
          .subscribe(_res => {
            console.log(_res);
            this.getItemsByServiceProvider();
            // item.
          }, err => {
            item.loading = false;
          });

      }, err => {
        item.loading = false;
      });

  }

  getItemsByServiceProvider() {
    this.itemsService.getItemsByServiceProviderId(this.serviceProviderId)
      .subscribe((res) => {
        console.log(res);
        this.items = Object.values(res.reduce((r: any, a: ItemsResponseI) => {
          this.categoryName = a.categoryName;

          if (!r[a.subCategoryName]) r[a.subCategoryName] = {
            categoryName: a.categoryName,
            categoryId: this.categoryId,
            subCategoryName: a.subCategoryName,
            subCategoryId: a.subCategoryId,
            measurementId: "",
            itemPrice: 0,
            subItems: [],
            isOpen: false,
            show: false,
            showList: false,
            loading: false
          };
          r[a.subCategoryName].subItems.push({
            itemId: a.itemId,
            show: true,
            itemName: a.itemName,
            price: a.price,
            backPrice: a.price,
            subItems: (Array.isArray(a.subItems) && a.subItems.reduce((p, c, i) => {
              p += (!i ? c.itemName : (i !== a.subItems.length - 1 ? ", " : " and ") + c.itemName);
              return p;
            }, "")) || "",
            unitOfMeasure: a.unitOfMeasure,
            itemIconURL: a.itemIconURL
          });
          return r;
        }, {}));

        console.log(this.items);

      }, err => {
        console.log(err);

      })
  }

}
