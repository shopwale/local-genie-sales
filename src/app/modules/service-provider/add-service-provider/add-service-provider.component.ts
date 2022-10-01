import { NotificationService } from './../../../services/notification.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesI } from 'src/app/interfaces/categories';
import { ServiceProviderService } from 'src/app/services/service-provider.service';
import { CategoriesService } from '../../../services/categories.service';
import { inMobileValidator, pincodeValidator } from '../../../services/form-error.service';

@Component({
  selector: 'lgs-add-service-provider',
  templateUrl: './add-service-provider.component.html',
  styleUrls: ['./add-service-provider.component.scss']
})
export class AddServiceProviderComponent implements OnInit {

  addForm!: FormGroup;
  categories: CategoriesI[] = [];
  showSpinner = false;


  constructor(
    private categoriesService: CategoriesService,
    private serviceProviderService: ServiceProviderService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {

    this.addForm = new FormGroup({
      serviceProviderName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      mobileNumber: new FormControl('', [Validators.required, inMobileValidator()]),
      pinCode: new FormControl('', [Validators.required, pincodeValidator()]),
      deliveryService: new FormControl(true, [Validators.required]),
      categoryId: new FormControl("", [Validators.required]),
      address: new FormControl('', [Validators.required, Validators.minLength(6)]),
      // serviceProviderIconURL: new FormControl('', []),
    });

    this.getCategories();

  }

  getCategories() {
    this.categoriesService.GetCategories()
      .subscribe(res => {
        this.categories = res;
      }, err=> {
        
        this.notificationService.showError(err?.error?.message || err?.statusText);

      })
  }

  addServiceProvider() {

    this.addForm.markAllAsTouched();
    console.log(this.addForm);

    if (this.addForm.invalid) return;

    this.showSpinner = true;
    const mobileNumber = "91" + this.addForm.value['mobileNumber'];

    this.serviceProviderService.addServiceProvider({ ...this.addForm.value, ...{ mobileNumber } })
      .subscribe((res) => {
        this.router.navigate(["/items", "add"], { queryParams: { businessCode: res['businessCode'], serviceProviderId: res['serviceProviderId'], categoryId: this.addForm.value['categoryId'] } });

        this.showSpinner = false;
      }, (err) => {
        this.showSpinner = false;
        console.log(err);
        
        this.notificationService.showError(err?.error?.message);
      })


  }

}
