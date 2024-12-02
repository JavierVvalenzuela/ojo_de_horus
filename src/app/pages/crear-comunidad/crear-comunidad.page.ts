import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-crear-comunidad',
  templateUrl: './crear-comunidad.page.html',
  styleUrls: ['./crear-comunidad.page.scss'],
})
export class CrearComunidadPage {
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  privacidad: boolean = true;
  reglas: string = '';
  ubicacion: string = '';
  communityImage: string | null = null;

  constructor(private router: Router, private toastController: ToastController) {}

  // Método para abrir la cámara y capturar una imagen
  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri, // Usar URI para cargar la imagen en el navegador
      });
      this.communityImage = image.webPath || null; // Asignar la imagen capturada a la variable
    } catch (error) {
      const toast = await this.toastController.create({
        message: 'No se pudo capturar la imagen.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
    }
  }

  // Método para cancelar la creación de la comunidad
  cancelar() {
    this.router.navigate(['/home']); // Navegar a la página de inicio
  }

  // Método para crear una comunidad
  async crearComunidad() {
    if (!this.nombre || !this.descripcion || !this.categoria) {
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos obligatorios.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return;
    }

    const comunidad = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      privacidad: this.privacidad,
      reglas: this.reglas,
      ubicacion: this.ubicacion,
      communityImage: this.communityImage,
    };

    this.router.navigate(['/mi-comunidad'], {
      state: comunidad,
    });
  }
}