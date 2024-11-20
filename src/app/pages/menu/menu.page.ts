import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  postMessage: string = '';
  selectedImage: File | null = null;
  selectedImageSrc: string | null = null;
  isLoggedIn: boolean = false; // Controla si el usuario está logueado

  posts: { id: number; name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      id: 1,
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

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status; // Actualiza el estado de inicio de sesión
    });
  }

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
        id: this.posts.length + 1,
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

  viewComments(post: any): void {
    this.router.navigate(['/comentarios', post.id], { state: { post: post } });
  }

  likePost(post: { id: number; name: string; message: string; image: string | null; liked: boolean }): void {
    post.liked = !post.liked;
    console.log(`Post by ${post.name} liked status: ${post.liked}`);
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
