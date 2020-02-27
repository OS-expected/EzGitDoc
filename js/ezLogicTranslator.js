// *********************************************************
// HERE MAGIC HAPPENS :) 
// *********************************************************

function GenerateGitHubREADMECode()
{
    var code = '';

    // get
    var datas = document.getElementsByClassName('ezGitPart');

    for (var i = 0; i < datas.length; i++) {
        var tmp = '';

        var elementTag = datas.item(i).children.item(0).tagName;
        var elementValue =  datas.item(i).children.item(0).innerHTML;
        console.log(i + ' ' + elementTag);

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
            var paragraph = datas.item(i); 
            var image = paragraph.children[0];

            tmp = '\r\n' + '<p align="' + paragraph.style.textAlign + '"><img src="' + image.src + '"';
            
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
        }
        // Table translation
        else if (elementTag.startsWith('TABLE'))
        {
            var table = datas.item(i).children[0];
            var columnAmount = table.rows[0].cells.length;
            var rowAmount = table.rows.length;

            tmp = tmp + '\r\n \r\n';

            for (var x = 0; x < rowAmount; x++) {

                tmp = tmp +'|';

                for (var y = 0; y < columnAmount; y++) {
                    if (x == 0) {
                        tmp = tmp + ' header |';
                    }
                    if (x == 1) {
                        tmp = tmp + ' :---: |';
                    }
                    else if (x >= 1) {
                        tmp = tmp + ' text |';
                    }
                }

                if (i != rowAmount) {
                    tmp = tmp + '\r\n';
                }
            }
        }
        // Text translation
        else if (elementTag.startsWith('P'))
        {
            var paragraph = datas.item(i).children[0];

            // if paragraph contains customList then its custom list
            if (paragraph.classList.contains('customList'))
            {
                var listLength =  datas.item(i).children.length;
                
                tmp = tmp + '\r\n';

                for (var x = 0; x < listLength - 1; x++) {
                    //:icon: **header:** text <br/> <br/>
                    tmp = tmp + datas.item(i).children[x].innerHTML + '<br>';
                    tmp = tmp + '\r\n';
                }
            }
            else
            {
                if (paragraph.style.textAlign == 'justify')
                {
                    tmp = tmp + '\r\n' + '<p align="justify">' + paragraph.innerHTML + '</p>'; 
                }
                else
                {
                    tmp = tmp + '\r\n' + paragraph.innerHTML; 
                }
            }
        }
        else if (elementTag.startsWith('UL'))
        {
            var listLength = datas.item(i).getElementsByTagName("LI").length;

            tmp = tmp + '\r\n';

            for (var x = 0; x < listLength; x++) {
                tmp = tmp + '- text' + '\r\n';
            }
        }

        code = code + tmp;
    }

    document.getElementById('codeTextBox').value = code;
    $('#codeModal').modal('show');
}


/*
ezLogicTranslator output cheatsheet

---------HEADER------------------------
<h{value}>text</h{value}>

---------IMAGE-------------------------
<p align="{value}"><img src="{value}" height="{value}" width="{value}"></p>

---------TABLE (of type text)----------
| header | header | header |
| :---:  | :---:  | :---:  |
| text | text | text | 

---------TEXT--------------------------
<p align="justify">
Text
</p>

---------LIST WITH GITHUB ICON---------
:icon: **header:** text <br/> <br/>
:icon: **header:** text <br/> <br/>

---------STANDARD POINT LIST---------
- text
- text
- text
*/