import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { of } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { Camera } from '@capacitor/camera';

import { MenuPage } from './menu.page';

describe('MenuPage', () => {
  let component: MenuPage;
  let fixture: ComponentFixture<MenuPage>;

  // Mocks
  const mockRouter = {
    navigate: jasmine.createSpy('navigate'),
  };

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: (key: string) => 'test-id' } },
  };

  const mockNavController = {
    navigateRoot: jasmine.createSpy('navigateRoot'),
  };

  const mockAuthService = {
    isLoggedIn: jasmine.createSpy('isLoggedIn').and.returnValue(of(true)),
    logout: jasmine.createSpy('logout'),
    getLoginStatus: jasmine.createSpy('getLoginStatus').and.returnValue(of(true)), // Mock para getLoginStatus
  };

  const mockServicioBDService = {
    createDatabase: jasmine.createSpy('createDatabase').and.returnValue(Promise.resolve()),
    getUserDetails: jasmine.createSpy('getUserDetails').and.returnValue(of({ id: 1, nick_u: 'TestUser' })),
  };

  const mockCamera = {
    getPhoto: jasmine.createSpy('getPhoto').and.returnValue(Promise.resolve({ webPath: 'test-path' })),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MenuPage],
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: NavController, useValue: mockNavController },
        { provide: AuthService, useValue: mockAuthService },
        { provide: ServicioBDService, useValue: mockServicioBDService },
        { provide: Camera, useValue: mockCamera },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
