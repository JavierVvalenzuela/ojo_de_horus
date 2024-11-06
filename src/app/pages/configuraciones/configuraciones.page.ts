import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ServicioBDService } from '../../services/servicio-bd.service';

@Component({
  selector: 'app-configuraciones',
  templateUrl: './configuraciones.page.html',
  styleUrls: ['./configuraciones.page.scss'],
})
export class ConfiguracionesPage implements OnInit {
  notificationsEnabled: boolean = false; // Estado del toggle de notificaciones
  selectedLanguage: string = 'es'; // Idioma por defecto

  constructor(
    private navCtrl: NavController,
    private servicioBD: ServicioBDService
  ) { }

  ngOnInit() {
    // Cargar configuraciones iniciales
    this.loadSettings();
  }

  loadSettings() {
    // Aquí podrías cargar la configuración guardada del usuario
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      this.selectedLanguage = savedLanguage;
    }

    const notificationsStatus = localStorage.getItem('notificationsEnabled');
    this.notificationsEnabled = notificationsStatus === 'true';
  }

  toggleNotifications(event: any) {
    this.notificationsEnabled = event.detail.checked;
    localStorage.setItem('notificationsEnabled', this.notificationsEnabled.toString());
  }

  changeLanguage(event: any) {
    this.selectedLanguage = event.detail.value;
    localStorage.setItem('selectedLanguage', this.selectedLanguage);
    // Aquí podrías implementar la lógica para aplicar el idioma en toda la aplicación
  }
}

