import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguridadPage } from './seguridad.page';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; 

// Mock para SQLite
const mockSQLite = {
  create: jasmine.createSpy('create').and.returnValue(Promise.resolve()),
  executeSql: jasmine.createSpy('executeSql').and.returnValue(Promise.resolve()),
};

// Mock para ServicioBDService
const mockServicioBD = {
  getUsuario: jasmine.createSpy('getUsuario').and.returnValue(Promise.resolve({})),
};

describe('SeguridadPage', () => {
  let component: SeguridadPage;
  let fixture: ComponentFixture<SeguridadPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SeguridadPage],
      providers: [
        { provide: SQLite, useValue: mockSQLite }, 
        { provide: ServicioBDService, useValue: mockServicioBD }, 
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SeguridadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
