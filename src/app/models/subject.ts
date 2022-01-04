export class Subject {
    private _id: string;
    private _name: string;
    private _years: number[];
    private _status: string;
    private _university: string;
    private _faculty: string;
    private _summary: string[];
    private _url: string;
    private _tags: string[];
    private _type: string;

    constructor() {
        this._id = "";
        this._name = "";
        this._years = [];
        this._status = ""
        this._university = "";
        this._faculty = "";
        this._summary = [];
        this._url = "";
        this._tags = [];
        this._type = "";
    }

    loadData(data: any) {
        this._id = data.id;
        this._name = data.name;
        this._years = data.years;
        this._status = data.status;
        this._university = data.university;
        this._faculty = data.faculty;
        this._summary = data.summary;
        this._url = data.url;
        this._tags = data.tags;
        this._type = data.type;
    }

    get id(): string {
        return this._id;
    }

    get name(): string {
        return this._name;
    }
    
    get years(): number[] {
        return this._years;
    }

    get lastYear(): number {
        return this._years[this._years.length - 1];
    }

    get status(): string {
        return this._status;
    }
    
    get university(): string {
        return this._university;
    }

    get faculty(): string {
        return this._faculty;
    }
    
    get summary(): string[] {
        return this._summary;
    }

    get url(): string {
        return this._url;
    }

    get tags(): string[] {
        return this._tags;
    }

    get type(): string {
        return this._type;
    }
}
