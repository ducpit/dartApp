import { Component, OnInit } from '@angular/core';
import { Player } from 'src/app/helpers/player';
import { Game } from 'src/app/helpers/game';
import { FormGroup } from '@angular/forms';



@Component({
  selector: 'app-first-to-zero',
  templateUrl: './first-to-zero.component.html',
  styleUrls: ['./first-to-zero.component.scss']
})
export class FirstToZeroComponent implements OnInit {

  players: Player[] = [];
  game: Game = <Game>{};


  public settingsFinished = false;

  constructor() { }

  ngOnInit(): void { }

  setPlayerAktiv(i: number) {
    if (typeof this.players != "undefined") {
      this.players[i].status = true;
    }
  }
  setPlayerInactive(i: number) {
    if (typeof this.players != "undefined") {
      this.players[i].status = false;
    }
  }

  startGame(FormData: FormGroup) {
    console.log("Start Game Parent")
    console.log()
    this.settingsFinished = true;
    
    // Create Player Objects
    for (let i = 0; i < Object.values(FormData)[8].length; i++) {
      console.log("Player init "+ String(i))
      if (Object.values(FormData)[0] == "custom") {
        FormData.patchValue({ startScore: Object.values(FormData)[1] })
      }
      let newPlayer: Player = {
        name: Object.values(FormData)[8][i].name,
        team: Object.values(FormData)[8][i].team,
        score: Object.values(FormData)[0],
        status: false,
        inStat: false,
        throws: [
          { throw: 0 },
        ],
      };
      this.players?.push(newPlayer);
    }
    // Init Game Object
    this.game.activePlayer = 0;
    this.game.inCondition = Object.values(FormData)[2];
    this.game.outCondition = Object.values(FormData)[3];
    this.game.finish = Object.values(FormData)[4];
    this.game.amount = Object.values(FormData)[5];
    this.game.type =  Object.values(FormData)[6];
    this.game.difference =  Object.values(FormData)[7];
    this.setPlayerAktiv(0);
  }
  roundFinished(number: string) {
    this.setPlayerInactive(this.game.activePlayer)
    if (typeof this.players != "undefined") {

      console.log(this.players[this.game.activePlayer].name)
      console.log(this.players[this.game.activePlayer].score)
      this.players[this.game.activePlayer].score = this.players[this.game.activePlayer].score - +number;
      console.log(this.players[this.game.activePlayer].score)

      if (this.game.activePlayer < this.players.length - 1) {
        this.game.activePlayer += 1;
      }
      else {
        this.game.activePlayer = 0;
      }
    }

    this.setPlayerAktiv(this.game.activePlayer)
  }
}
