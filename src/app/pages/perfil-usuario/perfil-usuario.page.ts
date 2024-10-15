import { Component, OnInit } from '@angular/core';
import { ServicioBDService } from '../../services/servicio-bd.service'; 
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  user = {
    id_usuario: 1,
    nombre_u: 'Diego',
    apellido_u: 'Mellado',
    nick_u: 'Invitado15484631',
    correo_u: 'di.mellado@duocuc.cl',
    contrasena_u: 'securePass123',
    estado_cuenta_u: 'A', 
    razon_ban_u: null as string | null, 
    id_rol: 1 
  };

  isAdmin: boolean = false;
  isOwner: boolean = true; 

  constructor(private dbService: ServicioBDService, private alertController: AlertController) { }

  ngOnInit() {
    this.isAdmin = this.user.id_rol === 1 || this.user.id_rol === 2; 
  }

  async deleteUser() {
    const alert = await this.alertController.create({
      header: 'Baneo de usuario',
      inputs: [
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Razón del baneo',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Baneo cancelado');
          },
        },
        {
          text: 'Banear',
          handler: (data) => {
            if (data.reason.trim().length > 0) {
              this.user.estado_cuenta_u = 'B'; 
              this.user.razon_ban_u = data.reason; 

              this.dbService.actualizarUsuario(this.user).then(() => {
                console.log('Usuario baneado con razón:', this.user.nick_u);
              }).catch(error => {
                console.error('Error al actualizar usuario en SQLite:', error);
                this.dbService.presentAlert('Error', 'Error al actualizar usuario: ' + error.message);
              });
            } else {
              this.dbService.presentAlert('Error', 'La razón del baneo no puede estar vacía.');
            }
          },
        },
      ],
    });

    await alert.present();
  }

  updateUser() {
    console.log('Actualizando usuario:', this.user);

    this.dbService.actualizarUsuario(this.user).then(() => {
      console.log('Datos del usuario actualizados en SQLite');
    }).catch(error => {
      console.error('Error al actualizar usuario en SQLite:', error);
      this.dbService.presentAlert('Error', 'Error al actualizar usuario: ' + error.message);
    });
  }

  addUser() {
    this.dbService.insertarUsuario(
      this.user.nombre_u,
      this.user.apellido_u,
      this.user.nick_u,
      this.user.correo_u,
      this.user.contrasena_u,
      this.user.id_rol
    ).then(() => {
      console.log('Usuario insertado en la base de datos SQLite:', this.user.nick_u);
    }).catch(error => {
      console.error('Error al insertar usuario en SQLite:', error);
      this.dbService.presentAlert('Error', 'Error al insertar usuario: ' + error.message);
    });
  }
}
