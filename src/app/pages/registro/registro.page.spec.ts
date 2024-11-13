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
});