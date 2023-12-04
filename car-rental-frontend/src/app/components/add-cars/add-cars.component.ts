import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-add-cars',
  templateUrl: './add-cars.component.html',
  styleUrls: ['./add-cars.component.scss']
})
export class AddCarsComponent {
constructor(private http:HttpClient){}
closeDialog() {
throw new Error('Method not implemented.');
}

submitPost(postContent: string, postTitle: string): void {
  const newPost = {
    car_name: postTitle,
    properties: null,
    picture:null, 
  };

  this.http.post('http://127.0.0.1:8000/api/cars', newPost)
    .subscribe((response: any) => {
      console.log('added');
       
    }, (error: any) => {
      console.log('failed to add');
    });
}

}
