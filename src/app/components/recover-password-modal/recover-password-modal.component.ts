import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service';

@Component({
  selector: 'app-recover-password-modal',
  templateUrl: './recover-password-modal.component.html',
  styleUrls: ['./recover-password-modal.component.scss'],
})
export class RecoverPasswordModalComponent {
  @Input() nick: string | undefined;
  newPassword: string = '';

  constructor(
    private modalController: ModalController,
    private servicioBD: ServicioBDService
  ) {}

  dismiss() {
    this.modalController.dismiss();
  }
}
