import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AccessoriesService} from "../../services/accessories.service";
import {AlertService} from "@mehr/mehr-core";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-base-accessories',
  templateUrl: './base-accessories.component.html',
  styleUrls: ['./base-accessories.component.scss']
})
export class BaseAccessoriesComponent implements OnInit, OnDestroy {
  formGroup: FormGroup;
  id: number;

  // منوهای کشویی
  typeDrop = [
    { id: 'Shell', name: 'پوسته' },
    { id: 'Spring', name: 'فنر' },
    { id: 'Gasket', name: 'گسکت' },
    { id: 'O-Ring', name: 'اورینگ' },
    { id: 'Washer', name: 'واشر' },
    { id: 'Clip', name: 'کلیپ' },
    { id: 'Bracket', name: 'براکت' },
    { id: 'Clamp', name: 'بست' },
    { id: 'Connector', name: 'اتصال' },
    { id: 'Adapter', name: 'آداپتور' },
    { id: 'Reducer', name: 'کاهنده' },
    { id: 'Cap', name: 'درپوش' },
    { id: 'Plug', name: 'پلاگ' }
  ];

  hoseSizeDrop = [
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
    { id: '8', name: '۸ اینچ' }
  ];

  private _destroy = new Subject<void>();

  constructor(
    private accessoriesService: AccessoriesService,
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
      }

      if (data.compatibleHoseSize && !this.hoseSizeDrop.find(item => item.id === data.compatibleHoseSize)) {
        this.hoseSizeDrop.push({ id: data.compatibleHoseSize, name: data.compatibleHoseSize });
      }
    });
  }

  createForm() {
    this.formGroup = new FormGroup({
      id: new FormControl(0),
      code: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      type: new FormControl(null),
      compatibleHoseSize: new FormControl(null),
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
    this.router.navigate(['/store/accessories/page']);
  }

  ngOnDestroy() {
    this._destroy.next();
    this._destroy.complete();
  }
}
