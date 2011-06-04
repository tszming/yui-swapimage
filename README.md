Introduction
----------------

Swap image with YUI, flexible and easy way.

 * For YUI 2.x
 * A-Grade browsers support

jQuery version also available: https://github.com/tszming/jquery-swapimage

Also have a look at my Metadata plugin for YUI (https://github.com/tszming/yui-metadata), which is a smart way to store data in DOM elements.

----

### Basic Usage

1. Include the scripts required:


        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yahoo/yahoo-min.js"></script>
        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/dom/dom-min.js"></script>
        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/selector/selector-min.js"></script>
        <script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/event/event-min.js" ></script>
        <script type="text/javascript" src="metadata-min.js"></script>
        <script type="text/javascript" src="swapimage-min.js"></script>

2. Enable the plugin (Refer to the *example.html* in the download package for more examples)


        <script type="text/javascript">
            YAHOO.plugin.SwapImage.bind(".swapImage");
         </script>

        // Note: The above method call is equalivant to...


        YAHOO.plugin.SwapImage.bind(".swapImage", true, true, "mouseover", "mouseout");
        
        /*
            1st parameter: Images to be selected.
            2nd parameter: Preload the image or not, default = true.
            3rd parameter: Repeat the effect or not, default = true.
            4th parameter: Event for swap In, default = mouseover.
            5th parameter: Event for swap Out, default = mouseout.
        
            Valid events such as: mouseover, mouseout, click, dblclick etc.
        */


3. Add your own images


        <img class="swapImage {src: 'images/2.gif'}" src="images/1.gif" />


4. Done.

----

### Using YUI Loader 

```
<script type="text/javascript" src="http://yui.yahooapis.com/2.7.0/build/yuiloader/yuiloader-min.js"></script>

<script type="text/javascript">

  var loader = new YAHOO.util.YUILoader({

        onSuccess: function() {
        
            YAHOO.plugin.SwapImage.bind(".swapImage");          
         }
    });

    loader.addModule({
            name: "metadata",
            type: "js",
            fullpath: "http://yui-metadata.googlecode.com/svn/trunk/yui-metadata/metadata-min.js",
            varName: "YAHOO.plugin.Metadata",
            requires: ['yahoo', 'dom']
        });

    loader.addModule({
            name: "swapimage",
            type: "js",
            fullpath: "http://yui-swapimage.googlecode.com/svn/trunk/yui-swapimage/swapimage-min.js",
            varName: "YAHOO.plugin.SwapImage",
            requires: ['yahoo', 'dom', 'event', 'selector', "metadata"]
        });

    loader.require("swapimage");
    loader.insert();
    
</script>
```

----
### Advanced Usage

1. *Disjoint rollovers (1)*: When cursor is entering the image, beside itself, elements specified in *sin* array will swap by themselve; when cursor is leaving the image, those elements will restore.  

        <img id="i1" class="swapImage {src: 'images/a.gif', sin: ['#i2','#i3'], sout: ['#i2','#i3'] }" src="images/1.gif" />
        <img id="i2" class="swapImage {src: 'images/b.gif', sin: ['#i1','#i3'], sout: ['#i1','#i3'] }" src="images/2.gif" />
        <img id="i3" class="swapImage {src: 'images/c.gif', sin: ['#i1','#i2'], sout: ['#i1','#i2'] }" src="images/3.gif" />


2. *Disjoint rollovers (2)* : When cursor is entering the image, elements specified in *sin* array will load the image after the *colon*; when mouse is leaving the image, those image elements will be replaced again.  

        <img id="main" src="images/blank.gif" />
        <img class="swapImage {sin: ['#main:images/a.gif'], sout: ['#main:images/blank.gif'] }" src="images/1.gif" />


----

### Documentions and demo

Please view the source code of this link: http://labs.xddnet.com/yui-swapimage/example/example.html

----

### Contact

Feedback and suggestions are always welcome, you can reach me at tszming at gmail dot com.    
