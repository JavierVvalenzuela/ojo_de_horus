import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioBDService } from '../services/servicio-bd.service'; // Asegúrate de que el path sea correcto

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  userRole: string = ''; // Esta variable contendrá el rol del usuario logueado
  isLoggedIn: boolean = false; // Esta variable indicará si el usuario ha iniciado sesión

  constructor(private router: Router, private servicioBD: ServicioBDService) {}

  ngOnInit() {
    this.obtenerRolUsuario(); // Obtener el rol del usuario al cargar la página
  }

  // Método para obtener el rol del usuario desde el servicio
  obtenerRolUsuario() {
    this.servicioBD.obtenerUsuarioLogueado().subscribe(usuario => {
      if (usuario && usuario.id_rol) {
        this.isLoggedIn = true; // Si hay un usuario, significa que está logueado
        switch (usuario.id_rol) {
          case 1:
            this.userRole = 'administrador';
            break;
          case 2:
            this.userRole = 'moderador';
            break;
          case 3:
            this.userRole = 'usuario';
            break;
          default:
            this.userRole = '';
            break;
        }
      } else {
        this.isLoggedIn = false; // Si no hay usuario, no está logueado
        this.userRole = ''; // Resetea el rol si no hay usuario logueado
      }
    });
  }

  // Método para verificar si el usuario tiene rol de administrador
  isAdmin(): boolean {
    return this.isLoggedIn && this.userRole === 'administrador';
  }

  // Método para navegar a la página del menú
  navigateToMenu(): void {
    this.router.navigate(['/menu']); // Ajusta la ruta según sea necesario
  }

  // Método para navegar a la página de administración
  navigateToAdmin(): void {
    this.router.navigate(['/administrador']); // Ajusta la ruta según sea necesario
  }
}
