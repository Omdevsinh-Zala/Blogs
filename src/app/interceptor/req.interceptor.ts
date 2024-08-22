import { HttpInterceptorFn } from '@angular/common/http';

export const reqInterceptor: HttpInterceptorFn = (req, next) => {
  return next(req)
};
