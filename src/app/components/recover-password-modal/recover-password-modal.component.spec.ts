import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RecoverPasswordModalComponent } from './recover-password-modal.component';
import { ServicioBDService } from '../../services/servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';

// Mock for SQLite
class MockSQLite {
  create() {
    return Promise.resolve({
      executeSql: () => Promise.resolve(),
    });
  }
}

describe('RecoverPasswordModalComponent', () => {
  let component: RecoverPasswordModalComponent;
  let fixture: ComponentFixture<RecoverPasswordModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RecoverPasswordModalComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        ServicioBDService,
        { provide: SQLite, useClass: MockSQLite }, // Provide the mock SQLite service
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecoverPasswordModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
