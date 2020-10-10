/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

var isAutomatedModalEnabled;
var isAutoToastHideEnabled;
var isHintKeyEnabled;
var isNonSpacedElementsEnabled;
var isDeleteConfirmationEnabled;

function updateSetting(name) {
  if (name === 'autoModals') {
    isAutomatedModalEnabled = document.getElementById('autoMod_switch').checked;
    changeStatusLabel(isAutomatedModalEnabled, 'autoMod_switch_label');
  } else if (name === 'autoDisappear') {
    isAutoToastHideEnabled = document.getElementById('autoDisappear_switch').checked;
    changeStatusLabel(isAutoToastHideEnabled, 'autoDisappear_switch_label');
  } else if (name === 'hintKeys') {
    isHintKeyEnabled = document.getElementById('hintKeys_switch').checked;
    changeStatusLabel(isHintKeyEnabled, 'hintKeys_switch_label');
    if (isHintKeyEnabled) {
      manageKeyHints('show');
    } else {
      manageKeyHints('hide');
    }
  } else if (name === 'nonSpacedElements') {
    isNonSpacedElementsEnabled = document.getElementById('nonSpacedElements_switch').checked;
    changeStatusLabel(isNonSpacedElementsEnabled, 'nonSpacedElements_switch_label');
    var elements = document.getElementsByClassName('ezGitPart');
    if (elements.length !== 0) {
      elements.forEach(element => {
        setBasicStyleForElement(element);
      });
    }
  } else if (name === 'deleteConfirmation') {
    isDeleteConfirmationEnabled = document.getElementById('deleteConfirmation_switch').checked;
    changeStatusLabel(isDeleteConfirmationEnabled, 'deleteConfirmation_switch_label');
  }
}

function changeStatusLabel(checkStatus, labelId) {
  var tmp = document.getElementById(labelId);
  if (checkStatus === true) {
    tmp.classList.remove('badge-danger');
    tmp.classList.add('badge-success');
    tmp.textContent = 'enabled';
  } else {
    tmp.classList.remove('badge-success');
    tmp.classList.add('badge-danger');
    tmp.textContent = 'disabled';
  }
}

function loadSettings() {
  isAutomatedModalEnabled = document.getElementById('autoMod_switch').checked;
  changeStatusLabel(isAutomatedModalEnabled, 'autoMod_switch_label');

  isAutoToastHideEnabled = document.getElementById('autoDisappear_switch').checked;
  changeStatusLabel(isAutoToastHideEnabled, 'autoDisappear_switch_label');

  isHintKeyEnabled = document.getElementById('hintKeys_switch').checked;
  changeStatusLabel(isHintKeyEnabled, 'hintKeys_switch_label');

  if (isHintKeyEnabled) {
    manageKeyHints('show');
  } else {
    manageKeyHints('hide');
  }

  isNonSpacedElementsEnabled = document.getElementById('nonSpacedElements_switch').checked;
  changeStatusLabel(isNonSpacedElementsEnabled, 'nonSpacedElements_switch_label');

  isDeleteConfirmationEnabled = document.getElementById('deleteConfirmation_switch').checked;
  changeStatusLabel(isDeleteConfirmationEnabled, 'deleteConfirmation_switch_label');
}

function manageKeyHints(flag) {
  var badges = document.getElementsByClassName('hintKey');
  for (var i = 0; i < badges.length; i++) {
    if (flag === 'show') {
      badges[i].classList.remove('hide');
    } else if (flag === 'hide') {
      badges[i].classList.add('hide');
    }
  }
}
