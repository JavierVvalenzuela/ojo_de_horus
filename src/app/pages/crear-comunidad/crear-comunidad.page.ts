import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-comunidad',
  templateUrl: './crear-comunidad.page.html',
  styleUrls: ['./crear-comunidad.page.scss'],
})
export class CrearComunidadPage {
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  privacidad: boolean = false;
  reglas: string = '';
  ubicacion: string = '';
  communityImage: string | null = null;  // Para almacenar la imagen seleccionada

  constructor(private router: Router) {}

  async selectImage() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        source: CameraSource.Photos,  // Usar Photos para seleccionar desde la galería
        correctOrientation: true,
        resultType: CameraResultType.Uri,  // Usamos Uri para obtener la URL de la imagen
      });

      if (image && image.webPath) {
        this.communityImage = image.webPath;  // Almacena la imagen como una URL
      } else {
        console.error('No se seleccionó ninguna imagen');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  cancelar() {
    this.router.navigate(['/comunidad']);
  }

  crearComunidad() {
    console.log('Comunidad creada con los siguientes datos:', {
      nombre: this.nombre,
      descripcion: this.descripcion,
      categoria: this.categoria,
      privacidad: this.privacidad,
      reglas: this.reglas,
      ubicacion: this.ubicacion,
      communityImage: this.communityImage,
    });

    // Redirige a la página `MiComunidad` y pasa los datos de la comunidad como estado
    this.router.navigate(['/mi-comunidad'], {
      state: {
        nombre: this.nombre,
        descripcion: this.descripcion,
        categoria: this.categoria,
        privacidad: this.privacidad,
        reglas: this.reglas,
        ubicacion: this.ubicacion,
        communityImage: this.communityImage,
      },
    });
  }
}
