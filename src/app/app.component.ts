import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';  // Asegúrate de importar el AuthService

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  userNick: string | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Verificamos el valor inicial de userNick al suscribirnos al BehaviorSubject
    this.authService.getCurrentUserNick().subscribe((nick) => {
      console.log('User Nick updated to:', nick);  // Log para verificar el nick
      this.userNick = nick;
    });

    // Verificamos el estado de inicio de sesión
    this.authService.getLoginStatus().subscribe((isLoggedIn) => {
      console.log('User login status:', isLoggedIn ? 'Logged In' : 'Not Logged In');
    });
  }
}

