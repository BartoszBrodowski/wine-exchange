import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Wine } from 'src/app/interfaces/wine.interface';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wine-details',
  templateUrl: './wine-details.component.html',
  styleUrls: ['./wine-details.component.scss']
})
export class WineDetailsComponent implements OnInit {
  protected wineId!: string;
  protected wine: Wine | undefined;
  
  constructor(
    private route: ActivatedRoute, 
    private wineService: WineService, 
    private confirmationService: ConfirmationService, 
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.wineId = this.route.snapshot.paramMap.get('id')!;
    this.wineService.getWineById(this.wineId).subscribe({
      next: (wine: Wine) => {
        this.wine = wine;
      }, error: (err) => {
        console.log(err)
      }
    });
  }

  addToCart() {
    this.confirmationService.confirm({
        header: 'Add item to your cart?',
        message: 'Please confirm to proceed.',
        accept: () => {
            this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Item added to cart', life: 3000 });
        },
    });
  }

  delete(event: Event) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: 'Do you want to delete this wine?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.messageService.add({ severity: 'success', summary: 'Confirmed', detail: 'Wine deleted' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
    });
  }
}
