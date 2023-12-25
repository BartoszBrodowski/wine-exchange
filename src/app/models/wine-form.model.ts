import { FormArray, FormGroup, FormControl } from "@angular/forms";
import { TagsForm } from "./tags-form.model";
import { DateForm } from "./date-form.model";

export interface WineForm {
    readonly name: FormControl<string | null>;
    readonly date: FormGroup<DateForm>;
    readonly price: FormControl<number | null>;
    readonly tags: FormArray<FormGroup<TagsForm>>;
}