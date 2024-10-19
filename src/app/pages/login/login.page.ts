import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service'; 
import { Usuario } from '../../model/usuario'; 
import { filter, take } from 'rxjs';

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
    try {
      // Esperar a que la base de datos esté lista antes de intentar cargar los usuarios
      await this.servicioBD.dbState().pipe(filter(ready => ready), take(1)).toPromise();
      this.usuarios = await this.servicioBD.getAllUsuarios(); 
      console.log('Usuarios cargados:', this.usuarios); // Log de usuarios cargados
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
    }
  }
  
  onSubmit() {
    this.errorMessage = '';

    // Limpieza de los campos de entrada
    const cleanedNick = this.nick.trim();
    const cleanedPassword = this.password.trim();

    // Agrega log para verificar valores
    console.log('Nick ingresado:', cleanedNick);
    console.log('Contraseña ingresada:', cleanedPassword);
    
    const user = this.usuarios.find((u: Usuario) => 
      u.nick_u === cleanedNick && 
      u.contrasena_u === cleanedPassword
    );

    if (user) {
      console.log('Inicio de sesión exitoso');
      this.navCtrl.navigateRoot('/home');
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos.';
      console.log('Usuario no encontrado:', cleanedNick);
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

