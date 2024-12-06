import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { RecuperarPage } from './recuperar.page';
import { ServicioBDService } from '../../services/servicio-bd.service';

const mockServicioBDService = {
  createDatabase: jasmine.createSpy('createDatabase').and.returnValue(Promise.resolve()),
};

describe('RecuperarPage', () => {
  let component: RecuperarPage;
  let fixture: ComponentFixture<RecuperarPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecuperarPage],
      imports: [FormsModule], // Importar FormsModule para formularios template-driven
      providers: [
        { provide: ServicioBDService, useValue: mockServicioBDService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecuperarPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
