import { TestBed } from '@angular/core/testing';

import { EmployeeCrudService } from './employee-crud.service';

describe('EmployeeCrudService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeeCrudService = TestBed.get(EmployeeCrudService);
    expect(service).toBeTruthy();
  });
});
