export class Usuario {
  id_usuario!: number;              
  nombre_u!: string;               
  apellido_u!: string;              
  nick_u!: string;                  
  correo_u!: string;                
  contrasena_u!: string;           
  pregunta_respaldo_u?: string;    
  imagen_perfil_u?: Blob;          
  estado_cuenta_u!: string;        
  razon_ban_u: string | null = null;     
  id_rol!: number;                 
}