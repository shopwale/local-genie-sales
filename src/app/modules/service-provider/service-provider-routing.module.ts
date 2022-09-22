import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddServiceProviderComponent } from './add-service-provider/add-service-provider.component';
import { ListServiceProviderComponent } from './list-service-provider/list-service-provider.component';

const routes: Routes = [
  {
    path: "list",
    component: ListServiceProviderComponent
  },
  {
    path: "add",
    component: AddServiceProviderComponent
  },
  {
    path: "",
    redirectTo: "list",
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ServiceProviderRoutingModule { }
