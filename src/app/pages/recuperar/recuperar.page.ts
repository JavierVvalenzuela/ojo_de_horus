import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { Usuario } from '../../model/usuario';
import { filter, take } from 'rxjs';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  nick_u: string = "";
  pregunta: string = "";
  respuesta_preg: string = "";
  
  constructor(
    private navCtrl: NavController,
    private servicioBD: ServicioBDService
) {}

  ngOnInit() {
  }
  async onSubmit() {
    const pregunta_2 = await this.servicioBD.obtenerPreguntaSeguridad(this.nick_u)||"Esté usuario no tiene una pregunta de seguridad.";
    this.pregunta = pregunta_2;
  }

  async onSubmit2() {
  }
}
