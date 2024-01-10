import { Injectable } from '@angular/core';
import { UploadResponse } from '../models/upload.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class UploadService {
  baseUrl = 'http://localhost:5000';   

  constructor(private http: HttpClient) {}

  uploadImages(files: File[]): Observable<UploadResponse[]> {
    const formData: FormData = new FormData();
    files.forEach(file => {
      formData.append('file', file);
  });
  const url = `${this.baseUrl}/upload`;
  return this.http.post<UploadResponse[]>(url, formData);
  }

  getImage(imageId: number): Observable<any> {
    const imageUrl = `${this.baseUrl}/get_image_by_id/${imageId}`;
    return this.http.get(imageUrl);
  }
 
  getImages(): Observable<UploadResponse[]> {
    const url = `${this.baseUrl}/get_images`;
    return this.http.get<UploadResponse[]>(url);
  }

  deleteImage(imageId: number): Observable<void> {
  const url = `${this.baseUrl}/remove_image/${imageId}`;
  return this.http.delete<void>(url);
  }

  fetchResultsById(imageId: number): Observable<any> {
    const url = `${this.baseUrl}/get_results/${imageId}`;
    return this.http.get(url);
  }
  
  compareSimilarity(requestData: any): Observable<any> {
    const url = `${this.baseUrl}/compare`;  
    return this.http.post(url, requestData);
  }

  getDetailsById(imageId: number): Observable<any> {
    const url = `${this.baseUrl}/get_details_by_id/${imageId}`;  
    return this.http.get(url);
  }
  
}