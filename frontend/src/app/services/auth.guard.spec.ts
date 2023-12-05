import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  const executeGuard: CanActivateFn = async (...guardParameters) => {
    const guard = TestBed.inject(AuthGuard); // Get an instance of AuthGuard
    return guard.canActivate(...guardParameters); // Call the canActivate method
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthGuard], // Provide AuthGuard in the testing module
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
