// ********************************************
// Toast Messages
// ********************************************

var missingHeaderWarning = 'It looks like you did not feed header title text.';
var minimumOneAxis = 'At least one axis needs to contain value different than 0.'; 
var noURLorBlank = 'If you want to add image, make sure that you specify URL. If you have no image URL at the moment, write blank.';
var noAltForImageSpecified = 'It looks like you did not add alternative text for image. Please, add it before you create image!';
var wrongImageExtension_part1 = 'Woops! Seems like you tried to reference to image with wrong extension';
var wrongImageExtension_part2 = '.Supported extensions for now are: jpg, jpeg, bmp, gif, png';
var notAnumber = 'Input field contained noninteger value.';
var restrictedValue = 'Input field contained illegal value (0).';
var arrayColSizeExceeded = 'Max column number exceeded (27).';
var listTypeNotSpecified = 'Type of the list was not specified.';
var noLinkName = 'Link name was not specified.';
var noLinkHref = 'Link adress is missing.';
var atLeastOneCharacter = 'Code textarea requires at least one character.';
var emptyTableInput = 'One or more input fields responsible for creating table were empty!';
var tableTypeNotSpecified = 'Table type was not specified.';
var inputLengthLimitReached = 'Input field contained more characters than allowed.';
var emptyInputFiled = 'Input field was empty.';

// ********************************************
// Validators
// ********************************************

function validateCode(codeText) {
    if(!codeText || isWhiteSpaceOrIndentOnly(codeText) == false) {
        triggerToast(atLeastOneCharacter);
        return false;
    }
    return true;
}

function validateHeader(title) {
    if (title == false)
    {
        triggerToast(missingHeaderWarning);
        return false;
    }
    return true;
}

// X -> width, Y -> height
function validateImage(altText, X, Y, URL) {
    if (!altText || isWhiteSpaceOrIndentOnly(altText) == false) 
    {  
        triggerToast(noAltForImageSpecified);
        return false;
    } else if (checkIfNumber(X) == false || checkIfNumber(Y) == false)
    {
        triggerToast(notAnumber);
        return false;
    } else if(X == 0 && Y == 0)
    {
        triggerToast(minimumOneAxis);
        return false;
    } else if (!URL)
    {
        triggerToast(noURLorBlank);
        return false;
    }
    else if (validateURL(URL) == false && URL != 'blank')
    {
        triggerToast(wrongImageExtension_part1 + '(' + URL.slice(-4) + ')' + wrongImageExtension_part2);
        return false;
    }
    return true;
}

function validateLink(linkName, linkHref) {
    if (!linkName) {
        triggerToast(noLinkName);
        return false;
    } else if (isWhiteSpaceOrIndentOnly(linkName) == false) {
        triggerToast(emptyInputFiled + ' (text)');
        return false;
    } else if (!linkHref) {
        triggerToast(noLinkHref);
        return false;
    } else if (isWhiteSpaceOrIndentOnly(linkHref) == false) { 
        linkHref = 'https://need_To_Add_Link_Later'
    }
    return true;
}

function validateList(listSize) {
    if (checkIfNumber(listSize) == false)
    {
        triggerToast(notAnumber);
        return false;
    }
    else if(listSize == 0)
    {
        triggerToast(restrictedValue);
        return false;
    }
    else if (listOption == null || listOption == 999 | listOption == 3 || listOption == 4)
    {
        triggerToast(listTypeNotSpecified);
        return false;
    }
    return true;
}