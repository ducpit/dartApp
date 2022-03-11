import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-first-to-zero',
  templateUrl: './first-to-zero.component.html',
  styleUrls: ['./first-to-zero.component.scss']
})
export class FirstToZeroComponent implements OnInit {
  ruleForm: FormGroup;
  playersArray: FormArray;
  //
  public showCustomScore = false;
  public settingsFinished = false;
  // 
  constructor() { 
    this.ruleForm = new FormGroup({
      startScore: new FormControl('501'),
      customScore: new FormControl('60'),
      inCondition: new FormControl('1'),
      outCondition: new FormControl('2'),
      difference: new FormControl('0'),
      finish: new FormControl('bestOf'),
      number: new FormControl('3'),
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
      this.ruleForm.patchValue({startScore: val})
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
  startGame(){
    this.settingsFinished = true;
    console.log(this.ruleForm.value)
  }

}
