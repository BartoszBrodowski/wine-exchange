import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, catchError, map } from 'rxjs';
import { WineService } from '../features/services/wine.service';

export const notFoundGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> => {
  const id = route.params['id'];
  const wineService = inject(WineService);
  const router = inject(Router);
  return wineService.getWineById(id).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/not-found'])
      return [false];
    })
  );
};
