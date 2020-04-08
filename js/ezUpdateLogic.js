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
                if(currentStyle == styles[i].value - 9) {
                    styles[i].classList.add('active');
                    currentlyActive_update = styles[i];
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
        case '#linkUpdateModal':
            document.getElementById('hrefName_update').value = tmp.textContent;
            document.getElementById('hrefAddress_update').value = tmp.href;
        break;
        case '#listUpdateModal':
            $("#list_update_dynamic_fields").empty();

            var firstElementTag = tmp.tagName;
            var listSize;
            var listFieldSpace = document.getElementById('list_update_dynamic_fields');

            if(firstElementTag == 'P') {
                listSize = document.getElementById(lastReferencedId).children.length;
                tmp = document.getElementById(elementId);
                for(var i = 0; i < listSize - 2; i++) {
                    var row = document.createElement('div');
                    row.classList.add('row', 'listUpdateData');
                    row.appendChild(setInputField(tmp.children[i].childNodes[0].textContent.replace(/:/g, '').trim(), 3));
                    row.appendChild(setInputField(tmp.children[i].childNodes[1].textContent.replace(/:/g, '').trim(), 4));
                    row.appendChild(setInputField(tmp.children[i].childNodes[2].textContent.trim(), 5));
                    listFieldSpace.appendChild(row);
                }      
            } else if (firstElementTag == 'UL') {
                listSize = tmp.getElementsByTagName("LI").length;
                firstLI_Tag = tmp.childNodes[0].firstChild.tagName;

                if(firstLI_Tag == 'A') {
                    for(var i = 0; i < listSize; i++) {
                        var row = document.createElement('div');
                        row.classList.add('row', 'listUpdateData');
                        row.appendChild(setInputField(tmp.childNodes[i].textContent, 6));
                        row.appendChild(setInputField(tmp.childNodes[i].children[0].href, 6));
                        listFieldSpace.appendChild(row);
                    }  
                } else {
                    for(var i = 0; i < listSize; i++) {
                        var row = document.createElement('div');
                        row.classList.add('row', 'listUpdateData');
                        row.appendChild(setInputField(tmp.childNodes[i].textContent, 12));
                        listFieldSpace.appendChild(row);
                    }
                }
            }
        break;
    }

    $(modalReference).modal('show');
}

function setInputField(placeholder, columnSize) {
    var col = document.createElement('div');
    col.classList.add('col-' + columnSize);

    var input = document.createElement('input');
    input.classList.add('form-control');
    input.autocomplete = 'off';
    input.value = placeholder;
    input.style.marginTop = '2px';

    col.appendChild(input);
    return col;
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

    var headerType = listOption - 9; // 10(h1), 11, 12, 13, 14, 15(h6)

    if(listOption < 10) {
        headerType = 2;
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

function updateLink() {
    // 1. get
    var linkName = document.getElementById('hrefName_update').value;
    var linkHref = document.getElementById('hrefAddress_update').value;

    // 2. validate
    if (validateLink(linkName, linkHref) == false) {
        return false;
    }

    // 3. update
    var linkToUpdate = document.getElementById(lastReferencedId).children[0]; // get anchor

    linkToUpdate.textContent = linkName;
    linkToUpdate.href = linkHref;

    return true;
}

function updateList() {
    // 3. update
    var listToUpdate = document.getElementById(lastReferencedId);
    var newData = document.getElementsByClassName('listUpdateData');
    var firstElementTag = listToUpdate.children[0].tagName;
    var listSize;

    if(firstElementTag == 'P') {
        listSize = document.getElementById(lastReferencedId).children.length;
        for(var i = 0; i < listSize - 2; i++) {
            var col1 = newData[i].children[0].childNodes[0].value;
            var col2 = newData[i].children[1].childNodes[0].value;
            var col3 = newData[i].children[2].childNodes[0].value;
            if(!col1) {
                col1 = 'empty';
            }
            if(!col2) {
                col2 = 'empty';
            }
            if(!col3) {
                col3 = 'empty';
            }
            listToUpdate.children[i].innerHTML = ':' + col1 + ':' + ' <strong>' + col2 + '</strong>: ' + col3;
        }
    } else if (firstElementTag == 'UL') {
        listSize = listToUpdate.children[0].getElementsByTagName("LI").length;
        firstLI_Tag = listToUpdate.children[0].childNodes[0].firstChild.tagName;
        if(firstLI_Tag == 'A') {
            for(var i = 0; i < listSize; i++) { 
                var col1 = newData[i].children[0].childNodes[0].value;
                var col2 = newData[i].children[1].childNodes[0].value;
                listToUpdate.children[0].childNodes[i].innerHTML = '<a href=\"' + col2 + '\"/>' + col1 + '</a>'; 
            }
        } else {
            for(var i = 0; i < listSize; i++) { 
                var col1 = newData[i].children[0].childNodes[0].value;
                listToUpdate.children[0].childNodes[i].textContent = col1;; 
            }
        }
    }
}