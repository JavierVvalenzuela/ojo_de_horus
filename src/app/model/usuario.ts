export class Usuario {
  id_usuario!: number;
  nombre_u!: string;
  apellido_u!: string;
  nick_u!: string;
  correo_u!: string;
  contrasena_u!: string;
  tocken_u?: string;
  estado_cuenta_u!: string;
  razon_ban_u?: string | null; 
  id_rol!: number;
}