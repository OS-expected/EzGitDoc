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

function wrapCodeIntoParagraph(alignment, code) {
  return `<p align="${alignment}">${code}</p>`;
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
  for (var x = 0; x <= rowAmount + 1; x++) {
    imageTableCode = imageTableCode + '|';
    for (var y = 0; y < columnAmount; y++) {
      if (x === 0) {
        imageTableCode = imageTableCode + ' |';
      }
      if (x === 1) {
        imageTableCode = imageTableCode + ' :---: |';
      } else if (x >= 1) {
        imageTableCode = imageTableCode + ' <img src="https://place-hold.it/350x140" alt="#toadd" width="350" height="140"/> |';
      }
    }
    if (x !== rowAmount + 1) {
      imageTableCode = imageTableCode + '\r\n';
    }
  }
  return imageTableCode;
}

function generateCode() {
  var code = '';
  var elements = document.getElementsByClassName('ezGitPart');

  for (var i = 0; i < elements.length; i++) {
    code += '\r\n\r\n';
    var currIterationCode = '';

    if (elements.item(i).classList.contains('header')) {
      code = code + printHeaderCodeForFirstChild(elements.item(i).firstChild);
    } else if (elements.item(i).classList.contains('image') || elements.item(i).classList.contains('badge')) {
      var paragraph = elements.item(i);
      var image = paragraph.children[0];

      if (image.src.includes('shields')) {
        currIterationCode = printShieldsBadgeCodeAsImage(image.src);
      } else {
        currIterationCode = printImageCodeWrappedInParagraph(paragraph.style.textAlign, image);
      }
    } else if (elements.item(i).classList.contains('table')) {
      var table = elements.item(i).children[0];
      if (table.classList.contains('textTable')) {
        currIterationCode = printTextTableCode(table);
      } else if (table.classList.contains('imageTable')) {
        currIterationCode = printImageTableCode(table);
        currIterationCode = currIterationCode + '\r\n' + '<!-- For image table, it\'s highly recommended to have the same resolution images. \r\n To find best results(no stretches, equal cells), both axis should be adjusted manually. -->';
      } else {
        triggerToast('Code generation failed (table type problem).');
        return false;
      }
    } else if (elements.item(i).classList.contains('text')) {
      var paragraph = elements.item(i).children[0];
      if (paragraph.style.textAlign === 'justify') {
        currIterationCode = currIterationCode + '<p align="justify">' + paragraph.innerHTML + '</p>';
      } else {
        currIterationCode = currIterationCode + ' ' + paragraph.innerHTML;
      }
    } else if (elements.item(i).classList.contains('list')) {
      var listLength = elements.item(i).getElementsByTagName('LI').length;
      var listElement = elements.item(i).children[0];

      if (elements.item(i).children[0].firstChild.textContent.startsWith(':')) {
        var listLength = elements.item(i).children.length;
        for (var x = 0; x < listLength - 2; x++) {
          // :icon: **header:** text <br/> <br>
          currIterationCode = currIterationCode + elements.item(i).children[x].innerHTML + '<br><br>';
          if (x < listLength - 2) {
            currIterationCode = currIterationCode + '\r\n';
          }
        }
        currIterationCode = currIterationCode + '\r\n' + '<!-- If you did not specify icon, simply overwrite Id put between : : characters with desired icon name -->' +
                '\r\n' + '<!-- Supported by GitHub icon list can be found here: https://gist.github.com/rxaviers/7360908 -->';
      } else if (elements.item(i).children[0].childNodes[0].firstChild.tagName === 'A') { // link list
        for (var x = 0; x < listLength; x++) {
          currIterationCode = currIterationCode + '- <a href="' + listElement.childNodes[x].childNodes[0].href + '">' + listElement.childNodes[x].textContent + '</a>';
          if (x < listLength - 1) {
            currIterationCode = currIterationCode + '\r\n';
          }
        }
      } else { // normal list
        for (var x = 0; x < listLength; x++) {
          currIterationCode = currIterationCode + '- ' + listElement.childNodes[x].textContent;

          if (x < listLength - 1) {
            currIterationCode = currIterationCode + '\r\n';
          }
        }
      }
    } else if (elements.item(i).classList.contains('link')) {
      var element = elements.item(i).children[0];
      var href = element.getAttribute('href');
      currIterationCode = currIterationCode + '<a href="' + href + '">' + element.textContent + '</a>';
    } else if (elements[i].classList.contains('code')) {
      var element = elements.item(i).children[0].children[0];
      currIterationCode = currIterationCode + element.innerHTML.replace(/<br\s*[/]?>/gi, '\r\n');
    }
    code = code + currIterationCode;
    if (i === 0) {
      code = code.replace(/^\s*[\r\n]/gm, '');
    }
  }

  code += credits;
  lastGeneratedCode = code;
  document.getElementById('codeTextBox').value = code;
  $('#generatedCodeModal').modal('show');
}

var credits = '\r\n\r\nTemplate generated using <a href="https://github.com/trolit/EzGitDoc">EzGitDoc</a>';

/*
ezLogicTranslator output cheatsheet

---------HEADER------------------------
<h{value}>text</h{value}>

---------IMAGE-------------------------
<p align="{value}"><img src="{value}" height="{value}" width="{value}"/></p>

---------TABLE (of type text)----------
| header | header | header |
| :---:  | :---:  | :---:  |
| text | text | text |

---------TABLE (of type image)----------
|  |  |  |
| :---:  | :---:  | :---:  |
| <img src="{value}" alt="{value}" width="350px" height="140px"></img> | <img src="{value}" alt="{value}" width="350px" height="140px"></img> | <img src="{value}" alt="{value}" width="350px" height="140px"></img> |

---------TEXT--------------------------
<p align="justify">
Text
</p>

---------LIST WITH GITHUB ICON---------
:icon: **header:** text <br/> <br/>
:icon: **header:** text <br/> <br/>

---------STANDARD POINT LIST---------
- text
- text
- text

---------LINK------------------------
<a href="{value}">{value}</a>

---------CODE------------------------
```{value}
{value}
```
*/
