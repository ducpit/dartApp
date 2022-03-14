export interface Game {
    activePlayer: number,
    inCondition: number,
    outCondition: number,
    finish: string,
    amount: number,
    type: string,
    difference: number,
    rounds: Array<{player: number, throw: number}>
}