import { Injectable } from "@angular/core";
import { FormArray, FormControl, FormGroup } from "@angular/forms";

@Injectable()
export class BaseComponent {

    public getFormControl(form: FormGroup, name: string): FormControl {
        return form.get(name) as FormControl;
    }

    public getFormArray(form: FormGroup, name: string): FormArray {
        return form.get(name) as FormArray;
    }

    public getFormGroup(form: FormGroup, name: string): FormGroup {
        return form.get(name) as FormGroup;
    }

}
