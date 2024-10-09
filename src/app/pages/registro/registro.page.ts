import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  static userList: any[] = []; // Lista estática de usuarios

  user: any = {
    nick: '',
    password: '',
    name: '',
    birthdate: ''
  };

  errorMessage: string = '';  // Variable para almacenar el mensaje de error
  minDate: string;  // Fecha mínima (por ejemplo, 100 años atrás)
  maxDate: string;  // Fecha máxima (hoy)

  constructor(private navCtrl: NavController) { 
    // Inicializa las fechas mínima y máxima
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; // Hoy
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0]; // 100 años atrás
  }

  ngOnInit() { }

  onSubmit() {
    // Limpiar el mensaje de error anterior
    this.errorMessage = '';

    // Verifica si los campos están vacíos
    if (!this.user.nick || !this.user.password || !this.user.name || !this.user.birthdate) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    // Verifica si los campos cumplen con la longitud
    if (!this.areFieldsFilled(this.user.nick, this.user.password)) {
      this.errorMessage = 'Los campos de usuario y contraseña deben tener entre 3 y 15 caracteres.';
      return;
    }

    // Verifica las condiciones del nick y de la contraseña
    if (!this.isNickValid(this.user.nick) || !this.isPasswordValid(this.user.password)) {
      this.errorMessage = 'Uno o ambos campos son incorrectos.';
      return;
    }

    // Si la fecha no es válida
    if (!this.isDateValid(this.user.birthdate)) {
      this.errorMessage = 'Por favor, ingrese una fecha válida.';
      return;
    }

    // Si todo está correcto, registra el usuario
    RegistroPage.userList.push({ ...this.user });
    console.log('Usuario registrado:', this.user);
    console.log('Lista de usuarios:', RegistroPage.userList);
    
    this.resetForm(); // Reinicia el formulario después del registro
  }

  resetForm() {
    this.user = {
      nick: '',
      password: '',
      name: '',
      birthdate: ''
    };
  }

  // Función para validar si los campos tienen contenido y cumplen con la longitud mínima y máxima
  areFieldsFilled(nick: string, password: string): boolean {
    const minLength = 3;
    const maxLength = 15;
    return (
      nick.length >= minLength && nick.length <= maxLength &&
      password.length >= minLength && password.length <= maxLength
    );
  }

  // Función para validar las condiciones de la contraseña
  isPasswordValid(password: string): boolean {
    const minLength = 3;
    const maxLength = 15;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const validLength = password.length >= minLength && password.length <= maxLength;
    return hasUpperCase && hasSpecialChar && validLength;
  }

  // Función para validar las condiciones del nick
  isNickValid(nick: string): boolean {
    const minLength = 3;
    const maxLength = 15;
    return nick.length >= minLength && nick.length <= maxLength;
  }

  // Función para validar si la fecha es válida
  isDateValid(birthdate: string): boolean {
    return birthdate !== '' && new Date(birthdate).toString() !== 'Invalid Date';
  }
}
