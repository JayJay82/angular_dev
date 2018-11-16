import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class SnackService {

  constructor(private snackBar : MatSnackBar) { }

  openSnackBar = (description : string , action : string) => {
      this.snackBar.open(description, action, {
        duration: 5000
      });
    }
}

