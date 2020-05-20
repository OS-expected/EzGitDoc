var quickBuilderTextAreaRef = document.getElementById('quickBuilderTextArea');
var quickBuilderOutput = '';

function generateQuickTemplate() {
    var code = quickBuilderTextAreaRef.value;
    code = code.trim();
    
    if(validateQuickBuilderTextArea(code) == false) {
        return false;
    }

    quickBuilderOutput = '';
    var unrecognizedCommands = '';
    var commandNum = 0;
    var splitCode = code.split(/(\s+)/);
    for(var i = 0; i < splitCode.length; i++) { 
        var command = splitCode[i].trim();

        if(command.length <= 1) {
            continue;
        }

        commandNum++;

        if(commandNum != 1) {
            quickBuilderOutput += '\r\n\r\n';
        }

        if(command.startsWith('code')) {
            quickBuilderOutput += '```language\r\n';
            quickBuilderOutput += '// code\r\n';
            quickBuilderOutput += '```';
        } else if(command.startsWith('header')) {
            var headerVal = command.substring(
                command.lastIndexOf("{") + 1, 
                command.lastIndexOf("}")
            );
            if(headerVal != 'H1' && headerVal != 'H2' && headerVal != 'H3'
             && headerVal != 'H4' && headerVal != 'H5' && headerVal != 'H6') {
                unrecognizedCommands += ' (' + commandNum + ')'; 
                continue;
            }
            quickBuilderOutput += '<' + headerVal.toLowerCase() + '> Heading </' + headerVal.toLowerCase() + '>';
        } else if(command.startsWith('image')) {
            var imgVal = command.substring(
                command.lastIndexOf("{") + 1, 
                command.lastIndexOf("}")
            );
            if(imgVal <= 0) {
                unrecognizedCommands += ' (' + commandNum + ')'; 
                continue;
            } else if(imgVal > 0) {
                quickBuilderOutput += '<img src="http://placehold.it/"' + imgVal + '/>';
            }
        } else if(command.startsWith('link')) {
            quickBuilderOutput += '<a href="fill.in.address">link</a>"';
        } else if(command.startsWith('list')) {
            var type = command.substring(
                command.lastIndexOf("{") + 1, 
                command.lastIndexOf("-")
            );
            var amount = command.substring(
                command.lastIndexOf("-") + 1, 
                command.lastIndexOf("}")
            );
            console.log('type => ' + type);
            console.log('amount => ' + amount);

            if(amount <= 0) {
                unrecognizedCommands += ' (' + commandNum + ')'; 
                continue;
            }

            if(type == 'iconic') {
                // :pirn2odiy: <strong>bold text:</strong> description
                for(z = 0; z < amount; z++) {
                    quickBuilderOutput += ':pirn2odiy: <strong>bold text:</strong> description';
                    if((z + 1) != amount) {
                        quickBuilderOutput += '\r\n';
                    }
                }
            } else if (type == 'normal') {
                quickBuilderOutput += '<ul>\r\n';
                // <li>element</li>
                for(z = 0; z < amount; z++) {
                    quickBuilderOutput += '<li>element</li>\r\n';
                }
                quickBuilderOutput += '</ul>';
            } else if (type == 'link') {
                quickBuilderOutput += '<ul>\r\n';
                // <li><a href="fill.in.address">link</a></li>
                for(z = 0; z < amount; z++) {
                    quickBuilderOutput += '<li><a href="fill.in.address">link</a></li>\r\n';
                }
                quickBuilderOutput += '</ul>';
            } else {
                unrecognizedCommands += ' (' + commandNum + ')'; 
                continue;
            }       
        } else if(command.startsWith('table')) {
            
        } else if(command.startsWith('text')) {
            quickBuilderOutput += '<p align="center|left|right">text</p>';
        } else if(command.startsWith('label')) {
            
        } else {
            unrecognizedCommands += ' (' + commandNum + ')'; 
        }
    }

    if(unrecognizedCommands.length > 0) {
        triggerToast(commandsNotRecognized_pt1 + unrecognizedCommands.trim() + commandsNotRecognized_pt2);
    }

    quickBuilderCopyResult();
}

function quickBuilderCopyResult()
{
    quickBuilderTextAreaRef.value = quickBuilderOutput;
    quickBuilderTextAreaRef.select();
    quickBuilderTextAreaRef.setSelectionRange(0, 99999)
    document.execCommand("copy");
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
    insertAtCursor(' table{type}{rows}{cols}');
}

function insertTextTemplate() {
    insertAtCursor(' text');
}

function insertLabelTemplate() {
    insertAtCursor(' label{color}');
}   

// https://stackoverflow.com/questions/11076975/how-to-insert-text-into-the-textarea-at-the-current-cursor-position
function insertAtCursor(myValue) {
    //IE support
    if (document.selection) {
        quickBuilderTextAreaRef.focus();
        sel = document.selection.createRange();
        sel.text = myValue;
    }
    //MOZILLA and others
    else if (quickBuilderTextAreaRef.selectionStart || quickBuilderTextAreaRef.selectionStart == 0) {
        var startPos = quickBuilderTextAreaRef.selectionStart;
        var endPos = quickBuilderTextAreaRef.selectionEnd;
        quickBuilderTextAreaRef.value = quickBuilderTextAreaRef.value.substring(0, startPos)
            + myValue
            + quickBuilderTextAreaRef.value.substring(endPos, quickBuilderTextAreaRef.value.length);
    } else {
        quickBuilderTextAreaRef.value += myValue;
    }
}