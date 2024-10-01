import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioBDService {
  public datebase!: SQLiteObject;

  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL (id_rol INTEGER PRIMARY KEY,nombre_rol VARCHAR(50) NOT NULL);";

  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS CATEGORIA (id_categoria INTEGER PRIMARY KEY,nombre_cat VARCHAR(50) NOT NULL);";

  tablaEstado: string = "CREATE TABLE IF NOT EXISTS ESTADO (id_estado INTEGER PRIMARY KEY,nombre_e VARCHAR(50) NOT NULL);";

  tablaUsuario: string = "CREATE TABLE IF NOT EXISTS USUARIO (id_usuario INTEGER PRIMARY KEY,nombre_u VARCHAR(50) NOT NULL,apellido_u VARCHAR(50) NOT NULL,nick_u VARCHAR(50) NOT NULL,correo_u VARCHAR(100) NOT NULL,contrasena_u VARCHAR(50) NOT NULL,tocken_u VARCHAR(255),estado_cuenta_u CHAR(1) NOT NULL,razon_ban_u TEXT,id_rol INTEGER NOT NULL,FOREIGN KEY(id_rol) REFERENCES ROL(id_rol))";

  tablaPost: string = "CREATE TABLE IF NOT EXISTS POST (id_post INTEGER PRIMARY KEY,titulo_post VARCHAR(50) NOT NULL,contenido_post TEXT NOT NULL,f_creacion_post DATE NOT NULL,imagen_post BLOB,id_usuario INTEGER NOT NULL,id_estado INTEGER NOT NULL,FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario),FOREIGN KEY(id_estado) REFERENCES ESTADO(id_estado));";

  tablaComentario: string = "CREATE TABLE IF NOT EXISTS COMENTARIO (id_coment INTEGER PRIMARY KEY,contenido_coment TEXT NOT NULL,f_creacion_coment DATE NOT NULL,imagen_coment BLOB,id_estado INTEGER NOT NULL,id_post INTEGER NOT NULL,FOREIGN KEY(id_estado) REFERENCES ESTADO(id_estado),FOREIGN KEY(id_post) REFERENCES POST(id_post));";

  tablaPostCategoria: string = "CREATE TABLE IF NOT EXISTS POST_CATEGORIA (id_post_c INTEGER PRIMARY KEY,id_categoria INTEGER NOT NULL,id_post INTEGER NOT NULL,FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria),FOREIGN KEY(id_post) REFERENCES POST(id_post));";

  tablaFavoritos: string = "CREATE TABLE IF NOT EXISTS FAVORITOS (id_fav INTEGER PRIMARY KEY,f_creacion_fav DATE NOT NULL,id_usuario INTEGER NOT NULL,id_post INTEGER NOT NULL,FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario),FOREIGN KEY(id_post) REFERENCES POST(id_post));";


  listadoUsuarios = new BehaviorSubject ([]);

  listadoPost = new BehaviorSubject ([]);

  listadoComentario = new BehaviorSubject ([]);

  listadoFavoritos = new BehaviorSubject ([]);

  private isBDReady: BehaviorSubject<boolean> = new BehaviorSubject(false);


  constructor(private SQLite: SQLite, private platform : Platform, private alertController: AlertController){ 
    this.createBD();
  }

  async presentAlert(titulo: string, msj: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: msj,
      buttons: ['OK'],
    });

    await alert.present();
  }
  
}
