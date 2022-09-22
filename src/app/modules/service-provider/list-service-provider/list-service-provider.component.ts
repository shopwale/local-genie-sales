import { ServiceProviderI } from './../../../interfaces/service-provider';
import { Component, OnInit } from '@angular/core';
import { ServiceProviderService } from 'src/app/services/service-provider.service';

@Component({
  selector: 'lgs-list-service-provider',
  templateUrl: './list-service-provider.component.html',
  styleUrls: ['./list-service-provider.component.scss']
})
export class ListServiceProviderComponent implements OnInit {

  serviceProviders: ServiceProviderI[] = [];

  constructor(
    private serviceProviderService: ServiceProviderService
  ) { }

  ngOnInit(): void {
    this.getServiceProviders();
  }

  getServiceProviders() {
    this.serviceProviderService.getServiceProviders()
      .subscribe(res => {
        this.serviceProviders = res;
      }, err => {
        console.log(err);

      })
  }

  getCategoryId(id = "") {
    const alpha = "A B C D E F G H I J K L M N O P Q R T S U V W X Y Z".split(" ");
    return alpha.indexOf(id.replace(/[0-9]{7}([A-Z])[A-Z]{2}/, "$1")) + 1;

  }

  queryParams(serviceProvider: ServiceProviderI) {
    return {
      businessCode: serviceProvider.businessCode,
      serviceProviderId: serviceProvider.serviceProviderId,
      categoryId: this.getCategoryId(serviceProvider.businessCode)
    }
  }

}
