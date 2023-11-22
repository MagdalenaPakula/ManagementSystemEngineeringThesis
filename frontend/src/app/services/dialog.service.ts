import { Injectable } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {DialogComponent} from "../dialog/dialog.component";

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  openDialog(title: string, message: string): void {
    this.dialog.open(DialogComponent, {
      width: '300px',
      data: { title, message },
    });
  }
}
