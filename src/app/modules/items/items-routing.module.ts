import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddItemsComponent } from './add-items/add-items.component';

const routes: Routes = [
  {
    path: "add",
    component: AddItemsComponent
  }, {
    path: "",
    pathMatch: "full",
    redirectTo: "add"
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemsRoutingModule { }
