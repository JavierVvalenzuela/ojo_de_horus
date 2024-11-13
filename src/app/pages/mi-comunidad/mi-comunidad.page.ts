import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-mi-comunidad',
  templateUrl: './mi-comunidad.page.html',
  styleUrls: ['./mi-comunidad.page.scss'],
})
export class MiComunidadPage implements OnInit {
  nombre: string = '';
  descripcion: string = '';
  categoria: string = '';
  privacidad: boolean = false;
  reglas: string = '';
  ubicacion: string = '';
  communityImage: string | null = null;

  isEditing: boolean = false;

  // Variables temporales para modo edición
  editedNombre: string = '';
  editedDescripcion: string = '';
  editedCategoria: string = '';
  editedPrivacidad: boolean = false;
  editedReglas: string = '';
  editedUbicacion: string = '';

  // Opciones de categoría para el selector
  categoriaOptions: string[] = ['Deportes', 'Shooter', 'Rol', 'Plataformero', 'Rpg', 'Horror', 'Survival', 'Battle Royale'];

  constructor(private router: Router) {}

  ngOnInit() {
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.nombre = navigation.extras.state['nombre'];
      this.descripcion = navigation.extras.state['descripcion'];
      this.categoria = navigation.extras.state['categoria'];
      this.privacidad = navigation.extras.state['privacidad'];
      this.reglas = navigation.extras.state['reglas'];
      this.ubicacion = navigation.extras.state['ubicacion'];
      this.communityImage = navigation.extras.state['communityImage'];
    }
  }

  startEditing() {
    this.isEditing = true;
    this.editedNombre = this.nombre;
    this.editedDescripcion = this.descripcion;
    this.editedCategoria = this.categoria;
    this.editedPrivacidad = this.privacidad;
    this.editedReglas = this.reglas;
    this.editedUbicacion = this.ubicacion;
  }

  saveChanges() {
    this.nombre = this.editedNombre;
    this.descripcion = this.editedDescripcion;
    this.categoria = this.editedCategoria;
    this.privacidad = this.editedPrivacidad;
    this.reglas = this.editedReglas;
    this.ubicacion = this.editedUbicacion;
    this.isEditing = false;
  }

  cancelEditing() {
    this.isEditing = false;
    // No guardamos los cambios y revertimos al valor original
  }

  // Método para seleccionar una nueva imagen de la galería
  async changeCommunityImage() {
    const image = await Camera.getPhoto({
      source: CameraSource.Photos, // Accede a la galería
      resultType: CameraResultType.Uri, // Obtiene la imagen como URI
      quality: 90, // Calidad de la imagen
    });

    if (image.webPath) {
      this.communityImage = image.webPath; // Asigna la nueva imagen a la propiedad
    }
  }
}

