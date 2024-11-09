let count = 0;

chrome.tabs.onRemoved.addListener(() => {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
        if (tabs.length === 0 && count === 0) {
            count = 1;

            setTimeout(() => {
                chrome.tabs.create({});
            }, 80); //Delay added to handle closing all tabs glitch

            chrome.tabs.onCreated.addListener((tab) => {
                chrome.tabs.update(tab.id, { active: true }); //Explicit call is required
            });
            
            setTimeout(() => {
                count = 0;
            }, 100);
        }
    });
});



