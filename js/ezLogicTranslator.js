/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

// *********************************************************
// HERE MAGIC HAPPENS :)
// *********************************************************

var lastGeneratedCode = '';

function printHeaderCodeForFirstChild(item) {
  var headerLevel = item.tagName[1];
  return `<h${headerLevel}>` + item.textContent + `</h${headerLevel}>`;
}

function printShieldsBadgeCodeAsImage(url) {
  return `<img src="${url}" alt="to do: add alt text"/>`;
}

function printImageCodeWrappedInParagraph(alignment, image) {
  if (image.classList.contains('wide') === true) {
    return wrapCodeIntoParagraph(alignment,
       `<img src="${image.src}" alt="${image.alt}" width="${image.width}"/>`);
  } else if (image.classList.contains('high') === true) {
    return wrapCodeIntoParagraph(alignment,
       `<img src="${image.src}" alt="${image.alt}" height="${image.height}"/>`);
  } else {
    return wrapCodeIntoParagraph(alignment,
       `<img src="${image.src}" alt="${image.alt}" height="${image.height}" width="${image.width}"/>`);
  }
}

function printPlaceHoldImageCode(width, height, alt) {
  return `<img src="https://place-hold.it/${width}x${height}" alt="${alt}" width="${width}" height="${height}"/>`;
}

function wrapCodeIntoParagraph(alignment, code) {
  if (alignment === 'kbd') {
    return `<p align="center">\r\n${code}</p>`;
  } else if (alignment.length <= 0) {
    return `<p>${code}</p>`;
  } else {
    return `<p align="${alignment}">${code}</p>`;
  }
}

function printTextTableCode(table) {
  var columnAmount = table.rows[0].cells.length;
  var rowAmount = table.rows.length;
  var textTableCode = '';
  for (var x = 0; x <= rowAmount; x++) {
    textTableCode = textTableCode + '|';
    for (var y = 0; y < columnAmount; y++) {
      if (x === 0) {
        textTableCode = textTableCode + ' ' + table.rows[x].cells[y].textContent + ' |';
      }
      if (x === 1) {
        textTableCode = textTableCode + ' :---: |';
      } else if (x >= 1) {
        textTableCode = textTableCode + ' ' + table.rows[x - 1].cells[y].textContent + ' |';
      }
    }
    if (x !== rowAmount) {
      textTableCode = textTableCode + '\r\n';
    }
  }
  return textTableCode;
}

function printImageTableCode(table) {
  var columnAmount = table.rows[0].cells.length;
  var rowAmount = table.rows.length;
  var imageTableCode = '';
  var td = table.rows[0].cells[0];
  var image = td.children[0];
  for (var x = 0; x <= rowAmount + 1; x++) {
    imageTableCode = imageTableCode + '|';
    for (var y = 0; y < columnAmount; y++) {
      if (x === 0) {
        imageTableCode = imageTableCode + ' |';
      }
      if (x === 1) {
        imageTableCode = imageTableCode + ' :---: |';
      } else if (x >= 1) {
        imageTableCode = imageTableCode + ` ${printPlaceHoldImageCode(image.width, image.height, '#toadd')} |`;
      }
    }
    if (x !== rowAmount + 1) {
      imageTableCode = imageTableCode + '\r\n';
    }
  }
  return imageTableCode;
}

function printTextCodeInParagraph(paragraph) {
  if (paragraph.style.textAlign === 'justify') {
    return wrapCodeIntoParagraph('justify', `${paragraph.innerHTML}`);
  } else {
    return wrapCodeIntoParagraph('', `${paragraph.innerHTML}`);
  }
}

function printIconListCode(listLength, elements, i) {
  var iconListCode = '';
  for (var x = 0; x < listLength - 2; x++) {
    // :icon: **header:** text <br/> <br>
    iconListCode = iconListCode + elements.item(i).children[x].innerHTML + '<br><br>';
    if (x < listLength - 2) {
      iconListCode = iconListCode + '\r\n';
    }
  }
  return iconListCode;
}

function printLinkListCode(listLength, listElement) {
  var linkListCode = '';
  for (var x = 0; x < listLength; x++) {
    linkListCode = linkListCode + `- <a href="${listElement.childNodes[x].childNodes[0].href}">${listElement.childNodes[x].textContent}</a>`;
    if (x < listLength - 1) {
      linkListCode = linkListCode + '\r\n';
    }
  }
  return linkListCode;
}

function printTextListCode(listLength, listElement) {
  var textListCode = '';
  for (var x = 0; x < listLength; x++) {
    textListCode = textListCode + '- ' + listElement.childNodes[x].textContent;
    if (x < listLength - 1) {
      textListCode = textListCode + '\r\n';
    }
  }
  return textListCode;
}

function printKbdLinkCode(href, textContent) {
  return `<a href="${href}"><kbd>${textContent}</kbd></a>`;
}

function printKbdCode(content, mode = 'basic') {
  var kbdCode = '';
  for (var i = 0; i < content.length; i++) {
    if (content.item(i).tagName !== 'BR') {
      if (mode === 'basic') {
        var image = content.item(i).firstChild;
        kbdCode += `<kbd>${printPlaceHoldImageCode(image.width, image.height, image.alt)}</kbd> \r\n`;
      } else if (mode === 'linked') {
        var a = content.item(i);
        var image = content.item(i).firstChild.children[0];
        kbdCode += `${printKbdLinkCode(a.href, printPlaceHoldImageCode(image.width, image.height, image.alt))} \r\n`;
      }
    } else {
      kbdCode += '<br/> \r\n';
    }
  }
  return wrapCodeIntoParagraph('kbd', kbdCode);
}

function printLinkCode(href, text) {
  return `<a href="${href}">${text}</a>`;
}

function printDetailsSummaryCode(details) {
  var body = details.innerHTML;
  var summary = body.substring(0, details.innerHTML.indexOf('\n'));
  var body = body.split('\n').splice(1).join('\n');
  return `<details>\n${summary}\n${body.replace(/(\n)+/g, '<br/>\n')}\n</details>`;
}

function generateCode() {
  var code = '';
  var elements = document.getElementsByClassName('ezGitPart');

  for (var i = 0; i < elements.length; i++) {
    code += '\r\n\r\n';
    var currIterationCode = '';

    if (elements[i].classList.contains('code')) {
      var element = elements.item(i).children[0].children[0];
      currIterationCode = element.innerHTML.replace(/<br\s*[/]?>/gi, '\r\n');
    } else if (elements.item(i).classList.contains('header')) {
      code = code + printHeaderCodeForFirstChild(elements.item(i).firstChild);
    } else if (elements.item(i).classList.contains('image') || elements.item(i).classList.contains('badge')) {
      var paragraph = elements.item(i);
      var image = paragraph.children[0];
      if (image.src.includes('shields')) {
        currIterationCode = printShieldsBadgeCodeAsImage(image.src);
      } else {
        currIterationCode = printImageCodeWrappedInParagraph(paragraph.style.textAlign, image);
      }
    } else if (elements.item(i).classList.contains('link')) {
      var element = elements.item(i).children[0];
      var href = element.getAttribute('href');
      currIterationCode = printLinkCode(href, element.textContent);
    } else if (elements.item(i).classList.contains('list')) {
      var listLength = elements.item(i).getElementsByTagName('LI').length;
      var listElement = elements.item(i).children[0];

      if (elements.item(i).children[0].firstChild.textContent.startsWith(':')) {
        var listLength = elements.item(i).children.length;
        currIterationCode = printIconListCode(listLength, elements, i);
        currIterationCode = currIterationCode + '\r\n' + '<!-- If you did not specify icon, simply overwrite Id put between : : characters with desired icon name -->' +
                '\r\n' + '<!-- Supported by GitHub icon list can be found here: https://gist.github.com/rxaviers/7360908 -->';
      } else if (elements.item(i).children[0].childNodes[0].firstChild.tagName === 'A') { // link list
        currIterationCode = printLinkListCode(listLength, listElement);
      } else { // normal list
        currIterationCode = printTextListCode(listLength, listElement);
      }
    } else if (elements.item(i).classList.contains('table')) {
      var table = elements.item(i).children[0];
      if (table.classList.contains('textTable')) {
        currIterationCode = printTextTableCode(table);
      } else if (table.classList.contains('imageTable')) {
        currIterationCode = printImageTableCode(table);
        currIterationCode = currIterationCode + '\r\n' + '<!-- For image table, it\'s highly recommended to have the same resolution images. \r\n To find best results(no stretches, equal cells), both axis should be adjusted manually. -->';
      } else if (table.firstChild.tagName === 'KBD') {
        currIterationCode = printKbdCode(table.childNodes);
      } else if (table.firstChild.tagName === 'A') {
        currIterationCode = printKbdCode(table.childNodes, 'linked');
      } else {
        triggerToast('Code generation failed (table type problem).');
        return false;
      }
    } else if (elements.item(i).classList.contains('text')) {
      var paragraph = elements.item(i).children[0];
      currIterationCode = printTextCodeInParagraph(paragraph);
    } else if (elements.item(i).classList.contains('details')) {
      var details = elements.item(i).children[0];
      currIterationCode = printDetailsSummaryCode(details);
    }
    code = code + currIterationCode;
    if (i === 0) {
      code = code.replace(/^\s*[\r\n]/gm, '');
    }
  }

  code += addCredits();
  lastGeneratedCode = code;
  document.getElementById('codeTextBox').value = code;
  $('#generatedCodeModal').modal('show');
}

function addCredits() {
  var dt = new Date();
  return `\r\n\r\nTemplate created on ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} <br/> in <a href="https://github.com/trolit/EzGitDoc">EzGitDoc</a>`;
}
