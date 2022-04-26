import { Component, forwardRef, OnInit, Input } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label!: string;
  @Input() type!: string;
  @Input() placeholder!: string;
  @Input() parentForm!: any;
  @Input() formControlName!: string;

  constructor() {}
  // get formField() {
  //   return this.parentForm.get(this.formControlName);
  // }

  public value!: string;
  public changed!: (value: string) => void;
  public touch!: () => void;
  public isDisable!: boolean;

  public onChange(event: Event): void {
    const value: string = (<HTMLInputElement>event.target).value;
    this.changed(value);
  }

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: any): void {
    this.changed = fn;
  }
  registerOnTouched(fn: any): void {
    this.touch = fn;
  }
  ngOnInit(): void {}
}
