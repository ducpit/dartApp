import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-keyboard',
  templateUrl: './keyboard.component.html',
  styleUrls: ['./keyboard.component.scss']
})
export class KeyboardComponent implements OnInit {

  public amount: string = ''

  constructor() { }

  @Output() doneEvent = new EventEmitter<string>();

  ngOnInit(): void {
  }

  buttonClicked(value: string){
    this.amount = this.amount + value;
  }

  del(){
    console.log(this.amount)
    this.amount = this.amount.slice(0, -1);
    
  }
  done(){
    if (+this.amount<=180){
      this.doneEvent.emit(this.amount);
      this.amount = "";
    }
    else{
      this.amount="Error"
      }
  }
}
