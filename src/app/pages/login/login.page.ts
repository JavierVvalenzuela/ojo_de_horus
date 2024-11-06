import { Component, OnInit } from '@angular/core';
import { NavController, ModalController } from '@ionic/angular';
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
  isLoading: boolean = true;

  constructor(
    private navCtrl: NavController,
    private servicioBD: ServicioBDService,
    private modalController: ModalController
  ) {}

  async ngOnInit() {
    await this.loadUsers();
  }

  async loadUsers() {
    this.servicioBD.dbState().pipe(
      filter(ready => ready),
      take(1)
    ).subscribe(async () => {
      this.usuarios = await this.servicioBD.getAllUsuarios();
      this.isLoading = false;
    });
  }

  async onSubmit() {
    const user = await this.servicioBD.getUserByNick(this.nick);
    if (user) {
      if (user.contrasena_u === this.password) {
        if (user.estado_cuenta_u === 'B') {
          this.errorMessage = 'Tu cuenta está baneada. Razón: ' + user.razon_ban_u;
        } else {
          localStorage.setItem('loggedInUserId', user.id_usuario.toString());
          this.navCtrl.navigateRoot('/home');
        }
      } else {
        this.errorMessage = 'Usuario o contraseña incorrectos';
      }
    } else {
      this.errorMessage = 'Usuario o contraseña incorrectos';
    }
  }
}