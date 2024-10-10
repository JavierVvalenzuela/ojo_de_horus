import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service'; 
import { Usuario } from '../../model/usuario'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  nick: string = '';
  password: string = '';
  errorMessage: string = '';  

  usuarios: Usuario[] = []; 

  constructor(private navCtrl: NavController, private servicioBD: ServicioBDService) {}

  ngOnInit() {
    this.loadUsers(); 
  }

  async loadUsers() {
    this.usuarios = await this.servicioBD.getAllUsuarios(); 
  }

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

    const user = this.usuarios.find((u: Usuario) => u.nick_u === this.nick && u.contrasena_u === this.password);

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
