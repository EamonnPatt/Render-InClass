"use strict";
export class Contact {
    constructor(id = "", fullName = "", contactNumber = "", emailAddress = "") {
        this._id = id;
        this._fullName = fullName;
        this._contactNumber = contactNumber;
        this._emailAddress = emailAddress;
    }
    get id() {
        return this._id;
    }
    set id(id) {
        this._id = id;
    }
    get fullName() {
        return this._fullName;
    }
    set fullName(fullName) {
        if (fullName.trim() === "") {
            throw new Error("Invalid full name: must be a non-empty string");
        }
        this._fullName = fullName;
    }
    get contactNumber() {
        return this._contactNumber;
    }
    set contactNumber(contactNumber) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(contactNumber)) {
            throw new Error("Invalid contactNumber: must be a 10 digit number");
        }
        this._contactNumber = contactNumber;
    }
    get emailAddress() {
        return this._emailAddress;
    }
    set emailAddress(emailAddress) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            throw new Error("Invalid email address: must be a non-empty string of email format");
        }
        this._emailAddress = emailAddress;
    }
    toString() {
        return `Full Name: ${this._fullName}\n 
                    Contact Number: ${this._contactNumber}\n 
                    Email Address: ${this._emailAddress}`;
    }
    serialize() {
        if (!this._fullName || !this._contactNumber || !this._emailAddress) {
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        }
        return `${this._fullName}, ${this._contactNumber}, ${this._emailAddress}`;
    }
    deserialize(data) {
        if (data.split(",").length !== 3) {
            console.error("Invalid data format for deserialization");
            return;
        }
        const propArray = data.split(",");
        this._fullName = propArray[0].trim();
        this._contactNumber = propArray[1].trim();
        this._emailAddress = propArray[2].trim();
    }
}
//# sourceMappingURL=contact.js.map