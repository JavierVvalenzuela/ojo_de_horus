import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

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
  nick_u: string = ''; // Nickname del usuario logueado

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

  constructor(
    private router: Router,
    private authService: AuthService,
    private servicioBD: ServicioBDService,
    private alertController: AlertController
  ) {}

  ngOnInit(): void {
    this.subscribeToLoginStatus();
    this.checkLoggedInUser();
  }

  // Suscribirse al estado de inicio de sesión
  private subscribeToLoginStatus(): void {
    this.authService.getLoginStatus().subscribe((status) => {
      this.isLoggedIn = status;
      if (this.isLoggedIn) {
        this.nick_u = localStorage.getItem('loggedInUserNick') || '';
      } else {
        this.nick_u = '';
      }
    });
  }

  // Verificar el estado de inicio de sesión al cargar la página
  private checkLoggedInUser(): void {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    const loggedInUserNick = localStorage.getItem('loggedInUserNick');
    this.isLoggedIn = !!loggedInUserId; // El usuario está logueado si el ID está presente
    this.nick_u = loggedInUserNick || '';
  }

  async openGallery(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Photos,
      });
      this.selectedImageSrc = image.dataUrl || null;
    } catch (error) {
      console.error('Error al abrir la galería:', error);
    }
  }

  async openCamera(): Promise<void> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
      });
      this.selectedImageSrc = image.dataUrl || null;
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  }

  async publishPost(): Promise<void> {
    if (!this.isLoggedIn) {
      await this.showLoginAlert();
      return;
    }

    if (this.postMessage || this.selectedImageSrc) {
      const loggedUserId = localStorage.getItem('loggedInUserId');
      const loggedUserNick = localStorage.getItem('loggedInUserNick');

      if (!loggedUserId || !loggedUserNick) {
        console.error('Usuario no autenticado.');
        return;
      }

      const newPost = {
        id: this.posts.length + 1,
        name: loggedUserNick,
        message: this.postMessage,
        image: this.selectedImageSrc,
        liked: false,
      };

      this.posts.unshift(newPost);

      this.postMessage = '';
      this.selectedImage = null;
      this.selectedImageSrc = null;

      try {
        await this.servicioBD.createPost(newPost);
      } catch (error) {
        console.error('Error al guardar el post:', error);
      }
    } else {
      console.warn('No hay contenido para publicar');
    }
  }

  async showLoginAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: '¡No has iniciado sesión!',
      message:
        'Parece que actualmente no te encuentras logueado, prueba iniciar sesión o registrarte para compartir tu contenido con el mundo.',
      buttons: [
        {
          text: 'Iniciar Sesión',
          handler: () => {
            this.router.navigate(['/login']);
          },
        },
        {
          text: 'Registrarse',
          handler: () => {
            this.router.navigate(['/registro']);
          },
        },
      ],
    });

    await alert.present();
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
    localStorage.removeItem('loggedInUserId');
    localStorage.removeItem('loggedInUserNick');
    this.router.navigate(['/login']);
  }
}
