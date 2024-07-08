import { Component, OnInit , ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { EmployeeService } from './services/employee.service';
import {MatTableModule} from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoreService } from './core/core.service';
import { DeletConformationComponent } from './delet-conformation/delet-conformation.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatToolbarModule,MatIconModule,MatFormFieldModule,MatButtonModule,EmpAddEditComponent,MatDialogModule,MatTableModule,MatPaginator,MatSort,CommonModule,MatInputModule,MatSnackBarModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit{
  title = 'crud-app';

  displayedColumns: string[] = ['id', 'fistname', 'lastname', 'email','dob', 'gender', 'education', 'company', 'experience', 'package','action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private _dialog: MatDialog, private _empService: EmployeeService, private _coreservice: CoreService) {}
 
  ngOnInit(): void {
    this.getEmployeList();
  }
  openaddeditempform() {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          // console.log("ok")
          this.getEmployeList();
        }
      }
    })
  }


  getEmployeList(){
    this._empService.getEmploye().subscribe({
      next: (res) => {
        // console.log(res)
        this.dataSource =new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator =this.paginator;
      },
      error(err){
        console.log(err)
      }

    })
  }

  deleteEmployeList(id: any){
    const dialogRef = this._dialog.open(DeletConformationComponent, {data: id, disableClose: false });
    
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          // console.log("ok")
          this.getEmployeList();
        }
      }
    })
    // this._empService.deleteEmploye(id).subscribe({
    //   next: (res) => {
      
    //     this._coreservice.openSnackBar('Employe deleted','Done')
    //     this.getEmployeList();
    //   },
    //   error(err){
    //     console.log(err)
    //   }
    // })
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  openeditform(data: any) {
   const dialogRef = this._dialog.open(EmpAddEditComponent,{data});
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if(val){
          
          this.getEmployeList();
        }
      }
    })


  }



}
