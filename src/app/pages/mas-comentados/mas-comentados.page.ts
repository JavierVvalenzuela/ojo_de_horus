import { Component } from '@angular/core';

@Component({
  selector: 'app-mas-comentados',
  templateUrl: './mas-comentados.page.html',
  styleUrls: ['./mas-comentados.page.scss'],
})
export class MasComentadosPage {
  postMessage: string = '';
  selectedImage: File | null = null;
  selectedImageSrc: string | null = null;

  posts: { name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      name: 'Diego',
      message: 'El mismo juego de todos los años con un numero nuevo en el nombre: El juego.',
      image: 'assets/img/fifa.jpeg',
      liked: false,
    },
    {
      name: 'Maria',
      message: 'Este DLC de Elden Ring es brutal, ¿quién más está jugando? #FromSoftware',
      image: 'assets/img/elden-ring-dlc.jpg',
      liked: false,
    },
    {
      name: 'Javier',
      message: '¿Qué tal este bug en el último update de Valorant? Increíble #RageQuit',
      image: 'assets/img/valorant-bug.jpg',
      liked: false,
    },
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
        liked: false,
      };
      this.posts.unshift(newPost);
      this.postMessage = '';
      this.selectedImage = null;
      this.selectedImageSrc = null;
    }
  }

  likePost(post: { name: string; message: string; image: string | null; liked: boolean }): void {
    post.liked = !post.liked;
    console.log(`Post by ${post.name} liked status: ${post.liked}`);
  }

  // Acción para comentar sin contador
  commentPost(post: { name: string; message: string; image: string | null; liked: boolean }): void {
    console.log(`Comentar en la publicación de ${post.name}`);
    // Aquí podrías abrir una ventana de comentarios si lo deseas
  }
}

