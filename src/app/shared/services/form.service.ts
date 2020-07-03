import { FormGroup } from '@angular/forms';

export function markFormDeepDirty(formGroup: FormGroup) {
  for (const i in formGroup.controls) {
    if (formGroup.controls.hasOwnProperty(i)) {
      formGroup.controls[i].markAsDirty();
      formGroup.controls[i].updateValueAndValidity();
    }
  }
}
