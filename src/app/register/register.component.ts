import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  aim = 'Your Perfect Banking Partner';
  accounts = "Enter your accno here ";

  //properties //
  // uname = "";
  // acno = "";
  // pswd = "";

  //register model

  registerForm=this.fb.group({//group
    uname:[''],//arrray
    acno:[''],//array
    pswd:['']//array
  })

  //control goes to register.html


  constructor(private fb:FormBuilder,private ds:DataService,private router:Router) { }  //dependency injection  //ds is the variable that is created for the database

  ngOnInit(): void {
  }
  Register() {
    // alert("Register clicked")
    console.log(this.registerForm);
    
    var uname = this.registerForm.value.uname;  
    var acno = this.registerForm.value.acno;
    var pswd = this.registerForm.value.pswd;

    // var userDetails=this.ds.userDetails;
    const result=this.ds.register(acno,uname,pswd);
    if(result){

      alert("Succesfully Registerd");
      this.router.navigateByUrl('')
      
    }
    else{
      alert("Something went wrong");
    }
  }

}
