import { Component, EventEmitter, Input, OnChanges, Output, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WineService } from 'src/app/features/services/wine.service';
import { TagsForm } from 'src/app/models/tags-form.model';
import { Tag } from 'src/app/shared/interfaces/tag.interface';
import { Wine } from 'src/app/shared/interfaces/wine.interface';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-edit-wine',
  templateUrl: './add-edit-wine.component.html',
  styleUrls: ['./add-edit-wine.component.scss']
})
export class AddEditWineComponent implements OnChanges, OnInit {
  @Input() displayAddModal: boolean = true;
  @Input() wineId: string | undefined = '';
  @Input() isAdd: boolean = false;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() updateWineComponent: EventEmitter<Wine> = new EventEmitter<Wine>();
  @Output() updateWineList: EventEmitter<Wine> = new EventEmitter<Wine>();
  private wine: Wine | undefined = undefined;
 
  public ngOnInit(): void {
    if (this.wineId) {
      this.wineService.getWineById(this.wineId)
        .subscribe({
          next: (wine): void => {
            this.wine = wine;
          },
          error: (): void => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get wine' });
          }
        });
    }
  }

  public wineForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    years: this.fb.group({
      harvest: ['', Validators.required],
      bottling: ['', Validators.required]
    }),
    price: ['', Validators.required],
    tags: this.fb.array<Tag>([])
  })

  public constructor(
    private fb: FormBuilder,
    private wineService: WineService, 
    private messageService: MessageService,
    private confirmationService: ConfirmationService) { }

  get tags(): FormArray<FormGroup<TagsForm>> {
    return this.wineForm.controls['tags'] as FormArray<FormGroup<TagsForm>>;
  }

  public ngOnChanges(): void {
    if (this.wineId) {
      this.wineService.getWineById(this.wineId)
        .subscribe({
          next: (wine): void => {
            this.wineForm.patchValue(wine);
          },
          error: (): void => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to get wine' });
          }
        });
    }
  }

  protected closeModal(): void {
    this.clickClose.emit(true);
  }

  protected hideAddModal(isClosed: boolean): void {
    this.displayAddModal = !isClosed;
  }

  
  protected addTag(): void {
    const tagsArray = this.wineForm.get('tags') as FormArray;
    tagsArray.push(this.fb.group({
      id: uuidv4(),
      name: ['']
    }));
  }
  
  protected addWine(event: Event): void {
    const action = this.isAdd ? 'add' : 'edit';
    const wineServiceMethod = this.wineId ? 'updateWine' : 'addWine';
    const wineId = this.wineId ? this.wineId : uuidv4();
    console.log(wineId)
    const wineObject = {
      ...this.wineForm.value,
      id: wineId
    };

    console.log('Wine Object: ', wineObject)
  
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Do you want to ${action} this wine?`,
      header: 'Add Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      acceptIcon: "none",
      rejectIcon: "none",
      accept: (): void => {
        this.wineService[wineServiceMethod](wineObject)
          .subscribe({
            next: (response): void => {
              console.log('Response',response)
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: `Wine ${action}ed!` });
              this.updateWineComponent.emit(wineObject);
              this.updateWineList.emit(response.wine);
              this.closeModal();
            },
            error: (error): void => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: `Failed to ${action} wine.` });
            }
          });
      },
      reject: (): void => {
        console.log('test')
        this.messageService.add({ severity: 'info', summary: 'Rejected', detail: `Wine ${action} cancelled` });
      }
    });
  }
  
}
