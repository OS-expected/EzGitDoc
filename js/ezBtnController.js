$(document).keydown(function(evt){    
    // 81 => Q
    if ((evt.altKey) && (evt.keyCode==81)){
        evt.preventDefault();
        closeAllActiveModals();
        openModal('codeModal');
    }
    // 87 => W
    else if ((evt.altKey) && (evt.keyCode==87)){
        evt.preventDefault();
        closeAllActiveModals();
        openModal('headerModal');
    }
    // 69 => E
    else if ((evt.altKey) && (evt.keyCode==69)){
        evt.preventDefault();
        closeAllActiveModals();
        openModal('imageModal');
    }
    // 65 => A
    else if ((evt.altKey) && (evt.keyCode==65)){
        evt.preventDefault();
        closeAllActiveModals();
        openModal('linkModal');
    }
    // 83 => S
    else if ((evt.altKey) && (evt.keyCode==83)){
        evt.preventDefault();
        closeAllActiveModals();
        openModal('listModal');
    }
    // 68 => D
    else if ((evt.altKey) && (evt.keyCode==68)){
        evt.preventDefault();
        closeAllActiveModals();
        openModal('arrayModal');
    }    
    // 82 => R
    else if ((evt.altKey) && (evt.keyCode==82)){
        evt.preventDefault();
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