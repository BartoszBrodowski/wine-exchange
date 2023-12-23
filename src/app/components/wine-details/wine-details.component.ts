import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  
  constructor(private route: ActivatedRoute, private wineService: WineService) {}

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
}
