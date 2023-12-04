import { Component, OnInit } from '@angular/core';
import { cars } from 'src/app/Interfaces/cars';
import { Category } from 'src/app/Interfaces/categories';
import { CarService } from 'src/app/services/car.service';
import { AddCarsComponent } from '../add-cars/add-cars.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-car-listing',
  templateUrl: './car-listing.component.html',
  styleUrls: ['./car-listing.component.scss']
})
export class CarListingComponent implements OnInit {
  cars:any[]=[];
  categories: Category[] = [];

  constructor(private carServise:CarService,
    private dialog: MatDialog,
    private router:Router
    ){}

  ngOnInit(): void {
    this.getAllCars()
    // this.loadCategoriesAndSetFirstCategory()
  }

  getAllCars() {
    this.carServise.getcars().subscribe((data: any[]) => {
      this.cars = data.map(car => {
        // Assuming 'car.picture' contains only the image file name
        car.picture = `http://localhost:8000/images/${car.picture}`; // Modify this line
        return car;
      });
      console.log('Cars list', this.cars);
    });
  }
  
  // loadCategoriesAndSetFirstCategory() {
  //   this.carServise.getCategories().subscribe((data: any) => {
  //     this.categories = data;
  //     console.log('Categories', data)
  //   });
  //   this.categories.forEach((category) => {
  //     category.num_products = category.products.length;
  //   });
  // }

  openPostDialog(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '700px'; // Adjust the width of the modal
    dialogConfig.maxWidth = '90vw'; // Maximum width
    dialogConfig.height='60vh';
    dialogConfig.data = { /* If passing data */ };

    const dialogRef = this.dialog.open(AddCarsComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      // Do something on modal close if needed
    });
  }

  hireNow(carId: number) {
    this.router.navigate(['/reservations', carId]);
  }
}
