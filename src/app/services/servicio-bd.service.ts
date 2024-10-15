import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../model/usuario';

@Injectable({
  providedIn: 'root'
})
export class ServicioBDService {
  public database!: SQLiteObject;

  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(50) NOT NULL);";
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS CATEGORIA (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre_cat VARCHAR(50) NOT NULL);";
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS ESTADO (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nombre_e VARCHAR(50) NOT NULL);";
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS USUARIO (id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, nombre_u VARCHAR(50) NOT NULL, apellido_u VARCHAR(50) NOT NULL, nick_u VARCHAR(50) NOT NULL, correo_u VARCHAR(100) NOT NULL, contrasena_u VARCHAR(50) NOT NULL, tocken_u VARCHAR(255), estado_cuenta_u CHAR(1) NOT NULL, razon_ban_u TEXT, id_rol INTEGER NOT NULL, FOREIGN KEY(id_rol) REFERENCES ROL(id_rol));`;
  tablaPost: string = `CREATE TABLE IF NOT EXISTS POST (id_post INTEGER PRIMARY KEY AUTOINCREMENT, titulo_post VARCHAR(50) NOT NULL, contenido_post TEXT NOT NULL, f_creacion_post DATE NOT NULL, imagen_post BLOB, id_usuario INTEGER NOT NULL, id_estado INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario), FOREIGN KEY(id_estado) REFERENCES ESTADO(id_estado));`;
  tablaComentario: string = `CREATE TABLE IF NOT EXISTS COMENTARIO (id_coment INTEGER PRIMARY KEY AUTOINCREMENT, contenido_coment TEXT NOT NULL, f_creacion_coment DATE NOT NULL, imagen_coment BLOB, id_estado INTEGER NOT NULL, id_post INTEGER NOT NULL, FOREIGN KEY(id_estado) REFERENCES ESTADO(id_estado), FOREIGN KEY(id_post) REFERENCES POST(id_post));`;
  tablaPostCategoria: string = `CREATE TABLE IF NOT EXISTS POST_CATEGORIA (id_post_c INTEGER PRIMARY KEY AUTOINCREMENT, id_categoria INTEGER NOT NULL, id_post INTEGER NOT NULL, FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria), FOREIGN KEY(id_post) REFERENCES POST(id_post));`;
  tablaFavoritos: string = `CREATE TABLE IF NOT EXISTS FAVORITOS (id_fav INTEGER PRIMARY KEY AUTOINCREMENT, f_creacion_fav DATE NOT NULL, id_usuario INTEGER NOT NULL, id_post INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario), FOREIGN KEY(id_post) REFERENCES POST(id_post));`;

  listadoUsuarios = new BehaviorSubject<Usuario[]>([]);
  listadoPost = new BehaviorSubject([]);
  listadoComentario = new BehaviorSubject([]);
  listadoFavoritos = new BehaviorSubject([]);

  private isBDReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private SQLite: SQLite, private platform: Platform, private alertController: AlertController) {
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

  fetchUsuario(): Observable<Usuario[]> {
    return this.listadoUsuarios.asObservable();
  }

  dbState() {
    return this.isBDReady.asObservable(); 
  }

  createBD() {
    this.platform.ready().then(() => {
      this.SQLite.create({
        name: 'usuario.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas(); 
        this.isBDReady.next(true);
      }).catch((e: any) => {
        this.presentAlert('Error de Base de Datos', `No se pudo crear la base de datos: ${e.message}`);
      });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaCategoria, []);
      await this.database.executeSql(this.tablaEstado, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaPost, []);
      await this.database.executeSql(this.tablaComentario, []);
      await this.database.executeSql(this.tablaPostCategoria, []);
      await this.database.executeSql(this.tablaFavoritos, []);
      this.isBDReady.next(true);
    } catch (e: any) {
      this.presentAlert('Error de Tablas', `No se pudieron crear las tablas: ${e.message}`);
    }
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    const query = 'SELECT * FROM USUARIO';
    const usuarios: Usuario[] = [];

    try {
      const result = await this.database.executeSql(query, []);
      for (let i = 0; i < result.rows.length; i++) {
        usuarios.push(result.rows.item(i));
      }
      return usuarios;
    } catch (e: any) {
      this.presentAlert('Error', `No se pudieron obtener los usuarios: ${e.message}`);
      return [];
    }
  }

  async getUserByNick(nick: string): Promise<Usuario | null> {
    const query = 'SELECT * FROM USUARIO WHERE nick_u = ?';
    try {
      const result = await this.database.executeSql(query, [nick]);
      if (result.rows.length > 0) {
        return result.rows.item(0);
      }
      return null;
    } catch (e: any) {
      this.presentAlert('Error', `No se pudo obtener el usuario: ${e.message}`);
      return null;
    }
  }

  async usuarioExists(nick: string): Promise<boolean> {
    const user = await this.getUserByNick(nick);
    return user !== null;
  }

  async insertarUsuario(nombre: string, apellido: string, nick: string, correo: string, contrasena: string, idRol: number) {
    if (await this.usuarioExists(nick)) {
      this.presentAlert('Error', 'El nombre de usuario ya existe. Por favor, elige otro.');
      return;
    }

    const query = `INSERT INTO USUARIO (nombre_u, apellido_u, nick_u, correo_u, contrasena_u, estado_cuenta_u, id_rol) 
                 VALUES (?, ?, ?, ?, ?, 'A', ?)`; 

    try {
      await this.database.executeSql(query, [nombre, apellido, nick, correo, contrasena, idRol]);
      this.presentAlert('Éxito', 'Usuario insertado correctamente.');
      this.cargarUsuarios();
    } catch (e: any) { 
      this.presentAlert('Error', `Error al insertar usuario: ${e.message}`);
    }
  }

  async actualizarUsuario(usuario: Usuario) {
    const query = `UPDATE USUARIO SET nombre_u = ?, apellido_u = ?, correo_u = ?, contrasena_u = ?, estado_cuenta_u = ?, razon_ban_u = ? WHERE id_usuario = ?`;
    
    try {
      await this.database.executeSql(query, [usuario.nombre_u, usuario.apellido_u, usuario.correo_u, usuario.contrasena_u, usuario.estado_cuenta_u, usuario.razon_ban_u, usuario.id_usuario]);
      this.presentAlert('Éxito', 'Datos del usuario actualizados correctamente.');
      this.cargarUsuarios();
    } catch (e: any) { 
      this.presentAlert('Error', `Error al actualizar usuario: ${e.message}`);
    }
  }

  async asignarRolUsuario(nick: string, idRol: number) {
    const query = `UPDATE USUARIO SET id_rol = ? WHERE nick_u = ?`;

    try {
      await this.database.executeSql(query, [idRol, nick]);
      this.presentAlert('Éxito', 'Rol asignado correctamente.');
    } catch (e: any) { 
      this.presentAlert('Error', `Error al asignar rol: ${e.message}`);
    }
  }

  private async cargarUsuarios() {
    const usuarios = await this.getAllUsuarios();
    this.listadoUsuarios.next(usuarios);
  }
}
