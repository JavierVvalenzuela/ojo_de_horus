import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',  // Asegúrate de que el selector sea el correcto
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage {
  postMessage: string = '';
  selectedImage: File | null = null;
  selectedImageSrc: string | null = null;

  posts: { name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      name: 'Diego',
      message: 'Chicos ya salio la skin de la leyenda del gaming en fortnite, me veo en la obligación de vender a mi gato para comprarla #GraciasRubius. :D',
      image: 'assets/img/Rubius-fortnite.jpg',
      liked: false,
    },
    {
      name: 'Maria',
      message: 'Sonic Frontiers está siendo un buen juego hasta ahora, espero que el DLC continue mejorando la experiencia.',
      image: 'assets/img/Sonic.jpg',
      liked: false,
    },
    {
      name: 'Javier',
      message: 'Me quiero matar gente. #Desinstalar',
      image: 'assets/img/lolaso.jpg',
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
}
