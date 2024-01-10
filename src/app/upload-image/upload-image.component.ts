import { Component, EventEmitter, Output } from '@angular/core';
import { UploadService } from '../services/upload.service';
import { UploadResponse } from '../models/upload.model';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css']
})
export class UploadImageComponent {
  @Output() imageUploaded = new EventEmitter<UploadResponse>();

  public selectedImageResults: any;
  selectedImageId: number | null = null;
  selectedFiles: File[] = [];

  uploadedImage: UploadResponse = {
    id:0,
    message:"",
    image_link:"",
    obj_link:"",
    calculation_results:""
  };
  uploadedImages: UploadResponse[] = [];  
  
  constructor(private uploadService: UploadService, private router: Router) {}

  ngOnInit(): void {
    this.loadImages(); 
  }

  loadImages(): void {
    this.uploadService.getImages().subscribe(
      (responses: UploadResponse[]) => {
        if (responses.length > 0) {
          this.uploadedImages = responses.map(response => {
            return {
              id: response.id,
              message: response.message,
              image_link: response.image_link,
              obj_link: response.obj_link,
              calculation_results: response.calculation_results
            };
          });
          console.log('Received images:', this.uploadedImages);
        } else {
          console.warn('No images received.');
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }
   
  onFileChange(event: any): void {
    if (event.target.files && event.target.files.length > 0) {
      this.selectedFiles = event.target.files;
    }
  }
   
  uploadImages(): void {
    if (this.selectedFiles && this.selectedFiles.length) {
        // Convert the FileList to an array of File objects
        const filesArray = Array.from(this.selectedFiles);

        this.uploadService.uploadImages(filesArray).subscribe(
            (responses) => {
                console.log(responses);
                responses.forEach(response => {
                    this.selectedImageId = response.id;
                    this.uploadedImages.push(response);
                });
                this.loadImages();  
            },
            (error) => {
                console.error(error);
            }
        );
    }
}

  onDeleteImageClick(imageId: number | null): void {
    if(imageId){
  // Call the service method to delete the image by ID
    this.uploadService.deleteImage(imageId).subscribe(
      () => {
        console.log(`Image with ID ${imageId} deleted successfully.`);
        this.loadImages();
     },
     (error) => {
       console.error(`Error deleting image with ID ${imageId}:`, error);
     }
   );}
  }
 
  onShowResultsClick(imageId: number | null): void {
     this.router.navigate([`calculation-results/:${imageId}`]);
  }

  onSendSimilarityDataClick(imageId: number | null): void {
    this.router.navigate([`similarity-results/:${imageId}`]);
  }
  
} 
  