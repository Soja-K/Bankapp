import { Component, OnInit } from '@angular/core';
import { FormBuilder, RequiredValidator, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd execution
  aim = 'Your Perfect Banking Partner';
  accounts = "Enter your accno here ";




  acno = '';
  pswd = '';




  loginForm = this.fb.group({
    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-z0-9]*')]],
  })


  constructor(private fb: FormBuilder, private router: Router, private ds: DataService) { } //1st execution
  //  1st router is the property of         and the second router the class of already created component class//

  //dependency injection



  ngOnInit(): void {  //life cycle hooks-initial process
  }

  userDetails: any = {//object of objects
    1000: { acno: 1000, username: "Soja", password: 1000, balance: 10000 },
    1001: { acno: 1001, username: "Biju", password: 1001, balance: 20000 },
    1002: { acno: 1002, username: "Sriya", password: 1002, balance: 50000 },

  }
  //userdefined function()  //4th execution
  acnoChange(event: any) {
    // console.log(event);
    console.log(event.target.value);
    this.acno = event.target.value;
  }

  pswdChange(event: any) {
    console.log(event.target.value);
    this.pswd = event.target.value;
  }
  login() {
    //alert("login clicked")
    // var acno = this.acno;
    // var pswd= this.pswd;
    if (this.loginForm.valid) {
      var acno = this.loginForm.value.acno;
      var pswd = this.loginForm.value.pswd;
      const result = this.ds.login(acno, pswd);


      if (result) {
        // var userDetails = this.userDetails;
        // if (acno in userDetails) {
        //   if (pswd == userDetails[acno]['password']) {
        alert("login success full");

        // this is used for the connection two component classes//

        this.router.navigateByUrl('dashboard');

      }
      //   else {
      //     alert("Incorrect password");
      //   }
      // }
      // else {
      //   alert("User does not exist")

    }
    else{
      console.log(this.loginForm.get('acno')?.errors);
    }

  }

}







  // login(a:any,p:any) {
          // .......... event binding usind template referencing...........//


  //   // alert("login clicked")
  //   // var acno = this.acno;
  //   // var pswd= this.pswd;
  //   var acno=a.value;
  //   var pswd=p.value;

  //   var userDetails = this.userDetails;
  //   if (acno in userDetails) {
  //     if (pswd == userDetails[acno]['password']) {
  //       alert("login success full");

  //     }
  //     else {
  //       alert("Incorrect password");
  //     }
  //   }
  //   else {
  //     alert("user does not exist")
  //   }
  // }

//}
