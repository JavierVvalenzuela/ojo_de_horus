import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user: any = {
    nick: '',
    password: '',
    name: '',
    birthdate: ''
  };

  errorMessage: string = '';  
  minDate: string;  
  maxDate: string;  

  constructor(private navCtrl: NavController, private servicioBD: ServicioBDService) { 
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; 
    this.minDate = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate()).toISOString().split('T')[0]; 
  }

  ngOnInit() { }

  async onSubmit() {
    this.errorMessage = '';

    if (!this.user.nick || !this.user.password || !this.user.name || !this.user.birthdate) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    if (!this.areFieldsFilled(this.user.nick, this.user.password)) {
      this.errorMessage = 'Los campos de usuario y contraseña deben tener entre 3 y 15 caracteres.';
      return;
    }

    if (!this.isNickValid(this.user.nick) || !this.isPasswordValid(this.user.password)) {
      this.errorMessage = 'Uno o ambos campos son incorrectos.';
      return;
    }

    if (!this.isDateValid(this.user.birthdate)) {
      this.errorMessage = 'Por favor, ingrese una fecha válida.';
      return;
    }

    const userExists = await this.servicioBD.getUserByNick(this.user.nick);

    if (userExists) {
      this.errorMessage = 'El nombre de usuario ya está en uso.';
      return;
    }

    const correo = `${this.user.nick}@example.com`; 
    const apellido = ''; 
    const idRol = 1; 
    await this.servicioBD.insertarUsuario(this.user.name, apellido, this.user.nick, correo, this.user.password, idRol);
    
    console.log('Usuario registrado:', this.user);
    this.resetForm(); 
    this.navCtrl.navigateRoot('/login'); 
  }

  resetForm() {
    this.user = {
      nick: '',
      password: '',
      name: '',
      birthdate: ''
    };
  }

  areFieldsFilled(nick: string, password: string): boolean {
    return nick.length >= 3 && nick.length <= 15 && password.length >= 3 && password.length <= 15;
  }

  isNickValid(nick: string): boolean {
    const nickPattern = /^[a-zA-Z0-9]*$/; 
    return nickPattern.test(nick);
  }

  isPasswordValid(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{3,15}$/; 
    return passwordPattern.test(password);
  }

  isDateValid(date: string): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= currentDate; 
  }
}
