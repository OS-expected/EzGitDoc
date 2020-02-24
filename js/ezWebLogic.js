// ********************************************
// Toast CREATE messages
// ********************************************

var missingHeaderWarning = 'It looks like you did not feed header title text.';
var noProportion = 'As you did not pass even one axis, image will have its original size.';
var noURLorBlank = 'If you want to add image, make sure that you specify URL. If you have no image URL at the moment, write blank.';
var noAltForImageSpecified = 'It looks like you did not add alternative text for image. Please, add it!';
var wrongImageExtension_part1 = 'Woops! Seems like you tried to reference to image with wrong extension';
var wrongImageExtension_part2 = '.Supported extensions for now are: jpg, jpeg, bmp, gif, png';
var notAnumber = 'Err: Input field contained nondigit value or 0.';
var arrayColSizeExceeded = 'Err: Max column number exceeded (27).';

// ********************************************
// EzGitDoc Creating Elements Logic
// ********************************************

function createHeader() {

    // title validation
    var title = document.getElementById('headerName').value;

    if (title == false)
    {
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = missingHeaderWarning;

        beginToastCounter();
        $("#myToast").toast('show');

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
            var h = document.createElement('h6');
      } 

    h.innerHTML = title;

    var headerDiv = document.createElement('div');
    headerDiv.setAttribute('id', GenerateUniqueId());
    headerDiv.setAttribute('style', 'position: relative');
    headerDiv.setAttribute('class', 'block-stylizer');

    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'removeElementByParentId(this)');
    icon.setAttribute('class', 'far fa-times-circle fa-lg delete-icon-stylizer');

    headerDiv.appendChild(h);

    headerDiv.appendChild(icon);

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
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = noAltForImageSpecified;

        beginToastCounter();
        $("#myToast").toast('show');

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
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = noURLorBlank;

        beginToastCounter();
        $("#myToast").toast('show');

        return false;
    }
    else
    {
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = wrongImageExtension_part1 + '(' + imageURL.slice(-4) + ')' + wrongImageExtension_part2;

        beginToastCounter();
        $("#myToast").toast('show');

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

    if (xAxisVal != 0 && yAxisVal != 0)
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
    else
    {
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = noProportion;

        beginToastCounter();
        $("#myToast").toast('show');

        return false;
    }

    // Add icon
    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'removeElementByParentId(this)');
    icon.setAttribute('class', 'far fa-times-circle fa-lg delete-icon-stylizer');

    paragraph.appendChild(image); 

    paragraph.appendChild(icon);

    // adding process 

    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(paragraph);
}

function createTable() {

    var tableDiv = document.createElement('div');

    var rows = document.getElementById('arrRowsAmount').value;
    var cols = document.getElementById('arrColsAmount').value;

    if (checkIfNumber(rows) == false || checkIfNumber(cols) == false)
    {
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = notAnumber;

        beginToastCounter();
        $("#myToast").toast('show');

        return false;
    }
    else if(cols >= 27)
    {
        var toastBody = document.getElementById("toastBody");
        toastBody.innerHTML = arrayColSizeExceeded;

        beginToastCounter();
        $("#myToast").toast('show');

        return false;
    }

    var tbl = document.createElement('table');

    tableDiv.setAttribute('id', GenerateUniqueId());
    tableDiv.setAttribute('style', 'position: relative;');
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

    // Add icon
    var icon = document.createElement('i');
    icon.setAttribute('onclick', 'removeElementByParentId(this)');
    icon.setAttribute('class', 'far fa-times-circle fa-lg delete-icon-stylizer');

    tableDiv.appendChild(tbl);
    tableDiv.appendChild(icon);
    
    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(tableDiv);
}

function removeElementByParentId(elementId) {
    var element = document.getElementById(elementId.parentNode.id);
    if(element != null)
    {
        element.parentNode.removeChild(element);
    }
}

