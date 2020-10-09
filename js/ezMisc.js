/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

var codeGenButton = document.getElementById('codeGenButton');

window.addEventListener('load', function () {
  // extra delay
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    setTimeout(beginHidingPreLoader, 1200);
  } else {
    beginHidingPreLoader();
  }

  // Disable RESET button
  document.getElementById('resetButton').disabled = true;
  // Hide GitHub List element
  document.getElementById('iconDiv').hidden = true;
});

// Toast Time Handler
var seconds = 0;
var minutes = 0;

var myInterval;
var el = document.getElementById('toastTime');

function beginToastCounter() {
  resetLastInterval(myInterval);
  seconds = 1;
  el.innerText = '' + seconds + ' second ago.';
  myInterval = setInterval(increaseCounter, 1000);
}

function increaseCounter() {
  if (seconds >= 1 && seconds < 60) {
    seconds += 1;
    el.innerText = '' + seconds + ' seconds ago.';

    if (seconds === 60) {
      resetLastInterval();
      el.innerText = '1 minute ago.';
      minutes = 1;
      myInterval = setInterval(increaseCounter, 60000);
    }
  } else if (seconds >= 60) {
    minutes += 1;
    el.innerText = minutes + ' minutes ago.';
  }
}

function resetLastInterval() {
  clearInterval(myInterval);
}

function GenerateUniqueId() {
  return Math.random().toString(36).substr(2, 9);
}

function validateURL(url) {
  var result = false;
  var popularExtensions = ['bmp', 'png', 'jpeg', 'jpg', 'gif'];
  url = url.slice(-4);

  for (const element of popularExtensions) {
    if (url.includes(element)) {
      result = true;
      break;
    }
  }

  return result;
}

function checkIfNumber(value) {
  if (value === 0) {
    return true;
  }
  return /^\d+$/.test(value);
}

function checkifNaN(value) {
  if (isNaN(value) === true) {
    return 0;
  } else {
    return value;
  }
}

// Toast trigger & disassemble functions
var toast = document.getElementById('myToast');

function triggerToast(message) {
  var toastBody = document.getElementById('toastBody');
  toastBody.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;

  beginToastCounter();
  toast.style.display = 'block';
  $('#myToast').toast('show');

  if (isAutoToastHideEnabled === true) {
    setTimeout(HideToastManually, 6400);
  }
}

function HideToastManually() {
  $('#myToast').toast('hide');
  resetLastInterval();
}

// List modal picker
var currentlyActive;
var _currentlyActiveUpdate;
var listOption;

// listOption, occupied values
// 0 - icon list
// 1 - normal list
// 2 - link list
// 3 - text table
// 4 - image table
// 5,6,7,8,9,10 - header (+5 for update section)
function setElementAsActive(element, extraArg = 'empty') {
  // Reset if no extraArg applied
  if (extraArg === 'empty') {
    document.getElementById('iconDiv').hidden = true;
  }
  if (currentlyActive) {
    currentlyActive.classList.remove('active');
  }
  if (_currentlyActiveUpdate) {
    _currentlyActiveUpdate.classList.remove('active');
  }
  if (element === '-1') {
    if (currentlyActive) {
      currentlyActive.classList.remove('active');
    }
    listOption = 999;
    return;
  }

  listOption = element.value;
  element.classList.add('active');
  currentlyActive = element;

  if (extraArg === 'toggle_list_iconField') {
    document.getElementById('iconDiv').hidden = false;
  }
}

// Enable navigation prompt
window.onbeforeunload = function() {
  return true;
};
// Remove navigation prompt
window.onbeforeunload = null;

// on page startup with JQuery
$(document).ready(function () {
  $('#myToast').hide();
  // queue defaulting last highlighted element's background color
  defaultLastHighlightedElementBackgroundColor();
  // hide label loader
  $('#loader_img').hide();
  // bs colorpicker init
  $('#b_color').colorpicker({
    format: 'hex'
  });
  $('#b_color_update').colorpicker({
    format: 'hex'
  });
  // load additional settings
  loadSettings();
  // custom scroll bar is only on desktop
  if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    $('.sidebar-content').mCustomScrollbar({
      scrollButtons: {
        enable: true
      },
      axis: 'y',
      autoHideScrollbar: true,
      scrollInertia: 300,
      theme: 'light',
      scrollbarPosition: 'inside'
    });
    $('.sidebar-content').addClass('desktop');
  }
  // add popover-hover with images
  $('[data-toggle="popover-hover"]').popover({
    html: true,
    trigger: 'hover',
    placement: 'left',
    content: function () { return '<img src="' + $(this).data('img') + '" width=\'100%\' />'; }
  });
  // add page leaving confirmation
  if (location.hostname !== 'localhost' && location.hostname !== '127.0.0.1') {
    window.addEventListener('beforeunload', function (e) {
      var message = 'Are you sure you want to leave/refresh?';

      (e || window.event).returnValue = message;
      return message;
    });
  }
  // power up Tooltip
  $('[data-tooltip="tooltip"]').tooltip({
    trigger: 'hover'
  });
  // power up MDB Tree (help modal)
  $('.treeview-animated').mdbTreeview();
  // power up SortableJS
  var el = document.getElementById('workingSpace');
  Sortable.create(el, {
    group: 'shared',
    animation: 150
  });

  // enable TAB indent in textareas
  // thanks: https://stackoverflow.com/questions/6637341/use-tab-to-indent-in-textarea
  var textareas = document.getElementsByTagName('textarea');
  var count = textareas.length;
  for (var i = 0; i < count; i++) {
    textareas[i].onkeydown = function(e) {
      if (e.keyCode === 9 || e.which === 9) {
        e.preventDefault();
        var s = this.selectionStart;
        this.value = this.value.substring(0, this.selectionStart) + '\t' + this.value.substring(this.selectionEnd);
        this.selectionEnd = s + 1;
      }
    };
  }
});

function defaultLastHighlightedElementBackgroundColor() {
  $('#referencesModal').on('hidden.bs.modal', function () {
    if (lastHighlightedElement != null) {
      lastHighlightedElement.style.backgroundColor = '#EEEEEE';
      lastHighlightedElement = null;
    }
  });
}

// Generated code copy function
function copyToClipboard(btn) {
  var copyText = document.getElementById('codeTextBox');
  copyText.select();
  copyText.setSelectionRange(0, 99999);
  document.execCommand('copy');
  document.getSelection().removeAllRanges();

  btn.innerText = 'Copied';

  setTimeout(function() { btn.innerText = 'Copy to clipboard'; }, 5000);
}

// Show/hide code generator button
function changeElementsVisiblity(element) {
  if (element.style.visibility === 'hidden') {
    element.style.visibility = 'visible';
  } else {
    element.style.visibility = 'hidden';
  }
}

// Reset button functionality
function removeAllElements() {
  document.getElementById('resetButton').disabled = true;

  $('#workingSpace').children(':not(#startNote)').remove();

  if (codeGenButton.style.visibility === 'visible') {
    changeElementsVisiblity(codeGenButton);
  }

  if (startingNoteRef.classList.contains('hide')) {
    startingNoteRef.classList.remove('hide');
  }
}

// Save to file
function saveStaticDataToFile() {
  var date = new Date();
  var hour = date.getHours();
  var minutes = String(date.getMinutes()).padStart(2, '0');

  var blob = new Blob([lastGeneratedCode],
    { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'ezGitDoc_' + hour + '-' + minutes + '.txt');
}

function beginHidingPreLoader() {
  $('.se-pre-con').fadeOut('slow');
}

// Sidebar toggle
$('#close-sidebar').click(function() {
  $('.page-wrapper').removeClass('toggled');
});

$('#show-sidebar').click(function() {
  $('.page-wrapper').addClass('toggled');
});

// Modal clear
function clearModal(id, extraArg) {
  $(id).find('form').trigger('reset');

  if (extraArg === 'withImage') {
    document.getElementById('badge_preview_img').src = '';
  }

  // clear chosen option
  setElementAsActive('-1');
}

// Verify if string contains only whitespaces/indents
function isWhiteSpaceOrIndentOnly(_text) {
  if (!/\S/.test(_text)) {
    return true;
  } return false;
}

$('body').on('hidden.bs.modal', function () {
  if ($('.modal.show').length > 0) {
    $('body').addClass('modal-open');
  }
});

// supply references modal
var referencesModalContent = document.getElementById('referencesModalContent');

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
      case 'badge':
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

function highlightElement(id) {
  if (lastHighlightedElement !== null) {
    lastHighlightedElement.style.backgroundColor = '#EEEEEE';
  }
  var element = document.getElementById(id);
  element.style.backgroundColor = '#E5A200';
  lastHighlightedElement = element;
}
