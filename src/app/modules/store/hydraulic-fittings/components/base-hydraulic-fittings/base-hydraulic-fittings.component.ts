import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HydraulicFittingsService} from "../../services/hydraulic-fittings.service";
import {AlertService} from "@mehr/mehr-core";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-base-hydraulic-fittings',
  templateUrl: './base-hydraulic-fittings.component.html',
  styleUrls: ['./base-hydraulic-fittings.component.scss']
})
export class BaseHydraulicFittingsComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  private _destroy = new Subject<void>();
  id: number;
  threadTypeDrop = [
    { id: 'JIC', name: 'JIC (37° فلر)' },
    { id: 'ORFS', name: 'ORFS (O-Ring Face Seal)' },
    { id: 'BSP', name: 'BSP (بریتانیایی)' },
    { id: 'BSPT', name: 'BSPT (مخروطی)' },
    { id: 'NPT', name: 'NPT (آمریکایی مخروطی)' },
    { id: 'NPSM', name: 'NPSM (آمریکایی مستقیم)' },
    { id: 'SAE', name: 'SAE (فلر 45°)' },
    { id: 'ISO', name: 'ISO (بین‌المللی)' },
    { id: 'DIN', name: 'DIN (آلمانی)' },
    { id: 'METRIC', name: 'METRIC (متریک)' },
    { id: 'AN', name: 'AN (هوایی)' },
    { id: 'MS', name: 'MS (نظامی)' },
    { id: 'KOMPRESS', name: 'KOMPRESS (آلمانی)' }
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
    { id: 'M10x1.0', name: 'M10x1.0' },
    { id: 'M12x1.5', name: 'M12x1.5' },
    { id: 'M14x1.5', name: 'M14x1.5' },
    { id: 'M16x1.5', name: 'M16x1.5' },
    { id: 'M18x1.5', name: 'M18x1.5' },
    { id: 'M20x1.5', name: 'M20x1.5' },
    { id: 'M22x1.5', name: 'M22x1.5' },
    { id: 'M24x1.5', name: 'M24x1.5' },
    { id: 'M27x2.0', name: 'M27x2.0' },
    { id: 'M30x2.0', name: 'M30x2.0' },
    { id: 'M33x2.0', name: 'M33x2.0' },
    { id: 'M36x2.0', name: 'M36x2.0' },
    { id: 'M42x2.0', name: 'M42x2.0' },
    { id: 'DN6', name: 'DN6' },
    { id: 'DN8', name: 'DN8' },
    { id: 'DN10', name: 'DN10' },
    { id: 'DN12', name: 'DN12' },
    { id: 'DN15', name: 'DN15' },
    { id: 'DN20', name: 'DN20' },
    { id: 'DN25', name: 'DN25' }
  ];

  angleDrop = [
    { id: '0', name: 'صاف (۰ درجه)' },
    { id: '15', name: '۱۵ درجه' },
    { id: '30', name: '۳۰ درجه' },
    { id: '45', name: '۴۵ درجه' },
    { id: '60', name: '۶۰ درجه' },
    { id: '75', name: '۷۵ درجه' },
    { id: '90', name: '۹۰ درجه' },
    { id: '120', name: '۱۲۰ درجه' },
    { id: '135', name: '۱۳۵ درجه' },
    { id: '150', name: '۱۵۰ درجه' },
    { id: '165', name: '۱۶۵ درجه' },
    { id: '180', name: '۱۸۰ درجه' }
  ];

  genderDrop = [
    { id: 'MALE', name: 'نری' },
    { id: 'FEMALE', name: 'مادگی' },
    { id: 'MALE-MALE', name: 'دو سر نری' },
    { id: 'FEMALE-FEMALE', name: 'دو سر مادگی' },
    { id: 'MALE-FEMALE', name: 'نری-مادگی' },
    { id: 'SWIVEL', name: 'سوئیول (چرخان)' }
  ];

  materialDrop = [
    { id: 'CARBON_STEEL', name: 'فولاد کربنی' },
    { id: 'STAINLESS_STEEL', name: 'استنلس استیل' },
    { id: 'BRASS', name: 'برنج' },
    { id: 'ALUMINUM', name: 'آلومینیوم' },
    { id: 'COPPER', name: 'مس' },
    { id: 'DUCTILE_IRON', name: 'چدن داکتیل' },
    { id: 'FORGED_STEEL', name: 'فولاد آهنگری شده' },
    { id: 'PLASTIC', name: 'پلاستیک' },
    { id: 'ZINC_PLATED', name: 'گالوانیزه' },
    { id: 'NICKEL_PLATED', name: 'نیکل کاری شده' },
    { id: 'BLACK_OXIDE', name: 'اکسید سیاه' }
  ];

  constructor(
    private hydraulicFittingsService: HydraulicFittingsService,
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
    this.hydraulicFittingsService.getById(id).pipe(takeUntil(this._destroy)).subscribe(data => {
      this.formGroup.patchValue(data);
      this.addMissingValue(data.threadType, this.threadTypeDrop);
      this.addMissingValue(data.size, this.sizeDrop);
      this.addMissingValue(data.angle, this.angleDrop);
      this.addMissingValue(data.gender, this.genderDrop);
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
      threadType: new FormControl(null, [Validators.required]),
      size: new FormControl(null, [Validators.required]),
      angle: new FormControl(null, [Validators.required]),
      gender: new FormControl(null, [Validators.required]),
      material: new FormControl(null),
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
      this.hydraulicFittingsService.update(this.id, data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`اتصال ${data.threadType} ${data.size} با موفقیت ویرایش شد`);
          this.onBack();
        },
        error: () => this.alertService.error('خطا در ویرایش اطلاعات')
      });
    } else {
      this.hydraulicFittingsService.create(data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`اتصال هیدرولیک ${data.threadType} ${data.size} با موفقیت ثبت شد`);
          this.onBack();
        },
        error: () => {
          this.alertService.error('خطا در ثبت اطلاعات');
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/store/hydraulic-fittings/page']);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
