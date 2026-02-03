import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListWaterFittingsComponent} from "./page/list-water-fittings.component";
import {BaseWaterFittingsComponent} from "./components/base-water-fittings/base-water-fittings.component";
import {WaterFittingsComponent} from "./water-fittings.component";
import {GridWaterFittingsComponent} from "./components/grid-water-fittings/grid-water-fittings.component";
import {SearchWaterFittingsComponent} from "./components/search-water-fittings/search-water-fittings.component";

const routes: Routes = [
  {
    path: '', component: WaterFittingsComponent, children: [
      {path: 'page', component:ListWaterFittingsComponent},
      {path: 'add', component: BaseWaterFittingsComponent},
      {path: 'edit/:id', component: BaseWaterFittingsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WaterFittingsRoutingModule {
}

export const AppRoutedComponents = [
  SearchWaterFittingsComponent,
  WaterFittingsComponent,
  BaseWaterFittingsComponent,
  ListWaterFittingsComponent,
  GridWaterFittingsComponent,
];
