import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {HosesService} from "../../services/hoses.service";
import {AlertService} from "@mehr/mehr-core";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-base-hoses',
  templateUrl: './base-hoses.component.html',
  styleUrls: ['./base-hoses.component.scss']
})
export class BaseHosesComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  private _destroy = new Subject<void>();
  id: number;

  // منوهای کشویی
  brandDrop = [
    { id: 'Parker', name: 'پارکر' },
    { id: 'Gates', name: 'گیتس' },
    { id: 'Bridgestone', name: 'بریجستون' },
    { id: 'Yokohama', name: 'یوکوهاما' },
    { id: 'Manuli', name: 'مانولی' },
    { id: 'Alfagomma', name: 'الفاگوما' },
    { id: 'Piranha', name: 'پیرانا' },
    { id: 'Kuriyama', name: 'کوریاما' },
    { id: 'Semperit', name: 'سمپریت' },
    { id: 'Habasti', name: 'هاباستی' },
    { id: 'Hydralok', name: 'هایدرالوک' },
    { id: 'Pirtek', name: 'پیرتک' },
    { id: 'Iranian', name: 'ایرانی (داخلی)' }
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
    { id: '6', name: '۶ اینچ' },
    { id: '8', name: '۸ اینچ' },
    { id: '10', name: '۱۰ اینچ' },
    { id: '12', name: '۱۲ اینچ' }
  ];

  standardDrop = [
    { id: 'R1', name: 'R1 (1 لایه سیم)' },
    { id: 'R2', name: 'R2 (2 لایه سیم)' },
    { id: 'R3', name: 'R3 (3 لایه سیم)' },
    { id: 'R4', name: 'R4 (4 لایه سیم)' },
    { id: 'R5', name: 'R5 (5 لایه سیم)' },
    { id: 'R6', name: 'R6 (6 لایه سیم)' },
    { id: 'R7', name: 'R7 (7 لایه سیم)' },
    { id: 'R8', name: 'R8 (8 لایه سیم)' },
    { id: 'R9', name: 'R9 (9 لایه سیم)' },
    { id: 'R10', name: 'R10 (10 لایه سیم)' },
    { id: 'R11', name: 'R11 (11 لایه سیم)' },
    { id: 'R12', name: 'R12 (12 لایه سیم)' },
    { id: 'R13', name: 'R13 (13 لایه سیم)' },
    { id: 'R14', name: 'R14 (14 لایه سیم)' },
    { id: 'R15', name: 'R15 (15 لایه سیم)' },
    { id: 'R16', name: 'R16 (16 لایه سیم)' },
    { id: 'R17', name: 'R17 (17 لایه سیم)' },
    { id: 'R18', name: 'R18 (18 لایه سیم)' },
    { id: 'R19', name: 'R19 (19 لایه سیم)' },
    { id: 'R20', name: 'R20 (20 لایه سیم)' }
  ];

  applicationDrop = [
    { id: 'Hydraulic', name: 'هیدرولیک' },
    { id: 'Pneumatic', name: 'پنوماتیک' },
    { id: 'Water', name: 'آب' },
    { id: 'Oil', name: 'نفت و روغن' },
    { id: 'Fuel', name: 'سوخت' },
    { id: 'Chemical', name: 'شیمیایی' },
    { id: 'Food', name: 'صنایع غذایی' },
    { id: 'Marine', name: 'دریایی' },
    { id: 'Automotive', name: 'خودرویی' },
    { id: 'Agriculture', name: 'کشاورزی' },
    { id: 'Mining', name: 'معدن' },
    { id: 'Construction', name: 'ساختمانی' },
    { id: 'HighPressure', name: 'فشار بالا' },
    { id: 'LowPressure', name: 'فشار پایین' },
    { id: 'HighTemperature', name: 'دمای بالا' },
    { id: 'LowTemperature', name: 'دمای پایین' },
    { id: 'Steam', name: 'بخار' },
    { id: 'Air', name: 'هوا' },
    { id: 'Gas', name: 'گاز' },
    { id: 'LPG', name: 'گاز مایع (LPG)' }
  ];

  constructor(
    private hosesService: HosesService,
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
    this.hosesService.getById(id).pipe(takeUntil(this._destroy)).subscribe(data => {
      this.formGroup.patchValue(data);

      // اضافه کردن مقادیر جدید به دراپ‌داون‌ها (اگر وجود ندارند)
      this.addMissingValue(data.brand, this.brandDrop);
      this.addMissingValue(data.sizeInch, this.sizeDrop);
      this.addMissingValue(data.standard, this.standardDrop);
      this.addMissingValue(data.application, this.applicationDrop);
    });
  }

  // تابع کمکی برای اضافه کردن مقادیر جدید
  private addMissingValue(value: string, dropdown: any[]): void {
    if (value && !dropdown.find(item => item.id === value)) {
      dropdown.push({ id: value, name: value });
      // مرتب‌سازی بر اساس نام فارسی
      dropdown.sort((a, b) => a.name.localeCompare(b.name, 'fa'));
    }
  }

  createForm() {
    this.formGroup = new FormGroup({
      code: new FormControl(null, [Validators.required]),
      brand: new FormControl(null, [Validators.required]),
      sizeInch: new FormControl(null, [Validators.required]),
      standard: new FormControl(null, [Validators.required]),
      application: new FormControl(null),
      description: new FormControl(null),
      metersInStock: new FormControl(null, [Validators.required, Validators.min(0)]),
      entryPricePerMeter: new FormControl(null, [Validators.required, Validators.min(0)]),
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
      this.hosesService.update(this.id, data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`شلنگ ${data.brand} - ${data.sizeInch} با موفقیت ویرایش شد`);
          this.onBack();
        },
        error: () => this.alertService.error('خطا در ویرایش اطلاعات')
      });
    } else {
      this.hosesService.create(data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`شلنگ ${data.brand} - ${data.sizeInch} با موفقیت ثبت شد`);
          this.onBack();
        },
        error: () => {
          this.alertService.error('خطا در ثبت اطلاعات');
        }
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/store/hoses/page']);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
