import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  //login name display


  user = "";



  //deposit properties
  acno = "";
  pswd = "";
  amount = "";


  //withdraw properties

  acno1 = "";
  pswd1 = "";
  amount1 = "";

  //Date and time

  SystemDate: any;


  depositForm = this.fb.group({//group

    acno: ['', [Validators.required, Validators.pattern('[0-9]*')]],//array
    pswd: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],//array
    amount: ['', [Validators.required, Validators.pattern('[0-9]*')]],//arrray
  })

  withdrawForm = this.fb.group({//group

    acno1: ['', [Validators.required, Validators.pattern('[0-9]*')]],//array
    pswd1: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9]*')]],//array
    amount1: ['', [Validators.required, Validators.pattern('[0-9]*')]],//arrray
  })



  constructor(private fb: FormBuilder, private ds: DataService, private router: Router) {
    this.user = this.ds.currentUser;
    this.SystemDate = new Date();
  }

  ngOnInit(): void {
    //code for not come back to the login page while we logout
    if (!localStorage.getItem('currentAcno')) {
      alert('please login first');
      this.router.navigateByUrl('');
    }
  }
  deposit() {
    if (this.depositForm.valid) {
      var acno = this.depositForm.value.acno;
      var pswd = this.depositForm.value.pswd;
      var amount = this.depositForm.value.amount;

      const result = this.ds.deposit(acno, pswd, amount);//variable created for result 
      if (result) {//if result is true then go to the alert and present the updated balence      
        alert(`${amount} is credited....balance:${result}`);

      }
    }
    else {
      console.log(this.depositForm.get('acno')?.errors);
    }
  }
  withdraw() {
    if (this.withdrawForm.valid) {
      var acno = this.withdrawForm.value.acno1;
      var pswd = this.withdrawForm.value.pswd1;
      var amount = this.withdrawForm.value.amount1;
      const result = this.ds.withdraw(acno, pswd, amount);
      if (result) {
        alert(`${amount} is debited....balance:${result}`);

      }
    }
    else {
      console.log(this.withdrawForm.get('acno')?.errors);
    }
  }


  //}
  logout() {
    // alert('logout');


    //remove uname
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAcno');


    //navigate to login page

    this.router.navigateByUrl('');

  }

  delete() {
    //  alert('deleted');
    this.acno = JSON.parse(localStorage.getItem('currentAcno') || '');
  }


  onCancel() {

    this.acno = " ";
  }
}

