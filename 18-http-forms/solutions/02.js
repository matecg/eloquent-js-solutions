(function (doc) {
    const output = doc.querySelector("#output");
    doc.querySelector("#button").addEventListener("click",
        () => {
            let code = doc.querySelector("#code").value;
            code = code.split("\n").join("");
            try {
                const runner = new Function(code);
                output.textContent = `${runner()}`;
            } catch (error) {
                output.textContent = `${error.message}`;
            }
        }
    )
})(document);
