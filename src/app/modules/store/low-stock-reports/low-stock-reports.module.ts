import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MehrGridModule} from "@mehr/mehr-grid";
import {MehrButtonModule} from "@mehr/mehr-button";
import {MehrInputModule} from "@mehr/mehr-input";
import {MehrCheckBoxModule} from "@mehr/mehr-check-box";
import {ErrorMessageModule} from "@mehr/error-message";
import {MehrSelectModule} from "@mehr/mehr-select";
import {MehrConfirmPopupModule} from "@mehr/mehr-confirm-popup";
import {ArmanUploadFileFormDataModule} from "@mehr/mehr-upload-file-form-data";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatStepperModule} from "@angular/material/stepper";
import {MehrFilterGridModule} from "@mehr/mehr-filter-grid";
import {JalaliDateTimeModule, MaxDirectiveModule, MinDirectiveModule, PipeModule} from "@mehr/mehr-core-x";
import {MehrTextAreaModule} from "@mehr/mehr-text-area";
import {MehrMultiSelectModule} from "@mehr/mehr-multi-select";
import {MehrInputDateModule} from "@mehr/mehr-input-date";
import {RouterModule} from "@angular/router";
import {MehrDatePickerModule} from "@mehr/mehr-date-picker";
import {MehrAutoCompleteModule} from "@mehr/mehr-auto-complete";
import {MehrAmountInputModule} from "@mehr/mehr-amount-input";
import {SharedModule} from "../shared/shared.module";
import {LowStockReportsRoutingModule ,AppRoutedComponents} from "./low-stock-reports-routing.module";

@NgModule({
  declarations: [
    ...AppRoutedComponents,
  ],
  imports: [
    CommonModule,
    FormsModule,
    LowStockReportsRoutingModule,
    MehrGridModule,
    MehrButtonModule,
    MehrInputModule,
    MehrCheckBoxModule,
    ErrorMessageModule,
    MehrSelectModule,
    MehrConfirmPopupModule,
    ArmanUploadFileFormDataModule,
    MatExpansionModule,
    MatStepperModule,
    MehrFilterGridModule,
    JalaliDateTimeModule,
    PipeModule,
    MinDirectiveModule,
    MaxDirectiveModule,
    MehrTextAreaModule,
    MehrMultiSelectModule,
    MehrInputDateModule,
    RouterModule,
    ReactiveFormsModule,
    MehrDatePickerModule,
    MehrAutoCompleteModule,
    MehrAmountInputModule,
    SharedModule,
  ],
})
export class LowStockReportsModule {
}
