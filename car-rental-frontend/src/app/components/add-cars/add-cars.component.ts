import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent {
@ViewChild('picture') pictureInput: any;

constructor(private http: HttpClient) {}

submitPost(name: string, properties: string, picture: FileList | null): void {
  if (!picture) {
    console.error('No picture selected');
    return;
  }

  // Assuming 'properties' is in JSON format
  const propertiesJSON = JSON.stringify(properties);

  const formData = new FormData();
  formData.append('car_name', name);
  formData.append('properties', propertiesJSON);
  formData.append('picture', picture[0]); // Assuming you want to upload the first file

  this.http.post('http://127.0.0.1:8000/api/cars', formData)
    .subscribe((response: any) => {
      console.log('added');
    }, (error: any) => {
      console.log('failed to add', error);
    });
}




clearForm(): void {
  // Clear the form after submission
  if (this.pictureInput && this.pictureInput.nativeElement) {
    this.pictureInput.nativeElement.value = '';
  }
}

}
