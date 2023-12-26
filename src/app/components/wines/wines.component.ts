import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DropdownChangeEvent } from 'primeng/dropdown';
import { WineService } from 'src/app/features/services/wine.service';
import { SortOption } from 'src/app/shared/interfaces/sort-option.interface';
import { Wine } from 'src/app/shared/interfaces/wine.interface';

@Component({
  selector: 'app-wines',
  templateUrl: './wines.component.html',
  styleUrls: ['./wines.component.scss']
})
export class WinesComponent implements OnInit {
  public wines: Wine[] = [];
  protected displayAddModal: boolean = false;

  protected sortOptions: SortOption[] = [
    { label: 'Name (A-Z)', value: 'name' },
    { label: 'Name (Z-A)', value: '!name' },
    { label: 'Cheapest', value: 'price' },
    { label: 'New Arrivals', value: 'createdAt' },
    { label: 'Most Expensive', value: '!price' },
    { label: 'Bottling', value: 'years.bottling' },
    { label: 'Harvest', value: 'years.harvest' },
  ]
  protected sortOrder!: number;
  protected sortField!: string;

  protected filterText: string = '';
  protected formGroup!: FormGroup;

  public constructor(private wineService: WineService) {}


  public ngOnInit(): void {
    this.wineService.getAllWines().subscribe({
      next: (wines: Wine[]) => {
        this.wines = wines
      }
    });
    this.formGroup = new FormGroup({
      checked: new FormControl<boolean | null>(null)
  });
  }

  get filteredWines(): any[] {  
    return this.wines
      .filter(wine => wine.name.toLowerCase().includes(this.filterText.toLowerCase()))
      .filter(wine => this.formGroup.value.checked === null || wine.available === this.formGroup.value.checked);
  }

  public onSortChange(event: DropdownChangeEvent) {
    const value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    } else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  public toggleAddModal(): void {
    this.displayAddModal = !this.displayAddModal;
  }

  public hideAddModal(): void {
    this.displayAddModal = false;
  }

  public updateWineList(wine: Wine): void {
    this.wines = [wine, ...this.wines];
    console.log(this.wines)
  }
}
