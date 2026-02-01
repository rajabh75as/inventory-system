import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SellsReportsRoutingModule, AppRoutedComponents} from "./sells-reports-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MehrGridModule} from "@mehr/mehr-grid";
import {MehrButtonModule} from "@mehr/mehr-button";
import {MehrInputModule} from "@mehr/mehr-input";
import {ErrorMessageModule} from "@mehr/error-message";
import {MehrSelectModule} from "@mehr/mehr-select";
import {MehrConfirmPopupModule} from "@mehr/mehr-confirm-popup";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatStepperModule} from "@angular/material/stepper";
import {MehrFilterGridModule} from "@mehr/mehr-filter-grid";
import {JalaliDateTimeModule, MaxDirectiveModule, MinDirectiveModule, PipeModule} from "@mehr/mehr-core-x";
import {RouterModule} from "@angular/router";
import {MehrDatePickerModule} from "@mehr/mehr-date-picker";
import {MehrAmountInputModule} from "@mehr/mehr-amount-input";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ...AppRoutedComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SellsReportsRoutingModule,
    MehrGridModule,
    MehrButtonModule,
    MehrInputModule,
    ErrorMessageModule,
    MehrSelectModule,
    MehrConfirmPopupModule,
    MatExpansionModule,
    MatStepperModule,
    MehrFilterGridModule,
    JalaliDateTimeModule,
    PipeModule,
    MinDirectiveModule,
    MaxDirectiveModule,
    RouterModule,
    ReactiveFormsModule,
    MehrDatePickerModule,
    MehrAmountInputModule,
    SharedModule,
  ],
})
export class SellsReportsModule {
}
