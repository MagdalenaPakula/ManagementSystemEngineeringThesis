import {Component, OnInit} from '@angular/core';
import {CartService} from "../services/cart.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {MatTableDataSource} from "@angular/material/table";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {GlobalConstants} from "../global-constants";

@Component({
    selector: 'app-view-bills',
    templateUrl: './view-bills.component.html',
    styleUrl: './view-bills.component.scss'
})
export class ViewBillsComponent implements OnInit {

    displayedColumns: string[] = ['name', 'email', 'paymentMethod', 'total', 'view'];
    dataSource!: MatTableDataSource<any>;
    responseMessage: any;

    constructor(
      private cartService: CartService,
      private dialog: MatDialog,
      private router: Router) {
    }

    ngOnInit() {
        this.tableData();
    }

    tableData(){
      this.cartService.getBills().subscribe((response:any)=>{
        this.dataSource = new MatTableDataSource(response);
      }, (error: any) => {
          console.log(error);
          if (error.error?.message) {
              this.responseMessage = error.error?.message;
          } else {
              this.responseMessage = GlobalConstants.genericError;
          }
      })
    }

    applyFilter(event:Event){
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // TODO: FINISH view bill
    handleViewAction(values: any) {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.data = {
            data: values
        };
        dialogConfig.width = '100%'; // Use a string value
        //const dialogRef = this.dialog.open(ViewBillProductsComponent, dialogConfig);
        this.router.events.subscribe(() => {
            //dialogRef.close();
        });
    }




}
