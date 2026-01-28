import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@mehr/mehr-core';
import { AccessoriesService } from '../../../accessories/services/accessories.service';
import { HosesService } from '../../../hoses/services/hoses.service';
import { HydraulicFittingsService } from '../../../hydraulic-fittings/services/hydraulic-fittings.service';
import { WaterFittingsService } from '../../../water-fittings/services/water-fittings.service';
import {GasAccessoriesService} from "../../../gas-accessories/services/gas-accessories.service";
type ItemType = 'accessory' | 'hose' | 'hydraulicFitting' | 'waterFitting' | 'gasAccessory';

@Component({
  selector: 'app-increase-stock-modal',
  templateUrl: './increase-stock-modal.component.html',
})
export class IncreaseStockModalComponent implements OnInit {
  @Input() data: { id: number; itemType: ItemType };
  formGroup: FormGroup;

  constructor(
    public activeModal: NgbActiveModal,
    private alertService: AlertService,
    private accessoriesService: AccessoriesService,
    private gasAccessoriesService: GasAccessoriesService,
    private hosesService: HosesService,
    private hydraulicFittingsService: HydraulicFittingsService,
    private waterFittingsService: WaterFittingsService
  ) {}

  ngOnInit(): void {
    this.formGroup = new FormGroup({
      addedAmount: new FormControl(1, [Validators.required, Validators.min(1)]),
      newEnterPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
    });
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.alertService.error('لطفا تمام فیلدها را به درستی وارد کنید.');
      return;
    }

    const { addedAmount, newEnterPrice } = this.formGroup.value;
    const id = this.data.id;
    switch (this.data.itemType) {
      case 'hose':
        this.hosesService.increaseStock(id, addedAmount, newEnterPrice).subscribe(this.handleSuccess, this.handleError);
        break;
      case 'accessory':
        this.accessoriesService.increaseStock(id, addedAmount, newEnterPrice).subscribe(this.handleSuccess, this.handleError);
        break;
      case 'hydraulicFitting':
        this.hydraulicFittingsService.increaseStock(id, addedAmount, newEnterPrice).subscribe(this.handleSuccess, this.handleError);
        break;
      case 'gasAccessory':
        this.gasAccessoriesService.increaseStock(id, addedAmount, newEnterPrice).subscribe(this.handleSuccess, this.handleError);
        break;
      case 'waterFitting':
        this.waterFittingsService.increaseStock(id, addedAmount, newEnterPrice).subscribe(this.handleSuccess, this.handleError);
        break;
    }
  }
  private handleSuccess = () => {
    this.alertService.success('موجودی با موفقیت آپدیت شد.');
    this.activeModal.close(true);
  };

  private handleError = () => {
    this.alertService.error('خطا در آپدیت موجودی.');
  };
}
