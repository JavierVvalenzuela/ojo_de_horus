import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MasPopularesPage } from './mas-populares.page';

describe('MasPopularesPage', () => {
  let component: MasPopularesPage;
  let fixture: ComponentFixture<MasPopularesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MasPopularesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
