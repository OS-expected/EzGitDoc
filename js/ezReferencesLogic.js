/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

var referencesModalContent = document.getElementById('referencesModalContent');

function defaultLastHighlightedElementBackgroundColor() {
  $('#referencesModal').on('hidden.bs.modal', function () {
    if (lastHighlightedElement != null) {
      lastHighlightedElement.style.backgroundColor = lastHighlightedElementBg;
      lastHighlightedElement = null;
    }
  });
}

function clearReferencesModalContent() {
  $('#referencesModalContent').children().remove();
}

function addMessageToReferencesModalContent() {
  var small = document.createElement('small');
  var p = document.createElement('p');
  p.textContent = 'There are no elements to move to :(';
  small.appendChild(p);
  referencesModalContent.appendChild(small);
}

function generateReferences() {
  clearReferencesModalContent();
  var elements = document.getElementsByClassName('ezGitPart');
  if (elements.length === 0) {
    addMessageToReferencesModalContent();
    return;
  }
  var ol = document.createElement('ol');
  elements.forEach(element => {
    var li = document.createElement('li');
    li.appendChild(returnElementRef(element));
    ol.appendChild(li);
  });
  referencesModalContent.appendChild(ol);
}

function returnElementRef(element) {
  var name = '';
  var classList = element.classList;
  classList.forEach(singleClass => {
    switch (singleClass) {
      case 'code':
        var pre = element.children[0];
        var code = pre.children[0];
        var language = code.innerText.split('\n')[0].substring(3);
        name = language.length === 0 ? 'Code (no lang specified)' : `Code (${language})`;
        break;
      case 'header':
        var header = element.children[0];
        var headerLevel = header.tagName[1];
        var headerLength = header.textContent.length;
        name = `H${headerLevel} header (text: ${headerLength > 10 ? header.textContent.substring(0, 10) + '...' : header.textContent})`;
        break;
      case 'image':
        var image = element.children[0];
        name = `Image (res: ${getImageResolution(image)})`;
        break;
      case 'link':
        var link = element.children[0];
        name = `Link (name: ${link.textContent})`;
        break;
      case 'list':
        var list = element.children[0];
        if (list.tagName === 'P') {
          name = `Iconic list (size: ${element.childNodes.length - 2})`;
        } else {
          var li = list.children[0];
          var firstListItem = li.children[0];
          if (firstListItem !== undefined && firstListItem.tagName === 'A') {
            name = `Linked list (size: ${list.childNodes.length})`;
          } else {
            name = `Text list (size: ${list.childNodes.length})`;
          }
        }
        break;
      case 'table':
        var table = element.children[0];
        if (table.tagName === 'TABLE') {
          var rows = table.rows.length;
          var cells = table.rows[0].cells.length;
          var td = table.rows[0].cells[0];
          var tdItem = td.children[0];
          if (tdItem.tagName === 'STRONG') {
            name = `Text table ${cells}x${rows}`;
          } else if (tdItem.tagName === 'IMG') {
            name = `Image table ${cells}x${rows} | ${tdItem.width}x${tdItem.height}`;
          }
        } else if (table.tagName === 'P') {
          var firstItem = table.children[0];
          if (firstItem.tagName === 'KBD') {
            var image = firstItem.children[0];
            name = `Kbd table ${countRowsColsOfKbdTable(table)} | ${image.width}x${image.height}`;
          } else if (firstItem.tagName === 'A') {
            var kbd = firstItem.children[0];
            var image = kbd.children[0];
            name = `Linked kbd table ${countRowsColsOfKbdTable(table)} | ${image.width}x${image.height}`;
          }
        }
        break;
      case 'text':
        var p = element.children[0];
        var textLength = p.textContent.length;
        name = `Text (${textLength > 10 ? p.textContent.substring(0, 10) + '...' : p.textContent})`;
        break;
      case 'EzBadge':
        var image = element.children[0];
        var index = image.src.indexOf('badge/') + 5;
        name = `Badge (${image.src.substr(index, 15)}...)`;
        break;
      case 'details':
        var details = element.children[0];
        var summary = details.children[0].textContent;
        var summaryLength = summary.length;
        name = `Details (${summaryLength > 15 ? summary.substring(0, 15) + '...' : summary})`;
        break;
    }
  });
  return wrapElementRefIntoAnchor(element.id, name);
}

function countRowsColsOfKbdTable(table) {
  var rows = 0;
  var cols = 0;
  var childNodes = table.childNodes;
  childNodes.forEach(childNode => {
    if (childNode.tagName === 'BR') {
      rows += 2;
    } else if (rows === 0) {
      cols++;
    }
  });
  return `${cols}x${rows}`;
}

function getImageResolution(image) {
  return `${image.width}x${image.height}`;
}

function wrapElementRefIntoAnchor(id, name) {
  var a = document.createElement('a');
  a.href = `#${id}`;
  a.textContent = name;
  a.onclick = function() { highlightElement(id); };
  return a;
}

var lastHighlightedElement = null;
var lastHighlightedElementBg = '';

function highlightElement(id) {
  if (lastHighlightedElement !== null) {
    lastHighlightedElement.style.backgroundColor = lastHighlightedElementBg;
  }
  var element = document.getElementById(id);
  lastHighlightedElementBg = $(element).css('background-color');
  element.style.backgroundColor = '#E5A200';
  lastHighlightedElement = element;
}
