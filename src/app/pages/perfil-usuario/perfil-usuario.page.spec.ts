import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilUsuarioPage } from './perfil-usuario.page';
import { ActivatedRoute } from '@angular/router';  
import { ServicioBDService } from '../../services/servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';  

// Crear el mock de ActivatedRoute
const mockActivatedRoute = {
  snapshot: {
    paramMap: {
      get: jasmine.createSpy('get').and.returnValue('1'), 
    },
  },
};

// Crear el mock para SQLite
const mockSQLite = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),
};

const mockServicioBD = {
  getUsuario: jasmine.createSpy('getUsuario').and.returnValue(Promise.resolve({})),
};

describe('PerfilUsuarioPage', () => {
  let component: PerfilUsuarioPage;
  let fixture: ComponentFixture<PerfilUsuarioPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilUsuarioPage],
      providers: [
        { provide: SQLite, useValue: mockSQLite }, 
        { provide: ServicioBDService, useValue: mockServicioBD },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },  
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PerfilUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});