import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() {}
  resolve(router:ActivatedRouteSnapshot) {
    const name = router.paramMap.get('name')
    return of(name!)
  }
}
