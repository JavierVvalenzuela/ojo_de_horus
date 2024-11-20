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
  nick_u: string = '';
  contrasena_u: string = '';
  errorMessage: string = '';
  usuarios: Usuario[] = [];
  isLoading: boolean = true;

  constructor(
    private navCtrl: NavController,
    private servicioBD: ServicioBDService
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.servicioBD.dbState()
      .pipe(
        filter(ready => ready),
        take(1)
      )
      .subscribe(async () => {
        this.usuarios = await this.servicioBD.getAllUsuarios();
        this.isLoading = false;
      });
  }

  async onSubmit() {
    const user = await this.servicioBD.getUserByNick(this.nick_u);

    if (user) {
      if (user.contrasena_u === this.contrasena_u) {
        if (user.estado_cuenta_u === 'B') {
          this.errorMessage = 'Tu cuenta está baneada. Razón: ' + user.razon_ban_u;
        } else {
          // Guarda el usuario logueado en el almacenamiento local
          localStorage.setItem('loggedInUserId', user.id_usuario.toString());
          this.navCtrl.navigateRoot('/home'); // Redirige al menú principal
        }
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}
