import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Output,
  QueryList,
  SimpleChanges,
  ViewChildren
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  NgModel,
  ValidationErrors,
  Validator
} from '@angular/forms';
import {delay, of, Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-auto-complete-search',
  templateUrl: './auto-complete-search.component.html',
  styleUrls: ['./auto-complete-search.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AutoCompleteSearchComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: AutoCompleteSearchComponent,
      multi: true,
    },
  ],
})
export class AutoCompleteSearchComponent implements OnInit, OnChanges, ControlValueAccessor, Validator {
  @ViewChildren(NgModel) public validatedFields!: QueryList<NgModel>;
  @Output() valueChange = new EventEmitter<any>();
  @Input() disabled = false;
  @Input() required: boolean = false;
  @Input() label = '';
  @Input() items = [];
  @Input() labelCol = 'col-lg-12 col-md-12 col-sm-12';
  @Input() inputCol = 'col-lg-12 col-md-12 col-sm-12';
  valueAuto = '';
  inputValue: any;
  newData: any;
  @Output() selectedValue = new EventEmitter<any>();
  @Input() initValue: any;
  private _destroy = new Subject<void>();
  @Input() bindTitle: string = 'title';
  @Input() bindSubTitle: string = '';
  @Input() bindValue: string = 'value';

  constructor() {
  }

  onChange: any = () => {
  };
  onTouched: any = () => {
  };

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  public writeValue(obj: any) {
    if (obj && !this.initValue) {
      this.newData = obj;
      this.inputValue = String(this.newData);
    } else if (!obj && !this.initValue) {
      this.inputValue = '';
    }
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initValue && this.items?.length !== 0) {
      this.setDefaultSelectedItem();
    } else if (changes['initValue'] && !changes['initValue'].currentValue) {
      this.inputValue = '';
    }
  }


  // default Selected Item
  setDefaultSelectedItem() {
    const data = this.items?.filter(x => x[this.bindValue] == this.initValue);
    if (data?.length !== 0) {
      this.newData = data[0][this.bindTitle];
      this.inputValue = this.newData;
    } else {
      this.newData = this.initValue;
      this.inputValue = this.newData;
    }
  }


  // check validation Start

  public validate(control: AbstractControl): ValidationErrors | null {
    let validationErrors: ValidationErrors | null = null;
    if (this.validatedFields) {

      this.validatedFields.forEach((ngm: NgModel) => {
        if (ngm.errors !== null) {
          if (validationErrors === null) {
            validationErrors = {};
          }
          validationErrors = ngm.errors;
        }
      });
    }

    return validationErrors;
  }


  //  change Option Start
  selectOnOptionAutoComplete(item: any) {
    this.selectedValue.emit(item[this.bindValue]);
    this.onChange(item[this.bindValue]);
  }


  // key Up Value Start
  onChangeSearchAutoComplete(val: any) {
      of(val).pipe(delay(1000)).pipe(takeUntil(this._destroy)).subscribe(() => this.valueChange.emit(val))
      this.valueAuto = val;
  }


  onClearInputAutoComplete() {
    this.inputValue = null;
    if (this.valueAuto !== '' || this.valueAuto !== undefined) {
      this.valueAuto = '';
    }
    this.items = [];
    this.onChange(this.inputValue);
  }


}
