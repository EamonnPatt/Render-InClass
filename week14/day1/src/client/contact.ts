"use strict";

/**
 * Represents a Contact with a name, contact number and email address
 */

export class Contact {

    private _id: string;
    private _fullName: string;
    private _contactNumber: string;
    private _emailAddress: string;


    /**
     * Constructs a new Contact instance
     * @param id
     * @param fullName
     * @param contactNumber
     * @param emailAddress
     */
    constructor(id:string = "",fullName:string = "", contactNumber:string = "", emailAddress:string = "") {
        this._id = id;
        this._fullName = fullName;
        this._contactNumber = contactNumber;
        this._emailAddress = emailAddress;
    }

    get id(): string {
        return this._id;
    }

    set id(id: string) {
        this._id = id;
    }

    /**
     * Gets the full name of the contact
     * @returns {string}
     */
    get fullName():string {
        return this._fullName;
    }

    /**
     * Sets the full name of the contact. Validates input to ensure it's a non-empty string
     * @param fullName
     */
    set fullName(fullName:string) {
        if (fullName.trim() === "") {
            throw new Error("Invalid full name: must be a non-empty string");
        }
        this._fullName = fullName;
    }

    /**
     * Gets the contact number of the contact
     * @returns {string}
     */
    get contactNumber():string {
        return this._contactNumber;
    }

    /**
     * Sets the contact number for the contact
     * @param contactNumber
     */
    set contactNumber(contactNumber:string) {
        const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
        if (!phoneRegex.test(contactNumber)) {
            throw new Error("Invalid contactNumber: must be a 10 digit number");
        }
        this._contactNumber = contactNumber;
    }

    /**
     * Gets the email address for the contact
     * @returns {string}
     */
    get emailAddress():string {
        return this._emailAddress;
    }

    /**
     * Sets the email address for the contact
     * @param emailAddress
     */
    set emailAddress(emailAddress:string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailAddress)) {
            throw new Error("Invalid email address: must be a non-empty string of email format");
        }
        this._emailAddress = emailAddress;
    }

    /**
     * Convert the contact details into a human-readable string format
     * @returns {string}
     */
    toString():string {
        return `Full Name: ${this._fullName}\n 
                    Contact Number: ${this._contactNumber}\n 
                    Email Address: ${this._emailAddress}`;
    }

    /**
     * Serializes the contact details into a string format suitable for storage
     * @returns {string|null}
     */
    serialize():string|null {
        if (!this._fullName || !this._contactNumber || !this._emailAddress) {
            console.error("One or more of the contact properties are missing or invalid");
            return null;
        }
        return `${this._fullName}, ${this._contactNumber}, ${this._emailAddress}`;
    }

    /**
     * Deserialize a string of contact details and updates the contact properties
     * @param data
     */
    deserialize(data:string) {
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
