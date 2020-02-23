// Here scripts responsile for creating each element are stored

function createHeader() {

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

    h.setAttribute('id', Math.random().toString(36).substr(2, 9));

    var title = document.getElementById('headerName').value;

    if (title == false)
    {
        beginToastCounter();
        $("#myToast").toast('show');
    }
    else
    {
        h.innerHTML = title + '<i onclick=removeHeaderByParentId(this) class="far fa-times-circle fa-lg"></i>'

        document.body.appendChild(h);
    }
  }

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeHeaderByParentId(elementId) {

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