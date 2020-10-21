/* eslint-disable no-redeclare */
/* eslint-disable no-undef */
/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */

// ********************************************
// Toast Messages
// ********************************************

var maximumAllowedRes = 2000;

var missingHeaderWarning = 'It looks like you did not feed header title text.';
var minimumOneAxis = 'At least one axis needs to contain value different than 0.';
var noURLorBlank = 'If you want to add image, make sure that you specify URL. If you have no image URL at the moment, write blank.';
var noAltForImageSpecified = 'It looks like you did not add alternative text for image. Please, add it before you create image!';
var _wrongImageExtensionPart1 = 'Woops! Seems like you tried to reference to image with wrong extension';
var _wrongImageExtensionPart2 = '.Supported extensions for now are: jpg, jpeg, bmp, gif, png';
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
var emptyQBTextArea = 'Quick builder terminal is empty.';
var _commandsNotRecognizedPart1 = 'Command(s): ';
var _commandsNotRecognizedPart2 = ' not included in the output. Please make sure that the syntax is correct.';
var limitReached = `Maximum allowed number is ${maximumAllowedRes},`;
var samePos = 'New element\'s position cannot be the same as current one.';
var wrongPos = 'New element\'s position must be from';

// ********************************************
// Validators
// ********************************************

function validateCode (codeText) {
  if (!codeText || isWhiteSpaceOrIndentOnly(codeText) === true) {
    triggerToast(atLeastOneCharacter);
    return false;
  }
  return true;
}

function validateHeader (title) {
  if (title.length <= 0) {
    triggerToast(missingHeaderWarning);
    return false;
  }
  return true;
}

// X -> width, Y -> height
function validateImage (altText, X, Y, URL) {
  if (!altText || isWhiteSpaceOrIndentOnly(altText) === true) {
    triggerToast(noAltForImageSpecified);
    return false;
  } else if (X === 0 && Y === 0) {
    triggerToast(minimumOneAxis);
    return false;
  } else if (!URL) {
    triggerToast(noURLorBlank);
    return false;
  } else if (validateURL(URL) === false && URL !== 'blank') {
    triggerToast(_wrongImageExtensionPart1 + '(' + URL.slice(-4) + ')' + _wrongImageExtensionPart2);
    return false;
  }
  return true;
}

function validateLink (linkName, linkHref) {
  if (!linkName) {
    triggerToast(noLinkName);
    return false;
  } else if (isWhiteSpaceOrIndentOnly(linkName) === true) {
    triggerToast(emptyInputFiled + ' (text)');
    return false;
  } else if (!linkHref) {
    triggerToast(noLinkHref);
    return false;
  } else if (isWhiteSpaceOrIndentOnly(linkHref) === true) {
    linkHref = 'https://need_To_Add_Link_Later';
  }
  return true;
}

function validateList (listSize) {
  if (checkIfNumber(listSize) === false) {
    triggerToast(notAnumber.concat(' (Size)'));
    return false;
  } else if (listSize === 0) {
    triggerToast(restrictedValue);
    return false;
  } else if (listOption == null || listOption === 999 | listOption === 3 || listOption === 4) {
    triggerToast(listTypeNotSpecified);
    return false;
  }
  return true;
}

function validateTable (rows, cols) {
  if (checkIfNumber(rows) === false) {
    triggerToast(notAnumber.concat(' (Rows)'));
    return false;
  } else if (checkIfNumber(cols) === false) {
    triggerToast(notAnumber.concat(' (Columns)'));
    return false;
  } else if (!rows || !cols || rows <= 0 || cols <= 0) {
    triggerToast(emptyTableInput);
    return false;
  } else if (cols >= 27) {
    triggerToast(arrayColSizeExceeded);
    return false;
  } else if (listOption !== 3 && listOption !== 4 && listOption !== 23 && listOption !== 24) {
    triggerToast(tableTypeNotSpecified);
    return false;
  }
  return true;
}

function validateHeightWidth(height, width) {
  if (checkIfNumber(height) === false) {
    triggerToast(notAnumber.concat(' (Height)'));
    return false;
  } else if (checkIfNumber(width) === false) {
    triggerToast(notAnumber.concat(' (Width)'));
    return false;
  } else if (height > maximumAllowedRes) {
    triggerToast(limitReached.concat(` found height=${height}.`));
    return false;
  } else if (width > maximumAllowedRes) {
    triggerToast(limitReached.concat(` found width=${width}.`));
    return false;
  }
  return true;
}

function validateBadge (_label, _message, _color) {
  if (_label.length > 25) {
    triggerToast(inputLengthLimitReached + ' (label)');
    return false;
  } else if (_message.length > 25) {
    triggerToast(inputLengthLimitReached + ' (message)');
    return false;
  } else if (!_label) {
    triggerToast(emptyInputFiled + ' (label)');
    return false;
  } else if (!_message) {
    triggerToast(emptyInputFiled + ' (message)');
    return false;
  } else if (!_color) {
    triggerToast(emptyInputFiled + ' (color)');
    return false;
  } else if (isWhiteSpaceOrIndentOnly(_label) === true) {
    triggerToast(emptyInputFiled + ' (label)');
    return false;
  } else if (isWhiteSpaceOrIndentOnly(_message) === true) {
    triggerToast(emptyInputFiled + ' (message)');
    return false;
  } else if (_color.startsWith('#') === false) {
    triggerToast('Color input must contain hexadecimal value (e.g. #235689).');
    return false;
  } else if (_color.length > 7) {
    triggerToast('Max characters for Color input reached (7).');
    return false;
  }
  return true;
}

function validateDetails (summary, body) {
  if (!summary.trim()) {
    triggerToast(emptyInputFiled + ' (summary)');
    return false;
  } else if (!body.trim()) {
    triggerToast(emptyInputFiled + ' (body)');
    return false;
  }
  return true;
}

function validateQuickBuilderTextArea (text) {
  if (text.replace(/ /g, '').length <= 0) {
    triggerToast(emptyQBTextArea);
    return false;
  }
}

function validatePositionChange (oldPos, newPos) {
  maxAllowedPos = document.getElementsByClassName('ezGitPart').length;
  if (oldPos === newPos) {
    triggerToast(samePos);
    return false;
  } else if (newPos <= 0 || newPos > maxAllowedPos) {
    triggerToast(`${wrongPos} <1, ${maxAllowedPos}> collection.`);
    return false;
  }
  return true;
}
