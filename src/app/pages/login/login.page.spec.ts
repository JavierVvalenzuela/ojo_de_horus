import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

const mockSQLite = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),
};

const mockServicioBD = {
  getUsuario: jasmine.createSpy('getUsuario').and.returnValue(Promise.resolve({})),
};

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
      providers: [
        { provide: SQLite, useValue: mockSQLite },
        { provide: ServicioBDService, useValue: mockServicioBD },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('debería devolver true si el nombre de usuario es válido (entre 5 y 15 caracteres)', () => {
    const resultado = component.isNickValid('usuarioValido');  
    expect(resultado).toBeTrue();
  });
  
  it('debería devolver false si el nombre de usuario tiene menos de 5 caracteres', () => {
    const resultado = component.isNickValid('usr');  
    expect(resultado).toBeFalse();
  });
  
  it('debería devolver false si el nombre de usuario excede los 15 caracteres', () => {
    const result = component.isNickValid('unNombreDeUsuarioExcedente');
    expect(result).toBeFalse();  
  });
  
  it('debería devolver true si la contraseña cumple con el patrón requerido', () => {
    const resultado = component.isPasswordValid('Contraseña1!'); 
    expect(resultado).toBeTrue();
  });
  
  it('debería devolver false si la contraseña no cumple con el patrón requerido (sin mayúscula)', () => {
    const resultado = component.isPasswordValid('contraseña1!');  
    expect(resultado).toBeFalse();
  });
});
