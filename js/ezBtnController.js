/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

$(document).keydown(function(evt) {
  if (evt.altKey && (evt.keyCode === 81 || evt.keyCode === 87 || evt.keyCode === 69 || evt.keyCode === 82 || evt.keyCode === 65 || evt.keyCode === 83 || evt.keyCode === 68 || evt.keyCode === 70 || evt.keyCode === 90)) {
    evt.preventDefault();
    closeAllActiveModals();

    switch (evt.keyCode) {
      case 81: // Q
        openModal('codeModal');
        break;
      case 87: // W
        openModal('headerModal');
        break;
      case 69: // E
        openModal('imageModal');
        break;
      case 82: // R
        openModal('linkModal');
        break;
      case 65: // A
        openModal('listModal');
        break;
      case 83: // S
        openModal('arrayModal');
        break;
      case 68: // D
        openModal('textModal');
        break;
      case 70: // F
        openModal('labelModal');
        break;
      case 90: // Z
        openModal('detailsModal');
        break;
    }
  }
});

function closeAllActiveModals() {
  $('.modal').modal('hide');
}

function openModal(identity) {
  $('#' + identity).modal('toggle');
}
