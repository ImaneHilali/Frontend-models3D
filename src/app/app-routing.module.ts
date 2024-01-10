import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UploadImageComponent } from './upload-image/upload-image.component';
import { CalculationResultsComponent } from './calculation-results/calculation-results.component';
import { SimilarityResultsComponent } from './similarity-results/similarity-results.component';
 
const routes: Routes = [ 
  { path: '', component: UploadImageComponent },
  { 
    path: 'calculation-results/:id',  
    component: CalculationResultsComponent
  },
  { 
    path: 'similarity-results/:id',  
    component: SimilarityResultsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
