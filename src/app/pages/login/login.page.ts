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
  errorMessage: string = '';  // Variable para almacenar el mensaje de error

  // Lista de usuarios predefinidos
  private static predefinedUsers: any[] = [
    { nick: 'Diego', password: '1234' },
    { nick: 'Javier', password: '12345' }
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {}

  onSubmit() {
    
    this.errorMessage = '';

    
    if (!this.areFieldsFilled(this.nick, this.password)) {
      this.errorMessage = 'Los campos deben tener entre 3 y 15 caracteres.';
      return;
    }

    
    if (!this.isNickValid(this.nick) || !this.isPasswordValid(this.password)) {
      this.errorMessage = 'Uno o ambos campos son incorrectos.';
      return;
    }

    
    const user = LoginPage.predefinedUsers.find((u: any) => u.nick === this.nick && u.password === this.password);

    if (user) {
      console.log('Inicio de sesión exitoso');
      this.navCtrl.navigateRoot('/home');
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
    }
  }

  
  areFieldsFilled(nick: string, password: string): boolean {
    const minLength = 3;
    const maxLength = 15;
    return (
      nick.length >= minLength && nick.length <= maxLength &&
      password.length >= minLength && password.length <= maxLength
    );
  }

  
  isPasswordValid(password: string): boolean {
    const minLength = 3;
    const maxLength = 15;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const validLength = password.length >= minLength && password.length <= maxLength;
    return hasUpperCase && hasSpecialChar && validLength;
  }


  isNickValid(nick: string): boolean {
    const minLength = 3;
    const maxLength = 15;
    return nick.length >= minLength && nick.length <= maxLength;
  }
}
