import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListGasAccessoriesComponent} from "./page/list-gas-accessories.component";
import {BaseGasAccessoriesComponent} from "./components/base-gas-accessories/base-gas-accessories.component";
import {GasAccessoriesComponent} from "./gas-accessories.component";
import {GridGasAccessoriesComponent} from "./components/grid-gas-accessories/grid-gas-accessories.component";
import {DisplayGasAccessoriesComponent} from "./components/display-gas-accessories/display-gas-accessories.component";
import {SearchGasAccessoriesComponent} from "./components/search-gas-accessories/search-gas-accessories.component";

const routes: Routes = [
  {
    path: '',
    component: GasAccessoriesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'page'
      },
      {
        path: 'page',
        component: ListGasAccessoriesComponent
      },
      {
        path: 'add',
        component: BaseGasAccessoriesComponent
      },
      {
        path: 'edit/:id',
        component: BaseGasAccessoriesComponent
      },
      {
        path: 'display/:id',
        component: DisplayGasAccessoriesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GasAccessoriesRoutingModule {
}

export const AppRoutedComponents = [
  SearchGasAccessoriesComponent,
  DisplayGasAccessoriesComponent,
  GasAccessoriesComponent,
  BaseGasAccessoriesComponent,
  ListGasAccessoriesComponent,
  GridGasAccessoriesComponent,
];
