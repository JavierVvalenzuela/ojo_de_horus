import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PagComunidadPage } from './pag-comunidad.page';

describe('PagComunidadPage', () => {
  let component: PagComunidadPage;
  let fixture: ComponentFixture<PagComunidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PagComunidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
