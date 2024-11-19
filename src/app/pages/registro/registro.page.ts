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
  // Instancia del modelo Usuario
  user: Usuario = new Usuario();

  // Campo para la confirmación de contraseña
  confirmarContrasena: string = '';

  // Mensaje de error
  errorMessage: string = '';

  // Variables para controlar la visibilidad de las contraseñas
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private navCtrl: NavController, private servicioBD: ServicioBDService) { }

  ngOnInit() { }

  onSubmit() {
    console.log('El botón fue presionado');
    this.errorMessage = '';

    // Validaciones
    if (this.user.nombre_u.length < 3 || this.user.nombre_u.length > 20) {
      this.errorMessage = 'El nombre debe tener entre 3 y 20 caracteres.';
      console.log(this.errorMessage);
      return;
    }

    if (this.user.apellido_u.length < 3 || this.user.apellido_u.length > 20) {
      this.errorMessage = 'El apellido debe tener entre 3 y 20 caracteres.';
      console.log(this.errorMessage);
      return;
    }

    if (this.user.nick_u.length < 5 || this.user.nick_u.length > 30) {
      this.errorMessage = 'El nick debe tener entre 5 y 30 caracteres.';
      console.log(this.errorMessage);
      return;
    }

    if (!this.isPasswordValid(this.user.contrasena_u)) {
      this.errorMessage = 'La contraseña debe tener entre 8 y 30 caracteres, incluir una mayúscula y un carácter especial.';
      console.log(this.errorMessage);
      return;
    }

    if (this.user.contrasena_u !== this.confirmarContrasena) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      console.log(this.errorMessage);
      return;
    }
    this.servicioBD.presentAlert("1","2")

    // Establecer valores adicionales del usuario antes de enviarlo
    this.user.estado_cuenta_u = 'A'; // estado de cuenta del usuario por defecto
    this.user.id_rol = 3;            // rol por defecto del usuario: usuario

    console.log('Datos del usuario:', this.user);
    console.log('Completando registro...');
    
    // Llamada al servicio para registrar el usuario
    this.servicioBD.insertarUsuario(
      this.user.nombre_u,
      this.user.apellido_u,
      this.user.nick_u,
      this.user.correo_u,
      this.user.contrasena_u,
      this.user.id_rol,
      this.user.estado_cuenta_u
    ).then(() => {
      console.log('Usuario registrado correctamente.');
      alert('Usuario registrado correctamente.');
      this.navCtrl.navigateRoot('/login');
      this.resetForm();
    }).catch((error) => {
      console.error('Error al registrar el usuario:', error);
      this.errorMessage = 'Hubo un problema al registrar el usuario. Intenta nuevamente.';
    });
  }

  // Función para validar la contraseña
  isPasswordValid(password: string): boolean {
    // Expresión regular que valida contraseñas con al menos una mayúscula, un carácter especial y una longitud entre 8 y 30 caracteres
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,30}$/;
    return passwordRegex.test(password);
  }

  // Función para alternar la visibilidad de la contraseña
  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  // Función para alternar la visibilidad de la confirmación de contraseña
  toggleConfirmPasswordVisibility() {
    this.confirmPasswordVisible = !this.confirmPasswordVisible;
  }

  // Método para resetear el formulario
  resetForm() {
    this.user = new Usuario(); // Reiniciar los valores del modelo Usuario
    this.confirmarContrasena = ''; // Reiniciar el campo de confirmar contraseña
    this.errorMessage = '';
  }
}
