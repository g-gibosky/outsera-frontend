import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent Integration', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the navigation title', () => {
    const titleElement = fixture.debugElement.query(By.css('.nav-title'));
    expect(titleElement.nativeElement.textContent).toContain(
      'Frontend Angular Test'
    );
  });

  it('should have navigation links for Dashboard and List', () => {
    const links = fixture.debugElement.queryAll(By.css('.side-nav a'));
    expect(links.length).toBe(2);
    expect(links[0].nativeElement.textContent).toContain('Dashboard');
    expect(links[1].nativeElement.textContent).toContain('List');
  });

  it('should navigate to Dashboard when clicking the Dashboard link', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const dashboardLink = fixture.debugElement.queryAll(
      By.css('.side-nav a')
    )[0];
    dashboardLink.nativeElement.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should navigate to List when clicking the List link', () => {
    const navigateSpy = spyOn(router, 'navigate');
    const listLink = fixture.debugElement.queryAll(By.css('.side-nav a'))[1];
    listLink.nativeElement.click();
    expect(navigateSpy).toHaveBeenCalledWith(['/list']);
  });
});
