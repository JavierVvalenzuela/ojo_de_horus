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
    nombre: '',
    apellido: '',
    nick: '',
    password: '',
    confirmPassword: '',
    email: ''
  };

  errorMessage: string = '';  
  usuariosRegistrados: Usuario[] = []; 

  constructor(private navCtrl: NavController, private servicioBD: ServicioBDService) { 
    this.resetForm();
  }

  ngOnInit() { }

  async onSubmit() {
    this.errorMessage = '';  // Limpiar mensaje de error antes de cada envío

    // Mostrar la alerta de prueba y esperar a que se cierre
    await this.servicioBD.presentAlert("1", "1"); //esto fue para revisar hasta donde llegaba al igual que el de abajo, depues cuando se arregle borrar
    //revisar validaciones ya que no está dejando llegar al insert en BD

    // Validar longitud y formato del nombre de usuario
    if (this.user.nick.length < 5 || this.user.nick.length > 15) {
      this.errorMessage = 'El nombre de usuario debe tener entre 5 y 15 caracteres.';
      return;
    }

    // Validar contraseña
    if (!this.isPasswordValid(this.user.password)) {
      this.errorMessage = 'La contraseña debe tener entre 8 y 15 caracteres, incluir al menos una mayúscula y un carácter especial.';
      return;
    }

    // Confirmar que las contraseñas coinciden
    if (this.user.password !== this.user.confirmPassword) {
      this.errorMessage = 'La confirmación de la contraseña no coincide.';
      return;
    }

   
    await this.servicioBD.presentAlert("1", "2");  // borrar despues

    // Insertar el usuario en la base de datos
    this.servicioBD.insertarUsuario(this.user.nombre, this.user.apellido, this.user.nick, this.user.email, this.user.password, 3, 'A');

    // Limpiar el formulario después de registrar el usuario
    this.resetForm();
    alert('Usuario registrado correctamente.');
  }

  // Validación de la contraseña
  isPasswordValid(password: string): boolean {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,15}$/;
    return passwordRegex.test(password);
  }

  // Limpiar el formulario
  resetForm() {
    this.user = {
      nombre: '',
      apellido: '',
      nick: '',
      password: '',
      confirmPassword: '',
      email: ''
    };
    this.errorMessage = ''; // Limpiar mensaje de error
  }
}
