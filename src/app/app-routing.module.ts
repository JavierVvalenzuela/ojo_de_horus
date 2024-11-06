import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'perfil-usuario',
    loadChildren: () => import('./pages/perfil-usuario/perfil-usuario.module').then( m => m.PerfilUsuarioPageModule)
  },
  {
    path: 'mas-populares',
    loadChildren: () => import('./pages/mas-populares/mas-populares.module').then( m => m.MasPopularesPageModule)
  },
 
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'imagenes',
    loadChildren: () => import('./pages/imagenes/imagenes.module').then( m => m.ImagenesPageModule)
  },
  {
    path: 'acuerdos-legales',
    loadChildren: () => import('./pages/acuerdos-legales/acuerdos-legales.module').then( m => m.AcuerdosLegalesPageModule)
  },
  {
    path: 'mas-comentados',
    loadChildren: () => import('./pages/mas-comentados/mas-comentados.module').then( m => m.MasComentadosPageModule)
  },
  {
    path: 'mas-vistos',
    loadChildren: () => import('./pages/mas-vistos/mas-vistos.module').then( m => m.MasVistosPageModule)
  },
  {
    path: 'politicas-privacidad',
    loadChildren: () => import('./pages/politicas-privacidad/politicas-privacidad.module').then( m => m.PoliticasPrivacidadPageModule)
  },
  {
    path: 'politicas-usuario',
    loadChildren: () => import('./pages/politicas-usuario/politicas-usuario.module').then( m => m.PoliticasUsuarioPageModule)
  },
  {
    path: 'comentarios',
    loadChildren: () => import('./pages/comentarios/comentarios.module').then( m => m.ComentariosPageModule)
  },
  {
    path: 'configuraciones',
    loadChildren: () => import('./pages/configuraciones/configuraciones.module').then( m => m.ConfiguracionesPageModule)
  },
  {
    path: 'reportar-contenido',
    loadChildren: () => import('./pages/reportar-contenido/reportar-contenido.module').then( m => m.ReportarContenidoPageModule)
  },
  {
    path: 'compartir',
    loadChildren: () => import('./pages/compartir/compartir.module').then( m => m.CompartirPageModule)
  },
  {
    path: 'comunidad',
    loadChildren: () => import('./pages/comunidad/comunidad.module').then( m => m.ComunidadPageModule)
  },
  {
    path: 'modificar-perfil',
    loadChildren: () => import('./pages/modificar-perfil/modificar-perfil.module').then( m => m.ModificarPerfilPageModule)
  },
  {
    path: 'administrador',
    loadChildren: () => import('./pages/administrador/administrador.module').then( m => m.AdministradorPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/not-found/not-found.module').then( m => m.NotFoundPageModule)
  },  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule)
  },
  {
    path: 'galeria',
    loadChildren: () => import('./pages/galeria/galeria.module').then( m => m.GaleriaPageModule)
  },
  {
    path: 'seguridad',
    loadChildren: () => import('./pages/seguridad/seguridad.module').then( m => m.SeguridadPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
