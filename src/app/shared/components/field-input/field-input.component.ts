import { Component, Input, forwardRef } from '@angular/core';
 import { ControlValueAccessor, NG_VALUE_ACCESSOR,Validators, FormControl, ValidatorFn } from '@angular/forms'

@Component({
  selector: 'app-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FieldInputComponent),
      multi: true
    }
  ]
})
export class FieldInputComponent {
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() helperMsg: string = '';
  @Input() required: boolean = false;
  @Input() email: boolean = false;

  formControl!: FormControl;
  onTouched: any;
  onChange: any;

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];

    if (this.required) {
      validators.push(Validators.required);
    }

    if (this.email) {
      validators.push(Validators.email);
    }

    this.formControl = new FormControl('', validators);
  }

  writeValue(value: any): void {
    this.formControl.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.formControl.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.formControl.disable() : this.formControl.enable();
  }
}
