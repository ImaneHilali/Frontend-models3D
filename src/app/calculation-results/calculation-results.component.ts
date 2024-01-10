import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UploadResponse } from '../models/upload.model';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-calculation-results',
  templateUrl: './calculation-results.component.html',
  styleUrls: ['./calculation-results.component.css']
})
export class CalculationResultsComponent implements OnInit {
  imageId: number | undefined;

  @Input() calculationResults: any;
  @Input() uploadedImage: UploadResponse = {
    id: 0,
    message: "",
    image_link: "",
    obj_link: "",
    calculation_results: ""
  };

  constructor(private route: ActivatedRoute, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      this.imageId = +params['id'].substring(1);
      console.log('Show Results clicked for image ID:', this.imageId);

      this.fetchResultsById(this.imageId);
    });
  }

  private fetchResultsById(imageId: number): void {
    this.uploadService.fetchResultsById(imageId).subscribe(
      (results) => {
        console.log('Results for image ID:', imageId, results);
        this.calculationResults = results;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
