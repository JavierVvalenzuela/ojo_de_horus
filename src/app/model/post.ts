export class Post {
    id_post!: number;
    titulo_post!: string;
    contenido_post!: string;
    f_creacion_post!: Date;
    imagen_post?: Blob; // Este campo es opcional
    id_usuario!: number;
    id_estado!: number;
  }
  