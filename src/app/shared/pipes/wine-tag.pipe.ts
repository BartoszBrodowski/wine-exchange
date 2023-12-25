import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wineTag'
})

export class WineTagPipe implements PipeTransform {
  transform(value: { name: string } | null | undefined): string {
    return value ? value.name : '';
  }
}

