import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {GasAccessoriesService} from "../../services/gas-accessories.service";
import {AlertService} from "@mehr/mehr-core";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-base-gas-accessories',
  templateUrl: './base-gas-accessories.component.html',
  styleUrls: ['./base-gas-accessories.component.scss']
})
export class BaseGasAccessoriesComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  id: number;

  // منوهای کشویی
  typeDrop = [
    { id: 'Valve', name: 'شیر' },
    { id: 'Regulator', name: 'رگلاتور' },
    { id: 'Gauge', name: 'گیج فشار' },
    { id: 'PressureRelief', name: 'شیر اطمینان' },
    { id: 'CheckValve', name: 'شیر یکطرفه' },
    { id: 'BallValve', name: 'شیر توپی' },
    { id: 'GateValve', name: 'شیر دروازه‌ای' },
    { id: 'NeedleValve', name: 'شیر سوزنی' },
    { id: 'Connector', name: 'اتصال' },
    { id: 'Adapter', name: 'آداپتور' },
    { id: 'Reducer', name: 'کاهنده' },
    { id: 'Tee', name: 'سه‌راهی' },
    { id: 'Elbow', name: 'زانو' },
    { id: 'Union', name: 'اتصال سریع' },
    { id: 'Cap', name: 'درپوش' },
    { id: 'Plug', name: 'پلاگ' },
    { id: 'Nipple', name: 'نیپل' },
    { id: 'Hose', name: 'شیلنگ گاز' },
    { id: 'Fitting', name: 'اتصالات گاز' }
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
    { id: 'DN15', name: 'DN15' },
    { id: 'DN20', name: 'DN20' },
    { id: 'DN25', name: 'DN25' },
    { id: 'DN32', name: 'DN32' },
    { id: 'DN40', name: 'DN40' },
    { id: 'DN50', name: 'DN50' }
  ];

  materialDrop = [
    { id: 'Brass', name: 'برنجی' },
    { id: 'Bronze', name: 'برنزی' },
    { id: 'StainlessSteel', name: 'استیل' },
    { id: 'CarbonSteel', name: 'فولاد کربنی' },
    { id: 'GalvanizedSteel', name: 'فولاد گالوانیزه' },
    { id: 'Copper', name: 'مسی' },
    { id: 'Aluminum', name: 'آلومینیوم' },
    { id: 'CastIron', name: 'چدن' },
    { id: 'DuctileIron', name: 'چدن داکتیل' },
    { id: 'Plastic', name: 'پلاستیک' },
    { id: 'PVC', name: 'پی‌وی‌سی' },
    { id: 'Composite', name: 'کامپوزیت' }
  ];

  private _destroy = new Subject<void>();

  constructor(
    private accessoriesService: GasAccessoriesService,
    private alertService: AlertService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
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
    this.accessoriesService.getById(id).pipe(takeUntil(this._destroy)).subscribe(data => {
      this.formGroup.patchValue(data);
      if (data.type && !this.typeDrop.find(item => item.id === data.type)) {
        this.typeDrop.push({ id: data.type, name: data.type });
        this.typeDrop.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (data.size && !this.sizeDrop.find(item => item.id === data.size)) {
        this.sizeDrop.push({ id: data.size, name: data.size });
        this.sizeDrop.sort((a, b) => a.name.localeCompare(b.name));
      }

      if (data.material && !this.materialDrop.find(item => item.id === data.material)) {
        this.materialDrop.push({ id: data.material, name: data.material });
        this.materialDrop.sort((a, b) => a.name.localeCompare(b.name));
      }
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(0),
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null),
      size: new FormControl(null),
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
      this.accessoriesService.update(this.id, data).pipe(takeUntil(this._destroy)).subscribe({
        next: () => {
          this.alertService.success(`قطعه ${data.name} با موفقیت ویرایش شد`);
          this.onBack();
        },
        error: () => this.alertService.error('خطا در ویرایش اطلاعات')
      });
    } else {
      this.accessoriesService.create(data)
        .pipe(takeUntil(this._destroy))
        .subscribe({
          next: () => {
            this.alertService.success(`قطعه ${data.name} با موفقیت ثبت شد`);
            this.onBack();
          },
          error: () => this.alertService.error('خطا در ثبت اطلاعات')
        });
    }
  }

  onBack(): void {
    this.router.navigate(['/store/gas-accessories/page']);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
