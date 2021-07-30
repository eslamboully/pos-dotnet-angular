import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DbtransoptionsService {
  languages: any[] = [{locale: 'ar'},{locale:'en'}];
  constructor() { }
}
