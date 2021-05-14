let btnStart = document.getElementById("btnStart");
btnStart.addEventListener("click", async () => {
    let text = document.getElementById("text");
    text.textContent = "Click to select element!";
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function() {
            var element = "";
            var keypress = false;
            document.addEventListener("click", (e) => {
                if (element == "") {
                    element = document.elementFromPoint(e.clientX, e.clientY);
                    alert("SELECTED!");
                }
                if (keypress === false) {
                    document.addEventListener("keypress", function (event) {
                        if (event.keyCode === 32) {
                            element.click();
                        }
                    });
                    keypress = true;
                }
            });
        },
    });
});
