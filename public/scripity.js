// javascript:var%20d=new%20Date().getTime();var%20os=document.getElementById('bs_script');if(os){os.parentNode.removeChild(os);}var%20s=document.createElement('script');s.type='text/javascript';s.id='bs_script';document.body.appendChild(s);s.src='http://localhost/freelance/icallbullshit/scripity.js?'+d;void(0);

// This aggregates the stinkers
(function(){
  var debugging = true;
  // var baseURL = (debugging) ? 'http://localhost:9393/' : 'http://icallbs.heroku.com'; // This needs to be dynamically defined in the app...
  var headings = ["Bullshit.", "You&rsquo;re fucking kidding.", "Seriously?", "Can you believe this?", "Boooooogus!", "*Phhhhhhhhhtttttt*", /*"As If!", "Yeah right&hellip;", "Oh Come On!",*/ "Get the fuck out."];
  
  // TODO: normalize the colors (no more random, it's pointless and hurts the brand)
  var colors = ['#c93', '#960', '#630'];
  var shitColor = colors[Math.floor(Math.random()*colors.length)];
  var bg = document.baseURL+'/icbg.gif';
  var styling = '<style type="text/css">#bullshitter{background:'+shitColor+'; color:#e6c78c; border-radius:8px; float:left;'+
    '-moz-box-shadow:0 2px 4px #300; -webkit-box-shadow:0 2px 5px #300; box-shadow:0 2px 4px #300; '+
    'padding:10px; position:fixed; text-align:center; text-shadow:0 -1px 0 #300;'+
    'top:10px; right:10px; z-index:1000;}'+
    '#bullshitter h1{border:none; color:#e6c78c; font: italic normal bold 2em Georgia, Helvetica, sans-serif;}'+
    '#bullshitter a{'+
      'background:#e6c78c; border-radius:2px; color:#960; cursor:pointer;'+
      'border:1px solid #c1a46c; border-top:1px solid #f8dba4; border-bottom:1px solid #a88b54;'+
      '-moz-box-shadow:0 1px 2px #300; -webkit-box-shadow:0 1px 2px #300; box-shadow:0 1px 2px #300;'+
      'font:normal normal bold 0.8em Helvetica, Arial, sans-serif;'+
      'padding:5px; margin:5px; text-decoration:none; text-shadow:0 1px 0 #f6e1b9; position:relative; top:0;}'+
    '#bullshitter a:hover{background:#d5b77f;}'+
    '#bullshitter a:active{'+
      'top:1px;'+
      '-moz-box-shadow:0 1px 1px #300; -webkit-box-shadow:0 1px 1px #300; box-shadow:0 1px 1px #300;}'+
    '::-moz-selection{ background:'+shitColor+'; color:#fff; text-shadow:none;}'+
    '::selection{background:'+shitColor+'; color:#fff; text-shadow:none;}'+
    'a:link{-webkit-tap-highlight-color:'+shitColor+';}'+
    '#bs_options{margin:10px 0;}'+
    '#bs_message{paddin-top:30px;}'+
    '.bs_selection{background:#735928 url('+bg+'); color:#fadfac;}'+
  '</style>';
  
  var heading = '<h1>'+headings[Math.floor(Math.random()*headings.length)]+'</h1>';
  var options = '<div id="bs_options"><a id="whole_page" href="'+document.baseURL+'/flag">whole page</a> <a href="javascript:void(0);" id="select_shit">only some of it sucks</a> <a href="javascript:void(0);" id="nevermind">oh nevermind</a></div>';
  var working = '<div id="bs_message">Shoveling your entry, and you can wait to see who else called it, or fuck-off somewhere better.</div>';
  // var success = 
  // var fail = 
  var stats   = 'A bunch of other people think this is BS too.';
  
  var title = document.getElementsByTagName('title')[0];
  var bullShitter = document.getElementById('bullshitter') || document.createElement('div');
  bullShitter.id = 'bullshitter';
  bullShitter.innerHTML = styling+heading+options+stats;
  
  
  document.body.appendChild(bullShitter);
  document.getElementById('whole_page').addEventListener('click', flagWholePage, true);
  document.getElementById('select_shit').addEventListener('click', flagSelection, true);
  document.getElementById('nevermind').addEventListener('click', dismissThisShit, true);
  
  function flagWholePage(evt){
    evt.preventDefault();
    
    // alert("You flagged the whole damn "+title.innerHTML+" as bullshit.");
    var name = prompt("You wanna let people know who you are, or are you", "a. Pussy");
    // then do an ajax request for a json with the results... see http://www.gittr.com/index.php/archive/rendering-json-from-sinatra/ for instructions
    
    return false;
  }
  
  function flagSelection(evt){
    
    // TODO: loading screen for AJAX call: Just a second this shit takes time, Shit's taking forever. Wow this service is fucking slow. I hope Amazon hasn't shit the bed again. Hurry the fuck up!
    
    var selection,txt;
    if (window.getSelection){
      selection = txt = window.getSelection();
    }else if (document.getSelection){
      selection = txt = document.getSelection();
    }else if (document.selection){
      selection = document.selection.createRange();
      txt = selection.text;
    }else{
      alert("Not supported by this browser, you're gonna have to call bullshit on the whole damn thing.");
      return false;
    } 
    
    if(txt == ''){
      alert("Stop fucking around and select something.");
    }else{
      alert(txt+" is utter bullshit.");
      
      var rangeObject = getRangeObject(selection);
    
      // rangeObject.text='<span style="color:red;">'+txt+'</span>';
      rangeObject.startContainer.parentElement.innerHTML = '<span class="bs_selection">'+rangeObject.startContainer.parentElement.innerHTML;
      rangeObject.endContainer.parentElement.innerHTML += '</span>';
      var selectionFlag = document.createElement('span');
      selectionFlag.style="color:red;";
      selectionFlag.text = "FUCK";
      rangeObject.insertNode(selectionFlag);
      console.log(rangeObject); //.startContainer.parentNode.innerHTML += '<span style="color:red;">Begin BS:</span>');//.commonAncestorContainer = '<span style="color:red;">'+txt+'</span>');
      
      
      // TODO: use better highlighter scheme, because it needs to be cross paragraph... Not sure if this will do it or not (highlight multiple terms will work for sure, but I'd rather use the phrase one)... http://www.nsftools.com/misc/SearchAndHighlight.htm
      
      // now set the selection or get the location of the selected text
      // var nodes = parentObject.childNodes;
      // for(var i=0; i < nodes.length; i++ ){
      //   if(nodes.text.indexOf()
      // }
    }
    return false;
  }
  
  function setCookie(c_name,value,exdays){
    var exdate=new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
    document.cookie=c_name + "=" + c_value;
  }
  
  // console.log(document.body.childNodes.length);
  
  function getRangeObject(selectionObject) {
  	if (selectionObject.getRangeAt)
  		return selectionObject.getRangeAt(0);
  	else { // Safari!
  		var range = document.createRange();
  		range.setStart(selectionObject.anchorNode,selectionObject.anchorOffset);
  		range.setEnd(selectionObject.focusNode,selectionObject.focusOffset);
  		return range;
  	}
  }
  
  function dismissThisShit(evt){
    var bsScript = document.getElementById('bs_script');
    
    bullShitter.parentNode.removeChild(bullShitter);
    bsScript.parentNode.removeChild(bsScript);
  }
  
  
  // Debugging
  function trace(){
    if(console && console.log)
      console.log(caller.callee.arguments);
  }
  

  
})();