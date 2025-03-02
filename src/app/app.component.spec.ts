import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Subject } from 'rxjs';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        provideRouter([]), // Router mock
        {
          provide: MessageService,
          useValue: {
            messageObserver: new Subject(), // ✅ Import: Subject is valid
          },
        },
      ],
      schemas: [NO_ERRORS_SCHEMA], // ✅ Ignore errors of unknown components (like Toast)
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a router outlet', () => {
    const routerOutlet = fixture.nativeElement.querySelector('router-outlet');
    expect(routerOutlet).toBeTruthy();
  });
});
