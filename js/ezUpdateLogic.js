// ********************************************
// Onpage data modification logic
// ********************************************

var lastReferencedId;

function showEditModal(modalReference, elementId) {
    tmp = document.getElementById(elementId).children[0];
    lastReferencedId = elementId;
    switch(modalReference) { 
        case '#codeUpdateModal':
            tmp = tmp.innerHTML.split('<br>');
            document.getElementById('codeLanguage_update').value = tmp[0].substring(9);
            document.getElementById('codeArea_update').value = tmp[1];
        break;
        case '#headerUpdateModal':
            document.getElementById('headerName_update').value = tmp.textContent;
            var styles = document.getElementsByClassName('headerStyle_update');
            var currentStyle = tmp.tagName.substring(1);
            for(var i = 0; i < styles.length; i++) {
                if(currentStyle == styles[i].value - 4) {
                    styles[i].classList.add('active');
                    currentlyActive = styles[i];
                    break;
                }
            }
        break;
    }
    $(modalReference).modal('show');
}

function updateCode() {
    // get
    var codeText = document.getElementById('codeArea_update').value;
    var codeLanguage = document.getElementById('codeLanguage_update').value;
    var codeToUpdate = document.getElementById(lastReferencedId).children[0]; // get pre element

    // validate
    if(validateCode(codeText) == false) { 
        return false;
    }

    // update
    if(!codeLanguage) {
        codeToUpdate.innerHTML = '```<br/>' + codeText + '<br/>```';
    }
    else {
        codeToUpdate.innerHTML = '```' + codeLanguage + '<br/>' + codeText + '<br/>```';
    }
}

function updateHeader() { 
    // get
    var title = document.getElementById('headerName_update').value;

    if(validateHeader(title) == false) {
        return false;
    }

    var headerToUpdate = document.getElementById(lastReferencedId).children[0]; // get h element

    headerToUpdate.textContent = title;
    var tag = headerToUpdate.tagName.toLowerCase();

    var headerType = listOption - 4; // 5(h1), 6, 7, 8, 9, 10(h6)

    if(listOption < 5) {
        headerType = 6;
    }

    headerToUpdate.outerHTML = headerToUpdate.outerHTML.replace(tag, 'h' + headerType);
}