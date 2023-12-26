import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, UrlTree } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { WineService } from '../features/services/wine.service';

export const wineNotFoundGuard: CanActivateFn = (route: ActivatedRouteSnapshot): Observable<UrlTree | boolean> => {
  const id: string = route.params['id'];
  const wineService: WineService = inject(WineService);
  const router: Router = inject(Router);
  
  return wineService.getWineById(id).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/not-found']);
      
      return [false];
    })
  );
};
