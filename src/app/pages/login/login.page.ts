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
  password: string = '';
  errorMessage: string = '';
  usuarios: Usuario[] = [];
  isLoading: boolean = true;

  constructor(
    private navCtrl: NavController,
    private servicioBD: ServicioBDService  ) {}

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

  isPasswordValid(password: string): boolean {
    const passwordPattern = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{1,12}$/;
    return passwordPattern.test(password);
  }

  isNickValid(nick: string): boolean {
    return nick.length >= 5 && nick.length <= 15;
  }

  async onSubmit() {
    if (!this.isNickValid(this.nick_u)) {
      this.errorMessage = 'El nombre de usuario o la contraseña son incorrectos.';
      return;
    }

    if (!this.isPasswordValid(this.password)) {
      this.errorMessage = 'El nombre de usuario o la contraseña son incorrectos.';
      return;
    }

    const user = await this.servicioBD.getUserByNick(this.nick_u);
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