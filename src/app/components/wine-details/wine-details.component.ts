import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Wine } from 'src/app/shared/interfaces/wine.interface';
import { WineService } from 'src/app/features/services/wine.service';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.scss']
})
export class WineDetailsComponent implements OnInit {
  protected wineId: string = '';
  protected wine: Wine | undefined;
  protected displayAddModal: boolean = false;
  
  public constructor(
    private route: ActivatedRoute, 
    private wineService: WineService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService,
    private router: Router
  ) {}

  public ngOnInit(): void {
    this.wineId = this.route.snapshot.paramMap.get('id') as string;
    this.wineService.getWineById(this.wineId).subscribe({
      next: (wine: Wine) => {
        this.wine = wine;
      }, error: () => {
        this.router.navigateByUrl('/not-found');
      }
    });
  }

  protected addToCart(): void {
    this.confirmationService.confirm({
      header: 'Add item to your cart?',
      message: 'Please confirm to proceed.',
      accept: () => {
        this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Item added to cart', life: 3000 });
      },
    });
  }

  public updateWine(wine: Wine): void {
    this.wine = wine;
    console.log('updateWine ran')
  }

  protected showAddModal(): void {
    this.displayAddModal = true;
  }

  protected hideAddModal(isClosed: boolean): void {
    this.displayAddModal = !isClosed;
  }

  protected delete(event: Event): void {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this wine?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: (): void => {
        this.wineService.deleteWine(this.wineId)
          .subscribe({
            next: (): void => {
              this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Wine deleted' });
              this.router.navigateByUrl('/wines');
            },
            error: (): void => {
              this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Failed to delete wine' });
            }
          });
      },
      reject: (): void => {
        this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
