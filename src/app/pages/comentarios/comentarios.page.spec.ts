import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ComentariosPage } from './comentarios.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ComentariosPage', () => {
  let component: ComentariosPage;
  let fixture: ComponentFixture<ComentariosPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ComentariosPage],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of({ get: (key: string) => 'mockValue' }), // Simula un parámetro de ruta
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ComentariosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
