import { Component, Inject , OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {CommonModule} from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeService } from '../services/employee.service';
import { CoreService } from '../core/core.service';


@Component({
  selector: 'app-emp-add-edit',
  standalone: true,
  imports: [CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
  HttpClientModule],
  templateUrl: './emp-add-edit.component.html',
  styleUrl: './emp-add-edit.component.scss'
})
export class EmpAddEditComponent implements OnInit {

  empForm : FormGroup;

education : string[] = [ 'post graduation', 'Graduation', 'Diploma', ];

constructor(private _fb: FormBuilder, private _empService:EmployeeService, private _dialogRef:MatDialogRef<EmpAddEditComponent>, @Inject(MAT_DIALOG_DATA) public data: any,private _coreservice: CoreService) {
  this.empForm = this._fb.group({
    fistname:'',
    lastname:'',
    email:'',
    dob:'',
    gender:'',
    education:'',
    company:'',
    experience:'',
    package:'',
  })

}


ngOnInit(): void {
  this.empForm.patchValue(this.data);
}


onFormSubmit(){
  if(this.empForm.valid){
    if(this.data){
      console.log(this.empForm.value);
      this._empService.updateEmploye(this.data.id,this.empForm.value).subscribe({
        next: (value: any) => {
        this._coreservice.openSnackBar('Employe upadated successfully','Done')
        this._dialogRef.close(true);
  
        },error: (err:any)=> {
          console.error(err)
        }
      })
    }else{
      console.log(this.empForm.value);
      this._empService.addEmploye(this.empForm.value).subscribe({
        next: (value: any) => {
        this._coreservice.openSnackBar('Employe added successfully','Done')
        this._dialogRef.close(true);
  
        },error: (err:any)=> {
          console.error(err)
        }
      })
    }

  }
}

}
