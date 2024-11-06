import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  postMessage: string = '';
  selectedImage: File | null = null;
  selectedImageSrc: string | null = null;
  posts: { name: string; message: string; image: string | null }[] = [
    { name: 'Diego', message: 'Ya me he pasado el juego de sonic, puedo afirmar que los creadores realizaron este juego pensando en la comunidad. :D', image: 'https://sonic-city.net/wp-content/uploads/2023/09/event_230913_01_eye-400x200.jpg' },
    { name: 'Maria', message: 'Buen juego, si no es el goty estará muy cerca de serlo.', image: 'https://bloximages.newyork1.vip.townnews.com/dailytitan.com/content/tncms/assets/v3/editorial/1/72/1729f514-750b-11ed-9197-63ac3554bf6d/638ea5dbb40ba.image.jpg?resize=400%2C200' },
    { name: 'Juan', message: 'Me encanta el fortnite, lo juego todo el día....', image: 'https://i0.wp.com/magicvalleycomiccon.com/wp-content/uploads/2024/07/Fortnite.jpg?fit=400%2C200&ssl=1' },
  ];

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedImage = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImageSrc = reader.result as string;
      };
      reader.readAsDataURL(this.selectedImage);
    }
  }

  publishPost(): void {
    if (this.postMessage || this.selectedImageSrc) {
      const newPost = {
        name: 'Tú',
        message: this.postMessage,
        image: this.selectedImageSrc,
      };
      this.posts.unshift(newPost);
      this.postMessage = '';
      this.selectedImage = null;
      this.selectedImageSrc = null;
    }
  }

  likePost(): void {
    console.log('Post liked!');
  }
}
