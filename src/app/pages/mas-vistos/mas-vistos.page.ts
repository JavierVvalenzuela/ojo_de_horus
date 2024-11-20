import { Component } from '@angular/core';

@Component({
  selector: 'app-mas-vistos',
  templateUrl: './mas-vistos.page.html',
  styleUrls: ['./mas-vistos.page.scss'],
})
export class MasVistosPage {
  posts: { name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      name: 'Carlos',
      message: '¿Alguien más ha jugado el nuevo God Of War? ¡Es increíble!',
      image: 'assets/img/gow.jpg',
      liked: false,
    },
    {
      name: 'Jose',
      message: 'Rocket league es lo que los hombres necesitan.',
      image: 'assets/img/rocket.jpg',
      liked: false,
    },
    {
      name: 'Luis',
      message: '¿Sera forza horizon 5 el mejor juego de autos acutalmente?. ¿Qué opinan?',
      image: 'assets/img/forza.jpg',
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
