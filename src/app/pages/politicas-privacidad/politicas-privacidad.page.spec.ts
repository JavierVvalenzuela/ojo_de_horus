import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PoliticasPrivacidadPage } from './politicas-privacidad.page';

describe('PoliticasPrivacidadPage', () => {
  let component: PoliticasPrivacidadPage;
  let fixture: ComponentFixture<PoliticasPrivacidadPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PoliticasPrivacidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
