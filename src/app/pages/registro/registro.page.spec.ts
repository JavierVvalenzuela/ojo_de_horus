import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistroPage } from './registro.page';
import { FormsModule } from '@angular/forms';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Crear el mock para SQLite
const mockSQLite = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),
};

const mockServicioBD = {
  getUsuario: jasmine.createSpy('getUsuario').and.returnValue(Promise.resolve({})),
};

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ RegistroPage ], 
      imports: [FormsModule],
      providers: [
        { provide: SQLite, useValue: mockSQLite },
        { provide: ServicioBDService, useValue: mockServicioBD },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('debería devolver true si la contraseña cumple con el patrón requerido', () => {
    const resultado = component.isPasswordValid('Diego.170'); 
    expect(resultado).toBeTrue();
  });
  
  it('debería devolver false si la contraseña no cumple con el patrón requerido (sin mayúscula)', () => {
    const resultado = component.isPasswordValid('contraseña1!');  
    expect(resultado).toBeFalse();
  });

  it('debería alternar la visibilidad de la contraseña', () => {
    component.passwordVisible = false; 
    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeTrue(); 

    component.togglePasswordVisibility();
    expect(component.passwordVisible).toBeFalse(); 
  });

  it('debería alternar la visibilidad de la confirmación de contraseña', () => {
    component.confirmPasswordVisible = false; 
    component.toggleConfirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeTrue(); 

    component.toggleConfirmPasswordVisibility();
    expect(component.confirmPasswordVisible).toBeFalse();
  });

});