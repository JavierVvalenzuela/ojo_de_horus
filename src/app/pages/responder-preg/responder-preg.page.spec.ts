import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponderPregPage } from './responder-preg.page';

describe('ResponderPregPage', () => {
  let component: ResponderPregPage;
  let fixture: ComponentFixture<ResponderPregPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponderPregPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
