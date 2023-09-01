import professional from '../../assets/data/professional.json';
import { Position } from "./position";

export class Professional {
    private _professional: any = professional;
    private _positions: Position[];

    constructor() {
        this._positions = [];
        for(let i=0; i<this._professional.positions.length; i++) {
            this._positions.push(new Position());
            this._positions[i].loadData(this._professional.positions[i]);
        }
        this._positions = this._positions.reverse();
    }

    get positions(): Position[] {
        return this._positions;
    }
}
