import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MehrButtonModule } from "@mehr/mehr-button";
import { MehrInputModule } from "@mehr/mehr-input";
import { MehrGridModule } from "@mehr/mehr-grid";
import { MehrSelectModule } from "@mehr/mehr-select";
import { MehrFilterGridModule } from "@mehr/mehr-filter-grid";
import { MehrDatePickerModule } from "@mehr/mehr-date-picker";
import { MehrAmountInputModule } from "@mehr/mehr-amount-input";
import { MehrConfirmPopupModule } from "@mehr/mehr-confirm-popup";
import { ErrorMessageModule } from "@mehr/error-message";
import { JalaliDateTimeModule, MaxDirectiveModule, MinDirectiveModule, PipeModule } from "@mehr/mehr-core-x";
import { OndyNumberDirective } from "./directives/ondyNumber.directive";
import { EnCharDirecrive } from "./directives/enChar.direcrive";
import { FaCharOnlyDirective } from "./directives/faCharOnly.directive";
import { ClickOutsideDirective } from "./directives/blur.directive";
import { IncreaseStockModalComponent } from "./components/increase-stock-modal/increase-stock-modal.component";
import {SellModalComponent} from "./components/sell-modal/sell-modal.component";

@NgModule({
  declarations: [
    OndyNumberDirective,
    EnCharDirecrive,
    FaCharOnlyDirective,
    ClickOutsideDirective,
    IncreaseStockModalComponent,
    SellModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MehrButtonModule,
    MehrInputModule,
    MehrGridModule,
    MehrSelectModule,
    MehrFilterGridModule,
    MehrDatePickerModule,
    MehrAmountInputModule,
    MehrConfirmPopupModule,
    ErrorMessageModule,
    JalaliDateTimeModule,
    PipeModule,
    MinDirectiveModule,
    MaxDirectiveModule,
  ],
  exports: [
    OndyNumberDirective,
    EnCharDirecrive,
    FaCharOnlyDirective,
    ClickOutsideDirective,
    IncreaseStockModalComponent,
    SellModalComponent,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    NgbModule,
    MehrButtonModule,
    MehrInputModule,
    MehrGridModule,
    MehrSelectModule,
    MehrFilterGridModule,
    MehrDatePickerModule,
    MehrAmountInputModule,
    MehrConfirmPopupModule,
    ErrorMessageModule,
    JalaliDateTimeModule,
    PipeModule,
    MinDirectiveModule,
    MaxDirectiveModule,
  ],
  providers: [
    NgbActiveModal
  ]
})
export class SharedModule { }
