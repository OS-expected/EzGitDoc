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

// ****************************************
// Toast Time Handler
// ****************************************

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

// ****************************************
// Helpful functions
// ****************************************

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

// list group item values occupied values
// 0 - icon list
// 1 - normal list
// 2 - link list
// 3 - text table
// 4 - image table
// 5,6,7,8,9,10 - header (10-15 for update section)
// 23 - kbd table
// 24 - linked kbd table
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
  getSingleElementFontSize();
  loadTheme();
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
  saveAs(blob, `README(${hour}-${minutes}).md`);
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
