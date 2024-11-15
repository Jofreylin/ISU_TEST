import { TestBed } from '@angular/core/testing';
import { AlertService } from './alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';

describe('AlertService', () => {
  let service: AlertService;
  let mockSnackBar: jasmine.SpyObj<MatSnackBar>;

  beforeEach(() => {
    // Create a mock of MatSnackBar
    mockSnackBar = jasmine.createSpyObj('MatSnackBar', ['open']);

    TestBed.configureTestingModule({
      providers: [
        AlertService,
        { provide: MatSnackBar, useValue: mockSnackBar }
      ],
    });

    service = TestBed.inject(AlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show a success alert with correct parameters', () => {
    const title = 'Success';
    const message = 'Operation completed successfully';
    service.showSuccessAlert(title, message);

    expect(mockSnackBar.open).toHaveBeenCalledOnceWith(
      `${title}: ${message}`,
      'Close',
      {
        duration: 3000,
        panelClass: ['success-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  });

  it('should show an error alert with correct parameters', () => {
    const title = 'Error';
    const message = 'Something went wrong';
    service.showErrorAlert(title, message);

    expect(mockSnackBar.open).toHaveBeenCalledOnceWith(
      `${title}: ${message}`,
      'Close',
      {
        duration: 3000,
        panelClass: ['error-snackbar'],
        horizontalPosition: 'center',
        verticalPosition: 'top',
      }
    );
  });
});
