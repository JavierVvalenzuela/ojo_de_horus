import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';  // Importar ActivatedRoute y Router

@Component({
  selector: 'app-comentarios',
  templateUrl: './comentarios.page.html',
  styleUrls: ['./comentarios.page.scss'],
})
export class ComentariosPage implements OnInit {
  postId!: number;  // Declarar con el operador de afirmación no nula
  post: any;         // Publicación recibida
  comments: string[] = [
    '¡Qué buen post! Me encanta.',
    'Yo también soy fan de Fortnite.',
    'Está increíble, me gustaría ver más.',
  ];
  newComment: string = '';

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    // Obtener el post completo desde el estado de la ruta
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras?.state?.['post']) {
      this.post = navigation.extras.state['post'];  // Obtener el post completo
    } else {
      // Si no se pasa el estado, obtener el ID de la ruta y cargar el post
      this.route.paramMap.subscribe(params => {
        this.postId = +params.get('id')!;  // Obtén el ID y conviértelo a número
        this.loadPost(this.postId);         // Cargar el post usando el ID
      });
    }
  }

  // Función para cargar el post según el ID
  loadPost(postId: number) {
    // Lógica para cargar el post según el ID. Esto es solo un ejemplo:
    const allPosts = [
      { id: 1, name: 'Diego', message: 'Chicos ya salio la skin de Fortnite...', image: 'assets/img/Rubius-fortnite.jpg' },
      { id: 2, name: 'Maria', message: 'Sonic Frontiers está siendo un buen juego...', image: 'assets/img/Sonic.jpg' },
      { id: 3, name: 'Javier', message: 'Me quiero matar gente. #Desinstalar', image: 'assets/img/lolaso.jpg' },
    ];
    
    this.post = allPosts.find(post => post.id === postId);  // Encuentra el post por ID
  }

  // Función para agregar un nuevo comentario
  addComment() {
    if (this.newComment) {
      this.comments.push(this.newComment);
      this.newComment = ''; // Limpiar el campo de nuevo comentario
    }
  }
}

