export interface Player {
    name: string,
    team: number,
    score: number,
    status: boolean,
    throws: Array<{throw: number}>
}