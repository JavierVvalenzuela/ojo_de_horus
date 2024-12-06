import { TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ServicioBDService } from '../services/servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

describe('HomePage', () => {
  let component: HomePage;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      providers: [
        {
          provide: ServicioBDService,
          useValue: {
            someMethod: jasmine.createSpy('someMethod').and.returnValue(Promise.resolve()),
          },
        },
        {
          provide: SQLite,
          useValue: {
            create: jasmine.createSpy('create').and.returnValue(Promise.resolve({})),
          },
        },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});