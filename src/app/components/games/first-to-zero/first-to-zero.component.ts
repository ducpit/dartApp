import { Component, OnInit } from '@angular/core';
import { FormGroup ,FormArray, FormControl } from '@angular/forms';
import { Player } from 'src/app/helpers/player';
import { Game } from 'src/app/helpers/game';

@Component({
  selector: 'app-first-to-zero',
  templateUrl: './first-to-zero.component.html',
  styleUrls: ['./first-to-zero.component.scss']
})
export class FirstToZeroComponent implements OnInit {

  players?: Player[] = [
    /* {
      name: "Timo",
      team: 1,
      score: 123,
      status: false,
      throws: [ 
        {throw: 12},
        {throw: 14} 
      ],
    }  */
  ];
  
  /* game?: Game = {
    activePlayer: 0,
    gameState: 0,
    inCondition: 1,
    outCondition: 1,
    finish: "string",
    number: 1,
    type: "string",
    difference: 1,
  };
 */

  game:Game = <Game>{};

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
  createPlayerObjects(player:any){
    if (this.ruleForm.value.startScore == "custom")
    {
      this.ruleForm.patchValue({startScore: this.ruleForm.value.customScore})
    }
    let newPlayer: Player = {
      name: player.name,
      team: player.team,
      score: this.ruleForm.value.startScore,
      status: false,
      throws: [ 
        {throw: 0},
       ],
   };
    this.players?.push(newPlayer);
  }

  setPlayerAktiv(i: number){
    if(typeof this.players != "undefined"){
      this.players[i].status = true;
    }
  }
  setPlayerInactive(i: number){
    if(typeof this.players != "undefined"){
      this.players[i].status = false;
    }
  }

  startGame(){
    // Create Player Objects
    this.settingsFinished = true;
    for (let i = 0; i < this.playersArray.length; i++) {
      this.createPlayerObjects(this.playersArray.value[i])
    }
    // Init Game Object
    this.game.activePlayer = 0;
    this.game.gameState =  0;
    this.game.inCondition = this.ruleForm.value.inCondition;
    this.game.outCondition = this.ruleForm.value.outCondition;
    this.game.finish = this.ruleForm.value.finish;
    this.game.number = this.ruleForm.value.number;
    this.game.type = this.ruleForm.value.type;
    this.game.difference = this.ruleForm.value.difference;
    this.setPlayerAktiv(0);
  }
  roundFinished(number: number){
    this.setPlayerInactive(this.game.activePlayer)
    if(typeof this.players != "undefined"){
      console.log(this.players[this.game.activePlayer].name)
      console.log(this.players[this.game.activePlayer].score)
      this.players[this.game.activePlayer].score = this.players[this.game.activePlayer].score - number;
      console.log(this.players[this.game.activePlayer].score)

      if ( this.game.activePlayer < this.players.length-1){
        this.game.activePlayer += 1;
      }
      else{
        this.game.activePlayer = 0; 
      }
    }
    
    this.setPlayerAktiv(this.game.activePlayer)
  }
}
