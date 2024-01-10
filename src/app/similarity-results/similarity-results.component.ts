import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { ActivatedRoute } from '@angular/router';
import { UploadResponse } from '../models/upload.model';

@Component({
  selector: 'app-similarity-results',
  templateUrl: './similarity-results.component.html',
  styleUrls: ['./similarity-results.component.css']
})
export class SimilarityResultsComponent implements OnInit {
  results: any[] = [];
  uploadedImage: UploadResponse = {
    id: 0,
    message: "",
    image_link: "",
    obj_link: "",
    calculation_results: ""
  };
  uploadedImages: UploadResponse[] = [];
  fullResults: any[] = [];
  numResults: number |null=null; // To store user input for the number of results



  constructor(private route: ActivatedRoute, private uploadService: UploadService) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      console.log('Route params:', params);
      const imageId = +params['id'].substring(1);
      this.loadImageData(imageId);
    });
  }

  private loadImageData(imageId: number): void {
    this.uploadService.getDetailsById(imageId).subscribe(
      (image) => {
        this.uploadedImage = image;
        console.log('Reference Image:', this.uploadedImage);

        if (this.uploadedImage && this.uploadedImage.obj_link) {
          this.uploadService.getImages().subscribe(
            (images) => {
              this.uploadedImages = images.filter(img => img.id !== this.uploadedImage.id);
              const modelsArray = this.uploadedImages.map(img => ({
                id: img.id,
                obj_link: img.obj_link,
              }));

              const requestData = {
                reference: {
                  id: this.uploadedImage.id,
                  obj_link: this.uploadedImage.obj_link,
                },
                models: modelsArray,
              };

              this.performSimilarityComparison(requestData);
            },
            (error) => {
              console.error(error);
            }
          );
        } else {
          console.error('Reference obj_link is empty or undefined.');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private performSimilarityComparison(requestData: any): void {
    console.log('requestData:', requestData);
    console.log('uploadedImage:', this.uploadedImage);
    console.log('results:', this.results);

    this.uploadService.compareSimilarity(requestData).subscribe(
      (results) => {
        this.fullResults = results;
        this.applyNumResultsFilter(); 

        console.log('Comparison Results:', results);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  public applyNumResultsFilter(): void {
    // If numResults is specified and valid, filter the results
    if (this.numResults != null && this.numResults > 0) {
      this.results = this.fullResults.slice(0, this.numResults);
    } else {
      // If numResults is not specified or invalid, show all results
      this.results = [...this.fullResults];
    }
  }
  
}
