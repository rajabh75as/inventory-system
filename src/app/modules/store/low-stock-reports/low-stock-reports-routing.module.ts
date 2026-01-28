import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LowStockReportsComponent} from "./low-stock-reports.component";
import {ListLowStockReportsComponent} from "./page/list-low-stock-reports.component";
import {GridLowStockReportsComponent} from "./components/grid-low-stock-reports/grid-low-stock-reports.component";

const routes: Routes = [
  {
    path: '', component: LowStockReportsComponent, children: [
      {path: 'page', component:ListLowStockReportsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LowStockReportsRoutingModule {
}

export const AppRoutedComponents = [
  LowStockReportsComponent,
  ListLowStockReportsComponent,
  GridLowStockReportsComponent
];
