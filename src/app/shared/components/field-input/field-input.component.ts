import { Component, EventEmitter, Input, Output, forwardRef } from '@angular/core';
 import { ControlValueAccessor, NG_VALUE_ACCESSOR,Validators, FormControl, ValidatorFn } from '@angular/forms'
import { Subscription } from 'rxjs';

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

  @Output() onFocus = new EventEmitter();
  @Output() onBlur = new EventEmitter();

  control!: FormControl;
  sub$: Subscription | undefined;

  onTouched: any;
  onChange: any;

  ngOnInit(): void {
    const validators: ValidatorFn[] = [];

    if (this.required) {
      validators.push(Validators.required);
    }

    this.control = new FormControl('', validators);
  }

  writeValue(value: any): void {
    this.control.setValue(value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
    this.sub$ = this.control.valueChanges.subscribe(fn);
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    isDisabled ? this.control.disable() : this.control.enable();
  }

  ngOnDestroy() {
    this.sub$?.unsubscribe()
  }
}
