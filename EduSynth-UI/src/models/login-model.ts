import { UntypedFormGroup } from '@angular/forms';

export class LoginModel {
    email: string | null = null;
    password: string | null = null;

    populateFromFormGroup(formGroup: UntypedFormGroup) {
        this.email = formGroup.get('email')?.value;
        this.password = formGroup.get('password')?.value;
    }
}
