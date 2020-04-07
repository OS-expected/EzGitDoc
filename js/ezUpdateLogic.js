// ********************************************
// Onpage data modification logic
// ********************************************

var lastReferencedId;

function showEditModal(modalReference, elementId) {
    var tmp = document.getElementById(elementId).children[0];
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
        case '#imageUpdateModal':
            document.getElementById('altImageText_update').value = tmp.alt;
            if(tmp.src.includes('placehold') == false) {
                document.getElementById('imageURL_update').value = tmp.src;
            }
            var paragraphAlignVal = document.getElementById(elementId).style.textAlign;
            var alignNumericValue = 1;
            if(paragraphAlignVal == 'left') {
                alignNumericValue = 1;
            } else if(paragraphAlignVal == 'center') {
                alignNumericValue = 2;
            } else if(paragraphAlignVal == 'right') {
                alignNumericValue = 3;
            }
            document.getElementById('imagePositionList_update').value = alignNumericValue;
            document.getElementById('xAxisProperty_update').value = tmp.width;
            document.getElementById('yAxisProperty_update').value = tmp.height;
        break;
    }
    $(modalReference).modal('show');
}

function updateCode() {
    // get
    var codeText = document.getElementById('codeArea_update').value;
    var codeLanguage = document.getElementById('codeLanguage_update').value;

    // validate
    if(validateCode(codeText) == false) { 
        return false;
    }

    // update
    var codeToUpdate = document.getElementById(lastReferencedId).children[0]; // get pre element

    if(!codeLanguage) {
        codeToUpdate.innerHTML = '```<br/>' + codeText + '<br/>```';
    }
    else {
        codeToUpdate.innerHTML = '```' + codeLanguage + '<br/>' + codeText + '<br/>```';
    }
}

function updateHeader() { 
    // 1. get
    var title = document.getElementById('headerName_update').value;

    // 2. validate
    if(validateHeader(title) == false) {
        return false;
    }

    // 3. update
    var headerToUpdate = document.getElementById(lastReferencedId).children[0]; // get h element

    headerToUpdate.textContent = title;
    var tag = headerToUpdate.tagName.toLowerCase();

    var headerType = listOption - 4; // 5(h1), 6, 7, 8, 9, 10(h6)

    if(listOption < 5) {
        headerType = 6;
    }

    headerToUpdate.outerHTML = headerToUpdate.outerHTML.replace(tag, 'h' + headerType);
}

function updateImage() {
    // 1. get
    var imageAlt = document.getElementById('altImageText_update').value;
    var imageURL = document.getElementById('imageURL_update').value.trim();
    var xAxisVal = document.getElementById('xAxisProperty_update').value.trim();
    var yAxisVal = document.getElementById('yAxisProperty_update').value.trim();
    var imagePosition = document.getElementById('imagePositionList_update');

    // 2. validate
    if(validateImage(imageAlt, xAxisVal, yAxisVal, imageURL) == false) {
        return false;
    }

    // 3. update
    var imageToUpdate = document.getElementById(lastReferencedId).children[0]; // get img element
    var paragraph = document.getElementById(lastReferencedId);

    // ALT
    imageToUpdate.alt = imageAlt;

    // X/Y
    if (xAxisVal != 0 && yAxisVal != 0)
    {
        imageToUpdate.setAttribute('width', xAxisVal);
        imageToUpdate.setAttribute('height', yAxisVal);

        tmpImageAdress = basicImage + xAxisVal + 'x' + yAxisVal;
    }
    else if (xAxisVal != 0 && yAxisVal == 0)
    {
        imageToUpdate.setAttribute('width', xAxisVal);
        imageToUpdate.classList.add('wide');

        tmpImageAdress = basicImage + xAxisVal;
    }
    else if (xAxisVal == 0 && yAxisVal != 0)
    {
        imageToUpdate.setAttribute('height', yAxisVal);
        imageToUpdate.classList.add('high');

        tmpImageAdress = basicImage + yAxisVal;
    }

    // URL
    if (imageURL == 'blank')
    {
        imageToUpdate.src = tmpImageAdress;
    }
    else if (validateURL(imageURL) == true)
    {
        imageToUpdate.src = imageURL;
    }

    switch (imagePosition.value) {
        case '1':
            paragraph.style.textAlign = 'left';
        break;
        case '2':
            paragraph.style.textAlign = 'center';
        break;
        case '3':
            paragraph.style.textAlign = 'right';
        break;
        default:
            paragraph.style.textAlign = 'center';
        break;
    }
}