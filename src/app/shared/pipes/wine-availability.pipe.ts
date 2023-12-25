import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wineAvailability'
})
export class WineAvailabilityPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    return value ? 'Available' : 'Not Available';
  }

}
