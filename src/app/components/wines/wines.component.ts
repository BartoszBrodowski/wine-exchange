import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/shared/interfaces/wine.interface';
import { WineService } from 'src/app/features/services/wine.service';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss']
})
export class WinesComponent  {
  public wines: Wine[] = []
  
constructor(private wineService: WineService) {}


  public ngOnInit(): void {
    this.wineService.getAllWines().subscribe({
      next: (wines: Wine[]) => {
        this.wines = wines;
      }, error: (err) => {
        console.log(err)
      }
    });
  }
}
