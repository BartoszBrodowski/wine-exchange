import { FormControl } from "@angular/forms";

export interface DateForm {
    harvest: FormControl<Date | null>;
    bottling: FormControl<Date | null>;
}