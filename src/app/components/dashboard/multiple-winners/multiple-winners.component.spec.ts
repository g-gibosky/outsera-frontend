import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleWinnersComponent } from './multiple-winners.component';

describe('MultipleWinnersComponent', () => {
  let component: MultipleWinnersComponent;
  let fixture: ComponentFixture<MultipleWinnersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultipleWinnersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MultipleWinnersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
