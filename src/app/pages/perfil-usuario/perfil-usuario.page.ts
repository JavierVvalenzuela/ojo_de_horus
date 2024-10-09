import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil-usuario',
  templateUrl: './perfil-usuario.page.html',
  styleUrls: ['./perfil-usuario.page.scss'],
})
export class PerfilUsuarioPage implements OnInit {
  // Simulating user roles for demonstration
  user = {
    id: 1,
    username: 'Invitado15484631',
    fullName: 'Diego Mellado',
    email: 'di.mellado@duocuc.lol',
    phone: '+865 2481 15 48',
    address: 'Calle Falsa 123',
    role: 'admin' // 'user', 'moderator', or 'admin'
  };

  isAdmin: boolean = false;
  isOwner: boolean = true; // Simulating that the logged-in user is the owner

  constructor() { }

  ngOnInit() {
    this.isAdmin = this.user.role === 'admin' || this.user.role === 'moderator';
  }

  deleteUser() {
    // Logic to ban or delete the user account
    console.log('Usuario baneado:', this.user.username);
    // You would typically call a service to handle this
  }

  updateUser() {
    // Logic to update user information
    console.log('Usuario actualizado:', this.user);
    // You would typically call a service to handle this
  }
}
