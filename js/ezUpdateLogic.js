/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

// ********************************************
// Onpage data modification logic
// ********************************************

var lastReferencedId;

function showEditModal(modalReference, elementId) {
  var tmp = document.getElementById(elementId).children[0];
  lastReferencedId = elementId;
  switch (modalReference) {
    case '#codeUpdateModal':
      tmp = tmp.innerHTML.split('<br>');
      document.getElementById('codeLanguage_update').value = tmp[0].substring(9);
      document.getElementById('codeArea_update').value = tmp[1];
      break;
    case '#headerUpdateModal':
      document.getElementById('headerName_update').value = tmp.textContent;
      var styles = document.getElementsByClassName('headerStyle_update');
      var currentStyle = tmp.tagName.substring(1);
      for (var i = 0; i < styles.length; i++) {
        if (currentStyle === styles[i].value - 9) {
          styles[i].classList.add('active');
          break;
        }
      }
      break;
    case '#imageUpdateModal':
      document.getElementById('altImageText_update').value = tmp.alt;
      if (tmp.src.includes('place-hold') === false) {
        document.getElementById('imageURL_update').value = tmp.src;
      }
      var paragraphAlignVal = document.getElementById(elementId).style.textAlign;
      var alignNumericValue = 1;
      if (paragraphAlignVal === 'left') {
        alignNumericValue = 1;
      } else if (paragraphAlignVal === 'center') {
        alignNumericValue = 2;
      } else if (paragraphAlignVal === 'right') {
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
      $('#list_update_dynamic_fields').empty();

      var firstElementTag = tmp.tagName;
      var listSize;
      var listFieldSpace = document.getElementById('list_update_dynamic_fields');

      if (firstElementTag === 'P') {
        listSize = document.getElementById(lastReferencedId).children.length;
        tmp = document.getElementById(elementId);
        for (var i = 0; i < listSize - 2; i++) {
          var row = document.createElement('div');
          row.classList.add('row', 'listUpdateData');
          row.appendChild(setInputField(tmp.children[i].childNodes[0].textContent.replace(/:/g, '').trim(), 3));
          row.appendChild(setInputField(tmp.children[i].childNodes[1].textContent.replace(/:/g, '').trim(), 4));
          row.appendChild(setInputField(tmp.children[i].childNodes[2].textContent.replace(/:/g, '').trim(), 5));
          listFieldSpace.appendChild(row);
        }
      } else if (firstElementTag === 'UL') {
        listSize = tmp.getElementsByTagName('LI').length;
        _firstListItemTag = tmp.childNodes[0].firstChild.tagName;

        if (_firstListItemTag === 'A') {
          for (var i = 0; i < listSize; i++) {
            var row = document.createElement('div');
            row.classList.add('row', 'listUpdateData');
            row.appendChild(setInputField(tmp.childNodes[i].textContent, 6));
            row.appendChild(setInputField(tmp.childNodes[i].children[0].href, 6));
            listFieldSpace.appendChild(row);
          }
        } else {
          for (var i = 0; i < listSize; i++) {
            var row = document.createElement('div');
            row.classList.add('row', 'listUpdateData');
            row.appendChild(setInputField(tmp.childNodes[i].textContent, 12));
            listFieldSpace.appendChild(row);
          }
        }
      }
      break;
    case '#arrayUpdateModal':
      $('#array_update_dynamic_fields').empty();
      var arrayFieldSpace = document.getElementById('array_update_dynamic_fields');
      var cols = tmp.rows[0].cells.length;
      var rows = tmp.rows.length;

      var table = document.createElement('table');
      // MDB extra classes
      table.classList.add('table');
      table.classList.add('table-bordered');
      table.classList.add('table-responsive');
      var tbdy = document.createElement('tbody');
      tbdy.setAttribute('style', 'text-align: center;');

      for (var i = 0; i < rows; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < cols; j++) {
          var td = document.createElement('td');
          var value = tmp.rows[i].cells[j].textContent;
          if (i === 0) {
            td.appendChild(setInputField(value));
          } else {
            td.appendChild(setInputField(value));
          }
          tr.appendChild(td);
        }
        tbdy.appendChild(tr);
      }
      table.appendChild(tbdy);
      arrayFieldSpace.appendChild(table);
      break;
    case '#textUpdateModal':
      document.getElementById('commentArea_update').value = tmp.innerHTML;
      document.getElementById('commentJustify_update').checked = tmp.style.textAlign === 'justify';
      break;
  }

  $(modalReference).modal('show');
}

function setInputField(placeholder, columnSize) {
  var col = document.createElement('div');
  if (columnSize) {
    col.classList.add('col-' + columnSize);
  }

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
  if (validateCode(codeText) === false) {
    return false;
  }

  // update
  var codeToUpdate = document.getElementById(lastReferencedId).children[0].children[0]; // get code element

  if (!codeLanguage) {
    codeToUpdate.innerHTML = '```<br/>' + codeText + '<br/>```';
  } else {
    codeToUpdate.innerHTML = '```' + codeLanguage + '<br/>' + codeText + '<br/>```';
  }

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#codeUpdateModal');
  }
}

function updateHeader() {
  // 1. get
  var title = document.getElementById('headerName_update').value;

  // 2. validate
  if (validateHeader(title) === false) {
    return false;
  }

  // 3. update
  var headerToUpdate = document.getElementById(lastReferencedId).children[0]; // get h element

  headerToUpdate.textContent = title;
  var tag = headerToUpdate.tagName.toLowerCase();

  var headerType = listOption - 9; // 10(h1), 11, 12, 13, 14, 15(h6)

  if (listOption < 10) {
    headerType = 2;
  }

  headerToUpdate.outerHTML = headerToUpdate.outerHTML.replace(tag, 'h' + headerType);

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#headerUpdateModal');
  }
}

function updateImage() {
  // 1. get
  var imageAlt = document.getElementById('altImageText_update').value;
  var imageURL = document.getElementById('imageURL_update').value.trim();
  var xAxisVal = document.getElementById('xAxisProperty_update').value.trim();
  var yAxisVal = document.getElementById('yAxisProperty_update').value.trim();
  var imagePosition = document.getElementById('imagePositionList_update');

  // 2. validate
  if (validateImage(imageAlt, xAxisVal, yAxisVal, imageURL) === false) {
    return false;
  }

  // 3. update
  var imageToUpdate = document.getElementById(lastReferencedId).children[0]; // get img element
  var paragraph = document.getElementById(lastReferencedId);

  // ALT
  imageToUpdate.alt = imageAlt;

  // X/Y
  if (xAxisVal !== 0 && yAxisVal !== 0) {
    imageToUpdate.setAttribute('width', xAxisVal);
    imageToUpdate.setAttribute('height', yAxisVal);

    tmpImageAdress = basicImage + xAxisVal + 'x' + yAxisVal;
  } else if (xAxisVal !== 0 && yAxisVal === 0) {
    imageToUpdate.setAttribute('width', xAxisVal);
    imageToUpdate.classList.add('wide');

    tmpImageAdress = basicImage + xAxisVal;
  } else if (xAxisVal === 0 && yAxisVal !== 0) {
    imageToUpdate.setAttribute('height', yAxisVal);
    imageToUpdate.classList.add('high');

    tmpImageAdress = basicImage + yAxisVal;
  }

  // URL
  if (imageURL === 'blank') {
    imageToUpdate.src = tmpImageAdress;
  } else if (validateURL(imageURL) === true) {
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

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#imageUpdateModal');
  }
}

function updateLink() {
  // 1. get
  var linkName = document.getElementById('hrefName_update').value;
  var linkHref = document.getElementById('hrefAddress_update').value;

  // 2. validate
  if (validateLink(linkName, linkHref) === false) {
    return false;
  }

  // 3. update
  var linkToUpdate = document.getElementById(lastReferencedId).children[0]; // get anchor

  linkToUpdate.textContent = linkName;
  linkToUpdate.href = linkHref;

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#linkUpdateModal');
  }
}

function updateList() {
  // 3. update
  var listToUpdate = document.getElementById(lastReferencedId);
  var newData = document.getElementsByClassName('listUpdateData');
  var firstElementTag = listToUpdate.children[0].tagName;
  var listSize;
  var updateListSize = document.getElementById('list_update_dynamic_fields').children.length;

  if (firstElementTag === 'P') {
    listSize = document.getElementById(lastReferencedId).children.length - 2; // substitute 2 cause of Update/Delete icons
    if (updateListSize > listSize) { // if update list size got extra rows, render them
      for (var i = 0; i < updateListSize - listSize; i++) {
        var paragraph = document.createElement('p');
        paragraph.style.marginBottom = 0;
        paragraph.innerHTML = ':icon:' + ' <strong>bold text:</strong> ' + 'description';
        listToUpdate.insertBefore(paragraph, listToUpdate.childNodes[listToUpdate.childNodes.length - 2]);
      }
      listSize = updateListSize;
    }
    for (var i = 0; i < listSize; i++) {
      var col1 = newData[i].children[0].childNodes[0].value;
      var col2 = newData[i].children[1].childNodes[0].value;
      var col3 = newData[i].children[2].childNodes[0].value;
      if (!col1) {
        col1 = 'empty';
      }
      if (!col2) {
        col2 = 'empty';
      }
      if (!col3) {
        col3 = 'empty';
      }
      listToUpdate.children[i].innerHTML = ':' + col1 + ':' + ' <strong>' + col2 + '</strong>: ' + col3;
    }
  } else if (firstElementTag === 'UL') {
    listSize = listToUpdate.children[0].getElementsByTagName('LI').length;
    _firstListItemTag = listToUpdate.children[0].childNodes[0].firstChild.tagName;
    if (_firstListItemTag === 'A') {
      for (var i = 0; i < listSize; i++) {
        var col1 = newData[i].children[0].childNodes[0].value;
        var col2 = newData[i].children[1].childNodes[0].value;
        listToUpdate.children[0].childNodes[i].innerHTML = '<a href="' + col2 + '"/>' + col1 + '</a>';
      }
    } else { // list with pure text
      for (var i = 0; i < listSize; i++) {
        var col1 = newData[i].children[0].childNodes[0].value;
        listToUpdate.children[0].childNodes[i].textContent = col1; ;
      }
    }
  }

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#listUpdateModal');
  }
}

function insertNewListElement() {
  var listUpdateSection = document.getElementById('list_update_dynamic_fields');
  var singleElementColumnNumber = listUpdateSection.children[0].childNodes.length;
  var div = document.createElement('div');
  div.classList.add('row', 'listUpdateData');
  switch (singleElementColumnNumber) {
    case 1:
      div.appendChild(setInputField('empty', 12));
      listUpdateSection.appendChild(div);
      break;
    case 2:
      div.appendChild(setInputField('link text', 6));
      div.appendChild(setInputField('https://#to_do:add_href', 6));
      listUpdateSection.appendChild(div);
      break;
    case 3:
      div.appendChild(setInputField('icon', 3));
      div.appendChild(setInputField('bold text', 4));
      div.appendChild(setInputField('description', 5));
      listUpdateSection.appendChild(div);
      break;
  }
}

function updateTable() {
  // 3. update
  var tableToUpdate = document.getElementById(lastReferencedId).children[0];
  var cols = tableToUpdate.rows[0].cells.length;
  var rows = tableToUpdate.rows.length;
  var newData = document.getElementById('array_update_dynamic_fields').children[0];
  if (newData.rows.length !== rows) {
    _tableToUpdateBody = tableToUpdate.getElementsByTagName('tbody')[0];
    for (var i = 0; i < newData.rows.length - rows; i++) {
      var newRow = _tableToUpdateBody.insertRow();
      for (var j = 0; j < cols; j++) {
        var newCell = newRow.insertCell(j);
        var newText = document.createTextNode('default text | should not be seen');
        newCell.appendChild(newText);
      }
    }
    // refresh(reassign) rows variable
    rows = tableToUpdate.rows.length;
  }
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var text = newData.rows[i].cells[j].children[0].childNodes[0].value;
      if (!text || isWhiteSpaceOrIndentOnly(text) === true) {
        text = 'empty';
      }
      if (i === 0) {
        tableToUpdate.rows[i].cells[j].innerHTML = '<strong>' + text + '</strong>';
      } else {
        tableToUpdate.rows[i].cells[j].textContent = text;
      }
    }
  }

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#arrayUpdateModal');
  }
}

function insertNewRowIntoTableById(id) {
  var tableRef = document.getElementById(id).children[0].getElementsByTagName('tbody')[0];
  var newRow = tableRef.insertRow();
  var cellsNumber = tableRef.rows[0].cells.length;

  for (var i = 0; i < cellsNumber; i++) {
    var newCell = newRow.insertCell(i);
    addInputToTableCell(newCell);
  }
}

function addInputToTableCell(cell) {
  cell.appendChild(setInputField('test'));
}

function updateText() {
  // 3. update
  var textToUpdate = document.getElementById(lastReferencedId).children[0];
  var text = document.getElementById('commentArea_update').value;
  var checkboxStatus = document.getElementById('commentJustify_update').checked;

  if (!text || isWhiteSpaceOrIndentOnly(text) === true) {
    textToUpdate.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  } else {
    textToUpdate.innerHTML = text;
  }

  if (checkboxStatus === true) {
    textToUpdate.setAttribute('style', 'word-wrap:break-word; text-align: justify; padding: 1% 2% 1% 2%; margin: 0;');
  } else {
    textToUpdate.setAttribute('style', 'word-wrap:break-word; padding: 1% 2% 1% 2%; margin: 0;');
  }

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#textUpdateModal');
  }
}

function updateLabel() {
  // 1. get
  var label = document.getElementById('l_label_update').value;
  var message = document.getElementById('l_message_update').value;
  var color = document.getElementById('l_color_update').value;
  var style = document.getElementById('l_style_update').value;

  // 2. validate
  if (validateLabel(label, message, color) === false) {
    return false;
  }

  // 3. update
  var labelToUpdate = document.getElementById(lastReferencedId).children[0];

  if (style !== 'default') {
    labelToUpdate.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1) + '&style=' + style;
  } else {
    labelToUpdate.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1);
  }

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#labelUpdateModal');
  }
}
