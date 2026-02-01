import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasAccessoriesRoutingModule, AppRoutedComponents } from "./gas-accessories-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MehrGridModule } from "@mehr/mehr-grid";
import { MehrButtonModule } from "@mehr/mehr-button";
import { MehrInputModule } from "@mehr/mehr-input";
import { ErrorMessageModule } from "@mehr/error-message";
import { MehrSelectModule } from "@mehr/mehr-select";
import { MehrConfirmPopupModule } from "@mehr/mehr-confirm-popup";
import { MehrFilterGridModule } from "@mehr/mehr-filter-grid";
import { MehrDatePickerModule } from "@mehr/mehr-date-picker";
import { MehrAmountInputModule } from "@mehr/mehr-amount-input";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatStepperModule } from "@angular/material/stepper";
import { JalaliDateTimeModule, MaxDirectiveModule, MinDirectiveModule, PipeModule } from "@mehr/mehr-core-x";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  declarations: [
    ...AppRoutedComponents,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    GasAccessoriesRoutingModule,
    MatExpansionModule,
    MatStepperModule,
    MehrGridModule,
    MehrButtonModule,
    MehrInputModule,
    ErrorMessageModule,
    MehrSelectModule,
    MehrConfirmPopupModule,
    MehrFilterGridModule,
    MehrDatePickerModule,
    MehrAmountInputModule,
    JalaliDateTimeModule,
    PipeModule,
    MinDirectiveModule,
    MaxDirectiveModule,
    SharedModule,
  ],
})
export class GasAccessoriesModule { }
