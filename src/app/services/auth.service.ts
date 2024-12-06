import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private currentUserNickSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  constructor() {
    // Recuperamos el estado de la sesión del localStorage
    const storedNick = localStorage.getItem('userNick');
    const isLoggedIn = !!localStorage.getItem('loggedInUserId'); // Verifica si el usuario está logueado

    // Establecemos los valores iniciales de los BehaviorSubjects
    this.isLoggedInSubject.next(isLoggedIn);
    this.currentUserNickSubject.next(storedNick); // Si el usuario está logueado, establecer el nick
  }

  // Método para iniciar sesión, guarda el id del usuario y el nick
  login(userId: string, nick: string) {
    localStorage.setItem('loggedInUserId', userId);
    localStorage.setItem('userNick', nick); // Guardamos el nick del usuario
    console.log('Nick guardado en localStorage:', nick);  // Verifica que se guarda correctamente
    this.isLoggedInSubject.next(true);
    this.currentUserNickSubject.next(nick); // Actualizamos el nick en el BehaviorSubject
  }
  
  
  // Método para cerrar sesión, borra el id y el nick
  logout() {
    // Eliminamos los datos de sesión en localStorage
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('userNick');

    // Restablecemos los BehaviorSubjects
    this.isLoggedInSubject.next(false);
    this.currentUserNickSubject.next(null); // Restablecemos el nick en el BehaviorSubject
  }

  // Obtener el estado de si el usuario está logueado
  getLoginStatus() {
    return this.isLoggedInSubject.asObservable();
  }

  // Obtener el nick del usuario
  getCurrentUserNick() {
    return this.currentUserNickSubject.asObservable();
  }
}
