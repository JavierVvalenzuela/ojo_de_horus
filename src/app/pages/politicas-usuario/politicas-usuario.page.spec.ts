import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticasUsuarioPage } from './politicas-usuario.page';

describe('PoliticasUsuarioPage', () => {
  let component: PoliticasUsuarioPage;
  let fixture: ComponentFixture<PoliticasUsuarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasUsuarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
