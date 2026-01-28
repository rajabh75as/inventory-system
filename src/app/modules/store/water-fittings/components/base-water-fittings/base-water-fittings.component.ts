import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {WaterFittingsService} from "../../services/water-fittings.service";
import {AlertService} from "@mehr/mehr-core";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-base-water-fittings',
  templateUrl: './base-water-fittings.component.html',
  styleUrls: ['./base-water-fittings.component.scss']
})
export class BaseWaterFittingsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  private _destroy = new Subject<void>();
  id: number;
  typeDrop = [
    { id: 'Elbow', name: 'زانو' },
    { id: 'Tee', name: 'سه‌راهی' },
    { id: 'Reducer', name: 'کاهنده' },
    { id: 'Coupling', name: 'کوپلینگ' },
    { id: 'Adapter', name: 'آداپتور' },
    { id: 'Union', name: 'اتصال' },
    { id: 'Cap', name: 'درپوش' },
    { id: 'Plug', name: 'پلاگ' },
    { id: 'Nipple', name: 'نیپل' },
    { id: 'Bushing', name: 'بوشینگ' },
    { id: 'Cross', name: 'چهارراهی' },
    { id: 'Flange', name: 'فلنج' },
    { id: 'Valve', name: 'شیر' },
    { id: 'Faucet', name: 'شیرآلات' },
    { id: 'Connector', name: 'اتصال دهنده' },
    { id: 'Bend', name: 'خم' },
    { id: 'Y', name: 'وای' },
    { id: 'Saddle', name: 'زین اسبی' },
    { id: 'Clamp', name: 'بست' },
    { id: 'Gasket', name: 'گسکت' }
  ];

  sizeDrop = [
    { id: '1/4', name: '۱/۴ اینچ' },
    { id: '3/8', name: '۳/۸ اینچ' },
    { id: '1/2', name: '۱/۲ اینچ' },
    { id: '3/4', name: '۳/۴ اینچ' },
    { id: '1', name: '۱ اینچ' },
    { id: '1_1/4', name: '۱/۱ ۴ اینچ' },
    { id: '1_1/2', name: '۱/۱ ۲ اینچ' },
    { id: '2', name: '۲ اینچ' },
    { id: '2_1/2', name: '۲/۱ ۲ اینچ' },
    { id: '3', name: '۳ اینچ' },
    { id: '4', name: '۴ اینچ' },
    { id: '5', name: '۵ اینچ' },
    { id: '6', name: '۶ اینچ' },
    { id: '8', name: '۸ اینچ' },
    { id: '10', name: '۱۰ اینچ' },
    { id: '12', name: '۱۲ اینچ' },
    { id: 'DN15', name: 'DN15' },
    { id: 'DN20', name: 'DN20' },
    { id: 'DN25', name: 'DN25' },
    { id: 'DN32', name: 'DN32' },
    { id: 'DN40', name: 'DN40' },
    { id: 'DN50', name: 'DN50' },
    { id: 'DN65', name: 'DN65' },
    { id: 'DN80', name: 'DN80' },
    { id: 'DN100', name: 'DN100' }
  ];

  materialDrop = [
    { id: 'GALVANIZED', name: 'گالوانیزه' },
    { id: 'BRASS', name: 'برنجی' },
    { id: 'COPPER', name: 'مسی' },
    { id: 'PVC', name: 'پی‌وی‌سی' },
    { id: 'UPVC', name: 'یو‌پی‌وی‌سی' },
    { id: 'CPVC', name: 'سی‌پی‌وی‌سی' },
    { id: 'PPR', name: 'پی‌پی‌آر' },
    { id: 'PEX', name: 'پکس' },
    { id: 'STAINLESS_STEEL', name: 'استیل' },
    { id: 'CARBON_STEEL', name: 'فولاد کربنی' },
    { id: 'CAST_IRON', name: 'چدن' },
    { id: 'DUCTILE_IRON', name: 'چدن داکتیل' },
    { id: 'BRONZE', name: 'برنزی' },
    { id: 'ALUMINUM', name: 'آلومینیوم' },
    { id: 'PLASTIC', name: 'پلاستیک' },
    { id: 'NYLON', name: 'نایلون' },
    { id: 'RUBBER', name: 'لاستیک' },
    { id: 'COMPOSITE', name: 'کامپوزیت' }
  ];

  constructor(
    private waterFittingsService: WaterFittingsService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.id = Number(activatedRoute.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    this.createForm();
    if (this.id) {
      this.getById(this.id);
    }
  }

  getById(id: number) {
    this.waterFittingsService.getById(id).pipe(takeUntil(this._destroy)).subscribe(data => {
      this.formGroup.patchValue(data);
      this.addMissingValue(data.type, this.typeDrop);
      this.addMissingValue(data.sizeInch, this.sizeDrop);
      this.addMissingValue(data.material, this.materialDrop);
    });
  }

  private addMissingValue(value: string, dropdown: any[]): void {
    if (value && !dropdown.find(item => item.id === value)) {
      dropdown.push({ id: value, name: value });
      dropdown.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
    }
  }

  createForm() {
    this.formGroup = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      type: new FormControl(null, [Validators.required]),
      sizeInch: new FormControl(null, [Validators.required]),
      material: new FormControl(null, [Validators.required]),
      description: new FormControl(null),
      count: new FormControl(null, [Validators.required, Validators.min(0)]),
      enterPrice: new FormControl(null, [Validators.required, Validators.min(0)]),
      shelf: new FormControl(null, [Validators.required]),
      row: new FormControl(null, [Validators.required]),
      column: new FormControl(null, [Validators.required]),
    });
  }

  onSave() {
    if (this.formGroup.invalid) {
      this.alertService.error('لطفا تمام فیلدهای اجباری را پر کنید');
      return;
    }

    const data = this.formGroup.value;

    if (this.id) {
      this.waterFittingsService.update(this.id, data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`اتصال آب ${data.type} ${data.sizeInch} با موفقیت ویرایش شد`);
          this.onBack();
        },
        error: () => this.alertService.error('خطا در ویرایش اطلاعات')
      });
    } else {
      this.waterFittingsService.create(data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`اتصال آب ${data.type} ${data.sizeInch} با موفقیت ثبت شد`);
          this.onBack();
        },
        error: () => {
          this.alertService.error('خطا در ثبت اطلاعات');
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/store/water-fittings/page']);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
