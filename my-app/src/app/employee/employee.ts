import { Component } from '@angular/core';

import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee',
  standalone: true,  
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './employee.html',
  styleUrl: './employee.css'
})
export class Employee {

  constructor(private http:HttpClient) {}

  departments:any=[];
  employees:any=[];

  modalTitle = "";
  EmployeeId = 0;
  EmployeeName = "";
  Department="";
  DateOfJoining="";
  PhotoFileName="anonymous.png";
  PhotoPath=environment.PHOTO_URL;

  ngOnInit(): void {
    this.refreshList();
  }

  refreshList() {
    this.http.get<any>(environment.API_URL+'employee')
    .subscribe(data=>{
      this.employees=data;
    })

    this.http.get<any>(environment.API_URL+'department')
    .subscribe(data=>{
      this.departments=data;
    })
  }

  addClick(){
    this.modalTitle = "Add Employee";
    this.EmployeeId = 0;
    this.EmployeeName = "";
    this.DateOfJoining = "";
    this.Department = "";
    this.PhotoFileName="anonymous.jpeg";
  }
  
  editClick(emp:any){
    this.modalTitle = "Edit Employee";
    this.EmployeeId = emp.EmployeetId;
    this.EmployeeName = emp.EmployeeName;
    this.DateOfJoining = emp.DateOfJoining;
    this.Department = emp.Department;
    this.PhotoFileName = emp.PhotoFileName;
  }

  createClick(){
    var val={
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName,
    };

    this.http.post(environment.API_URL+'employee', val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

  updateClick(){
    var val={
      EmployeeId:this.EmployeeId,
      EmployeeName:this.EmployeeName,
      Department:this.Department,
      DateOfJoining:this.DateOfJoining,
      PhotoFileName:this.PhotoFileName,
    };

    this.http.put(environment.API_URL+'employee', val)
    .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
  }

  deleteClick(id:any){
    if(confirm('Are you sure?')){
      this.http.delete(environment.API_URL+'employee/'+id)
      .subscribe(res=>{
      alert(res.toString());
      this.refreshList();
    })
    };
  }

  imageUpload(event:any){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('file', file, file.name);

    this.http.post(environment.API_URL+'employee/savefile', formData)
    .subscribe((data:any)=>{
      this.PhotoFileName = data.toString();
    })
  }
}
