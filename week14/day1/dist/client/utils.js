"use strict";
import { Contact } from "./contact.js";
import { createContact, updateContact } from "./api/index.js";
const VALIDATION_RULES = {
    fullName: {
        regex: /^[A-Za-z\s]+$/,
        errorMessage: "Full name must only contain letters and spaces."
    },
    contactNumber: {
        regex: /^\d{3}-\d{3}-\d{4}$/,
        errorMessage: "Contact Number must be in format ###-###-####"
    },
    emailAddress: {
        regex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        errorMessage: "Email address must be a valid email address"
    }
};
export function validateInput(fieldID) {
    const field = document.getElementById(fieldID);
    const errorElement = document.getElementById(`${fieldID}-error`);
    const rule = VALIDATION_RULES[fieldID];
    if (!field || !errorElement || !rule) {
        console.warn(`[WARN] Validation rule not found for: ${fieldID}`);
        return false;
    }
    if (field.value.trim() === "") {
        errorElement.textContent = "The field is required";
        errorElement.style.display = "block";
        errorElement.style.marginLeft = "5px";
        return false;
    }
    if (!rule.regex.test(field.value)) {
        errorElement.textContent = rule.errorMessage;
        errorElement.style.display = "block";
        errorElement.style.marginLeft = "5px";
        return false;
    }
    errorElement.textContent = "";
    errorElement.style.display = "none";
    return true;
}
export function validateForm() {
    return (validateInput("fullName") &&
        validateInput("contactNumber") &&
        validateInput("emailAddress"));
}
export async function AddContact(fullName, contactNumber, emailAddress, router) {
    console.log("[DEBUG] AddContact() triggered.");
    if (!validateForm()) {
        alert("Form contains errors. Please correct them before submitting");
        return;
    }
    try {
        const newContact = { fullName, contactNumber, emailAddress };
        await createContact(newContact);
        router.navigate("/contact-list");
    }
    catch (error) {
        console.log(` [ERROR] Failed to add Contact: ${error}`);
    }
}
export async function DisplayWeather() {
    const apiKey = "c6a945e0f9d8bb8019299c3a5c1eac78";
    const city = "Oshawa";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
        if (!response.ok)
            throw new Error("Failed to fetch weather data");
        return response.json();
    })
        .then((data) => {
        const weatherDataElement = document.getElementById("weather-data");
        if (weatherDataElement) {
            weatherDataElement.innerHTML = `<strong>City: </strong> ${data.name}<br>
                                            <strong>Temperature: </strong> ${data.main.temp} °C<br>
                                            <strong>Weather: </strong> ${data.weather[0].description}
                                            `;
        }
        else {
            console.warn("[WARNING] Element with ID 'weather-data' not found");
        }
    })
        .catch((error) => {
        console.error("[ERROR] Failed to fetch weather data", error);
        const weatherElement = document.getElementById("weather-data");
        if (weatherElement) {
            weatherElement.textContent = "Unable to fetch weather data";
        }
    });
}
export function attachValidationListeners() {
    console.log("[INFO] attaching validation listeners...");
    Object.keys(VALIDATION_RULES).forEach((fieldID) => {
        const field = document.getElementById(fieldID);
        if (!field) {
            console.warn(`[WARN] field '${fieldID}' not found. Skipping listener attachment`);
            return;
        }
        addEventListenersOnce(fieldID, "input", () => validateInput(fieldID));
    });
}
export function addEventListenersOnce(elementId, event, handler) {
    const element = document.getElementById(elementId);
    if (element) {
        element.removeEventListener(event, handler);
        element.addEventListener(event, handler);
    }
    else {
        console.warn(`[WARN] element with Id '${elementId}' not found`);
    }
}
export function handleCancelClick(router) {
    router.navigate("/contact-list");
}
export async function handleEditClick(event, contactId, router) {
    event.preventDefault();
    if (!validateForm()) {
        alert("Form contains errors. Please correct them before submitting");
        return;
    }
    const fullName = document.getElementById("fullName").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const emailAddress = document.getElementById("emailAddress").value;
    try {
        await updateContact(contactId, { fullName, contactNumber, emailAddress });
        router.navigate("/contact-list");
    }
    catch (error) {
        console.error(`[ERROR] Failed to update contact: ${error}`);
    }
}
export function saveToStorage(key, value) {
    try {
        let storageValue;
        if (key.startsWith("contact_") && value instanceof Contact) {
            const serialized = value.serialize();
            if (!serialized) {
                console.error(`[ERROR] Failed to serialize contact for key: ${key}`);
                return;
            }
            storageValue = serialized;
        }
        else {
            storageValue = JSON.stringify(value);
        }
        localStorage.setItem(key, storageValue);
        console.log(`[INFO] Data save successfully to storage with ${key}.`);
    }
    catch (error) {
        console.error(`[ERROR] Failed to store data with ${key} to storage.`);
    }
}
export function removeFromStorage(key) {
    try {
        if (localStorage.getItem(key) != null) {
            localStorage.removeItem(key);
            console.log(`[INFO] Data with ${key} successfully to removed from storage}.`);
        }
        else {
            console.warn(`[WARN} Key '${key}' not found in storage.`);
        }
    }
    catch (error) {
        console.error(`[ERROR] Failed to remove from storage with ${key}`);
    }
}
export function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        if (!data)
            return null;
        if (key.startsWith("contact_")) {
            const contact = new Contact();
            contact.deserialize(data);
            return contact;
        }
        return JSON.parse(data);
    }
    catch (error) {
        console.error(`[ERROR] Failed to get from storage with ${key}`);
        return null;
    }
}
//# sourceMappingURL=utils.js.map