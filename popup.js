document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('toggle').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: toggleNotebook
            });
        });
    });

    document.getElementById('save').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: saveNotes
            });
        });
    });

    document.getElementById('load').addEventListener('click', function() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                function: loadNotes
            });
        });
    });
});

function toggleNotebook() {
    var notebook = document.getElementById('notebook');
    if (notebook) {
        notebook.remove();
    } else {
        notebook = document.createElement('textarea');
        notebook.id = 'notebook';
        notebook.style.position = 'fixed';
        notebook.style.right = '0';
        notebook.style.top = '0';
        notebook.style.width = '400px';
        notebook.style.height = '100%';
        document.body.appendChild(notebook);
    }
}

function saveNotes() {
    var notebook = document.getElementById('notebook');
    if (notebook) {
        var notes = notebook.value;
        var url = window.location.href;
        localStorage.setItem(url, notes);
    }
}

function loadNotes() {
    var notebook = document.getElementById('notebook');
    if (notebook) {
        var url = window.location.href;
        var notes = localStorage.getItem(url);
        notebook.value = notes;
    }
}
