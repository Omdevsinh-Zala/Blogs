import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user/user.service';

export const reqInterceptor: HttpInterceptorFn = (req, next) => {
  const user = inject(UserService)
  const data:string = user.userDataForAuth
  let newReq = req.clone({
  })
  return next(newReq)
};
