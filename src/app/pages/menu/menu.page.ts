import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  postMessage: string = '';
  selectedImage: File | null = null;

  constructor() { }

  ngOnInit() {
  }

  onImageSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedImage = input.files[0];
      console.log('Imagen seleccionada:', this.selectedImage);
    }
  }

  publishPost() {
    if (this.postMessage.trim() === '' && !this.selectedImage) {
      console.log('Por favor, ingresa un mensaje o selecciona una imagen para publicar.');
      return;
    }

    // Aquí puedes implementar la lógica para subir la imagen y el texto a tu servidor
    console.log('Publicando:', this.postMessage);
    if (this.selectedImage) {
      console.log('Imagen a publicar:', this.selectedImage.name);
      // Agrega la lógica para subir la imagen
    }

    // Reiniciar el estado después de publicar
    this.postMessage = '';
    this.selectedImage = null;
  }

  likePost() {
    console.log('¡Le diste me gusta a esta publicación!');
  }
}


