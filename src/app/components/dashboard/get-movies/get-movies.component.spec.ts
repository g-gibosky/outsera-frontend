import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetMoviesComponent } from './get-movies.component';

describe('GetMoviesComponent', () => {
  let component: GetMoviesComponent;
  let fixture: ComponentFixture<GetMoviesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetMoviesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GetMoviesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
