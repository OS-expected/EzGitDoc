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