import { Component, OnInit } from '@angular/core';
import { Wine } from 'src/app/interfaces/wine.interface';
import { WineService } from 'src/app/services/wine.service';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss']
})
export class WinesComponent implements OnInit {
  public wines: Wine[] = [];
  constructor(private wineService: WineService) {}


  public ngOnInit(): void {
    this.wineService.getAllWines().subscribe({
      next: (res: Wine[]) => { 
        console.log(res)
        this.wines = res;
      }, error: (err) => {
        console.log(err)
      }
    });
  }
}
