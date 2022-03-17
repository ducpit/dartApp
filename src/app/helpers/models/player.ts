export interface Player {
    name: string,
    team: number,
    score: number,
    status: boolean,
    inStat: boolean;
    throws: Array<{throw: number}>
}