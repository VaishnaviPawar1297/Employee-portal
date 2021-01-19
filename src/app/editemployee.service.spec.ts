import { TestBed } from '@angular/core/testing';

import { EditemployeeService } from './editemployee.service';

describe('EditemployeeService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EditemployeeService = TestBed.get(EditemployeeService);
    expect(service).toBeTruthy();
  });
});
