"use strict";

import { Contact } from "../../contact.js";

interface ContactData {
    //id:string;
    fullName:string;
    contactNumber:string;
    emailAddress:string;
}

export async function fetchContacts(): Promise<Contact[]> {
    const response = await fetch('/api/contacts');
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}

export async function fetchContact(id:string): Promise<Contact> {
    const response = await fetch(`/api/contacts/${id}`);
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    return response.json();
}

export async function createContact(contact:ContactData): Promise<Contact> {
    const response = await fetch(`/api/contacts/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    if(!response.ok) throw new Error(`Failed to fetch contacts: ${response.statusText}`);
    const data = await response.json();
    return new Contact(data.id, data.fullName, data.contactNumber, data.emailAddress);
}

export async function updateContact(id:string, contact:ContactData): Promise<Contact> {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contact),
    });
    if(!response.ok) throw new Error(`Failed to update contacts: ${response.statusText}`);
    const data = await response.json();
    return new Contact(data.id, data.fullName, data.contactNumber, data.emailAddress);
}

export async function deleteContact(id:string): Promise<void> {
    const response = await fetch(`/api/contacts/${id}`, {
        method: 'DELETE',
    });
    if(!response.ok) throw new Error(`Failed to update contacts: ${response.statusText}`);
}