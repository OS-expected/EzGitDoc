// ********************************************
// Onpage data modification logic
// ********************************************

var lastReferencedId;

function showEditModal(modalReference, elementId) {
    lastReferencedId = elementId;
    switch(modalReference) { 
        case '#codeUpdateModal':
            var tmp = document.getElementById(elementId).children[0].innerHTML.split('<br>');
            console.log(tmp);
            document.getElementById('codeLanguage_update').value = tmp[0].substring(9);
            document.getElementById('codeArea_update').value = tmp[1];
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