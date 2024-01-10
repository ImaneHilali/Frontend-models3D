import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UploadResponse } from '../models/upload.model';

@Component({
  selector: 'app-image-card',
  templateUrl: './image-card.component.html',
  styleUrls: ['./image-card.component.css']
})
export class ImageCardComponent {
 
  public uploadedImages: string[] = [];

  @Input() uploadedImage: UploadResponse = {
    id:0,
    message:"",
    image_link:"",
    obj_link:"",
    calculation_results:""
  };

  @Output() deleteImageClicked = new EventEmitter<void>();

  @Output() showResultsClick: EventEmitter<number> = new EventEmitter<number>();
  
  @Output() deleteImageClick: EventEmitter<number> = new EventEmitter<number>();

  @Output() sendSimilarityDataClick: EventEmitter<number> = new EventEmitter<number>();
   
  constructor() {}

  onDeleteClick(): void {
    this.deleteImageClicked.emit();
  }
  onShowResultsClick(imageId: number): void {
    this.showResultsClick.emit(imageId);
  }
  onDeleteImageClick(imageId: number): void {
    this.deleteImageClick.emit(imageId);
  } 
  onSendSimilarityData(imageId: number): void {
    this.sendSimilarityDataClick.emit(imageId);
  }
   
}
