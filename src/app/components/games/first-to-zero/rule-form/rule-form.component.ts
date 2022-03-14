import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup ,FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-rule-form',
  templateUrl: './rule-form.component.html',
  styleUrls: ['./rule-form.component.scss']
})
export class RuleFormComponent implements OnInit {
  ruleForm: FormGroup;
  playersArray: FormArray;
  public showCustomScore = false;

  @Output() startGameEvent = new EventEmitter<FormGroup>();

  constructor() {   
    this.ruleForm = new FormGroup({
    startScore: new FormControl('501'),
    customScore: new FormControl('60'),
    inCondition: new FormControl('1'),
    outCondition: new FormControl('2'),
    difference: new FormControl('0'),
    finish: new FormControl('bestOf'),
    amount: new FormControl('3'),
    type: new FormControl('legs'),
    players: new FormArray([
      new FormGroup({
        name: new FormControl(''),
        team: new FormControl(0),
        bot: new FormControl('')
      })
    ]),
  })
  this.playersArray = <FormArray>this.ruleForm.controls['players']; 
}

  ngOnInit(): void {
  }

  onChangeScore(val : string){
    if (val === "custom"){
      this.showCustomScore = true;
    }
    else{
      this.showCustomScore = false;
    }
  }
  private createPlayerControl(count: number): FormGroup{
    return new FormGroup({
      name:new FormControl(''),
      team: new FormControl(count),
      bot: new FormControl('')
    })
  }
  addPlayer(count: number){
    this.playersArray.push(this.createPlayerControl(count))
  }
  removePlayer(i: number){
    this.playersArray.removeAt(i);
    return false;
  }
  startGame(FormData: FormGroup){
    this.startGameEvent.emit(FormData);
  }
}
