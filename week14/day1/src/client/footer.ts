"use strict";

export async function LoadFooter(){
    return fetch("views/components/footer.html")
        .then(response => response.text() )
        .then(html => {
            const footerElement = document.querySelector("footer");
            if(footerElement){
                footerElement.innerHTML = html;
            }else{
                console.error("[ERROR] Failed to locate the footer in the DOM");
            }
        })
        .catch(error => { console.error("[ERROR] Failed to load footer"); });
}