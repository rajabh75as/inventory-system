import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GasAccessoriesRoutingModule, AppRoutedComponents } from "./gas-accessories-routing.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { MehrGridModule } from "@mehr/mehr-grid";
import { MehrButtonModule } from "@mehr/mehr-button";
import { MehrInputModule } from "@mehr/mehr-input";
import { MehrCheckBoxModule } from "@mehr/mehr-check-box";
import { ErrorMessageModule } from "@mehr/error-message";
import { MehrSelectModule } from "@mehr/mehr-select";
import { MehrConfirmPopupModule } from "@mehr/mehr-confirm-popup";
import { ArmanUploadFileFormDataModule } from "@mehr/mehr-upload-file-form-data";
import { MehrFilterGridModule } from "@mehr/mehr-filter-grid";
import { MehrTextAreaModule } from "@mehr/mehr-text-area";
import { MehrMultiSelectModule } from "@mehr/mehr-multi-select";
import { MehrInputDateModule } from "@mehr/mehr-input-date";
import { MehrDatePickerModule } from "@mehr/mehr-date-picker";
import { MehrAutoCompleteModule } from "@mehr/mehr-auto-complete";
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
    MehrCheckBoxModule,
    ErrorMessageModule,
    MehrSelectModule,
    MehrConfirmPopupModule,
    ArmanUploadFileFormDataModule,
    MehrFilterGridModule,
    MehrTextAreaModule,
    MehrMultiSelectModule,
    MehrInputDateModule,
    MehrDatePickerModule,
    MehrAutoCompleteModule,
    MehrAmountInputModule,
    JalaliDateTimeModule,
    PipeModule,
    MinDirectiveModule,
    MaxDirectiveModule,
    SharedModule,
  ],
})
export class GasAccessoriesModule { }
