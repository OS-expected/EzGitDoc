// ********************************************
// Toast Messages
// ********************************************

var missingHeaderWarning = 'It looks like you did not feed header title text.';
var minimumOneAxis = 'At least one axis needs to contain value different than 0.'; 
var noURLorBlank = 'If you want to add image, make sure that you specify URL. If you have no image URL at the moment, write blank.';
var noAltForImageSpecified = 'It looks like you did not add alternative text for image. Please, add it before you create image!';
var wrongImageExtension_part1 = 'Woops! Seems like you tried to reference to image with wrong extension';
var wrongImageExtension_part2 = '.Supported extensions for now are: jpg, jpeg, bmp, gif, png';
var notAnumber = 'Input field contained noninteger value.';
var restrictedValue = 'Input field contained illegal value (0).';
var arrayColSizeExceeded = 'Max column number exceeded (27).';
var listTypeNotSpecified = 'Type of the list was not specified.';
var noLinkName = 'Link name was not specified.';
var noLinkHref = 'Link adress is missing.';
var atLeastOneCharacter = 'Code textarea requires at least one character.';

// ********************************************
// Onpage Generator Logic
// ********************************************

function createHeader() {

    // get
    var title = document.getElementById('headerName').value;

    // validate
    if (title == false)
    {
        triggerToast(missingHeaderWarning);
        return false;
    }

    // create
    var style = document.getElementById('headerStyleList');

    switch(style.value) {
        case '1':
            var h = document.createElement('h1');           
            break;
        case '2':
            var h = document.createElement('h2');
            break;
        case '3':
            var h = document.createElement('h3');
            break;
        case '4':
            var h = document.createElement('h4');
            break;
        case '5':
            var h = document.createElement('h5');
            break;
        case '6':
            var h = document.createElement('h6');
            break;
        default:
            var h = document.createElement('h2');
      } 

    h.innerHTML = title;

    var headerDiv = document.createElement('div');
    headerDiv = setElement(headerDiv);
    headerDiv.appendChild(h);
    headerDiv.appendChild(createDeleteTool());
    renderElementOnPage(headerDiv);
  }

function createImage()
{
    // get & validate

    // Step1: Alternative Text
    var imageAlt = document.getElementById('altImageText').value;
    if (!imageAlt)
    {  
        triggerToast(noAltForImageSpecified);
        return false;
    }
    // Step2: Image Source
    var imageURL = document.getElementById('imageURL').value;
    var image = document.createElement('img');
    image.alt = imageAlt;

    if (imageURL == 'blank')
    {
        image.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png';
    }
    else if (validateURL(imageURL) == true)
    {
        image.src = imageURL;
    }
    else if (!imageURL)
    {
        triggerToast(noURLorBlank);
        return false;
    }
    else
    {
        triggerToast(wrongImageExtension_part1 + '(' + imageURL.slice(-4) + ')' + wrongImageExtension_part2);
        return false;
    }

    // Step3: Axis Values
    var xAxisVal = document.getElementById('xAxisProperty').value;
    var yAxisVal = document.getElementById('yAxisProperty').value;

    if (checkIfNumber(xAxisVal) == false || checkIfNumber(yAxisVal) == false)
    {
        triggerToast(notAnumber);
        return false;
    }
    else if (xAxisVal != 0 && yAxisVal != 0)
    {
        image.setAttribute('width', xAxisVal);
        image.setAttribute('height', yAxisVal);
    }
    else if (xAxisVal != 0 && yAxisVal == 0)
    {
        image.setAttribute('width', xAxisVal);
        image.classList.add('wide');
    }
    else if (xAxisVal == 0 && yAxisVal != 0)
    {
        image.setAttribute('height', yAxisVal);
        image.classList.add('high');
    }
    else if(xAxisVal == 0 && yAxisVal == 0)
    {
        triggerToast(minimumOneAxis);
        return false;
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
    renderElementOnPage(paragraph);
}

function createTable() 
{
    // get
    var rows = document.getElementById('arrRowsAmount').value;
    var cols = document.getElementById('arrColsAmount').value;

    // validate
    if (checkIfNumber(rows) == false || checkIfNumber(cols) == false)
    {
        triggerToast(notAnumber);
        return false;
    }
    else if(cols >= 27)
    {
        triggerToast(arrayColSizeExceeded);
        return false;
    }

    // create
    var tableDiv = document.createElement('div');

    var tbl = document.createElement('table');
    tbl.style.width = '100%';

    tableDiv = setElement(tableDiv);
    
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('style','text-align: center;');

    for (var i = 0; i < rows; i++) {
      var tr = document.createElement('tr');

      for (var j = 0; j < cols; j++) {
        var td = document.createElement('td');
        if (i == 0)
        {
            var bold = document.createElement('strong');
            var text = document.createTextNode('header');
            bold.appendChild(text);
            td.appendChild(bold);
        }
        else
        {
            td.appendChild(document.createTextNode('test'))
        }
        tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }

    tbl.appendChild(tbdy);

    tableDiv.appendChild(tbl);
    tableDiv.appendChild(createDeleteTool());
    renderElementOnPage(tableDiv);
}

function createText()
{
    // get
    var text = document.getElementById('commentArea').value;

    var checkboxStatus = document.getElementById('commentJustify').checked;

    // validate
    if (!text)
    {
        text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
    }

    // create
    var textDiv = document.createElement('div');

    textDiv = setElement(textDiv);

    var paragraph = document.createElement('p');
    paragraph.innerHTML = text;

    if(checkboxStatus == 1)
    {
        paragraph.setAttribute('style', 'text-align: justify');
    }

    textDiv.appendChild(paragraph);
    textDiv.appendChild(createDeleteTool());
    renderElementOnPage(textDiv);
}

function createList()
{
    // get
    var listSize = document.getElementById('listSize').value;
    
    // validate
    if (checkIfNumber(listSize) == false)
    {
        triggerToast(notAnumber);
        return false;
    }
    else if(listSize == 0)
    {
        triggerToast(restrictedValue);
        return false;
    }
    else if (listOption == null)
    {
        triggerToast(listTypeNotSpecified);
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
        for (var i = 0; i < listSize; i++) {
            var point = document.createElement('li');
            point.innerHTML = 'text';
            list.appendChild(point);
        }
        listDiv.appendChild(list);
    }

    listDiv.appendChild(createDeleteTool());
    renderElementOnPage(listDiv);
}

function createLink()
{
    // get
    var linkName = document.getElementById('hrefName').value;
    var linkHref = document.getElementById('hrefAddress').value;

    // validate
    if (!linkName) {
        triggerToast(noLinkName);
        return false;
    }
    else if (!linkHref) {
        triggerToast(noLinkHref);
        return false;
    }

    // create
    var div = document.createElement('div');
    div = setElement(div);
    var link = document.createElement('a');
    link.href = linkHref;
    link.innerHTML = linkName;

    div.appendChild(link);
    div.appendChild(createDeleteTool());
    renderElementOnPage(div);
}

function createCode() 
{
    // get
    var codeText = document.getElementById('codeArea').value;
    var codeLanguage = document.getElementById('codeLanguage').value;

    // validate
    if(!codeText) {
        triggerToast(atLeastOneCharacter);
        return false;
    }

    // create
    var div = document.createElement('div');
    div = setElement(div);
    var code = document.createElement('code');

    if(!codeLanguage) {
        code.innerHTML = '```<br/>' + codeText + '<br/>```';
    }
    else {
        code.innerHTML = '```' + codeLanguage + '<br/>' + codeText + '<br/>```';
    }

    div.appendChild(code);
    div.appendChild(createDeleteTool());
    renderElementOnPage(div);
}

function removeElementByParentId(elementId) {
    var element = document.getElementById(elementId.parentNode.id);
    if(element != null) {
        element.parentNode.removeChild(element);
    }
    if(document.getElementsByClassName('ezGitPart').length <= 0) {
        changeElementsVisiblity(codeGenButton);
    }
}

function createDeleteTool()
{
    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'removeElementByParentId(this)');
    icon.setAttribute('class', 'fas fa-times fa-lg delete-icon-stylizer');
    return icon;
}

function setElement(element)
{
    if(codeGenButton.style.visibility == 'hidden')
    {
        changeElementsVisiblity(codeGenButton);
    }
    element.setAttribute('id', GenerateUniqueId());
    element.setAttribute('style', 'position: relative; margin: 5px 0 5px 0;');
    element.setAttribute('class', 'block-stylizer ezGitPart');

    return element;
}

function renderElementOnPage(element)
{
    var workingSpace = document.getElementById('workingSpace');
    workingSpace.appendChild(element);
};