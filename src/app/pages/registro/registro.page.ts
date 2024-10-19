import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service'; 
import { Usuario } from '../../model/usuario'; 

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  user: any = {
    nick: '',
    password: '',
    confirmPassword: '',
    birthdate: ''
  };

  errorMessage: string = '';  
  minDate: string;  
  maxDate: string;  
  usuariosRegistrados: Usuario[] = []; 

  constructor(private navCtrl: NavController, private servicioBD: ServicioBDService) { 
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0]; 

    const minDate120YearsAgo = new Date(today.getFullYear() - 120, today.getMonth(), today.getDate());
    this.minDate = minDate120YearsAgo.toISOString().split('T')[0]; 
  }

  ngOnInit() { }

  async onSubmit() {
    this.errorMessage = '';

    // Validar campos requeridos
    if (!this.user.nick || !this.user.password || !this.user.confirmPassword || !this.user.birthdate) {
      this.errorMessage = 'Todos los campos son obligatorios.';
      return;
    }

    // Validar longitud del usuario
    if (this.user.nick.length > 16) {
      this.errorMessage = 'El nombre de usuario no puede exceder los 16 caracteres.';
      return;
    }

    // Validar longitud y formato de la contraseña
    if (!this.isPasswordValid(this.user.password)) {
      this.errorMessage = 'La contraseña debe tener un máximo de 12 caracteres, incluir al menos una mayúscula y un carácter especial.';
      return;
    }

    // Validar confirmación de contraseña
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'La confirmación de la contraseña no coincide.';
      return;
    }

    // Validar fecha de nacimiento
    if (!this.isDateValid(this.user.birthdate) || !this.isAgeInRange(this.user.birthdate)) {
      this.errorMessage = 'La fecha de nacimiento debe ser válida y el usuario debe tener al menos 10 años.';
      return;
    }

    // Verificar si el usuario ya existe
    const userExists = await this.servicioBD.getUserByNick(this.user.nick);
    if (userExists) {
      this.errorMessage = 'El nombre de usuario ya está en uso.';
      return;
    }

    // Continuar con la creación del usuario
    const correo = `${this.user.nick}@example.com`; 
    const apellido = ''; 
    const idRol = 3; 
    const id_usuario = this.usuariosRegistrados.length + 1; 
    
    await this.servicioBD.insertarUsuario(this.user.nick, apellido, this.user.nick, correo, this.user.password, idRol);

    const nuevoUsuario = new Usuario();
    nuevoUsuario.id_usuario = id_usuario;
    nuevoUsuario.nombre_u = this.user.nick; // Asume que 'name' es igual a 'nick'
    nuevoUsuario.apellido_u = apellido;
    nuevoUsuario.nick_u = this.user.nick;
    nuevoUsuario.correo_u = correo;
    nuevoUsuario.contrasena_u = this.user.password;
    nuevoUsuario.estado_cuenta_u = 'A'; 
    nuevoUsuario.id_rol = idRol;

    this.usuariosRegistrados.push(nuevoUsuario);

    this.resetForm(); 
    this.navCtrl.navigateRoot('/login'); 
  }

  resetForm() {
    this.user = {
      nick: '',
      password: '',
      confirmPassword: '',
      birthdate: ''
    };
  }

  isPasswordValid(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{1,12}$/; // Cambiado a 12 caracteres
    return passwordPattern.test(password);
  }

  isDateValid(date: string): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    return selectedDate <= currentDate; 
  }

  isAgeInRange(date: string): boolean {
    const currentDate = new Date();
    const selectedDate = new Date(date);
    
    const minDate = new Date(currentDate.getFullYear() - 10, currentDate.getMonth(), currentDate.getDate());
    
    return selectedDate <= minDate; 
  }
}

