import affiliation from '../../assets/data/contact.json';
import { Address } from "./address.model";
import { Contact } from "./contact.model";

export class PersonalAffiliation {
    private _affiliation:any = affiliation;

    private _role_tag: string;
    private _department: string;
    private _group: string;
    private _university: string;
    private _address: Address;
    private _contact: Contact;

    constructor() {
        this._role_tag = this._affiliation.role_tag;
        this._department = this._affiliation.department;
        this._group = this._affiliation.group;
        this._university = this._affiliation.university;
        this._address = new Address();
        this._address.loadData(this._affiliation.address);
        this._contact = new Contact();
        this._contact.loadData(this._affiliation.contact);
    }

    get role_tag(): string {
        return this._role_tag;
    }

    get department(): string {
        return this._department;
    }

    get group(): string {
        return this._group;
    }

    get university(): string {
        return this._university;
    }

    get address(): Address {
        return this._address;
    }

    get contact(): Contact {
        return this._contact;
    }
}
