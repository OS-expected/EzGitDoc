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

// ********************************************
// EzGitDoc Creating Elements Logic
// ********************************************

function createHeader() {

    // title validation
    var title = document.getElementById('headerName').value;

    if (title == false)
    {
        triggerToast(missingHeaderWarning);
        return false;
    }

    // style setup
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
    headerDiv.setAttribute('id', GenerateUniqueId());
    headerDiv.setAttribute('style', 'position: relative');
    headerDiv.setAttribute('class', 'block-stylizer');

    headerDiv.appendChild(h);

    headerDiv.appendChild(createDeleteTool());

    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(headerDiv);
  }

function createImage()
{
    var paragraph = document.createElement('p');

    paragraph.setAttribute('id', GenerateUniqueId());
    paragraph.setAttribute('class', 'block-stylizer');

    // alt text validation

    var imageAlt = document.getElementById('altImageText');

    if (!imageAlt.value)
    {  
        triggerToast(noAltForImageSpecified);
        return false;
    }

    // image url validation

    var imageURL = document.getElementById('imageURL').value;

    var image = document.createElement('img');

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

    // image position setup

    var imagePosition = document.getElementById('imagePositionList');

    switch (imagePosition.value) {
        case '1':
            paragraph.setAttribute('style', 'text-align: left; position: relative;');
        break;
        case '2':
            paragraph.setAttribute('style', 'text-align: center; position: relative;');
        break;
        case '3':
            paragraph.setAttribute('style', 'text-align: right; position: relative;');
        break;
        default:
            paragraph.setAttribute('style', 'text-align: center; position: relative;');
        break;
    }

    // size validation

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
    }
    else if (xAxisVal == 0 && yAxisVal != 0)
    {
        image.setAttribute('height', yAxisVal);
    }
    else if(xAxisVal == 0 && yAxisVal == 0)
    {
        triggerToast(minimumOneAxis);
        return false;
    }

    paragraph.appendChild(image); 

    paragraph.appendChild(createDeleteTool());

    // adding process 

    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(paragraph);
}

function createTable() 
{

    var tableDiv = document.createElement('div');

    var rows = document.getElementById('arrRowsAmount').value;
    var cols = document.getElementById('arrColsAmount').value;

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

    var tbl = document.createElement('table');

    tableDiv.setAttribute('id', GenerateUniqueId());
    tableDiv.setAttribute('style', 'position: relative; margin: 5px 0 5px 0');
    tableDiv.setAttribute('class', 'block-stylizer');

    tbl.style.width = '100%';
    
    var tbdy = document.createElement('tbody');
    tbdy.setAttribute('style','text-align: center;');

    for (var i = 0; i < rows; i++) {
      var tr = document.createElement('tr');

      for (var j = 0; j < cols; j++) {
        var td = document.createElement('td');
        td.appendChild(document.createTextNode('test'))
        tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }

    tbl.appendChild(tbdy);

    tableDiv.appendChild(tbl);
    tableDiv.appendChild(createDeleteTool());
    
    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(tableDiv);
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

    textDiv.setAttribute('id', GenerateUniqueId());
    textDiv.setAttribute('style', 'position: relative;');
    textDiv.setAttribute('class', 'block-stylizer');

    var paragraph = document.createElement('p');
    paragraph.innerHTML = text;

    if(checkboxStatus == 1)
    {
        paragraph.setAttribute('style', 'text-align: justify');
    }

    textDiv.appendChild(paragraph);
    textDiv.appendChild(createDeleteTool());

    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(textDiv);
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

    listDiv.setAttribute('id', GenerateUniqueId());
    listDiv.setAttribute('style', 'position: relative;');
    listDiv.setAttribute('class', 'block-stylizer');

    if (listOption == 0)
    {
        var iconPlace = GenerateUniqueId();

        for (var i = 0; i < listSize; i++)
        {
            var paragraph = document.createElement('p'); 
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

    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(listDiv);
}

function removeElementByParentId(elementId) {
    var element = document.getElementById(elementId.parentNode.id);
    if(element != null)
    {
        element.parentNode.removeChild(element);
    }
}

function createDeleteTool()
{
    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'removeElementByParentId(this)');
    icon.setAttribute('class', 'fas fa-times fa-lg delete-icon-stylizer');

    return icon;
}


// HELP

function insertHelpData(partId)
{
    var datas = document.getElementsByClassName('helpDataPart');

    for (var i = 0; i < datas.length; i++) {
        datas.item(i).style.display = 'none';
    }

    datas.item(partId).style.display = 'block';
}