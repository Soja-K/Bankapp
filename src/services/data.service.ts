import { Injectable } from '@angular/core';
import { LoginComponent } from 'src/app/login/login.component';

@Injectable({
  providedIn: 'root'
})
export class DataService {


  //login name display
  currentUser: any;

  //login account details

  currentAcno: any;


  userDetails: any = {//object of objects
    1000: { acno: 1000, username: "Soja", password: 1000, balance: 10000, transaction: [] },
    1001: { acno: 1001, username: "Biju", password: 1001, balance: 20000, transaction: [] },
    1002: { acno: 1002, username: "Sriya", password: 1002, balance: 50000, transaction: [] },

  }


  // here the data is added because to avaoid the repeatation of data and this class provides the service//

  constructor() {
    this.getDetails();

  }

  //saveDetails()--to store data in the local storage
  saveDetails() {

    if (this.userDetails) {
      localStorage.setItem('database', JSON.stringify(this.userDetails));
    }
    if (this.currentAcno) {
      localStorage.setItem('currentAcno', JSON.stringify(this.currentAcno));
    }
    if (this.currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(this.currentUser));
    }
  }



  //getDetails()->to get data from the local storage



  getDetails() {

    if (localStorage.getItem('database')) {
      this.userDetails = JSON.parse(localStorage.getItem('database') || ' ');
    }
  }
  getcurrentUser() {
    if (localStorage.getItem('currentUser')) {
      this.userDetails = JSON.parse(localStorage.getItem('currentUser') || ' ');
    }
  }
  getcurrentAcno() {
    if (localStorage.getItem('currentAcno')) {
      this.userDetails = JSON.parse(localStorage.getItem('currentAcno') || ' ');
    }
  }





  //functin to register the new datils to the register form

  register(acno: any, username: any, password: any) {
    let userDetails = this.userDetails;
    if (acno in userDetails) {
      return false;
    }
    else {
      userDetails[acno] = {
        acno,
        username,
        password,
        balance: 0,
        transaction: []
      }
      console.log(userDetails);
      this.saveDetails();//function call
      return true;
    }
  }



  //function to login with the newly registerd value

  login(acno: any, pswd: any) {
    let userDetails = this.userDetails;
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        this.currentUser = this.userDetails[acno]['username']
        this.currentAcno = acno;
        this.saveDetails();
        return true;
      }
      else {
        alert('Incorrect password');
        return false;

      }
    }
    else {
      alert('Invalid user');
      return false;
    }
  }


  //deposit function


  deposit(acno: any, pswd: any, amt: any) {

    var userDetails = this.userDetails;
    var amount = parseInt(amt);
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        userDetails[acno]['balance'] += amount;
        userDetails[acno]['transaction'].push({
          type: 'Credit',
          amount
        })
        console.log(userDetails);
        this.saveDetails();
        return userDetails[acno]['balance'];



      }
      else {
        alert("incorrect password");
        return false;
      }

    }
    else {
      alert("invalid user");
      return false;
    }

  }
  withdraw(acno: any, pswd: any, amt: any) {

    var userDetails = this.userDetails;
    var amount = parseInt(amt);
    if (acno in userDetails) {
      if (pswd == userDetails[acno]['password']) {
        if (userDetails[acno]['balance'] > amount) {


          userDetails[acno]['balance'] -= amount;
          userDetails[acno]['transaction'].push({
            type: 'Debit',
            amount
          })
          console.log(userDetails);
          return userDetails[acno]['balance'];
          this.saveDetails();//function call
        }
        else {
          alert('Insufficient balance');
          return false;
        }
      }
      else {
        alert("incorrect password");
        return false;
      }


    }
    else {
      alert("invalid user");
      return false;
    }


  }
  getTransaction(acno: any) {
    return this.userDetails[acno]['transaction'];
  }
}