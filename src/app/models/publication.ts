export class Publication {
    private _id: string;
    private _title: string;
    private _authors: string[];
    private _journal: string;
    private _doi: string;
    private _year: number;
    private _publicationDate: Date;
    private _location: string;
    private _volume: string;
    private _num: string;
    private _pages: string;
    private _url: string;
    private _bibtextFile: string;
    private _mainImg: string;
    private _carouselImgs: string[];
    private _abstract: string[];
    private _tags: string[];
    private _type: string;

    constructor() {
        this._id = "";
        this._title = "";
        this._authors = [];
        this._journal = "";
        this._doi = "";
        this._year = 2020;
        this._publicationDate = new Date("2020-11-23");
        this._location = "";
        this._volume = "";
        this._num = "";
        this._pages = "";
        this._url = "";
        this._bibtextFile = "";
        this._mainImg = "";
        this._carouselImgs = [];
        this._abstract = [];
        this._tags = [];
        this._type = "";
    }

    loadData(data: any) {
        this._id = data.id;
        this._title = data.title;
        this._authors = data.authors;
        this._journal = data.journal;
        this._doi = data.doi;
        this._year = data.year;
        this._publicationDate = data.publication_date;
        this._location = data.location;
        this._volume = data.volume;
        this._num = data.number;
        this._pages = data.pages;
        this._url = data.url;
        this._bibtextFile = data.bibtex_file;
        this._mainImg = data.main_image;
        this._carouselImgs = data.carousel;
        this._abstract = data.abstract;
        this._tags = data.tags;
        this._type = data.type;
    }

    get id(): string {
        return this._id;
    }

    get title(): string {
        return this._title;
    }

    get authors(): string[] {
        return this._authors;
    }

    get journal(): string {
        return this._journal;
    }

    get doi(): string {
        return this._doi;
    }

    get year(): number {
        return this._year;
    }

    get publicationDate(): Date {
        return this._publicationDate;
    }

    get location(): string {
        return this._location;
    }

    get volume(): string {
        return this._volume;
    }

    get num(): string {
        return this._num;
    }

    get pages(): string {
        return this._pages;
    }

    get url(): string {
        return this._url;
    }

    get bibtextFile(): string {
        return this._bibtextFile;
    }

    get mainImg(): string {
        return this._mainImg;
    }

    get carouselImgs(): string[] {
        return this._carouselImgs;
    }

    get abstract(): string[] {
        return this._abstract;
    }

    get tags(): string[] {
        return this._tags;
    }

    get type(): string {
        return this._type;
    }

}
