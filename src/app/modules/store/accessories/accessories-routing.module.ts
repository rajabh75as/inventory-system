import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListAccessoriesComponent} from "./page/list-accessories.component";
import {BaseAccessoriesComponent} from "./components/base-accessories/base-accessories.component";
import {AccessoriesComponent} from "./accessories.component";
import {GridAccessoriesComponent} from "./components/grid-accessories/grid-accessories.component";
import {DisplayAccessoriesComponent} from "./components/display-accessories/display-accessories.component";
import {SearchAccessoriesComponent} from "./components/search-accessories/search-accessories.component";


const routes: Routes = [
  {
    path: '',
    component: AccessoriesComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'page'
      },
      {
        path: 'page',
        component: ListAccessoriesComponent
      },
      {
        path: 'add',
        component: BaseAccessoriesComponent
      },
      {
        path: 'edit/:id',
        component: BaseAccessoriesComponent
      },
      {
        path: 'display/:id',
        component: DisplayAccessoriesComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccessoriesRoutingModule {
}

export const AppRoutedComponents = [
  SearchAccessoriesComponent,
  DisplayAccessoriesComponent,
  AccessoriesComponent,
  BaseAccessoriesComponent,
  ListAccessoriesComponent,
  GridAccessoriesComponent,
];
