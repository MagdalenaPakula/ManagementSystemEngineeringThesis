// diet-generator-result.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-diet-generator-result',
  templateUrl: './diet-generator-result.component.html',
  styleUrls: ['./diet-generator-result.component.scss']
})
export class DietGeneratorResultComponent implements OnInit {
  bmi: number = 0;
  calorieCalculation: number = 0;
  bestCombinations: any[] = [];

  ngOnInit(): void {
    // Retrieve data from route state
    const state: any = history.state;
    console.log('DietGeneratorResultComponent - State:', state);

    if (state.resultData) {
      this.bmi = state.resultData.bmi;
      this.calorieCalculation = state.resultData.calorie_calculation;
      this.bestCombinations = state.resultData.best_combinations;

      // Add some console logs for debugging
      console.log('BMI:', this.bmi);
      console.log('Calorie Calculation:', this.calorieCalculation);
      console.log('Best Combinations:', this.bestCombinations);
    } else {
      console.error('No state data received.');
    }
  }
}
