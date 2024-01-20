import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const wineYearValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  const harvest: AbstractControl<string> | null = control.get('harvest');
  const bottling: AbstractControl<string> | null = control.get('bottling');

  if (!harvest || !bottling) {
    return null;
  }

  return harvest.value <= bottling.value ? null : { wineYearMismatch: true };
}