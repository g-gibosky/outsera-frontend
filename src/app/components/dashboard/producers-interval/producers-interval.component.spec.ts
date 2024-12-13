import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProducersIntervalComponent } from './producers-interval.component';

describe('ProducersIntervalComponent', () => {
  let component: ProducersIntervalComponent;
  let fixture: ComponentFixture<ProducersIntervalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProducersIntervalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProducersIntervalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
