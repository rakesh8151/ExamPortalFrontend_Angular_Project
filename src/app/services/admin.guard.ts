import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from './login.service';

export const adminGuard: CanActivateFn = (route, state) => {
   const router = inject(Router);
  const loginService = inject(LoginService)
  if(loginService.isLoggedIn() && loginService.getUserRole()=='ADMIN'){
    return true;
  }
  router.navigate(['login']);
  return false;
};
