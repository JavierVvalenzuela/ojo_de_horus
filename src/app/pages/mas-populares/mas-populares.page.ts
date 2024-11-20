import { Component } from '@angular/core';

@Component({
  selector: 'app-mas-populares',
  templateUrl: './mas-populares.page.html',
  styleUrls: ['./mas-populares.page.scss'],
})
export class MasPopularesPage {
  posts: { name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      name: 'Pedro',
      message: 'Este es el contenido más popular del mes, ¿quién lo ha visto?',
      image: 'assets/img/nba.jpeg',
      liked: false,
    },
    {
      name: 'Juan',
      message: '¡Armamos team de overwatch, alguien se anima!',
      image: 'assets/img/over.jpg',
      liked: false,
    },
    {
      name: 'Elena',
      message: '¡Este videojuego Apex tiene millones de jugadores activos! ¡Una locura!',
      image: 'assets/img/apex.jpg',
      liked: false,
    },
  ];

  likePost(post: { name: string; message: string; image: string | null; liked: boolean }): void {
    post.liked = !post.liked;
    console.log(`Post by ${post.name} liked status: ${post.liked}`);
  }

  commentPost(post: { name: string; message: string; image: string | null; liked: boolean }): void {
    console.log(`Comentar en la publicación de ${post.name}`);
    // Aquí podrías abrir una ventana de comentarios si lo deseas
  }
}
