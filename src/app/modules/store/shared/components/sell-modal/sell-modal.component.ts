import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from '@mehr/mehr-core';

import { AccessoriesService } from '../../../accessories/services/accessories.service';
import { HosesService } from '../../../hoses/services/hoses.service';
import { HydraulicFittingsService } from '../../../hydraulic-fittings/services/hydraulic-fittings.service';
import { WaterFittingsService } from '../../../water-fittings/services/water-fittings.service';
import { GasAccessoriesService } from '../../../gas-accessories/services/gas-accessories.service';

type ItemType = 'accessory' | 'hose' | 'hydraulicFitting' | 'waterFitting' | 'gasAccessory';

@Component({
  selector: 'app-sell-modal',
  templateUrl: './sell-modal.component.html',
})
export class SellModalComponent implements OnInit {
  @Input() data: {
    id: number;
    itemType: ItemType;
    itemName: string;
    buyPricePerUnit: number;
  };

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
      quantity: new FormControl(1, [Validators.required, Validators.min(1)]),
      sellPricePerUnit: new FormControl(null, [
        Validators.required,
        Validators.min(0),
      ]),
    });
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.alertService.error('لطفا اطلاعات فروش را کامل وارد کنید.');
      return;
    }

    const { quantity, sellPricePerUnit } = this.formGroup.value;
    const id = this.data.id;

    switch (this.data.itemType) {
      case 'accessory':
        this.accessoriesService
          .sell(id, quantity, sellPricePerUnit)
          .subscribe(this.handleSuccess, this.handleError);
        break;

      case 'hose':
        this.hosesService
          .sell(id, quantity, sellPricePerUnit)
          .subscribe(this.handleSuccess, this.handleError);
        break;

      case 'hydraulicFitting':
        this.hydraulicFittingsService.sell(id, quantity, sellPricePerUnit).subscribe(this.handleSuccess, this.handleError);
        break;

      case 'waterFitting':
        this.waterFittingsService.sell(id, quantity, sellPricePerUnit).subscribe(this.handleSuccess, this.handleError);
        break;

      case 'gasAccessory':
        this.gasAccessoriesService.sell(id, quantity, sellPricePerUnit).subscribe(this.handleSuccess, this.handleError);
        break;
    }
  }

  private handleSuccess = () => {
    this.alertService.success('فروش با موفقیت ثبت شد.');
    this.activeModal.close(true);
  };

  private handleError = () => {
    this.alertService.error('خطا در ثبت فروش.');
  };
}
