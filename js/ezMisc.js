window.addEventListener('load', function () {
    var style = document.getElementById('headerStyleList');
    style.value = 0;

    var imageAlign = document.getElementById('imagePositionList');
    imageAlign.value = 0;

    var logo = document.getElementById('ezLogo');
    logo.classList.add('faa-bounce', 'animated');

    setTimeout(removeLogoAnimation, 2000);

    function removeLogoAnimation()
    {
        logo.classList.remove('faa-bounce', 'animated');
    }
})

var seconds = 0;
var minutes = 0;

var myInterval;
var el = document.getElementById('toastTime');

function beginToastCounter()
{
    resetLastInterval(myInterval);

    seconds = 1; 

    el.innerText = "" + seconds + " second ago.";  

    myInterval = setInterval(increaseCounter, 1000);
}

function increaseCounter() {
    if (seconds >= 1 && seconds < 60)
    {
        seconds += 1;
    
        el.innerText = "" + seconds + " seconds ago."; 

        if (seconds == 60)
        {
            resetLastInterval();

            el.innerText = "1 minute ago."; 

            minutes = 1;

            myInterval = setInterval(increaseCounter, 60000);
        }
    }
    else if(seconds >= 60)
    {
        minutes += 1;

        el.innerText = minutes + " minutes ago.";  
    }
}

function resetLastInterval() {
    clearInterval(myInterval);
}

function GenerateUniqueId()
{
    return Math.random().toString(36).substr(2, 9);
}

function validateURL(url)
{
    var result = false;

    var popularExtensions = ['bmp', 'png', 'jpeg', 'jpg', 'gif'];

    url = url.slice(-4);
    
    for(let element of popularExtensions)
    {
        if (url.includes(element))
        {
            result = true;
            break;
        }
    }

    return result;
}

function checkIfNumber(value)
{
    return /^\d+$/.test(value);
}

// ***************************************
// List modal
// ***************************************
var currentlyActive;
var listOption;

function setElementAsActive(element)
{
    if (currentlyActive)
    {
        currentlyActive.classList.remove('active');
    }

    listOption = element.value;

    element.classList.add('active');

    currentlyActive = element;
}