import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  postMessage: string = ''; // Contenido del post
  selectedImage: File | null = null; // Archivo de imagen seleccionado
  selectedImageSrc: string | null = null; // URL de la imagen seleccionada para vista previa
  isLoggedIn: boolean = false; // Controla si el usuario está logueado

  // Lista de publicaciones existentes
  posts: { id: number; name: string; message: string; image: string | null; liked: boolean }[] = [
    {
      id: 1,
      name: 'Diego',
      message: 'Chicos ya salió la skin de la leyenda del gaming en Fortnite, me veo en la obligación de vender a mi gato para comprarla #GraciasRubius. :D',
      image: 'assets/img/Rubius-fortnite.jpg',
      liked: false,
    },
    {
      id: 2,
      name: 'Maria',
      message: 'Sonic Frontiers está siendo un buen juego hasta ahora, espero que el DLC continúe mejorando la experiencia.',
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
    // Suscribirse al estado de inicio de sesión
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status; // Actualiza el estado de inicio de sesión
    });
  }

  // Maneja la selección de imágenes desde la galería del sistema
  async openGallery(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl, // Devuelve la imagen como Data URL
        source: CameraSource.Photos, // Fuente: Galería
      });
      this.selectedImageSrc = image.dataUrl || null; // Almacena la imagen seleccionada
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  }

  // Abre la cámara del dispositivo
  async openCamera(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl, // Devuelve la imagen como Data URL
        source: CameraSource.Camera, // Fuente: Cámara
      });
      this.selectedImageSrc = image.dataUrl || null; // Almacena la imagen capturada
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  // Publicar un nuevo post
  publishPost(): void {
    if (this.postMessage || this.selectedImageSrc) {
      const newPost = {
        id: this.posts.length + 1,
        name: 'Tú',
        message: this.postMessage,
        image: this.selectedImageSrc,
        liked: false,
      };
      this.posts.unshift(newPost); // Añadir al inicio de la lista
      this.postMessage = ''; // Limpiar el mensaje
      this.selectedImage = null; // Limpiar la imagen seleccionada
      this.selectedImageSrc = null; // Limpiar la vista previa
    }
  }

  // Navegar a la vista de comentarios de un post específico
  viewComments(post: any): void {
    this.router.navigate(['/comentarios', post.id], { state: { post: post } });
  }

  // Alternar el estado "Me Gusta" de una publicación
  likePost(post: { id: number; name: string; message: string; image: string | null; liked: boolean }): void {
    post.liked = !post.liked; // Alternar estado
    console.log(`Post by ${post.name} liked status: ${post.liked}`);
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout(); // Llamar al servicio de logout
    this.router.navigate(['/login']); // Redirigir al login
  }
}

