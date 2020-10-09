/* eslint-disable no-unmodified-loop-condition */
/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

var quickBuilderTextAreaRef = document.getElementById('quickBuilderTextArea');
var quickBuilderOutput = '';

function generateQuickTemplate() {
  var code = quickBuilderTextAreaRef.value;
  code = code.trim();

  if (validateQuickBuilderTextArea(code) === false) {
    return false;
  }

  quickBuilderOutput = '';
  var unrecognizedCommands = '';
  var commandNum = 0;
  var splitCode = code.split(/(\s+)/);
  for (var i = 0; i < splitCode.length; i++) {
    var command = splitCode[i].trim();

    if (command.length <= 1) {
      continue;
    }

    commandNum++;

    if (commandNum !== 1) {
      quickBuilderOutput += '\r\n\r\n';
    }

    if (command.startsWith('code')) {
      quickBuilderOutput += '```language\r\n';
      quickBuilderOutput += '// code\r\n';
      quickBuilderOutput += '```';
    } else if (command.startsWith('header')) {
      var headerVal = command.substring(
        command.lastIndexOf('{') + 1,
        command.lastIndexOf('}')
      );
      if (headerVal.length <= 0) {
        headerVal = 'H3';
      }
      if (headerVal !== 'H1' && headerVal !== 'H2' && headerVal !== 'H3' &&
             headerVal !== 'H4' && headerVal !== 'H5' && headerVal !== 'H6') {
        unrecognizedCommands += ' (' + commandNum + ':unknown style)';
        continue;
      }
      quickBuilderOutput += '<' + headerVal.toLowerCase() + '> Heading </' + headerVal.toLowerCase() + '>';
    } else if (command.startsWith('image')) {
      var imgVal = command.substring(
        command.lastIndexOf('{') + 1,
        command.lastIndexOf('}')
      );
      if (imgVal.length <= 0 || imgVal <= 0) {
        imgVal = '300';
      }
      if (imgVal > 0) {
        quickBuilderOutput += '<img src="https://placehold.it/' + imgVal + '"/>';
      }
    } else if (command.startsWith('link')) {
      quickBuilderOutput += '<a href="fill.in.address">link</a>';
    } else if (command.startsWith('list')) {
      var type = command.substring(
        command.lastIndexOf('{') + 1,
        command.lastIndexOf('-')
      );
      var amount = command.substring(
        command.lastIndexOf('-') + 1,
        command.lastIndexOf('}')
      );
      if (amount <= 0 || type.length <= 0) {
        unrecognizedCommands += ' (' + commandNum + ':wrong parameters)';
        continue;
      }

      if (type === 'iconic') {
        // :pirn2odiy: <strong>bold text:</strong> description
        for (z = 0; z < amount; z++) {
          quickBuilderOutput += ':grey_question: <strong>bold text:</strong> description <br/>';
          if ((z + 1) !== amount) {
            quickBuilderOutput += '\r\n';
          }
        }
      } else if (type === 'normal') {
        quickBuilderOutput += '<ul>\r\n';
        // <li>element</li>
        for (z = 0; z < amount; z++) {
          quickBuilderOutput += '<li>element</li>\r\n';
        }
        quickBuilderOutput += '</ul>';
      } else if (type === 'link') {
        quickBuilderOutput += '<ul>\r\n';
        // <li><a href="fill.in.address">link</a></li>
        for (z = 0; z < amount; z++) {
          quickBuilderOutput += '<li><a href="fill.in.address">link</a></li>\r\n';
        }
        quickBuilderOutput += '</ul>';
      } else {
        unrecognizedCommands += ' (' + commandNum + ':unknown type)';
        continue;
      }
    } else if (command.startsWith('table')) {
      var type = command.substring(
        command.lastIndexOf('{') + 1,
        command.lastIndexOf('-')
      );
      var rows = parseInt(command.substring(
        command.lastIndexOf('-') + 1,
        command.lastIndexOf('|')
      )) + 1;
      var cols = parseInt(command.substring(
        command.lastIndexOf('|') + 1,
        command.lastIndexOf('}')
      ));

      if (rows <= 0 || cols <= 0) {
        unrecognizedCommands += ' (' + commandNum + ':wrong row/col value)';
        continue;
      }

      if (type === 'text') {
        for (z = 0; z < rows; z++) {
          quickBuilderOutput += '| ';
          for (k = 0; k < cols; k++) {
            if (z === 0) {
              quickBuilderOutput += ' header |';
            } else if (z === 1) {
              quickBuilderOutput += ' :---: |';
            } else {
              quickBuilderOutput += ' text |';
            }
          }
          if (z !== (rows - 1)) {
            quickBuilderOutput += '\r\n';
          }
        }
      } else if (type === 'image') {
        for (z = 0; z <= rows; z++) {
          quickBuilderOutput += '| ';
          for (k = 0; k < cols; k++) {
            if (z === 0) {
              quickBuilderOutput += ' |';
            } else if (z === 1) {
              quickBuilderOutput += ' :---: |';
            } else {
              quickBuilderOutput += ' <img src="https://placehold.it/140x140" alt="#toadd" width="140" height="140"/> |';
            }
          }
          if (z !== rows) {
            quickBuilderOutput += '\r\n';
          }
        }
      } else {
        unrecognizedCommands += ' (' + commandNum + ':unknown type)';
        continue;
      }
    } else if (command.startsWith('text')) {
      quickBuilderOutput += '<p align="center|left|right">text</p>';
    } else if (command.startsWith('label')) {
      var color = command.substring(
        command.lastIndexOf('{') + 1,
        command.lastIndexOf('}')
      );

      if (color.length > 7) {
        unrecognizedCommands += ' (' + commandNum + ':too many characters)';
      }

      // custom color
      if (color.length > 0 && color.length <= 7) {
        quickBuilderOutput += '<img src="https://img.shields.io/badge/Label-Message-red?color=' + color.slice(1) + '"/>';
      } else {
        quickBuilderOutput += '<img src="https://img.shields.io/badge/Label-Message-red?color=2B61E2"/>';
      }
    } else {
      unrecognizedCommands += ' (' + commandNum + ')';
    }
  }

  if (unrecognizedCommands.length > 0) {
    triggerToast(_commandsNotRecognizedPart1 + unrecognizedCommands.trim() + _commandsNotRecognizedPart2);
  }

  if (quickBuilderOutput.length > 20) {
    quickBuilderOutput += addQuickBuilderCredits();
  }

  quickBuilderGenerateResult();
}

function addQuickBuilderCredits() {
  var dt = new Date();
  return `\r\n\r\nTemplate created on ${dt.getDate()}/${dt.getMonth() + 1}/${dt.getFullYear()} <br/> in <a href="https://github.com/trolit/EzGitDoc">EzGitDoc</a> Quickbuilder tool.`;
}

function quickBuilderGenerateResult() {
  var textarea = document.getElementById('qbResultTextArea');
  textarea.value = quickBuilderOutput;

  $('#qbResultModal').modal('show');
}

function quickBuilderCopyToClipboard() {
  var textarea = document.getElementById('qbResultTextArea');
  textarea.select();
  textarea.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.getSelection().removeAllRanges();
}

function insertCodeTemplate() {
  insertAtCursor(' code');
}

function insertHeaderTemplate() {
  insertAtCursor(' header{style}');
}

function insertImageTemplate() {
  insertAtCursor(' image{size}');
}

function insertLinkTemplate() {
  insertAtCursor(' link');
}

function insertListTemplate() {
  insertAtCursor(' list{type-amount}');
}

function insertTableTemplate() {
  insertAtCursor(' table{type-rows|cols}');
}

function insertTextTemplate() {
  insertAtCursor(' text');
}

function insertLabelTemplate() {
  insertAtCursor(' label{color}');
}

// https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
function insertAtCursor(myValue) {
  // IE support
  if (document.selection) {
    quickBuilderTextAreaRef.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
  } else if (quickBuilderTextAreaRef.selectionStart || quickBuilderTextAreaRef.selectionStart === 0) { // MOZILLA and others
    var startPos = quickBuilderTextAreaRef.selectionStart;
    var endPos = quickBuilderTextAreaRef.selectionEnd;
    quickBuilderTextAreaRef.value = quickBuilderTextAreaRef.value.substring(0, startPos) +
            myValue +
            quickBuilderTextAreaRef.value.substring(endPos, quickBuilderTextAreaRef.value.length);
  } else {
    quickBuilderTextAreaRef.value += myValue;
  }
}
