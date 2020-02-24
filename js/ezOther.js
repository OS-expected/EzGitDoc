
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

