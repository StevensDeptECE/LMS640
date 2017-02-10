var win=false;
var z=1,i=1,left=10
var isIE = (document.all) ? true : false;
var $ = function (id) {
 return document.getElementById(id);
};
var Extend = function(destination, source) {
  for (var property in source) {
    destination[property] = source[property];
  }
}

var Bind = function(object, fun,args) {
  return function() {
    return fun.apply(object,args||[]);
    }
}

var BindAsEventListener = function(object, fun) {
  var args = Array.prototype.slice.call(arguments).slice(2);
  return function(event) {
    return fun.apply(object, [event || window.event].concat(args));
  }
}

var CurrentStyle = function(element){
  return element.currentStyle || document.defaultView.getComputedStyle(element, null);
}

function create(elm,parent,fn){var element = document.createElement(elm);fn&&fn(element); parent&&parent.appendChild(element);return element};
function addListener(element,e,fn){ element.addEventListener?element.addEventListener(e,fn,false):element.attachEvent("on" + e,fn)};
function removeListener(element,e,fn){ element.removeEventListener?element.removeEventListener(e,fn,false):element.detachEvent("on" + e,fn)};
var Class = function(properties){
  var _class = function(){return (arguments[0] !== null && this.initialize && typeof(this.initialize) == 'function') ? this.initialize.apply(this, arguments) : this;};
  _class.prototype = properties;
  return _class;
 };

var Dialog = new Class({
  options:{
    Width : 400,
    Height : 400,
    Left : 100,
    Top  : 100,
    Titleheight : 26,
    Minwidth : 200,
    Minheight : 200,
    CancelIco : true,
    ResizeIco : false,
    Info : "newstitle",
    Content : "nocontent",
    Zindex : 2 
  },
  initialize:function(options){
    this._dragobj = null;
    this._resize = null;
    this._cancel = null;
    this._body = null;
    this._x  = 0;
    this._y  = 0;
    this._fM = BindAsEventListener(this, this.Move);
    this._fS = Bind(this, this.Stop);
    this._isdrag = null;
    this._Css = null;
    this.Width = this.options.Width;
    this.Height = this.options.Height;
    this.Left = this.options.Left;
    this.Top = this.options.Top;
    this.CancelIco = this.options.CancelIco;
    this.Info = this.options.Info;
    this.Content = this.options.Content;
    this.Minwidth = this.options.Minwidth;
    this.Minheight = this.options.Minheight;
    this.Titleheight= this.options.Titleheight;
    this.Zindex = this.options.Zindex;
    Extend(this,options);
    Dialog.Zindex = this.Zindex
//create dialog
    var obj = ['dialogcontainter','dialogtitle','dialogtitleinfo','dialogtitleico','dialogbody','dialogbottom'];
    for(var i = 0;i<obj.length;i++)
    { obj[i]=create('div',null,function(elm){elm.className = obj[i];}); }
    obj[2].innerHTML = this.Info;
    obj[4].innerHTML = this.Content;
    obj[1].appendChild(obj[2]);
    obj[1].appendChild(obj[3]);
    obj[0].appendChild(obj[1]);
    obj[0].appendChild(obj[4]);
    obj[0].appendChild(obj[5]);
    document.body.appendChild(obj[0]);
    this._dragobj = obj[0];
    this._resize = obj[5];
    this._cancel = obj[3];
    this._body = obj[4];
    ///o,x1,x2
    ////set Dialog height weight ,left ,top
    with(this._dragobj.style){
      height = this.Height + "px";top = this.Top + "px";width = this.Width +"px";left = this.Left + "px";zIndex = this.Zindex;
    }
    this._body.style.height = this.Height - this.Titleheight-parseInt(CurrentStyle(this._body).paddingLeft)*2+'px';
/////////////////////////////////////////////////////////////////////////////// add news
    addListener(this._dragobj,'mousedown',BindAsEventListener(this, this.Start,true));
    addListener(this._cancel,'mouseover',Bind(this,this.Changebg,[this._cancel,'0px 0px','-21px 0px']));
    addListener(this._cancel,'mouseout',Bind(this,this.Changebg,[this._cancel,'0px 0px','-21px 0px']));
    addListener(this._cancel,'mousedown',BindAsEventListener(this,this.Disappear));
    addListener(this._body,'mousedown',BindAsEventListener(this, this.Cancelbubble));
    addListener(this._resize,'mousedown',BindAsEventListener(this, this.Start,false));
  },
  Disappear:function(e){
    win=false;
    this.Cancelbubble(e);
    document.body.removeChild(this._dragobj);
  },
  Cancelbubble:function(e){
    this._dragobj.style.zIndex = ++Dialog.Zindex;
    document.all?(e.cancelBubble=true):(e.stopPropagation())
  },
  Changebg:function(o,x1,x2){
    o.style.backgroundPosition =(o.style.backgroundPosition==x1)?x2:x1;
  },
  Start:function(e,isdrag){
    if(!isdrag){this.Cancelbubble(e);} 
    this._Css = isdrag?{x:"left",y:"top"}:{x:"width",y:"height"}
    this._dragobj.style.zIndex = ++Dialog.Zindex;
    this._isdrag = isdrag;
    this._x = isdrag?(e.clientX - this._dragobj.offsetLeft||0):(this._dragobj.offsetLeft||0) ;
    this._y = isdrag?(e.clientY - this._dragobj.offsetTop ||0):(this._dragobj.offsetTop||0);
    if(isIE)
    {
      addListener(this._dragobj, "losecapture", this._fS);
      this._dragobj.setCapture();
    }
    else
    {
      e.preventDefault();
      addListener(window, "blur", this._fS);
    }
    addListener(document,'mousemove',this._fM)
    addListener(document,'mouseup',this._fS)
  },
  Move:function(e){
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    var i_x = e.clientX - this._x, i_y = e.clientY - this._y;
    this._dragobj.style[this._Css.x] = (this._isdrag?Math.max(i_x,0):Math.max(i_x,this.Minwidth))+'px';
    this._dragobj.style[this._Css.y] = (this._isdrag?Math.max(i_y,0):Math.max(i_y,this.Minheight))+'px'
    if(!this._isdrag)
      this._body.style.height = Math.max(i_y -this.Titleheight,this.Minheight-this.Titleheight)-2*parseInt(CurrentStyle(this._body).paddingLeft)+'px';
  },
  Stop:function(){
    removeListener(document,'mousemove',this._fM);
    removeListener(document,'mouseup',this._fS);
    if(isIE)
    {
      removeListener(this._dragobj, "losecapture", this._fS);
      this._dragobj.releaseCapture();
    }
    else
    { 
      removeListener(window, "blur", this._fS);
    };
  }
})
// new Dialog({Width:300,Height:300,Left:300,Top:300});
// new Dialog({Info:"hello",Content:"i just want to talk with you"});
 function creates(){
  if(!win)
  {
    var a=new Dialog({Info:title="title"+i,Left:300+left,Top:300+left,Content:'content'+i,Zindex:(++Dialog.Zindex)});
    //i++;
    left +=10;
    win=true;
  }
  else
  {
    document.body.removeChild(a._dragobj);
    win=false;
  }
 }