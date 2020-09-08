/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

// *********************************************************
// HERE MAGIC HAPPENS :)
// *********************************************************

var lastGeneratedCode = '';

function GenerateMDCode() {
  var code = '';
  var datas = document.getElementsByClassName('ezGitPart');

  for (var i = 0; i < datas.length; i++) {
    code += '\r\n\r\n';
    var tmp = '';
    var elementTag = datas.item(i).children.item(0).tagName;
    // console.log(elementTag);
    // Header translation
    if (elementTag.startsWith('H')) {
      var elementValue = datas.item(i).children.item(0).textContent;

      switch (elementTag[1]) {
        case '1':
          code = code + '<h1>' + elementValue + '</h1>';
          break;
        case '2':
          code = code + '<h2>' + elementValue + '</h2>';
          break;
        case '3':
          code = code + '<h3>' + elementValue + '</h3>';
          break;
        case '4':
          code = code + '<h4>' + elementValue + '</h4>';
          break;
        case '5':
          code = code + '<h5>' + elementValue + '</h5>';
          break;
        case '6':
          code = code + '<h6>' + elementValue + '</h6>';
          break;
      }
    } else if (elementTag.startsWith('IMG')) { // Image translation
      var paragraph = datas.item(i);
      var image = paragraph.children[0];

      if (image.src.includes('shields')) {
        tmp = '<img src="' + image.src + '" alt="to do: add alt text"/>';
      } else {
        tmp = '<p align="' + paragraph.style.textAlign + '"><img src="' + image.src + '"';

        if (image.classList.contains('wide') === true) {
          tmp = tmp + ' width="' + image.width + '"';
        } else if (image.classList.contains('high') === true) {
          tmp = tmp + ' height="' + image.height + '"';
        } else {
          tmp = tmp + ' height="' + image.height + '"' + ' width="' + image.width + '"';
        }

        tmp = tmp + ' alt="' + image.alt + '"></p>';
      }
    } else if (elementTag.startsWith('TABLE')) { // Table translation
      var table = datas.item(i).children[0];
      var columnAmount = table.rows[0].cells.length;
      var rowAmount = table.rows.length;
      if (table.classList.contains('textTable')) {
        for (var x = 0; x <= rowAmount; x++) {
          tmp = tmp + '|';

          for (var y = 0; y < columnAmount; y++) {
            if (x === 0) {
              tmp = tmp + ' ' + table.rows[x].cells[y].textContent + ' |';
            }
            if (x === 1) {
              tmp = tmp + ' :---: |';
            } else if (x >= 1) {
              tmp = tmp + ' ' + table.rows[x - 1].cells[y].textContent + ' |';
            }
          }
          if (x !== rowAmount) {
            tmp = tmp + '\r\n';
          }
        }
      } else if (table.classList.contains('imageTable')) {
        for (var x = 0; x <= rowAmount + 1; x++) {
          tmp = tmp + '|';

          for (var y = 0; y < columnAmount; y++) {
            if (x === 0) {
              tmp = tmp + ' |';
            }
            if (x === 1) {
              tmp = tmp + ' :---: |';
            } else if (x >= 1) {
              tmp = tmp + ' <img src="https://place-hold.it/350x140" alt="#toadd" width="350" height="140"/> |';
            }
          }
          if (x !== rowAmount + 1) {
            tmp = tmp + '\r\n';
          }
        }

        tmp = tmp + '\r\n' + '<!-- For image table, it\'s highly recommended to have the same resolution images. \r\n To find best results(no stretches, equal cells), both axis should be adjusted manually. -->';
      } else {
        triggerToast('Code generation failed (table type problem).');
        return false;
      }
    } else if (elementTag.startsWith('P') && elementTag.length === 1) { // Text translation
      var paragraph = datas.item(i).children[0];

      // if contains .customList - its list with icons
      if (paragraph.classList.contains('customList')) {
        var listLength = datas.item(i).children.length;

        for (var x = 0; x < listLength - 2; x++) {
          // :icon: **header:** text <br/> <br>
          tmp = tmp + datas.item(i).children[x].innerHTML + '<br><br>';
          if (x < listLength - 2) {
            tmp = tmp + '\r\n';
          }
        }
        tmp = tmp + '\r\n' + '<!-- If you did not specify icon, simply overwrite Id put between : : characters with desired icon name -->' +
                '\r\n' + '<!-- Supported by GitHub icon list can be found here: https://gist.github.com/rxaviers/7360908 -->';
      } else { // else it's raw text
        if (paragraph.style.textAlign === 'justify') {
          tmp = tmp + '<p align="justify">' + paragraph.innerHTML + '</p>';
        } else {
          tmp = tmp + ' ' + paragraph.innerHTML;
        }
      }
    } else if (elementTag.startsWith('UL')) { // Unordered list translation
      var firstElementTag = datas.item(i).children[0].childNodes[0].firstChild.tagName;
      var listLength = datas.item(i).getElementsByTagName('LI').length;
      var listElement = datas.item(i).children[0];

      // link list
      if (firstElementTag === 'A') {
        for (var x = 0; x < listLength; x++) {
          tmp = tmp + '- <a href="' + listElement.childNodes[x].childNodes[0].href + '">' + listElement.childNodes[x].textContent + '</a>';
          if (x < listLength - 1) {
            tmp = tmp + '\r\n';
          }
        }
      } else { // normal list
        for (var x = 0; x < listLength; x++) {
          tmp = tmp + '- ' + listElement.childNodes[x].textContent;

          if (x < listLength - 1) {
            tmp = tmp + '\r\n';
          }
        }
      }
    } else if (elementTag.startsWith('A')) { // Link translation
      var element = datas.item(i).children[0];
      var href = element.getAttribute('href');
      tmp = tmp + '<a href="' + href + '">' + element.textContent + '</a>';
    } else if (elementTag.startsWith('PRE')) { // Code translation
      var element = datas.item(i).children[0].children[0];
      tmp = tmp + element.innerHTML.replace(/<br\s*[/]?>/gi, '\r\n');
    }
    code = code + tmp;
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
<p align="{value}"><img src="{value}" height="{value}" width="{value}"></p>

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
