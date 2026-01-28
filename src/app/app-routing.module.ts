import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'store',
    pathMatch: 'full'
  },
  {
    path: 'store',
    loadChildren: () => import('./modules/store/store.module').then(m => m.StoreModule)
  },
  { path: '**', redirectTo: 'store/main' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
