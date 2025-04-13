"use strict";

/**
 * Dynamically loads the header from the header.html into the current page
 * @returns {Promise} Resolves when the header is successfully loaded
 */
export async function LoadHeader():Promise<void> {
    console.log("[INFO] LoadHeader() called...");

    return fetch("./views/components/header.html")
        .then(response => response.text())
        .then(data => {
            const headerElement = document.querySelector('header');
            if (headerElement) {
                headerElement.innerHTML = data;
            }else{
                console.error("[ERROR] Failed to locate header");
            }
            updateActiveNavLink();
            CheckLogin();
        })
        .catch (error => console.log("[ERROR] Unable to load header ", error));
}

/**
 * Update the navigation bar to highlight the current active page
 */
export function updateActiveNavLink() {
    console.log("[INFO] UpdateActiveNavLink() called...");

    //current page loaded in browser
    const currentPath = location.hash.slice(1) || "/";
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach((link) => {

        // remove hash symbol
        const linkPath = link.getAttribute("href")?.replace("#", "");
        if (currentPath === linkPath) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
}

export function handleLogout(event:Event) {
    event.preventDefault();
    sessionStorage.removeItem("user");
    console.log("[INFO] User logged out. Updating UI...");

    LoadHeader().then(() => {
        location.hash = "/"
    });
}

export function CheckLogin(){
    console.log("[INFO] Checking user login status.");

    const loginNav = document.getElementById("login") as HTMLAnchorElement;
    if(!loginNav){
        console.warn("[WARNING] loginNav element not found! Skipping CheckLogin().");
        return;
    }

    const userSession = sessionStorage.getItem("user");
    if(userSession) {
        loginNav.innerHTML = `<i class="fas fa-sign-out-alt"></i> Logout`;
        loginNav.href = "#";
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", handleLogout);
    }else{
        loginNav.innerHTML = `<i class="fas fa-sign-in-alt"></i> Login`;
        loginNav.removeEventListener("click", handleLogout);
        loginNav.addEventListener("click", () => location.hash = "/login");
    }
}




