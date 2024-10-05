import { FormGroup, UntypedFormGroup } from '@angular/forms';

export enum Role {
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT',
}

export class RegisterModel {
    name: string | null = null;
    email: string | null = null;
    password: string | null = null;
    role: Role | null = null;

    populateFromFormGroup(formGroup: UntypedFormGroup) {
        this.email = formGroup.get('email')?.value;
        this.password = formGroup.get('password')?.value;
        this.role = formGroup.get('role')?.value;
        this.name = formGroup.get('name')?.value;
    }
}
