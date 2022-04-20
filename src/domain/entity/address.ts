
export default class Address{
  _street: string = "";
  _numberLocation: number = 0;
  _zip: string = "";
  _city: string = "";

  constructor(street: string, _numberLocation: number, zip: string, city: string) {
    this._street = street;
    this._numberLocation = _numberLocation;
    this._zip = zip;
    this._city = city;

    this.validate();
  }

  get street(): string {
    return this._street;
  }

  get number(): number {
    return this._numberLocation;
  }

  get zip(): string {
    return this._zip;
  }

  get city(): string {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._numberLocation === 0) {
      throw new Error("Number is required");
    }
    if (this._zip.length === 0) {
      throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  toString() {
    return `${this._street}, ${this._numberLocation}, ${this._zip} ${this._city}`;
  }
}