// cut excess numbers
function lengthCheck(object) {
  if (object.value.length > object.max.length)
    object.value = object.value.slice(0, object.max.length)
  toggleErrorStyle(object);
}

// if less 4 symbols add red outline
function toggleErrorStyle(object) {
  if (object.value.length < object.max.length)
    object.classList.add('card--error');
  else
    object.classList.remove('card--error');
}

// set custom message
function invalidOwner(object) {
  object.setCustomValidity('Держатель карты только латинскими буквами, минимальная длина 4 символа');
}

// if not number return false
function isNumeric(event) {
  var tempEvent = event || window.event;
  var key = tempEvent.keyCode || tempEvent.which;
  key = String.fromCharCode(key);
  var regex = /[0-9]|\./;
  if (!regex.test(key)) {
    tempEvent.returnValue = false;
    if (tempEvent.preventDefault) tempEvent.preventDefault();
  }
}
