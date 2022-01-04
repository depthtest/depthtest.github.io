export class Contact {
    private _email: string;
    private _phone: string;

    constructor() {
        this._email = "";
        this._phone = "";
    }

    loadData(data: any): void {
        this._email = data.email;
        this._phone = data.phone;
    }

    get email(): string {
        return this._email;
    }

    get phone(): string {
        return this._phone;
    }
}
