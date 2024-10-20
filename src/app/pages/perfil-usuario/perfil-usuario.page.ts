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
  canModify: boolean = false;
  canDelete: boolean = false;
  canSuspendOrBan: boolean = false;

  constructor(
    private dbService: ServicioBDService,
    private alertController: AlertController,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUserData();
  }

  async loadUserData() {
    const loggedInUser = await this.dbService.getLoggedInUser(); 
    const profileNick = this.route.snapshot.paramMap.get('nick') || loggedInUser?.nick_u;

    if (profileNick) {
      const profileUser = await this.dbService.getUserByNick(profileNick);
      if (profileUser) {
        this.user = { ...profileUser };
        this.setPermissions(loggedInUser, profileUser);
      }
    }
  }

  setPermissions(loggedInUser: any, profileUser: any) {
    this.isAdmin = loggedInUser.id_rol === 1;
    this.isModerator = loggedInUser.id_rol === 2;
    this.isOwner = loggedInUser.id_usuario === profileUser.id_usuario;

    this.canModify = this.isOwner || this.isAdmin || this.isModerator;
    this.canDelete = this.isAdmin || (this.isModerator && !this.isOwner);
    this.canSuspendOrBan = (this.isAdmin || this.isModerator) && !this.isOwner;
  }

  async deleteUser() {
    if (!this.canDelete) return;

    const alert = await this.alertController.create({
      header: 'Eliminar usuario',
      message: '¿Estás seguro de que quieres eliminar este usuario?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Eliminar',
          handler: () => {
            this.dbService.deleteUser(this.user.id_usuario).then(() => {
              console.log('Usuario eliminado:', this.user.nick_u);
              // Redirigir a la lista de usuarios o a la página principal
            }).catch(error => {
              console.error('Error al eliminar usuario:', error);
              this.dbService.presentAlert('Error', 'Error al eliminar usuario: ' + error.message);
            });
          }
        }
      ]
    });

    await alert.present();
  }

  async suspendOrBanUser() {
    if (!this.canSuspendOrBan) return;

    const alert = await this.alertController.create({
      header: 'Suspender o Banear usuario',
      inputs: [
        {
          name: 'action',
          type: 'radio',
          label: 'Suspender',
          value: 'S',
          checked: true
        },
        {
          name: 'action',
          type: 'radio',
          label: 'Banear',
          value: 'B'
        },
        {
          name: 'reason',
          type: 'text',
          placeholder: 'Razón'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (data.reason.trim().length > 0) {
              this.user.estado_cuenta_u = data.action;
              this.user.razon_ban_u = data.reason;
              this.updateUser();
              return true; 
            } else {
              this.dbService.presentAlert('Error', 'La razón no puede estar vacía.');
              return false; 
            }
          }
        }
      ]
    });
    
    await alert.present();
  }

  updateUser() {
    if (!this.canModify) return;

    console.log('Actualizando usuario:', this.user);
    this.dbService.actualizarUsuario(this.user).then(() => {
      console.log('Datos del usuario actualizados en SQLite');
      this.dbService.presentAlert('Éxito', 'Datos del usuario actualizados correctamente.');
    }).catch(error => {
      console.error('Error al actualizar usuario en SQLite:', error);
      this.dbService.presentAlert('Error', 'Error al actualizar usuario: ' + error.message);
    });
  }
}