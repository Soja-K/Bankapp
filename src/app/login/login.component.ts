import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {//3rd execution
  aim = 'your perfect banking partner';
  accounts = "Enter your accno here ";




  acno = '';
  pswd = '';


  constructor() { } //1st execution

  ngOnInit(): void {  //life cycle hooks-initial process
  }

  userDetails:any = {//object of objects
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
    // alert("login clicked")
    var acno = this.acno;
    var pswd= this.pswd;

    var userDetails = this.userDetails;
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        alert("login success full");

      }
      else {
        alert("Incorrect password");
      }
    }
    else {
      alert("user does not exist")
    }
  }

}
