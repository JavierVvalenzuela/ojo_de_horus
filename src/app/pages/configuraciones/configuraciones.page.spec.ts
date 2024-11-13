import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracionesPage } from './configuraciones.page';
import { ServicioBDService } from '../../services/servicio-bd.service'; 
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 

// Crear el mock para SQLite
const mockSQLite = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),
};

const mockServicioBD = {
  // Agrega tus métodos mockeados aquí si es necesario
  getUsuario: jasmine.createSpy('getUsuario').and.returnValue(Promise.resolve({})),
};

describe('ConfiguracionesPage', () => {
  let component: ConfiguracionesPage;
  let fixture: ComponentFixture<ConfiguracionesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionesPage],
      providers: [
        { provide: SQLite, useValue: mockSQLite }, 
        { provide: ServicioBDService, useValue: mockServicioBD }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
