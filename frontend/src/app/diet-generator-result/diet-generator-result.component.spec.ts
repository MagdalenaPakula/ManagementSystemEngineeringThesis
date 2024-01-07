import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DietGeneratorResultComponent } from './diet-generator-result.component';

describe('DietGeneratorResultComponent', () => {
  let component: DietGeneratorResultComponent;
  let fixture: ComponentFixture<DietGeneratorResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DietGeneratorResultComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DietGeneratorResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
