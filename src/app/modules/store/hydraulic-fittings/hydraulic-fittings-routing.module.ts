import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListHydraulicFittingsComponent} from "./page/list-hydraulic-fittings.component";
import {BaseHydraulicFittingsComponent} from "./components/base-hydraulic-fittings/base-hydraulic-fittings.component";
import {HydraulicFittingsComponent} from "./hydraulic-fittings.component";
import {GridHydraulicFittingsComponent} from "./components/grid-hydraulic-fittings/grid-hydraulic-fittings.component";
import {DisplayHydraulicFittingsComponent} from "./components/display-hydraulic-fittings/display-hydraulic-fittings.component";
import {SearchHydraulicFittingsComponent} from "./components/search-hydraulic-fittings/search-hydraulic-fittings.component";

const routes: Routes = [
  {
    path: '', component: HydraulicFittingsComponent, children: [
      {path: 'page', component:ListHydraulicFittingsComponent},
      {path: 'add', component: BaseHydraulicFittingsComponent},
      {path: 'display/:id', component: DisplayHydraulicFittingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HydraulicFittingsRoutingModule {
}

export const AppRoutedComponents = [
  SearchHydraulicFittingsComponent,
  DisplayHydraulicFittingsComponent,
  HydraulicFittingsComponent,
  BaseHydraulicFittingsComponent,
  ListHydraulicFittingsComponent,
  GridHydraulicFittingsComponent,
];
