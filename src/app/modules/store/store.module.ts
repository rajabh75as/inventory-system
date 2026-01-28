import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MehrSelectModule} from "@mehr/mehr-select";
import {MehrDatePickerModule} from "@mehr/mehr-date-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterModule, HeaderModule, SideNavigationModule} from "@mehr/mehr-core-x";
import {MehrButtonModule} from "@mehr/mehr-button";
import {MehrInputModule} from "@mehr/mehr-input";
import {MehrFilterGridModule} from "@mehr/mehr-filter-grid";
import {MehrInputDateModule} from "@mehr/mehr-input-date";
import {MehrGridModule} from "@mehr/mehr-grid";
import {MehrTextAreaModule} from "@mehr/mehr-text-area";
import {MinDirectiveModule} from "@mehr/mehr-core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MehrAutoCompleteModule} from "@mehr/mehr-auto-complete";
import {MehrSwitchButtonModule} from "@mehr/mehr-switch-button";
import {NgxMaskModule} from "ngx-mask";
import {MehrAmountInputModule} from "@mehr/mehr-amount-input";
import {ConfirmPopupService} from "@mehr/mehr-confirm-popup";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {userManagementRoutedComponents, StoreRoutingModule} from "./store.routing.module";
import {AutoCompleteSearchComponent} from "./shared/components/auto-complete-search/auto-complete-search.component";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
import {MehrMultiSelectModule} from "@mehr/mehr-multi-select";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    ...userManagementRoutedComponents
  ],
    imports: [
        StoreRoutingModule,
        CommonModule,
        FormsModule,
        MehrDatePickerModule,
        MehrButtonModule,
        MehrInputModule,
        MehrFilterGridModule,
        MehrInputDateModule,
        MehrSelectModule,
        FormsModule,
        MehrGridModule,
        MehrTextAreaModule,
        MinDirectiveModule,
        MehrDatePickerModule,
        MatButtonToggleModule,
        MehrAutoCompleteModule,
        MehrSwitchButtonModule,
        NgxMaskModule,
        ReactiveFormsModule,
        MehrAmountInputModule,
        HeaderModule,
        SideNavigationModule,
        FooterModule,
        AutocompleteLibModule,
        MehrMultiSelectModule,
        SharedModule,
    ],
  exports: [
    AutoCompleteSearchComponent,
  ],
  providers: [ConfirmPopupService, NgbActiveModal]
})
export class StoreModule { }
