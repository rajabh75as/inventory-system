import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListAccessoriesComponent} from "./page/list-accessories.component";
import {BaseAccessoriesComponent} from "./components/base-accessories/base-accessories.component";
import {AccessoriesComponent} from "./accessories.component";
import {GridAccessoriesComponent} from "./components/grid-accessories/grid-accessories.component";
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
  AccessoriesComponent,
  BaseAccessoriesComponent,
  ListAccessoriesComponent,
  GridAccessoriesComponent,
];
