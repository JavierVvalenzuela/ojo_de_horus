import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service';

@Component({
  selector: 'app-seguridad',
  templateUrl: './seguridad.page.html',
  styleUrls: ['./seguridad.page.scss'],
})
export class SeguridadPage implements OnInit {
  selectedQuestion: number = 0; // Inicializamos la variable
  securityAnswer: string = '';

  constructor(
    private navCtrl: NavController,
    private servicioBD: ServicioBDService
  ) { }

  ngOnInit() {
  }

  async onSubmit() {
    const loggedInUser = await this.servicioBD.getLoggedInUser();
    if (loggedInUser) {
      await this.servicioBD.actualizarPreguntaSeguridad(loggedInUser.nick_u, this.selectedQuestion, this.securityAnswer);
      this.navCtrl.navigateBack('/configuraciones');
    } else {
      console.error('No hay usuario logueado');
    }
  }
}
