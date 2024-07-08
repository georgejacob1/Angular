import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';

@Component({
  selector: 'app-delet-conformation',
  standalone: true,
  imports: [MatButtonModule,MatDialogModule,CommonModule],
  templateUrl: './delet-conformation.component.html',
  styleUrl: './delet-conformation.component.scss'
})

export class DeletConformationComponent {
constructor(private _empService: EmployeeService, private _coreservice: CoreService, @Inject(MAT_DIALOG_DATA) public data: any,private _dialogRef:MatDialogRef<DeletConformationComponent>){
}
ngOnInit(){
  console.log(this.data);
}
deleterecord(){
  this._empService.deleteEmploye(this.data).subscribe({
      next: (res) => {
        console.log(this.data)
        this._coreservice.openSnackBar('Employe deleted','Done')
        this._dialogRef.close(true);
      },
      error(err){
        console.log(err)
      }
    })
}

}
