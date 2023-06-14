import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const authGuard: CanActivateFn = (route, state) => {

  const jwtService = inject(JwtHelperService);
  const router = inject(Router);

  console.log(jwtService.isTokenExpired());
  console.log(route);
  console.log(state);

  if (jwtService.isTokenExpired()) {
    router.navigate([''], { queryParams: { returnUrl: state.url } });
    return false;
  } else {
    return true;
  }

};
