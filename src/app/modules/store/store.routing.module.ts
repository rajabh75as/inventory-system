import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {StoreComponent} from "./store.component";
import {AutoCompleteSearchComponent} from "./shared/components/auto-complete-search/auto-complete-search.component";
import {DateDirective} from "./shared/directives/date.directive";
const routes: Routes = [
  {
    path: '', component: StoreComponent    , children: [
      {path: 'accessories', loadChildren: () => import('./accessories/accessories.module').then(m => m.AccessoriesModule)},
      {path: 'gas-accessories', loadChildren: () => import('./gas-accessories/gas-accessories.module').then(m => m.GasAccessoriesModule)},
      {path: 'water-fittings', loadChildren: () => import('./water-fittings/water-fittings.module').then(m => m.WaterFittingsModule)},
      {path: 'hydraulic-fittings', loadChildren: () => import('./hydraulic-fittings/hydraulic-fittings.module').then(m => m.HydraulicFittingsModule)},
      {path: 'hoses', loadChildren: () => import('./hoses/hoses.module').then(m => m.HosesModule)},
      {path: 'low-stock-reports', loadChildren: () => import('./low-stock-reports/low-stock-reports.module').then(m => m.LowStockReportsModule)},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule {
}
export const userManagementRoutedComponents = [
  StoreComponent,
  DateDirective,
  AutoCompleteSearchComponent,
];
