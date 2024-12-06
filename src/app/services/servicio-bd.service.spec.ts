import { TestBed } from '@angular/core/testing';
import { ServicioBDService } from './servicio-bd.service';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; // Ensure SQLite is imported

// Mock for SQLite
class MockSQLite {
  create() {
    return Promise.resolve({
      executeSql: () => Promise.resolve(),
    });
  }
}

describe('ServicioBDService', () => {
  let service: ServicioBDService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServicioBDService,
        { provide: SQLite, useClass: MockSQLite }, // Provide the mock of SQLite
      ],
    });
    service = TestBed.inject(ServicioBDService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
