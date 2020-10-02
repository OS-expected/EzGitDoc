<p align="center">
<a href="https://trolit.github.io/EzGitDoc/"><img src="https://github.com/trolit/EzGitDoc/blob/master/images/readme/logo.png" alt="EzGitDoc UI" height="240"></a>
</p>

## Start

<p align="justify">
EzGitDoc is WYSIWYG tool designed to improve Git documentation experience. It allows to generate *.md file structure within projected template at https://trolit.github.io/EzGitDoc/. You don't need to install anything as the project is setup and ready to use on github-pages. Every element's data can be modified after rendering it on page(except table of images in it's current). EzGitDoc leaves you opportunity to make prototype of your document and fill in data, which later only needs to be polished, reducing the risk of problems and necessity to fight with searching cause of element(s) not being rendered as expected. Thanks to <a href="https://github.com/damianggg">@damianggg</a> for spending time on functional tests 👍 
</p>

## Why EzGitDoc?
<p align="justify">
    EzGitDoc takes a different approach. You don't need to write by yourself to develop more complicated structure. You can insert data later or do it during template creation. If you want to make table, specify 3 elements: rows, cols, type and there it is! EzGitDoc focuses on "more clicking, less writing" strategy. In most WYSIWYG tools there are mostly basic schemes which need to be polished manually. In EzGitDoc, element is generated through code. Project also follows "minimalistic UI" strategy to prevent overwhelming UI. The more functionalities the better? I would not say that in every case. Look: most of the interested, who want to create their document <strong>will surely</strong> have minimal knowledge of HTML language. What's the point of adding option allowing you to make cursive tag then? In EzGitDoc I've put only these functionalities that I find crucial on creating document scheme. I've added also some extras from my experience(fancy gallery using table). If you value your time it might be worth to check it :wolf:
</p>

#### Pros of EzGitDoc (read more <a href="https://trolit.github.io/EzGitDoc-documentation/#pros-of-ezgitdoc">here</a>)

:star2: <strong>Less writing more clicking:</strong> <br/> <em>Don't spend extra time on working with markup manually.</em>  <br/><br/>
:star2: <strong>Easy to understand & use:</strong> <br/> <em>Because of minimalistic, intuitive UI, you don't need to read documentation to get started. </em> <br/><br/>
:star2: <strong>Well documented:</strong> <br/> <em>If you prefer reading docs first, EzGitDoc has extensive documentation about it's changes, explanations and examples.</em> <br/><br/>
:star2: <strong>Customizable:</strong> <br/> <em>Personalize some settings which you might find comfortable to use.</em> <br/><br/>
:star2: <strong>Validated:</strong> <br/> <em>Receive in case of error notifications on what needs to be polished.</em>  <br/><br/>
:star2: <strong>Fast:</strong> <br/> <em>Create element structure faster by giving only basic info and clicking create button.</em>

## Predefined templates
<p align="justify">
    :file_folder: Whether you have experience on creating docs for special purpose(e.g. open software, game, library, solution) or not and want to share pattern then it's possible! <a href="https://github.com/trolit/EzGitDoc/tree/master/templates">Here</a> are stored predefined templates. Before you mention your template, make sure to check <code>exampleTemplate</code> and use <code>emptyTemplate</code>. 
</p>

## Screenshots

### Website
| | |
| :---: | :---: |
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy1.PNG" alt="#toadd" width="400" height="183"/> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy2.PNG" alt="#toadd" width="400" height="183"/> |
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy3.PNG" alt="#toadd" width="400" height="183"/> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy4.PNG" alt="#toadd" width="400" height="183"/> |
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy5.png" alt="#toadd" width="400" height="183"/> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy6.PNG" alt="#toadd" width="400" height="183"/> |
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy7.PNG" alt="#toadd" width="400" height="183"/> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/gallery/fancy8.PNG" alt="#toadd" width="400" height="183"/> |

### Output examples

#### Example 1

| Scheme | Result |
| :--: | :--: | 
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/ex1_a.PNG" alt="" width="90%"> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/ex1_b.PNG" alt="" width="100%"> | 

<strong>Please note:</strong> If you want to achieve table that takes all available width(like shown in the Examples section, on EzGitDoc page), images placed in the table must be scaled manually using both axis(assuming that they have the same resolution). By having same resolution images you have guarantees that all cells will be equal and there will be no stretches. 

#### Example 2

| Scheme | Result |
| :--: | :--: | 
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/ex2_a.PNG" alt="" width="90%"> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/ex2_b.PNG" alt="" width="100%"> | 

#### Example 3

| Scheme | Result |
| :--: | :--: | 
| <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/ex4_a.PNG" alt="" width="100%"> | <img src="https://raw.githubusercontent.com/trolit/EzGitDoc/master/images/readme/ex4_b.PNG" alt="" width="100%"> | 

## Libraries

<p>
EzGitDoc uses:
</p>

- <a href="https://github.com/SortableJS/Sortable">SortableJS</a>
- <a href="https://fontawesome.com/">Font Awesome icons set</a>
- <a href="https://l-lin.github.io/font-awesome-animation/">Font Awesome Animation</a>
- <a href="https://getbootstrap.com/docs/4.2/getting-started/introduction/">Bootstrap and required dependencies</a>
- <a href="https://mdbootstrap.com/">MDBootstrap</a>
- <a href="https://github.com/eligrey/FileSaver.js/">FileSaverJS</a>
- <a href="https://formspree.io/">FormSpree</a>
- <a href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.4.1/jquery.min.js">JQuery 3.4.1</a>
- <a href="https://github.com/malihu/malihu-custom-scrollbar-plugin">Custom scrollbar plugin</a>
- <a href="https://bootsnipp.com/snippets/Q0dAX">Modified sidebar snippet</a>
- <a href="https://github.com/itsjavi/bootstrap-colorpicker">Bootstrap colorpicker</a>

## License
<a href="https://github.com/trolit/EzGitDoc/blob/master/LICENSE">MIT License</a> - Paweł Idzikowski

<br/>
<br/>
<br/>

<a href="https://trolit.github.io/EzGitDoc/"><img src="https://github.com/trolit/EzGitDoc/blob/master/images/banner.PNG" alt="EzGitDoc banner" height="100%"></a>


---

Icon responding for EzGitDoc logo belongs to Font Awesome and is available <a href="https://fontawesome.com/icons/earlybirds">over here</a>.

Loading image source: <a href="https://loading.io/spinner/">Loading.io</a>
