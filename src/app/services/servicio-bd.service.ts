import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { Usuario } from '../model/usuario';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ServicioBDService {
  resetPassword(nick_: string, newPassword: string) {
    throw new Error('Method not implemented.');
  }
  public database!: SQLiteObject;

  tablaRol: string = "CREATE TABLE IF NOT EXISTS ROL (id_rol INTEGER PRIMARY KEY AUTOINCREMENT, nombre_rol VARCHAR(50) NOT NULL);";
  tablaCategoria: string = "CREATE TABLE IF NOT EXISTS CATEGORIA (id_categoria INTEGER PRIMARY KEY AUTOINCREMENT, nombre_cat VARCHAR(50) NOT NULL);";
  tablaEstado: string = "CREATE TABLE IF NOT EXISTS ESTADO (id_estado INTEGER PRIMARY KEY AUTOINCREMENT, nombre_e VARCHAR(50) NOT NULL);";
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS USUARIO (
    id_usuario INTEGER PRIMARY KEY AUTOINCREMENT, 
    nombre_u VARCHAR(50) NOT NULL, 
    apellido_u VARCHAR(50) NOT NULL, 
    nick_u VARCHAR(50) NOT NULL UNIQUE, 
    correo_u VARCHAR(100) NOT NULL, 
    contrasena_u VARCHAR(50) NOT NULL, 
    pregunta_seguridad VARCHAR(255),
    respuesta_seguridad VARCHAR(255),
    imagen_perfil_u BLOB, 
    estado_cuenta_u CHAR(1) NOT NULL, 
    razon_ban_u TEXT, 
    id_rol INTEGER NOT NULL, 
    FOREIGN KEY(id_rol) REFERENCES ROL(id_rol)
  );`;
  tablaPost: string = `CREATE TABLE IF NOT EXISTS POST (id_post INTEGER PRIMARY KEY AUTOINCREMENT, titulo_post VARCHAR(50) NOT NULL, contenido_post TEXT NOT NULL, f_creacion_post DATE NOT NULL, imagen_post BLOB, id_usuario INTEGER NOT NULL, id_estado INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario), FOREIGN KEY(id_estado) REFERENCES ESTADO(id_estado));`;
  tablaComentario: string = `CREATE TABLE IF NOT EXISTS COMENTARIO (id_coment INTEGER PRIMARY KEY AUTOINCREMENT, contenido_coment TEXT NOT NULL, f_creacion_coment DATE NOT NULL, imagen_coment BLOB, id_estado INTEGER NOT NULL, id_post INTEGER NOT NULL, FOREIGN KEY(id_estado) REFERENCES ESTADO(id_estado), FOREIGN KEY(id_post) REFERENCES POST(id_post));`;
  tablaPostCategoria: string = `CREATE TABLE IF NOT EXISTS POST_CATEGORIA (id_post_c INTEGER PRIMARY KEY AUTOINCREMENT, id_categoria INTEGER NOT NULL, id_post INTEGER NOT NULL, FOREIGN KEY(id_categoria) REFERENCES CATEGORIA(id_categoria), FOREIGN KEY(id_post) REFERENCES POST(id_post));`;
  tablaFavoritos: string = `CREATE TABLE IF NOT EXISTS FAVORITOS (id_fav INTEGER PRIMARY KEY AUTOINCREMENT, f_creacion_fav DATE NOT NULL, id_usuario INTEGER NOT NULL, id_post INTEGER NOT NULL, FOREIGN KEY(id_usuario) REFERENCES USUARIO(id_usuario), FOREIGN KEY(id_post) REFERENCES POST(id_post));`;
  
  //insert automaticos
  insertRol1: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (1,'Administrador')";
  insertRol2: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (2,'Moderador')";
  insertRol3: string = "INSERT or IGNORE INTO rol(id_rol,nombre_rol) VALUES (3,'Usuario')";
  insertuser: string = "INSERT or IGNORE INTO usuario(id_usuario, nombre_u, apellido_u, nick_u, correo_u, contrasena_u, estado_cuenta_u, id_rol) VALUES(1,'Diego', 'Mellado', 'Diego_170', 'diego@example.com', 'DiegoMj.170','A',1)";

  private listadoUsuarios = new BehaviorSubject<Usuario[]>([]);
  private isBDReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private SQLite: SQLite,
    private platform: Platform,
    private alertController: AlertController,
    private router: Router
  ) {
    this.createBD();
  }

  presentAlert(titulo: string, mensaje: string) {
    const alert = this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  fetchUsuarios(): Observable<Usuario[]> {
    return this.listadoUsuarios.asObservable();
  }

  dbState(): Observable<boolean> {
    return this.isBDReady.asObservable();
  }

  createBD() {
    this.platform.ready().then(() => {
      this.SQLite.create({
        name: 'usuario2.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
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

      await this.database.executeSql(this.insertRol1, []);
      await this.database.executeSql(this.insertRol2, []);
      await this.database.executeSql(this.insertRol3, []);
      await this.database.executeSql(this.insertuser, []);
      this.isBDReady.next(true);
      //await this.createInitialUser();
    } catch (e: any) {
      this.presentAlert('Error de Tablas', `No se pudieron crear las tablas: ${e.message}`);
    }
  }

  async getAllUsuarios(): Promise<Usuario[]> {
    const query = 'SELECT * FROM USUARIO';
    try {
      const result = await this.database.executeSql(query, []);
      const usuarios: Usuario[] = [];
      for (let i = 0; i < result.rows.length; i++) {
        usuarios.push(result.rows.item(i));
      }
      this.listadoUsuarios.next(usuarios);
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
      return result.rows.length > 0 ? result.rows.item(0) : null;
    } catch (e: any) {
      this.presentAlert('Error', `No se pudo obtener el usuario: ${e.message}`);
      return null;
    }
  }

  async usuarioExists(nick: string): Promise<boolean> {
    const user = await this.getUserByNick(nick);
    return user !== null;
  }

  insertarUsuario(nombre: string, apellido: string, nick_u: string, correo: string, contrasena: string, idRol: number, estado: string): Promise<void> {
    return new Promise((resolve, reject) => {
      // Verificar que no exista un nick similar
      this.database.executeSql('SELECT * FROM usuario WHERE nick_u = ?', [nick_u]).then(res => {
        if (res.rows.length > 0) {
          this.presentAlert("Registro", "El usuario ya está registrado");
          reject('Usuario ya registrado');
        } else {
          // Insertar si no existe
          this.database.executeSql('INSERT INTO usuario(nombre_u, apellido_u, nick_u, correo_u, contrasena_u, estado_cuenta_u, id_rol) VALUES (?,?,?,?,?,?,?)', 
          [nombre, apellido, nick_u, correo, contrasena, estado, idRol]).then(() => {
            this.presentAlert("Registro", "Usuario Registrado Correctamente");
            resolve();
          }).catch((error: any) => {
            this.presentAlert('Error insert usuario', JSON.stringify(error));
            reject(error);
          });
        }
      }).catch((error: any) => {
        this.presentAlert('Error al verificar usuario', JSON.stringify(error));
        reject(error);
      });
    });
  }

  async actualizarUsuario(usuario: Usuario) {
    const query = `UPDATE USUARIO SET nombre_u = ?, apellido_u = ?, correo_u = ?, contrasena_u = ?, estado_cuenta_u = ?, razon_ban_u = ? WHERE id_usuario = ?`;
    
    try {
      await this.database.executeSql(query, [usuario.nombre_u, usuario.apellido_u, usuario.correo_u, usuario.contrasena_u, usuario.estado_cuenta_u, usuario.razon_ban_u, usuario.id_usuario]);
      this.presentAlert('Éxito', 'Datos del usuario actualizados correctamente.');
      await this.cargarUsuarios();
    } catch (e: any) { 
      this.presentAlert('Error', `Error al actualizar usuario: ${e.message}`);
    }
  }

  async asignarRolUsuario(nick: string, idRol: number) {
    const query = `UPDATE USUARIO SET id_rol = ? WHERE nick_u = ?`;

    try {
      await this.database.executeSql(query, [idRol, nick]);
      this.presentAlert('Éxito', 'Rol asignado correctamente.');
      await this.cargarUsuarios();
    } catch (e: any) { 
      this.presentAlert('Error', `Error al asignar rol: ${e.message}`);
    }
  }

  private async cargarUsuarios() {
    const usuarios = await this.getAllUsuarios();
    this.listadoUsuarios.next(usuarios);
  }

  async getLoggedInUser(): Promise<Usuario | null> {
    const loggedInUserId = localStorage.getItem('loggedInUserId');
    if (loggedInUserId) {
      const query = 'SELECT * FROM USUARIO WHERE id_usuario = ?';
      try {
        const result = await this.database.executeSql(query, [loggedInUserId]);
        return result.rows.length > 0 ? result.rows.item(0) : null;
      } catch (e: any) {
        this.presentAlert('Error', `No se pudo obtener el usuario logueado: ${e.message}`);
        return null;
      }
    }
    return null;
  }

  async deleteUser(userId: number) {
    const query = `DELETE FROM USUARIO WHERE id_usuario = ?`;

    try {
      await this.database.executeSql(query, [userId]);
      this.presentAlert('Éxito', 'Usuario eliminado correctamente.');
      await this.cargarUsuarios();
    } catch (e: any) {
      this.presentAlert('Error', `Error al eliminar usuario: ${e.message}`);
    }
  }

  async banUser(nick: string, razon: string) {
    const query = `UPDATE USUARIO SET estado_cuenta_u = 'B', razon_ban_u = ? WHERE nick_u = ?`;

    try {
      await this.database.executeSql(query, [razon, nick]);
      this.presentAlert('Éxito', 'Usuario baneado correctamente.');
      await this.cargarUsuarios();
    } catch (e: any) {
      this.presentAlert('Error', `Error al banear usuario: ${e.message}`);
    }
  }

  async actualizarPreguntaSeguridad(nick: string, pregunta: string, respuesta: string) {
    const query = `UPDATE USUARIO SET pregunta_seguridad = ?, respuesta_seguridad = ? WHERE nick_u = ?`;
    
    try {
      await this.database.executeSql(query, [pregunta, respuesta, nick]);
      this.presentAlert('Éxito', 'Pregunta de seguridad actualizada correctamente.');
      await this.cargarUsuarios();
    } catch (e: any) { 
      this.presentAlert('Error', `Error al actualizar la pregunta de seguridad: ${e.message}`);
    }
  }

  async obtenerPreguntaSeguridad(nick: string): Promise<string | null> {
    const query = 'SELECT pregunta_seguridad FROM USUARIO WHERE nick_u = ?';
    try {
      const result = await this.database.executeSql(query, [nick]);
      return result.rows.length > 0 ? result.rows.item(0).pregunta_seguridad : null;
    } catch (e: any) {
      this.presentAlert('Error', `No se pudo obtener la pregunta de seguridad: ${e.message}`);
      return null;
    }
  }

  async verificarRespuestaSeguridad(nick: string, respuesta: string): Promise<boolean> {
    const query = 'SELECT respuesta_seguridad FROM USUARIO WHERE nick_u = ?';
    try {
      const result = await this.database.executeSql(query, [nick]);
      if (result.rows.length > 0) {
        const storedAnswer = result.rows.item(0).respuesta_seguridad;
        return storedAnswer === respuesta;
      }
      return false;
    } catch (e: any) {
      this.presentAlert('Error', `Error al verificar la respuesta de seguridad: ${e.message}`);
      return false;
    }
  }

  async tienePreguntaSeguridad(nick: string): Promise<boolean> {
    const query = 'SELECT pregunta_seguridad FROM USUARIO WHERE nick_u = ?';
    try {
      const result = await this.database.executeSql(query, [nick]);
      return result.rows.length > 0 && result.rows.item(0).pregunta_seguridad != null;
    } catch (e: any) {
      this.presentAlert('Error', `Error al verificar la existencia de la pregunta de seguridad: ${e.message}`);
      return false;
    }
  }

  async cambiarContrasena(nick: string, nuevaContrasena: string): Promise<boolean> {
    const query = 'UPDATE USUARIO SET contrasena_u = ? WHERE nick_u = ?';
    try {
      await this.database.executeSql(query, [nuevaContrasena, nick]);
      this.presentAlert('Éxito', 'Contraseña actualizada correctamente.');
      return true;
    } catch (e: any) {
      this.presentAlert('Error', `Error al cambiar la contraseña: ${e.message}`);
      return false;
    }
  }
}