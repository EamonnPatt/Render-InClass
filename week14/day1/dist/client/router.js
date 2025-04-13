"use strict";
import { LoadHeader } from "./header.js";
export class Router {
    constructor(routes) {
        this.routes = routes;
        this.init();
    }
    init() {
        window.addEventListener("DOMContentLoaded", () => {
            const path = location.hash.slice(1) || "/";
            console.log(`[INFO] Initial page load:${path}`);
            this.loadRoute(path);
        });
        window.addEventListener("popstate", () => {
            console.log(`[INFO] Navigating to...`);
            this.loadRoute(location.hash.slice(1));
        });
    }
    navigate(path) {
        location.hash = path;
    }
    loadRoute(path) {
        console.log(`[INFO] Loading route: ${path}`);
        const basePath = path.split("#")[0];
        if (!this.routes[basePath]) {
            console.warn(`[WARNING] Route not found: ${basePath}, redirecting to 404`);
            location.hash = "/404";
            path = "/404";
        }
        fetch(this.routes[basePath])
            .then(response => {
            if (!response.ok)
                throw new Error(`Failed to load ${this.routes[basePath]}`);
            return response.text();
        })
            .then(html => {
            const mainElement = document.querySelector("main");
            if (mainElement) {
                mainElement.innerHTML = html;
            }
            else {
                console.error("[ERROR] could not locate <main> element in the DOM");
            }
            LoadHeader().then(() => {
                document.dispatchEvent(new CustomEvent("routeLoaded", { detail: basePath }));
            });
        })
            .catch(error => {
            console.error("[ERROR] Error loading page: ", error);
        });
    }
}
//# sourceMappingURL=router.js.map