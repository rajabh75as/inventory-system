import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ListSellsReportsComponent} from "./page/list-sells-reports.component";
import {SellsReportsComponent} from "./sells-reports.component";
import {GridSellsReportsComponent} from "./components/grid-sells-reports/grid-sells-reports.component";
import {SearchSellsReportsComponent} from "./components/search-sells-reports/search-sells-reports.component";
const routes: Routes = [
  {
    path: '', component: SellsReportsComponent, children: [
      {path: 'page', component:ListSellsReportsComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellsReportsRoutingModule {
}

export const AppRoutedComponents = [
  SearchSellsReportsComponent,
  SellsReportsComponent,
  ListSellsReportsComponent,
  GridSellsReportsComponent,
];
