// Here scripts responsile for creating each element are stored

function create() {

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

    h.setAttribute('id', 22);
    var title = document.getElementById('headerName').value;
    h.innerHTML = title + '<i class="far fa-times-circle fa-lg"></i>'

    document.body.appendChild(h);
  }

function addElement(parentId, elementTag, elementId, html) {
    // Adds an element to the document
    var p = document.getElementById(parentId);
    var newElement = document.createElement(elementTag);
    newElement.setAttribute('id', elementId);
    newElement.innerHTML = html;
    p.appendChild(newElement);
}

function removeElement(elementId) {
    // Removes an element from the document
    var element = document.getElementById(elementId);
    if(element != null)
    {
        element.parentNode.removeChild(element);
    }
}