import { Component } from '@angular/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage {
  currentTab = 'baneados';

  usuariosBaneados = [
    { nombre: 'Usuario1', email: 'usuario1@example.com' },
    { nombre: 'Usuario2', email: 'usuario2@example.com' },
  ];

  publicacionesReportadas = [
    { titulo: 'Publicación 1', reportadoPor: 'Usuario3' },
    { titulo: 'Publicación 2', reportadoPor: 'Usuario4' },
  ];

  comentariosReportados = [
    { usuario: 'Usuario5', texto: 'Este es un comentario ofensivo.', reportadoPor: 'Usuario6' },
    { usuario: 'Usuario7', texto: 'Comentario con spam.', reportadoPor: 'Usuario8' },
  ];

  onSegmentChange(event: any) {
    this.currentTab = event.detail.value;
  }

  desbanearUsuario(usuario: any) {
    this.usuariosBaneados = this.usuariosBaneados.filter(u => u !== usuario);
    console.log(`${usuario.nombre} ha sido desbaneado.`);
  }

  aprobarPublicacion(publicacion: any) {
    this.publicacionesReportadas = this.publicacionesReportadas.filter(p => p !== publicacion);
    console.log(`Publicación "${publicacion.titulo}" ha sido aprobada.`);
  }

  eliminarPublicacion(publicacion: any) {
    this.publicacionesReportadas = this.publicacionesReportadas.filter(p => p !== publicacion);
    console.log(`Publicación "${publicacion.titulo}" ha sido eliminada.`);
  }

  aprobarComentario(comentario: any) {
    this.comentariosReportados = this.comentariosReportados.filter(c => c !== comentario);
    console.log(`Comentario de "${comentario.usuario}" ha sido aprobado.`);
  }

  eliminarComentario(comentario: any) {
    this.comentariosReportados = this.comentariosReportados.filter(c => c !== comentario);
    console.log(`Comentario de "${comentario.usuario}" ha sido eliminado.`);
  }
}
