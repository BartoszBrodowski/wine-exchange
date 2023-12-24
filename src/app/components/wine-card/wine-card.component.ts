import { Component, Input } from '@angular/core';
import { Wine } from 'src/app/shared/interfaces/wine.interface';

@Component({
  selector: 'app-wine-card',
  templateUrl: './wine-card.component.html',
  styleUrls: ['./wine-card.component.scss']
})
export class WineCardComponent {
  @Input() public wine!: Wine;
}
