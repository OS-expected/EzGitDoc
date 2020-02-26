// HERE MAGIC HAPPENS :) 

function GenerateGitHubREADMECode()
{
    var code = '';

    // get
    var datas = document.getElementsByClassName('ezGitPart');

    for (var i = 0; i < datas.length; i++) {

        var elementTag = datas.item(i).children.item(0).tagName;
        var elementValue =  datas.item(i).children.item(0).innerHTML;

        // Header translation
        if(elementTag.startsWith('H'))
        {
            switch(elementTag[1])
            {
                case '1':
                    code = code + '\r\n \r\n' + '<h1>' + elementValue + '</h1>';
                break;
                case '2':
                    code = code + '\r\n \r\n' + '<h2>' + elementValue + '</h2>';
                break;
                case '3':
                    code = code + '\r\n \r\n' + '<h3>' + elementValue + '</h3>';
                break;
                case '4':
                    code = code + '\r\n \r\n' + '<h4>' + elementValue + '</h4>';
                break;
                case '5':
                    code = code + '\r\n \r\n' + '<h5>' + elementValue + '</h5>';
                break;
                case '6':
                    code = code + '\r\n \r\n' + '<h6>' + elementValue + '</h6>';
                break;
            }
        }
        // Image translation
        else if (elementTag.startsWith('IMG'))
        {
            var element = datas.item(0); // to check image positioning
            var image = element.children[0];

            var tmp = '\r\n \r\n' + '<p align="' + element.style.textAlign + '"><img src="' + image.src + '"';
            
            if (image.classList.contains('wide') == true)
            {
                tmp = tmp + ' width="' + image.width + '"';
            }
            else if (image.classList.contains('high') == true)
            {
                tmp = tmp + ' height="' + image.height + '"';
            }
            else
            {
                tmp = tmp + ' height="' + image.height + '"' + ' width="' + image.width + '"'; 
            }

            tmp = tmp + ' alt="' + image.alt + '"></p>';

            code = code + tmp;

            console.log(code);
        }
    }


    // create
    
}


/*
ezLogicTranslator output:

HEADER => <hN>text</hN>

IMAGE => <p align="center"><img src="adress" height="" width=""></p>
*/