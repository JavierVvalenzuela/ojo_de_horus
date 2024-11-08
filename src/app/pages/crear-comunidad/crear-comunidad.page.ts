import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-comunidad',
  templateUrl: './crear-comunidad.page.html',
  styleUrls: ['./crear-comunidad.page.scss'] 
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

      // Verificamos si la propiedad webPath está presente y es válida
      if (image && image.webPath) {
        this.communityImage = image.webPath;  // Almacena la imagen como una URL
      } else {
        console.error('No se seleccionó ninguna imagen');
      }
    } catch (error) {
      console.error('Error al seleccionar la imagen:', error);
    }
  }

  // Función para redirigir a la página de comunidades sin hacer cambios
  cancelar() {
    this.router.navigate(['/comunidad']);
  }

  // Placeholder para el método de creación que implementarás después
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

    // Aquí iría la lógica para crear la comunidad, tal vez enviando los datos a un servidor
    // Redirigir a otra página después de crear la comunidad, si es necesario
  }
}
