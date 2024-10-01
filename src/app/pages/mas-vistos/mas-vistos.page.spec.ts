import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasVistosPage } from './mas-vistos.page';

describe('MasVistosPage', () => {
  let component: MasVistosPage;
  let fixture: ComponentFixture<MasVistosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasVistosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
