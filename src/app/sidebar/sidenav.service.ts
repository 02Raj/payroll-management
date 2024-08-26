import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SidenavService {
  private sidebarVisibleSubject = new BehaviorSubject<boolean>(true);
  public sidebarVisible$ = this.sidebarVisibleSubject.asObservable();

  constructor() { }

  show() {
    this.sidebarVisibleSubject.next(true);
  }

  hide() {
    this.sidebarVisibleSubject.next(false);
  }

  toggle() {
    this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
  }
}
