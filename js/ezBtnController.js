$(document).keydown(function(evt){
    evt.preventDefault();
    
    // 81 => Q
    if ((evt.altKey) && (evt.keyCode==81)){
        closeAllActiveModals();
        openModal('codeModal');
    }
    // 87 => W
    else if ((evt.altKey) && (evt.keyCode==87)){
        closeAllActiveModals();
        openModal('headerModal');
    }
    // 69 => E
    else if ((evt.altKey) && (evt.keyCode==69)){
        closeAllActiveModals();
        openModal('imageModal');
    }
    // 65 => A
    else if ((evt.altKey) && (evt.keyCode==65)){
        closeAllActiveModals();
        openModal('linkModal');
    }
    // 83 => S
    else if ((evt.altKey) && (evt.keyCode==83)){
        closeAllActiveModals();
        openModal('listModal');
    }
    // 68 => D
    else if ((evt.altKey) && (evt.keyCode==68)){
        closeAllActiveModals();
        openModal('arrayModal');
    }    
    // 82 => R
    else if ((evt.altKey) && (evt.keyCode==82)){
        closeAllActiveModals();
        openModal('textModal');
    }
});

function closeAllActiveModals() {
    $('.modal').modal('hide');
}

function openModal(identity) {
    $('#' + identity).modal('toggle');
}