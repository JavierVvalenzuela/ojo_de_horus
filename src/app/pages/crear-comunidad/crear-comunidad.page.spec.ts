import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearComunidadPage } from './crear-comunidad.page';

describe('CrearComunidadPage', () => {
  let component: CrearComunidadPage;
  let fixture: ComponentFixture<CrearComunidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearComunidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
