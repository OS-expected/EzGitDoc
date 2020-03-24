var codeGenButton = document.getElementById('codeGenButton');

window.addEventListener('load', function () {
    // Disable RESET button
    document.getElementById('resetButton').disabled = true;
    // Hide GitHub List element
    document.getElementById('iconDiv').hidden = true;
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

// Toast trigger & disassemble functions
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

// List modal picker
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

// Enable navigation prompt
window.onbeforeunload = function() {
    return true;
};
// Remove navigation prompt
window.onbeforeunload = null;

// on page startup with JQuery
$(document).ready(function () {
    // add page leaving confirmation
    if (location.hostname != "localhost" && location.hostname != "127.0.0.1") {
        window.addEventListener("beforeunload", function (e) {
            var message = "Are you sure you want to leave/refresh?";
          
            (e || window.event).returnValue = message;     
            return message;                                
        });
    }
    // power up Tooltip
    $('[data-toggle="tooltip"]').tooltip();
    // power up MDB Tree (help modal)
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
            if ($(this).scrollTop() > 220) 
            {
                $('.navbar').fadeIn();
            } else 
            {
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

// Generated code copy function
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

// Show/hide code generator button
function changeElementsVisiblity(element)
{
    if (element.style.visibility == 'hidden') {
        element.style.visibility = 'visible';
    }
    else {
        element.style.visibility = 'hidden';
    }
}

// Reset button functionality
function removeAllElements()
{
    document.getElementById('resetButton').disabled = true;
    const myNode = document.getElementById("workingSpace");
    myNode.textContent = '';
    
    if (codeGenButton.style.visibility = 'visible')
    {
        changeElementsVisiblity(codeGenButton);
    }
}

// Save to file
function saveStaticDataToFile() {
    var date = new Date;
    var hour = date.getHours();
    var minutes = String(date.getMinutes()).padStart(2, "0");
    
    var blob = new Blob([lastGeneratedCode],
        { type: "text/plain;charset=utf-8" });
    saveAs(blob, "ezGitDoc_" + hour + '-' + minutes + '.txt');
}