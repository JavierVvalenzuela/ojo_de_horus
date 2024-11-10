import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginPage } from './login.page';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { CommonModule } from '@angular/common'; 
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms'; 
import { ModalController } from '@ionic/angular'; 

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let mockServicioBD: jasmine.SpyObj<ServicioBDService>;
  let mockModalController: jasmine.SpyObj<ModalController>;

  beforeEach(async () => {
    mockServicioBD = jasmine.createSpyObj('ServicioBDService', ['getUserByNick', 'dbState', 'getAllUsuarios']);
    mockModalController = jasmine.createSpyObj('ModalController', ['create']);

    await TestBed.configureTestingModule({
      declarations: [LoginPage],
      imports: [
        CommonModule,
        IonicModule.forRoot(), 
        FormsModule 
      ], 
      providers: [
        { provide: ServicioBDService, useValue: mockServicioBD },
        { provide: ModalController, useValue: mockModalController }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges(); 
  });

  it('debería permitir el inicio de sesión con credenciales válidas', async () => {
    const mockUser = {
      id_usuario: 1,
      nombre_u: 'Juan',
      apellido_u: 'Perez',
      nick_u: 'juanperez',
      correo_u: 'juan@example.com',
      contrasena_u: '123456',
      pregunta_respaldo_u: '¿Cuál es tu color favorito?',
      imagen_perfil_u: null, 
      estado_cuenta_u: 'A',
      razon_ban_u: null,
      id_rol: 3
    };

    mockServicioBD.getUserByNick.and.returnValue(Promise.resolve(mockUser)); 

    component.nick_u = 'juanperez';
    component.password = '123456';

    await component.onSubmit();

    expect(component.errorMessage).toBe('');
    expect(localStorage.getItem('loggedInUserId')).toBe('1'); 
  });

  it('debería mostrar error con credenciales inválidas', async () => {
    const mockUser = {
      id_usuario: 1,
      nombre_u: 'Nombre',
      apellido_u: 'Apellido',
      nick_u: 'usuarioValido',
      correo_u: 'correo@ejemplo.com',
      contrasena_u: 'contraseñaValida',
      pregunta_respaldo_u: '',
      imagen_perfil_u: null, 
      estado_cuenta_u: 'A',
      razon_ban_u: null,
      id_rol: 2
    };

    mockServicioBD.getUserByNick.and.returnValue(Promise.resolve(mockUser));

    component.nick_u = 'usuarioValido';
    component.password = 'contraseñaIncorrecta';

    await component.onSubmit();

    expect(component.errorMessage).toBe('Usuario o contraseña incorrectos');
  });

  it('debería mostrar mensaje de cuenta baneada', async () => {
    const mockUser = {
      id_usuario: 2,
      nombre_u: 'Nombre',
      apellido_u: 'Apellido',
      nick_u: 'usuarioBaneado',
      correo_u: 'correo@ejemplo.com',
      contrasena_u: 'contraseñaValida',
      pregunta_respaldo_u: '',
      imagen_perfil_u: null, 
      estado_cuenta_u: 'B',
      razon_ban_u: 'Incumplimiento de normas',
      id_rol: 2
    };

    mockServicioBD.getUserByNick.and.returnValue(Promise.resolve(mockUser));

    component.nick_u = 'usuarioBaneado';
    component.password = 'contraseñaValida';

    await component.onSubmit();

    expect(component.errorMessage).toBe('Tu cuenta está baneada. Razón: Incumplimiento de normas');
  });
});
