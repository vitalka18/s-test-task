import { Pipe, PipeTransform } from '@angular/core';
import { FormArray } from '@angular/forms';

@Pipe({
  name: 'appInvalidControlsCount',
  standalone: true,
  pure: false,
})
export class InvalidControlsCountPipe implements PipeTransform {
  transform(value: FormArray): number {
    return value.controls.filter(control => control.invalid).length;
  }
}
