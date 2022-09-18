import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "service-provider",
    loadChildren: () => import("./modules/service-provider/service-provider.module").then(m => m.ServiceProviderModule)
  },
  {
    path: "items",
    loadChildren: () => import("./modules/items/items.module").then(m => m.ItemsModule)
  },
  {
    path: "",
    pathMatch: 'full',
    redirectTo: "service-provider"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
