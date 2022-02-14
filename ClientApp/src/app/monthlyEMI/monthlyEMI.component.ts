import { Component, OnInit } from '@angular/core';
import { Occupations } from '../../Model/Occupation';

@Component({
  selector: 'monthlyEMI-component',
  templateUrl: './monthlyEMI.component.html',
  styleUrls: ['./monthlyEMI.css']
})
export class MonthlyEMIComponent implements OnInit {
  public occupation: Occupations[] = [];
  public dropDownValue: string = '';
  public factorValue: string = '';
  public monthlyEMI: any = '';


  ngOnInit() {
    // Values of the occupation dropdown
    this.occupation = [
      { Occupation: "Cleaner", value: "Light Manual" },
      { Occupation: "Doctor", value: "Professional" },
      { Occupation: "Author", value: "White Collar" },
      { Occupation: "Farmer", value: "Heavy Manual" },
      { Occupation: "Mechanic", value: "Heavy Manual" },
      { Occupation: "Florist", value: "Light Manual" },
    ]

  }
  onOccupationChanged(val: any) {
    this.dropDownValue = val;
    this.GetFactorValue(val);
    const deathCoverAmount = (document.getElementById("DSI") as HTMLInputElement).value;
    var age = (document.getElementById("age") as HTMLInputElement).value;
    if (this.ValidateInputs()) {
      this.CalculateMonthlyEMI(val, age, deathCoverAmount);
    }
  }

  //calculating the monthly EMI
  CalculateMonthlyEMI(val: any, age: string, deathCoverAmt: string) {
    const userAge = parseInt(age);
    const DCA = parseFloat(deathCoverAmt);
    const factor = parseFloat(this.factorValue);

    this.monthlyEMI = (DCA * userAge * factor) / (1000 * 12);
  }

  //getting factor value according to profession
  GetFactorValue(rating: any) {
    switch (rating) {
      case "Professional":
        this.factorValue = "1.0";
        break;
      case "White Collar":
        this.factorValue = "1.25";
        break;
      case "Light Manual":
        this.factorValue = "1.50";
        break;
      case "Heavy Manual":
        this.factorValue = "1.75";
        break;
    }
  }

  //Validating Input fields
  ValidateInputs() {
    const name = (document.getElementById("name") as HTMLInputElement).value;
    const deathCoverAmount = (document.getElementById("DSI") as HTMLInputElement).value;
    var age = (document.getElementById("age") as HTMLInputElement).value;
    const DOB = (document.getElementById("DOB") as HTMLInputElement).value;

    let isValid = true;
    if (name == null || name == undefined || name.length == 0) {
      document.getElementById("name").classList.add("is-invalid");
      document.getElementById("invalidName").style.display = "block";
      isValid = false;
    }
    else {
      document.getElementById("name").classList.remove("is-invalid");
      document.getElementById("invalidName").style.display = "none";
    }
    if (age == null || age == undefined || age.length == 0) {
      document.getElementById("age").classList.add("is-invalid");
      document.getElementById("invalidAge").style.display = "block";
      isValid = false;
    }
    else {
      document.getElementById("age").classList.remove("is-invalid");
      document.getElementById("invalidAge").style.display = "none";
    }
    if (DOB == null || DOB == undefined || DOB.length == 0) {
      document.getElementById("DOB").classList.add("is-invalid");
      document.getElementById("invalidDOB").style.display = "block";
      isValid = false;
    }
    else {
      document.getElementById("DOB").classList.remove("is-invalid");
      document.getElementById("invalidDOB").style.display = "none";
    }
    if (deathCoverAmount == null || deathCoverAmount == undefined || deathCoverAmount.length == 0) {
      document.getElementById("DSI").classList.add("is-invalid");
      document.getElementById("invalidDSI").style.display = "block";
      isValid = false;
    }
    else {
      document.getElementById("DSI").classList.remove("is-invalid");
      document.getElementById("invalidDSI").style.display = "none";
    }
    if (this.dropDownValue == null || this.dropDownValue == undefined || this.dropDownValue.length == 0 || this.dropDownValue == "0") {
      
      document.getElementById("invalidOccupation").style.display = "block";
      isValid = false;
    }
    else {
     
      document.getElementById("invalidOccupation").style.display = "none";
    }
    return isValid;
  }
}
