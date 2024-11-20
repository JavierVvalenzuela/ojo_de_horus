import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  getCurrentUserName(): string {
    throw new Error('Method not implemented.');
  }
  isLoggedIn(): boolean {
    throw new Error('Method not implemented.');
  }
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor() {
    const isLoggedIn = !!localStorage.getItem('loggedInUserId');
    this.isLoggedInSubject.next(isLoggedIn);
  }

  login(userId: string) {
    localStorage.setItem('loggedInUserId', userId);
    this.isLoggedInSubject.next(true);
  }

  logout() {
    localStorage.removeItem('loggedInUserId');
    this.isLoggedInSubject.next(false);
  }

  getLoginStatus() {
    return this.isLoggedInSubject.asObservable();
  }
}
