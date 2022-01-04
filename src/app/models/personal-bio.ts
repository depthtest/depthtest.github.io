import biography from '../../assets/data/biography.json';
import interests from '../../assets/data/interests.json';

export class PersonalBio {
    private _biography:any = biography;
    private _interests: any = interests;

    private _paragraphs: string[];
    private _fields: string[];

    constructor() {
        this._paragraphs = [];
        this._fields = [];
        for(let i=0; i<this._biography.paragraphs.length; i++) {
            this._paragraphs.push(this._biography.paragraphs[i]);
        }

        for(let i=0; i<this._interests.fields.length; i++) {
            this._fields.push(this._interests.fields[i]);
        }
    }

    get paragraphs(): string[] {
        return this._paragraphs;
    }

    get fields(): string [] {
        return this._fields;
    }
}
