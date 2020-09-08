<p align="center">
<a href="https://trolit.github.io/EzGitDoc/"><img src="https://github.com/trolit/EzGitDoc/blob/master/images/readme/logo.png" alt="EzGitDoc UI" height="240"></a>
</p>

## Start

<p align="justify">
  :page_with_curl: <a href="https://trolit.github.io/EzGitDoc/">EzGitDoc</a> is WYSIWYG tool that helps prepare repository document scheme and obtain results as generated code "ready to paste" into file. It was made as a page using HTML, JavaScript and CSS to independent potential users from necessity to install extra software. The one required element is modern browser in order to make all JS code work flawlessly. The process of creating doc scheme can look to You kinda similiar to creating WordPress webpage. You can switch elements between themselves, delete, edit or generate new. More technical data about EzGitDoc itself can be found on website. Here I wanted to focus on listing used libraries and showing some screenshots. Thanks to <a href="https://github.com/damianggg">@damianggg</a> for spending time on functional tests 👍 
</p>

## Why EzGitDoc?
<p align="justify">
    EzGitDoc takes a different approach. You don't need to write by yourself to develop more complicated structure. You can insert data later or do it during template creation. If you want to make table, specify 3 elements: rows, cols, type and there it is! EzGitDoc focuses on "more clicking, less writing" strategy. In most WYSIWYG tools there are mostly basic schemes which need to be polished manually. In EzGitDoc, element is generated through code. Project also follows "minimalistic UI" strategy to prevent overwhelming UI. The more functionalities the better? I would not say that in every case. Look: most of the interested, who want to create their document <strong>will surely</strong> have minimal knowledge of HTML language. What's the point of adding option allowing you to make cursive tag then? In EzGitDoc I've put only these functionalities that I find crucial on creating document scheme. I've added also some extras from my experience(fancy gallery using table). If you value your time it might be worth to check it :wolf:
</p>

#### 8 reasons to use EzGitDoc

:star2: **Fast:** Specify element required data and get instant results on page. <br/><br/>
:star2: **Customizable:** Personalize settings like <em>automated modals</em> or <em>auto notification hide</em>. <br/><br/>
:star2: **Modifiable data:** Render element and edit it if needed. <br/><br/>
:star2: **Less writing more clicking:** Respect your fingers and try certain elements with more clicking than writing. <br/><br/>
:star2: **Validation:** Get easy to understand notifies if something goes wrong. <br/><br/>
:star2: **Minimalistic:** Don't waste time on learning UI, just use it. <br/><br/>
:star2: **Easy to understand:** Don't waste time on looking after examples, markdown language. Create element and see it instantly. It's that easy. <br/><br/>
:star2: **Well documented:** If you still press to read instructions, there is extensive documentation on the page :snake: <br/><br/>

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
