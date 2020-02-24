// ********************************************
// Toast CREATE messages
// ********************************************

var missingHeaderWarning = 'It looks like you did not feed header title text.';
var noProportion = 'As you did not pass even one axis, image will have its original size.';
var noURLorBlank = 'If you want to add image, make sure that you specify URL. If you have no image URL at the moment, write blank.';
var noAltForImageSpecified = 'It looks like you did not add alternative text for image. Please, add it!';
var wrongImageExtension_part1 = 'Woops! Seems like you tried to reference to image with wrong extension';
var wrongImageExtension_part2 = '.Supported extensions for now are: jpg, jpeg, bmp, gif, png';

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
    headerDiv.setAttribute('class', 'row block-stylizer');

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
    paragraph.setAttribute('class', 'block-stylizer row');

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

    // image position setup

    var imagePosition = document.getElementById('imagePositionList');

    switch (imagePosition.value) {
        case '1':
            paragraph.setAttribute('style', 'text-align: left;');
        break;
        case '2':
            paragraph.setAttribute('style', 'text-align: center;');
        break;
        case '3':
            paragraph.setAttribute('style', 'text-align: right;');
        break;
        default:
            paragraph.setAttribute('style', 'text-align: center;');
        break;
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

    paragraph.setAttribute('style', 'position: relative;');

    paragraph.appendChild(image); 

    paragraph.appendChild(icon);

    // adding process 

    var workingSpace = document.getElementById('workingSpace');

    workingSpace.appendChild(paragraph);
}

function createTable() {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < 3; i++) {
      var tr = document.createElement('tr');
      for (var j = 0; j < 2; j++) {
        if (i == 2 && j == 1) {
          break
        } else {
          var td = document.createElement('td');
          td.appendChild(document.createTextNode('\u0020'))
          i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
          tr.appendChild(td)
        }
      }
      tbdy.appendChild(tr);
    }
    tbl.appendChild(tbdy);
    body.appendChild(tbl)
}

// ********************************************
// EzGitDoc Other
// ********************************************

function removeElementByParentId(elementId) {
    var element = document.getElementById(elementId.parentNode.id);
    if(element != null)
    {
        element.parentNode.removeChild(element);
    }
}

var seconds = 0;
var minutes = 0;

var myInterval;
var el = document.getElementById('toastTime');

function beginToastCounter()
{
    resetLastInterval(myInterval);

    seconds = 1; 

    el.innerText = "" + seconds + " second ago.";  

    myInterval = setInterval(increaseCounter, 1000);
}

function increaseCounter() {
    if (seconds >= 1 && seconds < 60)
    {
        seconds += 1;
    
        el.innerText = "" + seconds + " seconds ago."; 

        if (seconds == 60)
        {
            resetLastInterval();

            el.innerText = "1 minute ago."; 

            minutes = 1;

            myInterval = setInterval(increaseCounter, 60000);
        }
    }
    else if(seconds >= 60)
    {
        minutes += 1;

        el.innerText = minutes + " minutes ago.";  
    }
}

function resetLastInterval() {
    clearInterval(myInterval);
}

function GenerateUniqueId()
{
    return Math.random().toString(36).substr(2, 9);
}

function validateURL(url)
{
    var result = false;

    var popularExtensions = ['bmp', 'png', 'jpeg', 'jpg', 'gif'];

    url = url.slice(-4);
    
    for(let element of popularExtensions)
    {
        if (url.includes(element))
        {
            result = true;
            break;
        }
    }

    return result;
}
