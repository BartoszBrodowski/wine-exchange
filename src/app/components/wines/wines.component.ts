import { Component, OnInit } from '@angular/core';
import { WineService } from 'src/app/features/services/wine.service';
import { Wine } from 'src/app/shared/interfaces/wine.interface';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss']
})
export class WinesComponent implements OnInit {
  public wines: Wine[] = [];
  
  public constructor(private wineService: WineService) {}


  public ngOnInit(): void {
    this.wineService.getAllWines().subscribe({
      next: (wines: Wine[]) => {
        this.wines = wines;
      }
    });
  }
}
