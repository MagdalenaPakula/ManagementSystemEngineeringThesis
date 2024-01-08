// diet-generator-input.component.ts
import { Component, OnInit } from '@angular/core';
import { DietGeneratorService } from "../services/diet-generator.service";
import { Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-diet-generator-input',
  templateUrl: './diet-generator-input.component.html',
  styleUrls: ['./diet-generator-input.component.scss']
})
export class DietGeneratorInputComponent implements OnInit {
  dietForm!: FormGroup;  // Add the '!' to indicate it will be initialized in ngOnInit

  constructor(
      private dietService: DietGeneratorService,
      private fb: FormBuilder,
      private router: Router
  ) {}

  ngOnInit(): void {
    this.dietForm = this.fb.group({
      age: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      height: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      activity_level: ['', [Validators.required]],
      goal: ['', [Validators.required]],
      num_meals: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.dietForm && this.dietForm.valid) {  // Check for existence
      const formData = this.dietForm.value;

      this.dietService.submitForm(formData).subscribe(response => {
        // Handle the response
        console.log('API Response:', response);

        // Assuming response contains necessary data to pass to the result component
        const resultData = response;

        // Log the resultData
        console.log('resultData:', resultData);

        // Navigate to the result component with the necessary data
        this.router.navigate(['/result'], { state: { resultData } });
      });
    }
  }

}
