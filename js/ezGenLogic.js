// ********************************************
// Settings Management
// ********************************************
var isAutomatedModalEnabled;
var isAutoToastHideEnabled;
var isHintKeyEnabled; 

function updateSetting(id) {

    if (id == 'autoModals') {
        isAutomatedModalEnabled = document.getElementById('autoMod_switch').checked;

        changeStatusLabel(isAutomatedModalEnabled, 'autoMod_switch_label');
    }
    else if (id == 'autoDisappear') {
        isAutoToastHideEnabled = document.getElementById('autoDisappear_switch').checked;

        changeStatusLabel(isAutoToastHideEnabled, 'autoDisappear_switch_label');
    }
    else if(id == 'hintKeys') {
        isHintKeyEnabled = document.getElementById('hintKeys_switch').checked;

        changeStatusLabel(isHintKeyEnabled, 'hintKeys_switch_label');
        
        if(isHintKeyEnabled) { 
            manageKeyHints('show');
        } else {
            manageKeyHints('hide');
        }
    }
}

function changeStatusLabel(checkStatus, labelId) { 
    var tmp = document.getElementById(labelId);
    if(checkStatus == true) {
        tmp.classList.remove('badge-danger');
        tmp.classList.add('badge-success');
        tmp.textContent = 'enabled';
    }
    else {
        tmp.classList.remove('badge-success');
        tmp.classList.add('badge-danger');
        tmp.textContent = 'disabled';
    } 
}

function loadSettings() {
    isAutomatedModalEnabled = document.getElementById('autoMod_switch').checked;
    changeStatusLabel(isAutomatedModalEnabled, 'autoMod_switch_label')
    isAutoToastHideEnabled = document.getElementById('autoDisappear_switch').checked;
    changeStatusLabel(isAutoToastHideEnabled,'autoDisappear_switch_label')
    isHintKeyEnabled = document.getElementById('hintKeys_switch').checked;
    changeStatusLabel(isHintKeyEnabled, 'hintKeys_switch_label');

    if(isHintKeyEnabled) { 
        manageKeyHints('show');
    } else {
        manageKeyHints('hide');
    }
}

function manageKeyHints(flag) {
    var badges = document.getElementsByClassName('hintKey');
    for(var i = 0; i < badges.length; i++) {
        if(flag == 'show') {
            badges[i].classList.remove('hide');
        } else if(flag == 'hide') {
            badges[i].classList.add('hide');
        }
    }
}

// ********************************************
// Onpage Generator Logic
// ********************************************

var startingNoteRef = document.getElementById('startNote');

function createHeader() {
    // get
    var title = document.getElementById('headerName').value;

    // validate
    if(validateHeader(title) == false) {
        return false;
    }

    // create
    switch(listOption) {
        case 5:
            var h = document.createElement('h1');           
            break;
        case 6:
            var h = document.createElement('h2');
            break;
        case 7:
            var h = document.createElement('h3');
            break;
        case 8:
            var h = document.createElement('h4');
            break;
        case 9:
            var h = document.createElement('h5');
            break;
        case 10:
            var h = document.createElement('h6');
            break;
        default:
            var h = document.createElement('h2');
            break;
    } 

    h.textContent = title;
    h.style.wordWrap = 'break-word';
    
    var headerDiv = document.createElement('div');
    headerDiv = setElement(headerDiv);
    headerDiv.appendChild(h);
    headerDiv.appendChild(createDeleteTool());
    headerDiv.appendChild(createEditTool('headerUpdateModal', headerDiv.id));
    renderElementOnPage(headerDiv);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#headerModal');
    }
  }

var basicImage = 'http://placehold.it/';

function createImage()
{
    var tmpImageAdress;

    // get
    var imageAlt = document.getElementById('altImageText').value;
    var imageURL = document.getElementById('imageURL').value.trim();
    var xAxisVal = document.getElementById('xAxisProperty').value.trim();
    var yAxisVal = document.getElementById('yAxisProperty').value.trim();

    // validate
    if (validateImage(imageAlt, xAxisVal, yAxisVal, imageURL) == false) {
        return false;
    }

    // Set img container
    var image = document.createElement('img');
    image.alt = imageAlt;

    // Set X/Y
    if (xAxisVal != 0 && yAxisVal != 0)
    {
        image.setAttribute('width', xAxisVal);
        image.setAttribute('height', yAxisVal);

        tmpImageAdress = basicImage + xAxisVal + 'x' + yAxisVal;
    }
    else if (xAxisVal != 0 && yAxisVal == 0)
    {
        image.setAttribute('width', xAxisVal);
        image.classList.add('wide');

        tmpImageAdress = basicImage + xAxisVal;
    }
    else if (xAxisVal == 0 && yAxisVal != 0)
    {
        image.setAttribute('height', yAxisVal);
        image.classList.add('high');

        tmpImageAdress = basicImage + yAxisVal;
    }

    // Set URL
    if (imageURL == 'blank')
    {
        image.src = tmpImageAdress;
    }
    else if (validateURL(imageURL) == true)
    {
        image.src = imageURL;
    }

    // create
    var paragraph = document.createElement('p');
    paragraph = setElement(paragraph);

    var imagePosition = document.getElementById('imagePositionList');

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

    paragraph.style.position = 'relative';
    paragraph.appendChild(image); 
    paragraph.appendChild(createDeleteTool());
    paragraph.appendChild(createEditTool('imageUpdateModal', paragraph.id));
    renderElementOnPage(paragraph);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#imageModal');
    }
}

function createTable() 
{
    // get
    var rows = document.getElementById('arrRowsAmount').value.trim();
    var cols = document.getElementById('arrColsAmount').value.trim();

    // validate
    if(validateTable(rows, cols) == false) {
        return false;
    }

    // create
    var tableDiv = document.createElement('div');

    var tbl = document.createElement('table');
    tbl.style.width = '100%';

    if (listOption == 3) {
        tbl.classList.add('textTable');
    } else {
        tbl.classList.add('imageTable');
    }
    
    // MDB extra classes
    tbl.classList.add('table');
    tbl.classList.add('table-bordered');
    tbl.classList.add('table-responsive');

    tableDiv = setElement(tableDiv);
    
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('style','text-align: center;');

    for (var i = 0; i < rows; i++) {
      var tr = document.createElement('tr');

      for (var j = 0; j < cols; j++) {
        var td = document.createElement('td');
        if (i == 0 && listOption == 3)
        {
            var bold = document.createElement('strong');
            var text = document.createTextNode('header');
            bold.appendChild(text);
            td.appendChild(bold);
        }
        else
        {
            if (listOption == 3)
            {
                td.appendChild(document.createTextNode('test'))
            }
            else if (listOption == 4)
            {
                var image = document.createElement('img');
                image.src = basicImage + '350x140';
                image.alt = '#toadd';
                image.width = '350';
                image.height = '140';
                td.appendChild(image);
            }
        }
        tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }

    tbl.appendChild(tbdy);

    tableDiv.appendChild(tbl);
    tableDiv.appendChild(createDeleteTool());
    if(listOption == 3) {
        tableDiv.appendChild(createEditTool('arrayUpdateModal', tableDiv.id));
    }
    renderElementOnPage(tableDiv);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#arrayModal');
    }
}

function createText()
{
    // get
    var text = document.getElementById('commentArea').value;
    var checkboxStatus = document.getElementById('commentJustify').checked;

    // validate
    if (!text || isWhiteSpaceOrIndentOnly(text) == true)
    {
        text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    }

    // create
    var textDiv = document.createElement('div');

    textDiv = setElement(textDiv);

    var paragraph = document.createElement('p');
    paragraph.innerHTML = text;

    paragraph.setAttribute('style', 'word-wrap:break-word; text-align: justify; padding: 1% 2% 1% 2%; margin: 0;');

    textDiv.appendChild(paragraph);
    textDiv.appendChild(createDeleteTool());
    textDiv.appendChild(createEditTool());
    renderElementOnPage(textDiv);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#textModal');
    }
}

function createList()
{
    // get
    var listSize = document.getElementById('listSize').value.trim();
    
    // validate
    if(validateList(listSize) == false) {
        return false;
    }

    // create
    var listDiv = document.createElement('div');
    listDiv = setElement(listDiv);

    if (listOption == 0)
    {
        var iconName = document.getElementById('iconName').value;
        var iconPlace;
        if (!iconName) {
            iconPlace = GenerateUniqueId();
        } else {
            iconPlace = iconName;
        }
        for (var i = 0; i < listSize; i++)
        {
            var paragraph = document.createElement('p'); 
            if (i == 0)
            {
                paragraph.classList.add('customList'); // this is what makes difference to the TEXT option also stored in paragraph
            }
            paragraph.innerHTML = ':' + iconPlace + ':' + ' <strong>bold text:</strong> ' + 'description';
            var br = document.createElement("br"); 
            paragraph.appendChild(br);  
            listDiv.appendChild(paragraph);    
        }
    }
    else if (listOption == 1)
    {
        var list = document.createElement('ul');
        listDiv.classList.add('list_normal');
        for (var i = 0; i < listSize; i++) {
            var point = document.createElement('li');
            point.textContent = 'text';
            list.appendChild(point);
        }
        listDiv.appendChild(list);
    }
    else if (listOption == 2) 
    {
        var list = document.createElement('ul');
        list.classList.add('list_link');
        for (var i = 0; i < listSize; i++) {
            var point = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.href = 'https://#to_do:add_href';
            anchor.textContent = 'link text';
            point.appendChild(anchor);
            list.appendChild(point);
        }
        listDiv.appendChild(list);
    }

    listDiv.appendChild(createDeleteTool());
    listDiv.appendChild(createEditTool('listUpdateModal', listDiv.id));
    renderElementOnPage(listDiv);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#listModal');
    }
}

function createLink()
{
    // get
    var linkName = document.getElementById('hrefName').value;
    var linkHref = document.getElementById('hrefAddress').value;

    // validate
    if(validateLink(linkName, linkHref) == false) {
        return false;
    }

    // create
    var div = document.createElement('div');
    div = setElement(div);
    var link = document.createElement('a');
    link.style.wordWrap = 'break-word';

    link.href = linkHref;
    link.textContent = linkName;

    div.appendChild(link);
    div.appendChild(createDeleteTool());
    div.appendChild(createEditTool('linkUpdateModal', div.id));
    renderElementOnPage(div);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#linkModal');
    }
}

function createCode() 
{
    // get
    var codeText = document.getElementById('codeArea').value;
    var codeLanguage = document.getElementById('codeLanguage').value;

    // validate
    if(validateCode(codeText) == false) { 
        return false;
    }

    // create
    var div = document.createElement('div');
    div = setElement(div);

    var pre = document.createElement('pre');

    var code = document.createElement('code');

    if(!codeLanguage) {
        code.innerHTML = '```<br/>' + codeText + '<br/>```';
    }
    else {
        code.innerHTML = '```' + codeLanguage + '<br/>' + codeText + '<br/>```';
    }

    pre.appendChild(code);
    div.appendChild(pre);
    div.appendChild(createDeleteTool());
    div.appendChild(createEditTool('codeUpdateModal', div.id));
    renderElementOnPage(div);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#codeModal');
    }
}

function createLabel() {
    // get
    var label = document.getElementById('l_label').value;
    var message = document.getElementById('l_message').value;
    var color = document.getElementById('l_color').value; 

    // validate
    if(validateLabel(label, message, color) == false) {
        return false;
    }

    label = replaceReservedCharacters(label);
    message = replaceReservedCharacters(message);
    
    // create
    var div = document.createElement('div');
    div = setElement(div);

    var img = document.createElement('img');
    img.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1);

    div.appendChild(img);
    div.appendChild(createDeleteTool());
    div.appendChild(createEditTool());
    renderElementOnPage(div);

    if(isAutomatedModalEnabled) {
        hideModalAfterRender('#labelModal');
    }
}

function labelPreview() {
    // clear previously generated preview
    var img = document.getElementById('label_preview_img');
    img.src = '';

    var label = document.getElementById('l_label').value;
    var message = document.getElementById('l_message').value;
    var color = document.getElementById('l_color').value; 

    if(validateLabel(label, message, color) == false) {
        return false;
    }
    
    label = replaceReservedCharacters(label);
    message = replaceReservedCharacters(message);

    $('#loader_img').show();

    img.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1);
    // if HEX color address: https://img.shields.io/badge/label-message-red?color=value
}

$('#label_preview_img').on('load', function(){
    // hide/remove the loading image
    $('#loader_img').fadeOut(100);
});

function validateLabel(_label, _message, _color) { 
    if(_label.length > 25) {
        triggerToast(inputLengthLimitReached + ' (label)');
        return false;
    } else if (_message.length > 25) {
        triggerToast(inputLengthLimitReached + ' (message)');
        return false; 
    } else if (!_label) {
        triggerToast(emptyInputFiled + ' (label)');
        return false;
    } else if (!_message) {
        triggerToast(emptyInputFiled + ' (message)');
        return false; 
    } else if (!_color) {
        triggerToast(emptyInputFiled + ' (color)');
        return false; 
    } else if(isWhiteSpaceOrIndentOnly(_label) == true) {
        triggerToast(emptyInputFiled + ' (label)');
        return false;
    } else if(isWhiteSpaceOrIndentOnly(_message) == true) {
        triggerToast(emptyInputFiled + ' (message)');
        return false;
    } else if(_color.startsWith('#') == false) {
        triggerToast('Color input must contain hexadecimal value (e.g. #235689).');
        return false;
    } else if(_color.length > 7) {
        triggerToast('Max characters for Color input reached (7).');
        return false;
    }
}

function replaceReservedCharacters(str) {
    str = str.replace("-", "--");
    str = str.replace("_", "__");
    return str;
}

function removeElementByParentId(elementId) {
    var element = document.getElementById(elementId.parentNode.id);
    if(element != null) {
        element.parentNode.removeChild(element);
    }
    if(document.getElementsByClassName('ezGitPart').length <= 0) {
        changeElementsVisiblity(codeGenButton);
        document.getElementById('resetButton').disabled = true;

        if(startingNoteRef.classList.contains('hide')) {
            startingNoteRef.classList.remove('hide');
        }
    }
}

function createDeleteTool()
{
    if(!startingNoteRef.classList.contains('hide')) {
        startingNoteRef.classList.add('hide');
    }
    document.getElementById('resetButton').disabled = false;
    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'removeElementByParentId(this)');
    icon.setAttribute('class', 'fas fa-times fa-lg delete-icon-stylizer');
    return icon;
}

function createEditTool(modalReference, elementId) {
    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'showEditModal(\'#' + modalReference + '\', \'' + elementId + '\')');
    icon.setAttribute('class', 'fas fa-expand fa-lg edit-icon-stylizer');
    return icon;
}

function setElement(element)
{
    if(codeGenButton.style.visibility == 'hidden')
    {
        changeElementsVisiblity(codeGenButton);
    }
    
    element.setAttribute('id', GenerateUniqueId());
    element.setAttribute('style', 'position: relative; margin: 1% 0; border-left: 9px groove #333942; border-right: 9px groove #333942;');
    element.setAttribute('class', 'block-stylizer ezGitPart');
    element.setAttribute('onselectstart', 'return false'); 
    return element;
}

function renderElementOnPage(element)
{
    var workingSpace = document.getElementById('workingSpace');
    workingSpace.appendChild(element);
};

function hideModalAfterRender(id) {
    $(id).modal('hide');
}