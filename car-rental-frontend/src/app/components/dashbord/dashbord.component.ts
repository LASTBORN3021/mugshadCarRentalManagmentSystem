import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCarsComponent } from '../add-cars/add-cars.component';

@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss']
})
export class DashbordComponent {

  constructor(private dialog: MatDialog,
    ){}

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
}
