import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListHosesComponent} from "./page/list-hoses.component";
import {BaseHosesComponent} from "./components/base-hoses/base-hoses.component";
import {HosesComponent} from "./hoses.component";
import {GridHosesComponent} from "./components/grid-hoses/grid-hoses.component";
import {DisplayHosesComponent} from "./components/display-hoses/display-hoses.component";
import {SearchHosesComponent} from "./components/search-hoses/search-hoses.component";
const routes: Routes = [
  {
    path: '', component: HosesComponent, children: [
      {path: 'page', component:ListHosesComponent},
      {path: 'add', component: BaseHosesComponent},
      {path: 'display/:id', component: DisplayHosesComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HosesRoutingModule {
}

export const AppRoutedComponents = [
  SearchHosesComponent,
  DisplayHosesComponent,
  HosesComponent,
  BaseHosesComponent,
  ListHosesComponent,
  GridHosesComponent,
];
