import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasComentadosPage } from './mas-comentados.page';

describe('MasComentadosPage', () => {
  let component: MasComentadosPage;
  let fixture: ComponentFixture<MasComentadosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasComentadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
