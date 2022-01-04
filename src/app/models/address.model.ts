export class Address {
    private _faculty: string;
    private _office: string;
    private _address: string;
    private _cp: string;
    private _city: string;
    private _country: string;

    constructor() {
        this._faculty = "";
        this._office = "";
        this._address = "";
        this._cp = "";
        this._city = "";
        this._country = "";
    }

    loadData(data: any): void {
        this._faculty = data.faculty;
        this._office = data.office;
        this._address = data.address;
        this._cp = data.cp;
        this._city = data.city;
        this._country = data.country;
    }

    get faculty(): string {
        return this._faculty;
    }

    get office(): string {
        return this._office;
    }

    get address(): string {
        return this._address;
    }

    get cp(): string {
        return this._cp;
    }

    get city(): string {
        return this._city;
    }

    get country(): string {
        return this._country;
    }
}
