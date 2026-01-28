import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {CountdownModule} from 'ngx-countdown';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NgxSpinnerModule} from "ngx-spinner";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {ToastrModule} from "ngx-toastr";
import {AuthGuard, AuthService, ErrorInterceptor, JwtInterceptorService, LoaderInterceptor} from "@mehr/mehr-core-x";
import {NgxMaskModule} from "ngx-mask";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    CountdownModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-left'
    }),
    NgbModule,
  ],
  providers: [
    AuthGuard,
    {provide: 'IdentityService', useClass: AuthService},
    {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
