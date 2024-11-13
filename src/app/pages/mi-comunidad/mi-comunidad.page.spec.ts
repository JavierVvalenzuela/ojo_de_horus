import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MiComunidadPage } from './mi-comunidad.page';

describe('MiComunidadPage', () => {
  let component: MiComunidadPage;
  let fixture: ComponentFixture<MiComunidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MiComunidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
