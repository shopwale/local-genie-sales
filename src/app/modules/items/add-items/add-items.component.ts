import { ServiceProviderI } from './../../../interfaces/service-provider';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class AddItemsComponent implements OnInit, AfterViewInit {
  @ViewChild("img") img!: ElementRef;
  categoryId!: string | number;
  subCategoryName: string = "";
  categoryName: string = "";
  showSubcategoryList = false;
  disabledSubCategory = true;
  showShare = false;

  items: any[] = [];
  measurements: MeasurementI[] = [];

  subCategories: any[] = [];

  itemsObj: any;
  title = "Add Items";
  interval: any;
  showSpinner = false;
  showSpinnerSubCategory = false;
  whatasppLink = "";

  serviceProvider: ServiceProviderI = {serviceProviderName: "", pinCode: "", mobileNumber: 0, address: "" };

  constructor(
    private itemsService: ItemsService,
    private activatedRoute: ActivatedRoute,
    private categoryService: CategoriesService,
    private serviceProviderService: ServiceProviderService,
  ) { }

  ngAfterViewInit(): void {
    console.log(this.img.nativeElement);
    // this.img.onload = () => {
    //   let canvas = <HTMLCanvasElement>document.createElement('CANVAS')
    //       const ctx = canvas.getContext('2d');

    //       ctx?.drawImage(this.img, 0, 0);
    //       const dataURL = canvas.toDataURL();
    //       console.log(dataURL);

    // }
  }

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe((params) => {
      console.log(params.getAll("businessCode"));

      this.categoryId = Number(params.get("categoryId"));

      this.getServiceProviderByBusinessCode(String(params.get("businessCode")));
      this.getItemsByServiceProvider(Number(params.get("serviceProviderId")));
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


    if (!item.itemName) {
      item.showList = false;
      item.showSpinner = false;
      return;
    }
    if (this.interval) clearTimeout(this.interval);

    this.interval = setTimeout(() => {
      item.showSpinner = true;
      item.showList = false;
      this.itemsService.getItemsByCategoryAndSubcategory(item.categoryId, item.subCategoryId, item.itemName)
        .subscribe(res => {
          const subItems = item.subItems.map((item: any) => item.itemName);

          item.itemsList = res.filter(_item => !subItems.includes(_item.itemName));
          console.log(item);
          item.showList = !!item.itemsList.length;
          item.showSpinner = false;

        }, err => {
          item.showSpinner = false;

        });
    }, 300)
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

  getSubCategoriesByName() {
    console.log(this.subCategoryName);

    if (!this.subCategoryName) {
      this.showSubcategoryList = false;
      this.showSpinnerSubCategory = false;
      return;
    }

    if (this.interval) clearTimeout(this.interval);

    this.interval = setTimeout(() => {
      this.showSpinnerSubCategory = true;

      this.categoryService.GetSubCategoriesWithCategoryId({ subCategoryName: this.subCategoryName, categoryId: this.categoryId as string })
        .subscribe(res => {
          const subCategories = this.items.map(item => item.subCategoryName);
          this.subCategories = res.filter(sub => !subCategories.includes(sub.subCategoryName));
          this.showSubcategoryList = !!this.subCategories.length;
          this.showSpinnerSubCategory = false;
        }, err => {
          console.log(err);
          this.showSpinnerSubCategory = false;
        })
    }, 300)

  }

  selectItem(selectedItem: any, item: any) {
    console.log(item, selectedItem);
    item.showList = false;
    item.itemName = "";
    this.serviceProviderService.mapItemToServiceProvider(Number(this.serviceProvider.serviceProviderId), selectedItem.itemId, 0)
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

    this.itemsService.updateItemPrice(item.itemId, Number(this.serviceProvider.serviceProviderId), item.price)
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
        this.serviceProviderService.mapItemToServiceProvider(Number(this.serviceProvider.serviceProviderId), res.itemId, item.itemPrice)
          .subscribe(_res => {
            console.log(_res);
            this.getItemsByServiceProvider(Number(this.serviceProvider.serviceProviderId));
            // item.
          }, err => {
            item.loading = false;
          });

      }, err => {
        item.loading = false;
      });

  }

  getItemsByServiceProvider(serviceProviderId: number) {
    this.showSpinner = true;
    console.log(this.serviceProvider);

    this.itemsService.getItemsByServiceProviderId(serviceProviderId)
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
        this.showSpinner = false;

        console.log(this.items);

      }, err => {
        this.showSpinner = false;
        console.log(err);

      })
  }

  getServiceProviderByBusinessCode(businesCode: string) {

    this.serviceProviderService.getServiceProviderByBusinessCode(businesCode)
      .subscribe(async res => {
        this.title += " - " + res.serviceProviderName;
        this.serviceProvider = res;
        await this.getLink(String(res.qrCode));
      }, err => {
        console.log(err);

      })
  }

  async getLink(qrCode: string) {
    try {

      console.log(this.img);

      let canvas = <HTMLCanvasElement>document.createElement('CANVAS')
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(this.img.nativeElement, 0, 0);
      const dataURL = canvas.toDataURL();
      console.log(dataURL)

      // this.serviceProviderService.getQrCode(qrCode)
      // .subscribe(res => {
      //   console.log(res);

      // }, console.log)

      this.whatasppLink = `https://wa.me/${this.serviceProvider?.mobileNumber}/?text=${qrCode}`;
      console.log(this.whatasppLink);

    } catch (error) {
      console.log(error);

    }
  }

}
