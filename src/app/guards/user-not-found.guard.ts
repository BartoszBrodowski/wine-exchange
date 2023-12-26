import { CanActivateFn, Router } from '@angular/router';
import { UserService } from '../features/services/user.service';
import { catchError, map } from 'rxjs';
import { inject } from '@angular/core';

export const userNotFoundGuard: CanActivateFn = (route, state) => {
  const id: string = route.params['id'];
  const userService: UserService = inject(UserService);
  const router: Router = inject(Router);
  
  return userService.getUserById(id).pipe(
    map(() => true),
    catchError(() => {
      router.navigate(['/not-found']);
      
      return [false];
    })
  );
};
