import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nick: string = '';
  password: string = '';

  // Lista de usuarios predefinidos
  private static predefinedUsers: any[] = [
    { nick: 'Diego', password: '1234' },
    { nick: 'Javier', password: '12345' }
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    // Inicializa cualquier configuración si es necesario
  }

  onSubmit() {
    // Busca el usuario en la lista predefinida
    const user = LoginPage.predefinedUsers.find((u: any) => u.nick === this.nick && u.password === this.password);

    if (user) {
      console.log('Inicio de sesión exitoso');
      // Redirige a la página home si las credenciales coinciden
      this.navCtrl.navigateRoot('/home');
    } else {
      console.log('Credenciales incorrectas');
      // Muestra una alerta si las credenciales no coinciden
      alert('Usuario o contraseña incorrectos');
    }
  }
}
