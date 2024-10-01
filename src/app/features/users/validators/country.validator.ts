import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function countryValidator(availableCountries: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (availableCountries.includes(control.value)) {
      return null;
    }
    return { unavailableCountry: true };
  };
}
