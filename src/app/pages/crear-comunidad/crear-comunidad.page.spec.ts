import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearComunidadPage } from './crear-comunidad.page';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

describe('CrearComunidadPage', () => {
  let component: CrearComunidadPage;
  let fixture: ComponentFixture<CrearComunidadPage>;
  let routerSpy: jasmine.SpyObj<Router>;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;

  beforeEach(() => {
    // Crea un espía (spy) del router
    routerSpy = jasmine.createSpyObj('Router', ['navigate']);
    
    // Crea un espía (spy) del ToastController
    toastControllerSpy = jasmine.createSpyObj('ToastController', ['create']);
    
    TestBed.configureTestingModule({
      declarations: [ CrearComunidadPage ],
      providers: [
        { provide: Router, useValue: routerSpy },
        { provide: ToastController, useValue: toastControllerSpy }
      ]
    });

    fixture = TestBed.createComponent(CrearComunidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debería crear la comunidad y navegar cuando todos los campos estén completos', async () => {
    // Configura los valores necesarios en los campos
    component.nombre = 'Comunidad de prueba';
    component.descripcion = 'Descripción de prueba';
    component.categoria = 'deportes';
    component.privacidad = true;
    component.reglas = 'Reglas de prueba';
    component.ubicacion = 'Chile';

    // Llama a la función que realiza la creación de la comunidad
    await component.crearComunidad();

    // Verifica que navigate haya sido llamado con los parámetros correctos
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/mi-comunidad'], jasmine.objectContaining({
      state: jasmine.objectContaining({
        nombre: 'Comunidad de prueba',
        descripcion: 'Descripción de prueba',
        categoria: 'deportes',
        privacidad: true,
        reglas: 'Reglas de prueba',
        ubicacion: 'Chile',
        communityImage: null
      })
    }));
  });

  it('Debería mostrar un error y no navegar cuando los campos obligatorios estén vacíos', async () => {
    // Deja los campos obligatorios vacíos
    component.nombre = '';
    component.descripcion = '';
    component.categoria = '';
  
    // Simula el método create del ToastController para devolver un objeto que tiene el método present
    const toast: any = {
      present: jasmine.createSpy('present'),
      dismiss: jasmine.createSpy('dismiss'),
      animated: true,
      duration: 2000,
      message: 'Por favor, completa todos los campos obligatorios.',
      color: 'danger',
      isOpen: false, // Simula propiedades adicionales necesarias
      hasController: true,
      addEventListener: jasmine.createSpy('addEventListener'),
      removeEventListener: jasmine.createSpy('removeEventListener')
    };
  
    // Devuelve un objeto simulado que cumple con la estructura de un HTMLIonToastElement
    toastControllerSpy.create.and.returnValue(Promise.resolve(toast)); // Devuelve un objeto simulado con las propiedades necesarias
  
    // Llama a la función que intenta crear la comunidad
    await component.crearComunidad();
  
    // Verifica que se haya llamado al ToastController con el mensaje de error
    expect(toastControllerSpy.create).toHaveBeenCalledWith(jasmine.objectContaining({
      message: 'Por favor, completa todos los campos obligatorios.',
      duration: 2000,
      color: 'danger',
    }));
  
    // Verifica que el método present haya sido llamado
    expect(toast.present).toHaveBeenCalled();
  
    // Verifica que la navegación no haya ocurrido
    expect(routerSpy.navigate).not.toHaveBeenCalled();
  });
});