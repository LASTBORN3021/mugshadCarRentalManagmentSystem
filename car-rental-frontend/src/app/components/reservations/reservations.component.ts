import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BookingService } from 'src/app/services/booking.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']
})
export class ReservationsComponent implements OnInit {
  carId: any | undefined;
  selectedCar: any;
  reservationForm: FormGroup; // Define reservationForm as FormGroup


  constructor(private route: ActivatedRoute,private carService:CarService,    private formBuilder: FormBuilder
  ,private bookingService:BookingService) {
    this.reservationForm = this.formBuilder.group({
      fullName: ['', Validators.required],
      idNumber: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      pickupDate: ['', Validators.required],
      dropoffDate: ['', Validators.required],
      destination: ['', Validators.required],
      // Add other form controls as needed
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.carId = +params['carId'];
      // console.log('carid',this.carId)
      // Now, 'this.carId' holds the selected car's ID, use it as needed in this component
    });
    this.  getCarDetails();
  }
  getCarDetails() {
    // Call your service method to fetch car details by ID
    this.carService.getCarById(this.carId).subscribe((car: any) => {
      this.selectedCar = car; // Assign the fetched car details to selectedCar variable
      this.selectedCar.picture = `http://localhost:8000/images/${car.picture}`; // Modify this line
      console.log('Selected Car Details:', this.selectedCar);
      // You can use 'this.selectedCar' in your HTML to display the details
    });
  }

  onSubmitBooking() {
    const formData = { ...this.reservationForm.value };
    formData.car_id = this.carId;
    formData.car_type = this.selectedCar.car_name;

    this.bookingService.bookCarReservation(formData).subscribe(
      (response) => {
        console.log('Booking success:', response);
        // Additional logic after successful booking
      },
      (error) => {
        console.error('Booking error:', error);
        // Handle error scenario
      }
    );
  }
}
