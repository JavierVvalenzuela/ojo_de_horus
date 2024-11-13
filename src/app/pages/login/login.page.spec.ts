import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoginPage } from './login.page';

describe('LoginPage', () => {
  let componente: LoginPage;
  let fixture: ComponentFixture<LoginPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [IonicModule.forRoot(), FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    componente = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(componente).toBeTruthy();
  });

  it('debería devolver true si el nombre de usuario es válido (entre 5 y 15 caracteres)', () => {
    const resultado = componente.isNickValid('usuarioValido');  
    expect(resultado).toBeTrue();
  });
  
  it('debería devolver false si el nombre de usuario tiene menos de 5 caracteres', () => {
    const resultado = componente.isNickValid('usr');  
    expect(resultado).toBeFalse();
  });
  
  it('debería devolver false si el nombre de usuario excede los 15 caracteres', () => {
    const resultado = componente.isNickValid('usuarioMuyLargo');  
    expect(resultado).toBeFalse();
  });
  
  it('debería devolver true si la contraseña cumple con el patrón requerido', () => {
    const resultado = componente.isPasswordValid('Contraseña1!'); 
    expect(resultado).toBeTrue();
  });
  
  it('debería devolver false si la contraseña no cumple con el patrón requerido (sin mayúscula)', () => {
    const resultado = componente.isPasswordValid('contraseña1!');  
    expect(resultado).toBeFalse();
  });
});
