import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';
import { UploadService } from './services/upload.service';
import { HttpClientModule } from '@angular/common/http';
import { ImageCardComponent } from './image-card/image-card.component';
import { RouterModule, Routes } from '@angular/router';
import { SimilarityResultsComponent } from './similarity-results/similarity-results.component';
import {FormsModule} from "@angular/forms";
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

 
@NgModule({
  declarations: [
    AppComponent,
    UploadImageComponent,
    CalculationResultsComponent,
    ImageCardComponent,
    SimilarityResultsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
   ],
  exports: [RouterModule],
  providers: [UploadService],
  bootstrap: [AppComponent]
})
export class AppModule { }
