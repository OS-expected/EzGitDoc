var codeGenButton = document.getElementById('codeGenButton');

window.addEventListener('load', function () {

    document.getElementById('iconDiv').hidden = true;
    clearPickedData();

    // Start bounce animation on logo
    var logo = document.getElementById('ezLogo');
    logo.classList.add('faa-bounce', 'animated');
    setTimeout(removeLogoAnimationAndManageToolbar, 2000);

    function removeLogoAnimationAndManageToolbar()
    {
        logo.classList.remove('faa-bounce', 'animated');
        logo.classList.add('faa-shake', 'animated-hover');
        changeElementsVisiblity(document.getElementById('toolbar'));
    }
})

function clearPickedData() {
    var style = document.getElementById('headerStyleList');
    style.value = 0;

    var imageAlign = document.getElementById('imagePositionList');
    imageAlign.value = 0;
}

// Toast Time Handler
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
    if (value == 0)
    {
        return true;
    }
        
    return /^\d+$/.test(value);
}

// Toast funcs
var toast = document.getElementById('myToast');

function triggerToast(message)
{
    toast.style.display = "block";

    var toastBody = document.getElementById('toastBody');
    toastBody.innerHTML = '<i class="fas fa-exclamation-circle"></i> ' + message;

    beginToastCounter();
    $("#myToast").toast('show');
}

function disassembleToast()
{
    toast.style.display = "none";

    resetLastInterval();
}

// List modal
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

    if (element.value == 0) {
        document.getElementById('iconDiv').hidden = false;
    }
    else {
        document.getElementById('iconDiv').hidden = true;
    }
}

$(document).ready(function () {

    $('[data-toggle="tooltip"]').tooltip();

    // power up MDB Tree (help)
    $('.treeview-animated').mdbTreeview();
    // power up SortableJS
    var el = document.getElementById('workingSpace');
    Sortable.create(el, {
        group: 'shared',
        animation: 150
    });
    // hide .navbar first
    $(".navbar").hide();  
    // fade in .navbar
    $(function () {
        $(window).scroll(function () {
            if ($(this).scrollTop() > 700) {
                $('.navbar').fadeIn();
            } else {
                $('.navbar').fadeOut();
            }
        }); 
    });
});

// Help modal content renderer
function insertHelpData(partId)
{
    var datas = document.getElementsByClassName('helpDataPart');

    for (var i = 0; i < datas.length; i++) {
        datas.item(i).style.display = 'none';
    }

    datas.item(partId).style.display = 'block';
}

function copyToClipboard()
{
    setTimeout(hide, 400);

    var copyText = document.getElementById("codeTextBox");
    copyText.select();
    copyText.setSelectionRange(0, 99999)
    document.execCommand("copy");
    document.getSelection().removeAllRanges(); 
    
    function hide() {
        $('[data-toggle="tooltip"]').tooltip("hide");
    }
}

function changeElementsVisiblity(element)
{
    if (element.style.visibility == 'hidden') {
        element.style.visibility = 'visible';
    }
    else {
        element.style.visibility = 'hidden';
    }
}

function removeAllElements()
{
    const myNode = document.getElementById("workingSpace");
    myNode.textContent = '';
    
    changeElementsVisiblity(codeGenButton);
}