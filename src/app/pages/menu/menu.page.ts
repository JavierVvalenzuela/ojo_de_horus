import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  postMessage: string = '';
  selectedImage: File | null = null;
  selectedImageSrc: string | null = null;

  // Posts con un campo id agregado para cada publicación
  posts: { id: number; name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      id: 1, // ID único para cada post
      name: 'Diego',
      message: 'Chicos ya salio la skin de la leyenda del gaming en fortnite, me veo en la obligación de vender a mi gato para comprarla #GraciasRubius. :D',
      image: 'assets/img/Rubius-fortnite.jpg',
      liked: false,
    },
    {
      id: 2,
      name: 'Maria',
      message: 'Sonic Frontiers está siendo un buen juego hasta ahora, espero que el DLC continue mejorando la experiencia.',
      image: 'assets/img/Sonic.jpg',
      liked: false,
    },
    {
      id: 3,
      name: 'Javier',
      message: 'Me quiero matar gente. #Desinstalar',
      image: 'assets/img/lolaso.jpg',
      liked: false,
    },
  ];

  constructor(private router: Router) {}

  // Función para manejar la selección de imagen
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

  // Función para publicar un nuevo post
  publishPost(): void {
    if (this.postMessage || this.selectedImageSrc) {
      const newPost = {
        id: this.posts.length + 1, // Generación de un ID único para el nuevo post
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

  // Función para ver los comentarios del post
  viewComments(post: any): void {
    // Ahora pasamos el objeto completo 'post' a la ruta de comentarios
    this.router.navigate(['/comentarios', post.id], { state: { post: post } });
  }

  // Función para dar like a una publicación
  likePost(post: { id: number; name: string; message: string; image: string | null; liked: boolean }): void {
    post.liked = !post.liked;
    console.log(`Post by ${post.name} liked status: ${post.liked}`);
  }
}

