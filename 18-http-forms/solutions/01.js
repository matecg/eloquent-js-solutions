/**
 * Solution(s) to Chapter 18 - Problem 1: Content Negotion
*/

const URL = "https://eloquentjavascript.net/author";

fetchAuthorText();
fetchAuthorJSON();
fetchAuthorHTML();
fetchAuthorWTF();

async function fetchAuthorText() {
    const resp = await fetch(URL, {
        headers: {
            "Accept": "text/plain"
        }
    });
    const data = await resp.text();
    console.log(data);
}

async function fetchAuthorJSON() {
    const resp = await fetch(URL, {
        headers: {
            "Accept": "application/json"
        }
    })
    const data = await resp.json();
    console.log(data);
}

async function fetchAuthorHTML() {
    const resp = await fetch(URL, {
        headers: {
            "Accept": "text/html"
        }
    })
    const data = await resp.text();
    console.log(data);
}

async function fetchAuthorWTF() {
    const resp = await fetch(URL, {
        headers: {
            "Accept": "application/rainbows+unicorns"
        }
    });
    console.log(resp);
}