import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MehrSelectModule} from "@mehr/mehr-select";
import {MehrDatePickerModule} from "@mehr/mehr-date-picker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {FooterModule, HeaderModule, SideNavigationModule} from "@mehr/mehr-core-x";
import {MehrButtonModule} from "@mehr/mehr-button";
import {MehrInputModule} from "@mehr/mehr-input";
import {MehrFilterGridModule} from "@mehr/mehr-filter-grid";
import {MehrGridModule} from "@mehr/mehr-grid";
import {MinDirectiveModule} from "@mehr/mehr-core";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {NgxMaskModule} from "ngx-mask";
import {MehrAmountInputModule} from "@mehr/mehr-amount-input";
import {ConfirmPopupService} from "@mehr/mehr-confirm-popup";
import {NgbActiveModal} from "@ng-bootstrap/ng-bootstrap";
import {userManagementRoutedComponents, StoreRoutingModule} from "./store.routing.module";
import {AutocompleteLibModule} from "angular-ng-autocomplete";
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
        MehrSelectModule,
        FormsModule,
        MehrGridModule,
        MinDirectiveModule,
        MehrDatePickerModule,
        MatButtonToggleModule,
        NgxMaskModule,
        ReactiveFormsModule,
        MehrAmountInputModule,
        HeaderModule,
        SideNavigationModule,
        FooterModule,
        AutocompleteLibModule,
        SharedModule,
    ],
  providers: [ConfirmPopupService, NgbActiveModal]
})
export class StoreModule { }
