import { FormControl } from "@angular/forms";

export interface TagsForm {
    readonly name: FormControl<string | null>;
}