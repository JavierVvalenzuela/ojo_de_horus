import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

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

  async crearComunidad() {
    // Validación de campos obligatorios
    if (!this.nombre || !this.descripcion || !this.categoria) {
      // Muestra el mensaje de error si falta algún campo obligatorio
      const toast = await this.toastController.create({
        message: 'Por favor, completa todos los campos obligatorios.',
        duration: 2000,
        color: 'danger',
      });
      await toast.present();
      return; // No continúa con la creación de la comunidad
    }

    // Lógica para crear la comunidad y navegar a la página de la comunidad
    const comunidad = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      privacidad: this.privacidad,
      reglas: this.reglas,
      ubicacion: this.ubicacion,
      communityImage: this.communityImage,
    };

    // Navega a la página de "mi-comunidad" con los datos de la comunidad
    this.router.navigate(['/mi-comunidad'], {
      state: comunidad,
    });
  }
}