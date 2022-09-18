import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServiceProviderRoutingModule } from './service-provider-routing.module';
import { AddServiceProviderComponent } from './add-service-provider/add-service-provider.component';
import { ListServiceProviderComponent } from './list-service-provider/list-service-provider.component';
import { HeaderModule } from '../header/header.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TnFormErrorModule } from '../tn-form-error/tn-form-error.module';


@NgModule({
  declarations: [
    AddServiceProviderComponent,
    ListServiceProviderComponent
  ],
  imports: [
    CommonModule,
    ServiceProviderRoutingModule,
    HeaderModule,
    ReactiveFormsModule,
    TnFormErrorModule
  ]
})
export class ServiceProviderModule { }
