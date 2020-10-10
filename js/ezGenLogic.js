/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

// ********************************************
// Onpage Generator Logic
// ********************************************

var startingNoteRef = document.getElementById('startNote');

function createHeader() {
  // get
  var title = document.getElementById('headerName').value;

  // validate
  if (validateHeader(title) === false) {
    return false;
  }

  // create
  var h = document.createElement(`h${listOption >= 5 ? listOption - 4 : 2}`);

  h.textContent = title;
  h.style.wordWrap = 'break-word';
  h.style.marginBottom = 0;

  // render
  var headerDiv = document.createElement('div');
  headerDiv = setElement(headerDiv);
  headerDiv.appendChild(h);
  headerDiv.appendChild(createDeleteTool());
  headerDiv.appendChild(createEditTool('headerUpdateModal', headerDiv.id));
  renderElementOnPage(headerDiv, 'header');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#headerModal');
  }
}

var basicImage = 'https://place-hold.it/';

function createImage() {
  var tmpImageAdress;

  // get
  var imageAlt = document.getElementById('altImageText').value;
  var imageURL = document.getElementById('imageURL').value.trim();
  var xAxisVal = parseInt(document.getElementById('xAxisProperty').value.trim());
  var yAxisVal = parseInt(document.getElementById('yAxisProperty').value.trim());

  // validate
  xAxisVal = checkifNaN(xAxisVal);
  yAxisVal = checkifNaN(yAxisVal);

  if (validateImage(imageAlt, xAxisVal, yAxisVal, imageURL) === false) {
    return false;
  }

  // Set img container
  var image = document.createElement('img');
  image.alt = imageAlt;

  // Set X/Y depending on composition
  if (xAxisVal !== 0 && yAxisVal !== 0) {
    image.setAttribute('width', xAxisVal);
    image.setAttribute('height', yAxisVal);

    tmpImageAdress = basicImage + xAxisVal + 'x' + yAxisVal;
  } else if (xAxisVal !== 0 && yAxisVal === 0) {
    image.setAttribute('width', xAxisVal);
    image.classList.add('wide');

    tmpImageAdress = basicImage + xAxisVal;
  } else if (xAxisVal === 0 && yAxisVal !== 0) {
    image.setAttribute('height', yAxisVal);
    image.classList.add('high');

    tmpImageAdress = basicImage + yAxisVal;
  }

  // Set URL
  if (imageURL === 'blank') {
    image.src = tmpImageAdress;
  } else if (validateURL(imageURL) === true) {
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
  renderElementOnPage(paragraph, 'image');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#imageModal');
  }
}

function createTable() {
  // get
  var rows = document.getElementById('arrRowsAmount').value.trim();
  var cols = document.getElementById('arrColsAmount').value.trim();

  // validate
  if (validateTable(rows, cols) === false) {
    return false;
  }

  // create
  var tableDiv = setElement(document.createElement('div'));

  if (listOption === 3 || listOption === 4) {
    var tbl = document.createElement('table');
    tbl.style.width = '100%';
    tbl.style.maxHeight = '250px';
    tbl.classList.add('table', 'table-bordered', 'table-responsive');
    if (listOption === 3) {
      tbl.classList.add('textTable');
      tbl.appendChild(genTextTableBody(rows, cols));
    } else if (listOption === 4) {
      tbl.classList.add('imageTable');
      tbl.appendChild(genImageTable(rows, cols));
    }
    tableDiv.appendChild(tbl);
  } else {
    if (listOption === 23) {
      tableDiv.appendChild(genKbdBody(rows, cols, ''));
    } else if (listOption === 24) {
      tableDiv.appendChild(genKbdBody(rows, cols, 'linked'));
    }
  }

  tableDiv.appendChild(createDeleteTool());
  if (listOption === 3) {
    tableDiv.appendChild(createEditTool('arrayUpdateModal', tableDiv.id));
  } else if (listOption === 4 || listOption === 23 || listOption === 24) {
    tableDiv.appendChild(createEditTool('tableUniUpdateModal', tableDiv.id));
  }

  renderElementOnPage(tableDiv, 'table');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#arrayModal');
  }
}

function genKbdBody(rows, cols, flag = 'empty') {
  var p = document.createElement('p');
  p.style.textAlign = 'center';
  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < cols; j++) {
      var kbd = document.createElement('kbd');
      var img = document.createElement('img');
      img.src = basicImage + '250x140';
      img.width = '250';
      img.height = '140';
      img.alt = 'alt text';
      kbd.appendChild(img);
      flag === 'linked' ? p.appendChild(wrapKbdIntoAnchor(kbd)) : p.appendChild(kbd);
    }
    if ((i + 1) !== parseInt(rows)) {
      var br = document.createElement('br');
      p.appendChild(br);
    }
  }
  return p;
}

function wrapKbdIntoAnchor(kbd) {
  var a = document.createElement('a');
  a.href = 'https://AddURL';
  a.appendChild(kbd);
  return a;
}

function genTextTableBody(rows, cols) {
  var tbdy = document.createElement('tbody');
  tbdy.setAttribute('style', 'text-align: center;');
  for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols; j++) {
      var td = document.createElement('td');
      if (i === 0) {
        td.appendChild(buildHeader());
      } else {
        td.appendChild(document.createTextNode('test'));
      }
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }
  return tbdy;
}

function buildHeader() {
  var strong = document.createElement('strong');
  var headerTextNode = document.createTextNode('header');
  strong.appendChild(headerTextNode);
  return strong;
}

function genImageTable(rows, cols) {
  var tbdy = document.createElement('tbody');
  tbdy.setAttribute('style', 'text-align: center;');
  for (var i = 0; i < rows; i++) {
    var tr = document.createElement('tr');
    for (var j = 0; j < cols; j++) {
      var td = document.createElement('td');
      var image = document.createElement('img');
      image.src = basicImage + '250x140';
      image.alt = '#toadd';
      image.width = '250';
      image.height = '140';
      td.appendChild(image);
      tr.appendChild(td);
    }
    tbdy.appendChild(tr);
  }
  return tbdy;
}

function createText() {
  // get
  var text = document.getElementById('commentArea').value;
  var checkboxStatus = document.getElementById('commentJustify').checked;

  // check
  if (!text || isWhiteSpaceOrIndentOnly(text) === true) {
    text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
  }

  // create
  var textDiv = document.createElement('div');

  textDiv = setElement(textDiv);

  var paragraph = document.createElement('p');
  paragraph.innerHTML = text;

  if (checkboxStatus === true) {
    paragraph.setAttribute('style', 'word-wrap:break-word; text-align: justify; padding: 1% 2% 1% 2%; margin: 0;');
  } else {
    paragraph.setAttribute('style', 'word-wrap:break-word; padding: 1% 2% 1% 2%; margin: 0;');
  }

  textDiv.appendChild(paragraph);
  textDiv.appendChild(createDeleteTool());
  textDiv.appendChild(createEditTool('textUpdateModal', textDiv.id));
  renderElementOnPage(textDiv, 'text');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#textModal');
  }
}

function createList() {
  // get
  var listSize = document.getElementById('listSize').value.trim();

  // validate
  if (validateList(listSize) === false) {
    return false;
  }

  // create
  var listDiv = document.createElement('div');
  listDiv = setElement(listDiv);

  if (listOption === 0) {
    var iconName = document.getElementById('iconName').value;
    var iconPlace;
    if (!iconName) {
      iconPlace = GenerateUniqueId();
    } else {
      iconPlace = iconName;
    }
    for (var i = 0; i < listSize; i++) {
      var paragraph = document.createElement('p');
      paragraph.style.marginBottom = 0;
      if (i === 0) {
        paragraph.classList.add('customList'); // this is what makes difference to the TEXT option also stored in paragraph
      }
      paragraph.innerHTML = ':' + iconPlace + ':' + ' <strong>bold text:</strong> ' + 'description';
      listDiv.appendChild(paragraph);
    }
  } else if (listOption === 1) {
    var list = document.createElement('ul');
    list.style.marginBottom = 0;
    for (var i = 0; i < listSize; i++) {
      var point = document.createElement('li');
      point.textContent = 'text';
      list.appendChild(point);
    }
    listDiv.appendChild(list);
  } else if (listOption === 2) {
    var list = document.createElement('ul');
    list.style.marginBottom = 0;
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
  renderElementOnPage(listDiv, 'list');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#listModal');
  }
}

function createLink() {
  // get
  var linkName = document.getElementById('hrefName').value;
  var linkHref = document.getElementById('hrefAddress').value;

  // validate
  if (validateLink(linkName, linkHref) === false) {
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
  renderElementOnPage(div, 'link');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#linkModal');
  }
}

function createCode() {
  // get
  var codeText = document.getElementById('codeArea').value;
  var codeLanguage = document.getElementById('codeLanguage').value;

  // validate
  if (validateCode(codeText) === false) {
    return false;
  }

  // create
  var div = document.createElement('div');
  div = setElement(div);

  var pre = document.createElement('pre');
  pre.style.marginBottom = 0;

  var code = document.createElement('code');

  if (!codeLanguage) {
    code.innerHTML = '```<br/>' + codeText + '<br/>```';
  } else {
    code.innerHTML = '```' + codeLanguage + '<br/>' + codeText + '<br/>```';
  }

  pre.appendChild(code);
  div.appendChild(pre);
  div.appendChild(createDeleteTool());
  div.appendChild(createEditTool('codeUpdateModal', div.id));
  renderElementOnPage(div, 'code');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#codeModal');
  }
}

function createBadge() {
  // get
  var label = document.getElementById('b_label').value;
  var message = document.getElementById('b_message').value;
  var color = document.getElementById('b_color').value;
  var style = document.getElementById('b_style').value;

  // validate
  if (validateBadge(label, message, color) === false) {
    return false;
  }

  label = replaceReservedCharacters(label);
  message = replaceReservedCharacters(message);

  // create
  var div = document.createElement('div');
  div = setElement(div);

  var img = document.createElement('img');
  img.style.float = 'left';

  if (style !== 'default') {
    img.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1) + '&style=' + style;
  } else {
    img.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1);
  }

  div.appendChild(img);
  div.appendChild(createDeleteTool());
  div.appendChild(createEditTool('badgeUpdateModal', div.id));
  renderElementOnPage(div, 'badge');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#badgeModal');
  }
}

function badgePreview() {
  // clear previously generated preview
  var img = document.getElementById('badge_preview_img');
  img.src = '';

  var label = document.getElementById('b_label').value;
  var message = document.getElementById('b_message').value;
  var color = document.getElementById('b_color').value;
  var style = document.getElementById('b_style').value;

  if (validateBadge(label, message, color) === false) {
    return false;
  }

  label = replaceReservedCharacters(label);
  message = replaceReservedCharacters(message);

  $('#loader_img').show();

  if (style !== 'default') {
    img.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1) + '&style=' + style;
  } else {
    img.src = 'https://img.shields.io/badge/' + label + '-' + message + '-red?color=' + color.substr(1);
  }
  // if HEX color address: https://img.shields.io/badge/label-message-red?color=value
}

$('#badge_preview_img').on('load', function() {
  // hide/remove the loading image
  $('#loader_img').fadeOut(100);
});

function replaceReservedCharacters(str) {
  str = str.replace('-', '--');
  str = str.replace('_', '__');
  return str;
}

function createDetails() {
  // get
  var summaryText = document.getElementById('details_summary').value;
  var bodyText = document.getElementById('details_body').value;

  // validate
  if (validateDetails(summaryText, bodyText) === false) {
    return false;
  }

  // create
  var div = document.createElement('div');
  div = setElement(div);

  var details = document.createElement('details');
  details.style.whiteSpace = 'pre-line';
  details.innerHTML = `<summary>${summaryText}</summary>\n${bodyText}`;
  div.appendChild(details);
  div.appendChild(createDeleteTool());
  div.appendChild(createEditTool('detailsUpdateModal', div.id));
  renderElementOnPage(div, 'details');

  if (isAutomatedModalEnabled) {
    hideModalAfterRender('#detailsModal');
  }
}

function removeElementByParentId(elementId) {
  if (isDeleteConfirmationEnabled === true) {
    $('#removeElementConfirmationModal').modal('show');
    var anchor = document.getElementById('singleRemoveAnchor');
    anchor.onclick = function() {
      deleteElement(elementId);
    };
  } else {
    deleteElement(elementId);
  }

  if (document.getElementsByClassName('ezGitPart').length <= 0) {
    changeElementsVisiblity(codeGenButton);
    document.getElementById('resetButton').disabled = true;

    if (startingNoteRef.classList.contains('hide')) {
      startingNoteRef.classList.remove('hide');
    }
  }
}

function deleteElement(elementId) {
  var element = document.getElementById(elementId.parentNode.id);
  if (element != null) {
    element.parentNode.removeChild(element);
  }
}

function createDeleteTool() {
  if (!startingNoteRef.classList.contains('hide')) {
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
  icon.setAttribute('class', 'fas fa-vial fa-lg edit-icon-stylizer');
  return icon;
}

function setElement(element) {
  if (codeGenButton.style.visibility === 'hidden') {
    changeElementsVisiblity(codeGenButton);
  }

  element.setAttribute('id', GenerateUniqueId());
  setBasicStyleForElement(element);
  element.setAttribute('class', 'block-stylizer ezGitPart');
  element.setAttribute('onselectstart', 'return false');
  return element;
}

function setBasicStyleForElement(element) {
  element.setAttribute('style', `position: relative; border-left: 9px solid #588393; border-right: 9px solid #810401; margin-bottom: ${isNonSpacedElementsEnabled === true ? 0 : 15}px !important; min-height: 25px;`);
}

function renderElementOnPage(element, content) {
  element.classList.add(content);
  var workingSpace = document.getElementById('workingSpace');
  workingSpace.appendChild(element);
}

function hideModalAfterRender(id) {
  $(id).modal('hide');
}
