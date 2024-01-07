import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-diet-generator-result',
  templateUrl: './diet-generator-result.component.html',
  styleUrl: './diet-generator-result.component.scss'
})
export class DietGeneratorResultComponent implements OnInit {
  bmi: number = 0;
  calorieCalculation: number = 0;
  bestCombinations: any[] = [];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Retrieve result data from the route state
    this.route.paramMap.subscribe(params => {
      const result = params.get('result');

      // If your result is a JSON string, you might need to parse it
      const resultData = result ? JSON.parse(result) : null;

      // Use the result data as needed
      this.bmi = resultData?.bmi || 0;
      this.calorieCalculation = resultData?.calorieCalculation || 0;
      this.bestCombinations = resultData?.bestCombinations || [];
    });
  }
}
