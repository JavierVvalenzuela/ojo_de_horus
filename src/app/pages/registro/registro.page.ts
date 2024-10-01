import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  static userList: any[] = []; // Lista estática de usuarios

  user: any = {
    nick: '',
    password: '',
    name: '',
    birthdate: ''
  };

  constructor(private navCtrl: NavController) { }
  onSubmit() {
    RegistroPage.userList.push({ ...this.user }); // Agrega el usuario a la lista estática
    console.log('Usuario registrado:', this.user);
    console.log('Lista de usuarios:', RegistroPage.userList);
    this.resetForm();
  }

  resetForm() {
    this.user = {
      nick: '',
      password: '',
      name: '',
      birthdate: ''
    };
  }

  ngOnInit() {
  }

}
