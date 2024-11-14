import { Component, OnInit } from '@angular/core';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  user: {
    id_usuario: number;
    nombre_u: string;
    apellido_u: string;
    nick_u: string;
    correo_u: string;
    contrasena_u: string;
    estado_cuenta_u: string;
    razon_ban_u: string | null;
    id_rol: number;
    phone?: string;
    address?: string;
  } = {
    id_usuario: 0,
    nombre_u: '',
    apellido_u: '',
    nick_u: '',
    correo_u: '',
    contrasena_u: '',
    estado_cuenta_u: '',
    razon_ban_u: null,
    id_rol: 0,
    phone: '',
    address: '',
  };

  isAdmin: boolean = false;
  isModerator: boolean = false;
  isOwner: boolean = false;
  isEditing: boolean = false; // Control de edición

  constructor(
    private dbService: ServicioBDService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    try {
      // Suponemos que tenemos un servicio que nos obtiene el usuario actual
      const loggedInUser = await this.dbService.getLoggedInUser(); 
      if (loggedInUser) {
        this.user = { ...loggedInUser }; // Cargar los datos del usuario en el perfil
        this.setPermissions(loggedInUser); // Establecer permisos
      }
    } catch (error) {
      console.error('Error al cargar los datos del usuario', error);
    }
  }

  setPermissions(loggedInUser: any) {
    this.isAdmin = loggedInUser.id_rol === 1;
    this.isModerator = loggedInUser.id_rol === 2;
    this.isOwner = loggedInUser.id_usuario === this.user.id_usuario;
  }

  startEdit() {
    this.isEditing = true; // Habilitar edición
  }

  cancelEdit() {
    this.isEditing = false;
    this.loadUserData(); // Revertir cambios y cargar datos originales
  }

  saveChanges() {
    try {
      // Aquí actualizamos los datos del usuario
      this.dbService.actualizarUsuario(this.user).then(() => {
        console.log('Datos del usuario actualizados en SQLite');
        this.dbService.presentAlert('Éxito', 'Datos del usuario actualizados correctamente.');
        this.isEditing = false;
      }).catch(error => {
        console.error('Error al actualizar usuario en SQLite:', error);
        this.dbService.presentAlert('Error', 'Error al actualizar usuario: ' + error.message);
      });
    } catch (error) {
      console.error('Error guardando los cambios', error);
    }
  }
}
