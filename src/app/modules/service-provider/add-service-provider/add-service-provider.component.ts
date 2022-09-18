import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoriesI } from 'src/app/interfaces/categories';
import { ServiceProviderService } from 'src/app/services/service-provider.service';
import { CategoriesService } from '../../../services/categories.service';
import { nameValidator, inMobileValidator, pincodeValidator } from '../../../services/form-error.service';

@Component({
  selector: 'lgs-add-service-provider',
  templateUrl: './add-service-provider.component.html',
  styleUrls: ['./add-service-provider.component.scss']
})
export class AddServiceProviderComponent implements OnInit {

  addForm!: FormGroup;
  categories: CategoriesI[] = [];


  constructor(
    private categoriesService: CategoriesService,
    private serviceProviderService: ServiceProviderService,
    private router: Router

  ) { }

  ngOnInit(): void {

    this.addForm = new FormGroup({
      serviceProviderName: new FormControl('', [Validators.required, nameValidator(3)]),
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
        console.log(res);

        this.categories = res;
      })
  }

  addServiceProvider() {

    this.addForm.markAllAsTouched();
    console.log(this.addForm);

    if (this.addForm.invalid) return;

    const mobileNumber = "91" + this.addForm.value['mobileNumber'];

    this.serviceProviderService.addServiceProvider({ ...this.addForm.value, ...{ mobileNumber } })
      .subscribe((res) => {
        this.router.navigate(["/items", "add"], { queryParams: { businessCode: res['businessCode'], serviceProviderId: res['serviceProviderId'], categoryId: this.addForm.value['categoryId'] } });
      }, console.log)


  }

}
