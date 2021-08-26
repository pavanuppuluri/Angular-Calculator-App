import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html',
  styleUrls: ['./calculator.component.css']
})
export class CalculatorComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  input:string = '';
  result:string = '';
  
 
  concatInput(num: string) {

    // As we are allowing decimal point calculations
    // We need to ensure that decimal(.) can be entered
    // only once for a given number
    // To do this, we need to get the last number
    // Ex. If user entered 1 then last operand is 1
    // If user entered 1+23 then last operand is 23
    // If user entered 1+23+456 then last operand is 356
    // Now in the last operand string we need to check if . is there already
    // If . is there, then don't allow user to enter another .
    
    if (num==".") {
      if (this.input !="" ) {
 
        const lastNum=this.getLastNumber()
        console.log(lastNum.lastIndexOf("."))
        if (lastNum.lastIndexOf(".") >= 0) return;
      }
    }
 
    // User input should not start with 0 or operator
    if (num=="0" || num == '/' || num == '*' || num == '-' || num == '+') {
      if (this.input=="" ) {
        return;
      }     
    }
 
    this.input = this.input + num
    this.calcAnswer();
  }
 
 
  getLastNumber() {
    let position:number;
    console.log(this.input)
    position=this.input.toString().lastIndexOf("+")
    if (this.input.toString().lastIndexOf("-") > position) position=this.input.lastIndexOf("-")
    if (this.input.toString().lastIndexOf("*") > position) position=this.input.lastIndexOf("*")
    if (this.input.toString().lastIndexOf("/") > position) position=this.input.lastIndexOf("/")    
    return this.input.substr(position+1)
  }
 
 
  operatorClicked(operator: string) {
 
    //Do not allow operators more than once
    const lastKey = this.input[this.input.length - 1];
    if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+')  {
      return;
    }
   
    this.input = this.input + operator
    this.calcAnswer();
  }
 
 
  deleteLastChar() {
    if (this.input !="" ) {
      this.input=this.input.substr(0, this.input.length-1)
    }
  }
 
  reset() {
    this.result = '';
    this.input = '';
  }
 
  calcAnswer() {
 
    this.result = eval(this.input);
  }
 
  getAnswer() {
    this.calcAnswer();
    this.input = this.result;
    if (this.input=="0") this.input="";
  }

}
