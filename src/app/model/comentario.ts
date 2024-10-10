export class Comentario {
    id_coment!: number;
    contenido_coment!: string;
    f_creacion_coment!: Date;
    imagen_coment?: Blob; // Este campo es opcional
    id_estado!: number;
    id_post!: number;
  }
  