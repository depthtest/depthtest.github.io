export class Position {
    private _title: string;
    private _company: string;
    private _inidate: string;
    private _enddate: string;
    private _description: string;
    private _skills: string[];

    constructor() {
        this._title = "";
        this._company = "";
        this._inidate = "";
        this._enddate = "";
        this._description = "";
        this._skills = [];
    }

    loadData(data: any) {
        this._title = data.title;
        this._company = data.company;
        this._inidate = data.inidate;
        this._enddate = data.enddate;
        this._description = data.description;
        this._skills = data.skills;
    }

    get title(): string {
        return this._title;
    }

    get company(): string {
        return this._company
    }

    get inidate(): string {
        return this._inidate;
    }

    get enddate(): string {
        return this._enddate;
    }

    get description(): string {
        return this._description;
    }

    get skills(): string[] {
        return this._skills;
    }
}