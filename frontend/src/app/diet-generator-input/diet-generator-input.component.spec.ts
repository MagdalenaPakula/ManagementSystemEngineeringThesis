import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietGeneratorInputComponent } from './diet-generator-input.component';

describe('DietGeneratorInputComponent', () => {
  let component: DietGeneratorInputComponent;
  let fixture: ComponentFixture<DietGeneratorInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietGeneratorInputComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietGeneratorInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
