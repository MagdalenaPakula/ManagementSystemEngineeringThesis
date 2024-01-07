import { Component } from '@angular/core';
import {DietGeneratorService} from "../services/diet-generator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-diet-generator-input',
  templateUrl: './diet-generator-input.component.html',
  styleUrl: './diet-generator-input.component.scss'
})
export class DietGeneratorInputComponent {
  constructor(private dietService: DietGeneratorService, private router: Router) {}

  formData = {
    age: null,
    weight: null,
    height: null,
    gender: '',
    activity_level: '',
    goal: '',
    num_meals: null,
  };

  onSubmit() {
    this.dietService.generateDiet(this.formData).subscribe(
      (result) => {
        this.router.navigate(['/diet-generator-result']);

      },
      (error) => {
        console.error('Error submitting form:', error);
      }
    )

  }

}
