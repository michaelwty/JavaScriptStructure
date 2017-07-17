var DragDrop_IsIE = (document.all && window.ActiveXObject) ? true : false;
var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
var IsFireFox = navigator.userAgent.toLowerCase().indexOf('firefox') != -1;
var IsOpera = navigator.userAgent.toLowerCase().indexOf('opera') != -1;
var IsSafari = navigator.userAgent.toLowerCase().indexOf('safari') != -1;
var IsEdge = navigator.userAgent.toLowerCase().indexOf('edge') != -1;
function _attachEvent4Bubble(obj, evt, func) {
    if (obj == null) return;
    if (obj.addEventListener) {
        obj.addEventListener(evt, func, false);
    } else if (obj.attachEvent) {
        obj.attachEvent("on" + evt, func);
    } else {
        eval("var old" + func + "=" + obj + ".on" + evt + ";");
        eval(obj + ".on" + evt + "=" + func + ";");
    }
}
Function.prototype.bind = function () {
    var f = function (arr) {
        if (!arr) return [];
        if (arr.toArray) {
            return arr.toArray();
        } else {
            var results = [];
            for (var i = 0, j = arr.length; i < j; i++) {
                results.push(arr[i]);
            }
            arr = null;
            return results;
        }
    };
    var __method = this,
        args = f(arguments),
        object = args.shift();

    return function () {
        return __method.apply(object, args.concat(f(arguments)));
    }
};

function DragDropClass(wnd) {
    var _that = this;

    this.IsDrag = false;
    this.IsOrder = false;
    this.SameFrame = true;
    this.IsCopy = false;
    this._moveHtml = "";
    this._copyHtml = "";
    this._startPoint = [0, 0];

    this.DragType = "";
    this.DropType = "";

    this.DragSrcType = "";
    this.DropDesType = "";

    this.DropArr = ["SPAN"];
    this.DropTypeArr = [];
    this.DragObject = null;
    this.DropObject = null;

    this.DragOrderType = "";
    this.DropOrderType = "";
    this.DropOrderArr = ["LI", "TD"];
    this.DropOrderTypeArr = [];
    this.DragOrderObject = null;
    this.DropOrderObject = null;
    this.OrderPosition = [0, 1];

    this.Div = null;
    this.OnDrop = null;
    this.OnOrder = null;
    this.DropTarget = null;
    this._tempDragType = "";
    this._pretarget = null;
    this._prestyleborder = "";
    this._prestylebackcolor = "";

    this._preOrderObj = [];
    this._preOrderStyle = [];
    this._preOrderIsTop = false;

    this.devplanData = null;
    this.setDevplanData = null;
    this.devplanHandler = null;

    this._window = wnd;

    this.Start = function (dragtype, droparr, droptypearr) {
		if (typeof(this.IsDragFromIssueList) != "undefined") this.IsDragFromIssueList = false;
        this._createDiv();
        this.IsDrag = true;
		var d = new Date();
		this.RandomID = d.getTime();
        if (dragtype !== 'undefined')
            this._tempDragType = dragtype;
        if (droparr !== 'undefined' && droparr != null && droparr.length > 0) {
            for (var i = 0, j = droparr.length; i < j; i++) this.DropArr[i] = droparr[i].toUpperCase();
        }
        if (droptypearr !== 'undefined' && droptypearr != null && droptypearr.length > 0) {
            for (var i = 0, j = droptypearr.length; i < j; i++) this.DropTypeArr[i] = droptypearr[i];
        }
    };
    this.StartOrder = function (dragtype, orderarr, ordertypearr) {
        this._createDiv();
        this.IsOrder = true;
        this.DropOrderObject = null;
        if (dragtype !== 'undefined') this.DragOrderType = dragtype;
        if (orderarr !== 'undefined' && orderarr != null && orderarr.length > 0) {
            for (var i = 0, j = orderarr.length; i < j; i++) this.DropOrderArr[i] = orderarr[i].toUpperCase();
        }
        if (ordertypearr !== 'undefined' && ordertypearr != null && ordertypearr.length > 0) {
            for (var i = 0, j = ordertypearr.length; i < j; i++) this.DropOrderTypeArr[i] = ordertypearr[i];
        }
    };
    this.End = function (e) {       
        if (this.DropType == "BacklogList" || this.DropType == "StoryBoard") {
            this.OnDrop(this.DragType, this.DragObject, this.DropType, this.DropObject, e);
        } else if (this.DropType == "DevTrackList") {
            if (this.DropObject != null && typeof (this.DropObject.DropTarget) != "undefined") {
                this.DropObject.DropTarget.style.border = "0px";
                if (this.DragType == "DTKItem") {
                    try {
                        var strDropFolderID = this.DropObject.FolderID + "_" + this.DropObject.FolderType;
                        this.OnDrop(this.DragType, this.DragObject, "DevTrackFolder", strDropFolderID);
                    } catch (e) { }
                }
                else {
                    this.OnDrop(this.DragType, this.DragObject, "DevTrackFolder", this.DropObject);
                }
            }
        } else if (this.DropType == "DevTrackBacklogList") {
            if (this.DropObject != null && typeof (this.DropObject.DropTarget) != "undefined") {
                this.DropObject.DropTarget.style.border = "0px";
                if (this.DragType == "DTKItem") {
                    try {
                        var strDropFolderID = this.DropObject.FolderID + "_" + this.DropObject.FolderType;
                        this.OnDrop(this.DragType, this.DragObject, "BacklogFolder", strDropFolderID);
                    } catch (e) { }
                }
                else {
                    this.OnDrop(this.DragType, this.DragObject, "BacklogFolder", this.DropObject);
                }
            }
        } else {
            if (this.OnDrop != null && this._tempDragType != "" && this.DropType != "" && this.DropObject != null) {
                var target = null;
                if (e.target) { target = e.target; } else { target = e.srcElement; }
                if (target != null && this._canDropNode(target.nodeName) && this._canDropType(this.DropType)) {
                    this.OnDrop(this.DragType, this.DragObject, this.DropType, this.DropObject, e);
                }
            }
        }
        try {
            if (top._TechExcel_ux_FlexiblePanel_curDragObj != null) {
				var elProxy = top._TechExcel_ux_FlexiblePanel_curDragObj;
				if (elProxy.onDestroy) elProxy.onDestroy();
				elProxy.parentNode.removeChild(elProxy);
            }
			if (top._TechExcel_ux_FlexiblePanel_curDD != null){
				var dd = top._TechExcel_ux_FlexiblePanel_curDD;
				if (dd && typeof dd.endDrag == 'function') {
					dd.endDrag(e);
				}
				if (typeof(dd.panel.onDragEnd) == "function"){
					dd.panel.onDragEnd();
				}
				if (dd.panel.ownerWindow != window){
					dd.targetNode = null;
				}
			}

            top._TechExcel_ux_FlexiblePanel_curDragObj = null;
            top._TechExcel_ux_FlexiblePanel_curDD = null;
			top._TechExcel_ux_FlexiblePanelWrapper_ddTargetWrapper = null;
        } catch (exx) { }

        _that._reset();
    };
    this.EndOrder = function (e) {
        if (this.OnOrder != null && this.DragOrderType != "" &&
            this.DropOrderType != "" && this.DropOrderObject != null &&
            this.DragOrderObject != this.DropOrderObject) {
            var target = null;
            if (e.target) { target = e.target; } else { target = e.srcElement; }
            if (target != null && this._canOrderNode(target.nodeName) && this._canOrderType(this.DropOrderType)) {
                this.OnOrder(this.DragOrderType, this.DragOrderObject, this.DropOrderType, this.DropOrderObject, this._preOrderIsTop ? 0 : 1, e);
            }
        }
        this._resetOrderParamter();
        if (!this.IsDrag) {
            this._reset();
        }
    };
    this.SetPosition = function (x, y) {
        if (this.IsDrag || this.IsOrder) {
            var cwidth = this._window.document.body.clientWidth;
            if (cwidth == 0) {
                cwidth = top.document.body.scrollWidth
            }            
            if (x + this.Div.offsetWidth + 20 > cwidth) {
                this.Div.style.left = (cwidth - this.Div.offsetWidth - 20) + "px";
            } else {
                this.Div.style.left = x + 5 + "px";
            }

            if (y + this.Div.offsetHeight + 20 > this._window.document.body.clientHeight) {
                this.Div.style.top = (y - this.Div.offsetHeight - 3) + "px";
            } else {
                this.Div.style.top = (y + 3) + "px";
            }
        }
    };
    this.SetMovingHTML = function (html, IsCopy) {
        if (IsCopy != "undefined" && IsCopy == true) {
            this._copyHtml = html;
        }
        else this._moveHtml = html;
        if (this.IsDrag || this.IsOrder) { this.Div.innerHTML = html; }
    };
    this.setDevplanData = function (obj) {
        this.devplanData = obj.Items;
        this.devplanHandler = obj.Function;
    }
	
    this.SetDropParameter = function (e, type, dropobj, sameframe, tar) {
        _that.DropType = type;
		if (type == "DevTrackList" || type == "DevTrackBacklogList") {
            if (dropobj !== 'undefined' && dropobj) this.DropObject = dropobj;
            return;
        }
        var target = null;
        if (tar !== 'undefined' && tar != null)
            target = tar
        else {
            if (e.target) { target = e.target; } else { target = e.srcElement; }
        }

        if (!_that._canDropType(type) || !_that._canDropNode(target.nodeName)) {
            if (_that._pretarget != null) {
                _that._pretarget.style.border = _that._prestyleborder;
                //_that._pretarget.style.backgroundColor = _that._prestylebackcolor;
                // if (typeof (CustomTheme) === 'object') {
                    // _that._pretarget.style.color = CustomTheme.style_wrp.fg_color;
                // }
            }
            if (_that._preOrderObj != null) {
                _that._setOrderStyle(_that._preOrderObj, _that._preOrderStyle, _that._preOrderIsTop);
            }
            return false;
        }
        if ((IsChrome || IsSafari) && _that._tempDragType != type && !sameframe && !_that.SameFrame) {
            if (dropobj !== 'undefined' && dropobj) _that.DropObject = dropobj;
            _that.End(e);
        }
        if (!_that.IsDrag) return;

        if (_that._preOrderObj != null) {
            _that._setOrderStyle(_that._preOrderObj, _that._preOrderStyle, _that._preOrderIsTop);
        }

        if (dropobj !== 'undefined' && dropobj) _that.DropObject = dropobj;
        if (_that._pretarget != null) {
            _that._pretarget.style.border = _that._prestyleborder;
            //_that._pretarget.style.backgroundColor = _that._prestylebackcolor;
        }
        _that._prestyleborder = target.style.border;
        //_that._prestylebackcolor = target.style.backgroundColor;
        target.style.border = "1px dashed #ff0000";
        //target.style.backgroundColor = "#f2dede";
        // if (typeof (CustomTheme) === 'object') {
            // target.style.color = '#000';
        // }
        _that._pretarget = target;
    };
	this.SetDropParameter4Board=function(e,type,dropobj,droppanel,offset,targetWindow)
    {    
        this.DropType=type;        
        if(!this.IsDrag) return;        
        if(dropobj!== 'undefined' && dropobj) this.DropObject=dropobj;
		if(droppanel) {
			this.DropPanel=droppanel;
			this.DropOffset=offset;
		}
		if (targetWindow){
			this.tarWindow = targetWindow;
		}
		else{
			this.tarWindow = null;
		}
    };
    this.SetOrderParameter = function (e, win, type, orderobj, tar) {
        if (!this.IsOrder) return;
        this._resetOrderStyle();
        this.DropOrderType = type;
        this.DropOrderObject = orderobj;
        var target = null;
        if (tar !== 'undefined' && tar != null)
            target = tar
        else {
            if (e.target) { target = e.target; } else { target = e.srcElement; }
        }
        target = this._getStyleTarget(target);
        if (!this._canOrderType(type) || !this._canOrderNode(target.nodeName)) {
            if (this._preOrderObj != null) {
                this._setOrderStyle(this._preOrderObj, this._preOrderStyle, this._preOrderIsTop);
            }
            return false;
        }
        if (this._pretarget != null) {
            this._pretarget.style.border = this._prestyleborder;
            //this._pretarget.style.backgroundColor = this._prestylebackcolor;
        }
        var istop = this._isMove2Top(e, win, target);
        this._preOrderIsTop = istop;
        var styleObj = target;
        if (target.nodeName == "TD") {
            styleObj = target.parentNode;
            for (var i = 0, j = styleObj.childNodes.length; i < j; i++) {
                if (styleObj.childNodes[i].nodeName == "#text") continue;
                this._preOrderObj.push(styleObj.childNodes[i]);
                this._preOrderStyle.push(istop ? styleObj.childNodes[i].style.borderTop : styleObj.childNodes[i].style.borderBottom);
                this._setOrderStyle([styleObj.childNodes[i]], ["solid 2px #FF0000"], istop);
            }
        }
        else if (target.nodeName == "LI" || target.nodeName == "DIV") {
            this._preOrderObj = [styleObj];
            this._preOrderStyle = [istop ? styleObj.style.borderTop : styleObj.style.borderBottom];
            this._setOrderStyle([styleObj], ["solid 2px #FF0000"], istop);
        }
    };
    this.SetDrop2ListParameter = function (e, type, dropobj, sameframe) {
        if (!this.IsDrag) return;
        this.DropType = type;
        if (dropobj !== 'undefined' && dropobj)
            this.DropObject = dropobj;
        if (type != "BacklogList")
            return;

        if ((IsChrome || IsOpera || IsSafari) && this._tempDragType != type && !sameframe && !this.SameFrame) {
            this.End(e);
        }
    };
    this.AttachEvent = function (doc) {
        _attachEvent4Bubble(doc, 'mousemove', this._onMousemove);
        _attachEvent4Bubble(doc, 'mouseup', this._onMouseup);
        _attachEvent4Bubble(doc, 'keydown', this._onKeydown);
        _attachEvent4Bubble(doc, 'keyup', this._onKeyup);
        //doc.onmousemove = this._onMousemove;
        //doc.onmouseup = this._onMouseup;
        //doc.onkeydown = this._onKeydown;
        //doc.onkeyup = this._onKeyup;
    };

    this._onMousemove = function (e) {
        _that.DragType = _that._tempDragType;
        if (!_that.IsDrag && !_that.IsOrder) return;
        if (!_that.Div) return;
        if (!e) e = window.event;
        if (_that.Div.style.display == "none" && _that._startPoint[0] == 0 && _that._startPoint[1] == 0) {
            _that._startPoint = [e.screenX, e.screenY];
        }

        if ((!top._TechExcel_ux_FlexiblePanel_curDragObj || top._TechExcel_ux_FlexiblePanel_curDD.action == "add2backlog") &&
            _that.Div.innerHTML != "") {
            if (_that.IsCopy) _that.Div.innerHTML = _that._copyHtml == "" ? _that._moveHtml : _that._copyHtml;
            else _that.Div.innerHTML = _that._moveHtml;

            if (Math.abs(_that._startPoint[0] - e.screenX) > 3 || Math.abs(_that._startPoint[1] - e.screenY) > 3) {
                _that.Div.style.display = "";
            }
        }
        var x = 0, y = 0;
        var zoom = 1;
        if (typeof top.DetectZoom == 'object' && typeof top.DetectZoom.zoom == 'function') {
            zoom = top.DetectZoom.zoom();
        }
        if (DragDrop_IsIE || IsOpera || IsEdge) {
            x = e.screenX - _that._window.screenLeft * zoom;
            y = e.screenY - _that._window.screenTop * zoom + 2;
        }
        else if (IsChrome || IsSafari) {
            var diffY = _that._window.outerHeight - 2 - _that._window.innerHeight * zoom + self.screenTop;
            var diffX = _that._window.outerWidth - 2 - _that._window.innerWidth * zoom + self.screenLeft;
            x = e.screenX - diffX;
            y = e.screenY - diffY;
        }
        else if (typeof (top.window.mozInnerScreenX) != "undefined") {
            x = e.screenX - _that._window.mozInnerScreenX * zoom;
            y = e.screenY - _that._window.mozInnerScreenY * zoom;
        }
        else {
            x = e.screenX - _that._window.screenLeft * zoom;
            y = e.screenY - _that._window.screenTop * zoom + 2;
        }
        x = x / zoom;
        y = y / zoom;

        _that.SetPosition(x, y);
    },
    this._onMouseup = function (e) {
        //if (e.preventDefault) e.preventDefault();
        //if (e.stopPropagation) e.stopPropagation();
        if (_that.Div) _that.Div.style.display = "none";
        if (IsFireFox == true) {
            var strURL = "";
            if (e != null && e.currentTarget != null) {
                strURL = e.currentTarget.location.href;
            }
            strURL = strURL.toLowerCase();

            var isBacklogPage = false;
            if (strURL != null &&
              strURL.indexOf("systempageviewer.aspx") >= 0 &&
              strURL.indexOf("pageid=116") >= 0) {
                isBacklogPage = true;
            }

            var hasDragBlock = false;
            if (top != null &&
              top._TechExcel_ux_FlexiblePanel_curDragObj != null &&
              top._TechExcel_ux_FlexiblePanel_curDD != null &&
              top._TechExcel_ux_FlexiblePanel_curDD.action != null &&
              top._TechExcel_ux_FlexiblePanel_curDD.action == "add2backlog" &&
              _that.Div != null &&
              _that.Div.innerHTML != null &&
              _that.Div.innerHTML != "")
                hasDragBlock = true;

            var isDragFromSpec = false;
            if (_that.DragSrcType != null &&
                _that.DragSrcType == "Item")
                isDragFromSpec = true;

            var isDragFromStoryBoard = false;
            if (_that.DragSrcType != null &&
                _that.DragSrcType == "StoryBoardItem")
                isDragFromStoryBoard = true;

            var isDragFromBackloglist = false;
            if (_that.DragSrcType != null &&
                _that.DragSrcType == "BacklogListItem")
                isDragFromBackloglist = true;

            var isDragToBacklogFolder = false;
            if (_that.DropDesType != null &&
                _that.DropDesType == "BacklogFolder")
                isDragToBacklogFolder = true;

            var isDragToBacklogList = false;
            if (_that.DropDesType != null &&
                _that.DropDesType == "BacklogList")
                isDragToBacklogList = true;

            var isDragToStoryBoard = false;
            if (_that.DropDesType != null &&
                _that.DropDesType == "StoryBoard")
                isDragToStoryBoard = true;

            // drag spec item to story board     
            if (isBacklogPage == true &&
                hasDragBlock == true &&
                isDragFromSpec == true &&
                isDragToStoryBoard == true) {
                return false;
            }

            // drag storyboard item to storyboard 
            // _that.DropType=="BacklogFolder" drag story board item to Backlog floder
            // _that.DropType=="" drag story board item to story board
            if (isBacklogPage == true &&
                 isDragFromStoryBoard == true &&
                 isDragToStoryBoard == true &&
                 _that.DropType == "") {
                return false;
            }

        }
        _that._AfterMouseUp(e);
        return false;
    },
    this._onKeydown = function (e) {
		if (_that.DropType && _that.DropType.toLowerCase() == "storyboard" && _that.tarWindow != null && window != _that.tarWindow){
			if (typeof(_that.tarWindow.processKeydownWhenDragging) == "function"){
				_that.tarWindow.processKeydownWhenDragging(e);
				if (e.shiftKey){
					_that._reset();
				}
			}
			/*
			if (e.target != _that.tarWindow.document.body){
				if (IsEdge || $.browser.msie ) {
					var evt = _that.tarWindow.document.createEvent("KeyboardEvent");
					var modifiers = [];
					if (e.ctrlKey) modifiers.push("Control");
					if (e.shiftKey) modifiers.push("Shift");
					if (e.altKey) modifiers.push("Alt");
					evt.initKeyboardEvent("keydown", true, true, _that.tarWindow.document.defaultView, e.keyCode, 0, modifiers, false, false);
					_that.tarWindow.document.body.dispatchEvent(evt);
				}
				else if (IsFireFox){
						var evt = new KeyboardEvent("keydown", {bubbles:true, cancelable: true, key:e.key, code:e.code, charCode:e.charCode, keyCode:e.keyCode, location:0, repeat:e.repeat, ctrlKey:e.ctrlKey, shiftKey:e.shiftKey, altKey:e.altKey, isComposing:false});
						_that.tarWindow.document.body.dispatchEvent(evt);
					}
				}
				else if (IsChrome){
					var evt = _that.tarWindow.document.createEvent("KeyboardEvent");
					evt.initKeyboardEvent("keydown", true, true, _that.tarWindow.document.defaultView, e.keyCode, 0, e.ctrlKey, e.altKey, e.shiftKey, false, false);
					delete evt.keyCode;
					Object.defineProperty(evt, "keyCode", {"value" : e.keyCode});
					_that.tarWindow.document.body.dispatchEvent(evt);
				}
				else{
				}
			}
			else return;
			*/
		}
		
        if (e.keyCode == 27) {// esc
            _that._reset();
            return;
        }
        if (!_that.IsDrag || _that.Div == null) return;
        if (e.ctrlKey) {
            _that.IsCopy = true;
            _that.Div.innerHTML = _that._copyHtml == "" ? _that._moveHtml : _that._copyHtml;
        } else {
            _that.IsCopy = false;
            _that.Div.innerHTML = _that._moveHtml;
        }
		
    },
    this._onKeyup = function (e) {
        if (!_that.IsDrag || _that.Div == null) return;
        if (e.ctrlKey) {
            _that.IsCopy = true;
            _that.Div.innerHTML = _that._copyHtml == "" ? _that._moveHtml : _that._copyHtml;
        }
        else {
            _that.IsCopy = false;
            _that.Div.innerHTML = _that._moveHtml;
        }
    }
    this._AfterMouseUp = function (e) {        
        if (this.IsOrder) {
            this.IsOrder = false;
            this._resetOrderStyle();
            this.EndOrder(e);
        }
        if (!this.IsDrag) return;
        this.IsDrag = false;
        if (!e) e = window.event;

        this._moveHtml = "";
        this._copyHtml = "";
        if (IsChrome || IsOpera || IsSafari) {
            if (this.IsDrag) this._reset();

            if (this.DropType == "BacklogList" || this.DropType=="StoryBoard") {
                this.End(e);
                return;
            }
            if (!this.SameFrame && !this._canDropNode(e.target.tagName)) {
                return;
            }
        }
        this.End(e);
    };

    this._isInArray = function (arr, item) {
        if (arr == null || arr < 1) { return false; }
        for (var i = 0, j = arr.length; i < j; i++) { if (arr[i] == item) return true; }
        return false;
    }
    this._canDropNode = function (nodename) {
        if (this.DropArr == null || this.DropArr.length < 1) { return true; }
        for (var i = 0, j = this.DropArr.length; i < j; i++) { if (this.DropArr[i] == nodename) return true; }
        return false;
    };
    this._canDropType = function (droptype) {
        if (this.DropTypeArr == null || this.DropTypeArr.length < 1) { return false; }
        for (var i = 0, j = this.DropTypeArr.length; i < j; i++) { if (this.DropTypeArr[i] == droptype) return true; }
        return false;
    };
    this._canOrderNode = function (nodename) {
        if (this.DropOrderArr == null || this.DropOrderArr.length < 1) { return true; }
        for (var i = 0, j = this.DropOrderArr.length; i < j; i++) { if (this.DropOrderArr[i] == nodename) return true; }
        return false;
    };
    this._canOrderType = function (droptype) {
        if (this.DropOrderTypeArr == null || this.DropOrderTypeArr.length < 1) { return false; }
        for (var i = 0, j = this.DropOrderTypeArr.length; i < j; i++) { if (this.DropOrderTypeArr[i] == droptype) return true; }
        return false;
    };
    this._createDiv = function () {
        var _dragdropTip = top.document.getElementById('div_DragDrop');
        if (_dragdropTip) {
            this.Div = _dragdropTip;
            this.Div.innerHTML = "";
        } else {
            this.Div = document.createElement("Div");
            this.Div.id = "div_DragDrop";
            this.Div.style.position = "absolute";
            this.Div.style.border = "solid 2px #2e6da4";
            this.Div.style.backgroundColor = "#d9edf7";
            this.Div.style.padding = "5px 7px";
            this.Div.style.top = "0";
            this.Div.style.left = "-1000px";
            this.Div.style.zIndex = "9900";
            this.Div.style.borderRadius = "5px";
            this.Div.style.opacity = 0.95;
            this.Div.style.overflow = 'hidden';
            this.Div.style.color = '#000';

            document.body.appendChild(this.Div);
        }
    };
    this._mouseCoords = function (e, doc) {
        if (e.pageX || e.pageY) {
            return { x: e.pageX, y: e.pageY };
        }
        var xw = e.clientX;
        var yw = e.clientY;
        return { x: xw, y: yw };
    };
    this._getMouseOffset = function (e, win, target) {
        e = e || window.event;
        var docPos = this._getPosition(target);

        var scrollPos = this._getScrollPosition(win, target);
        var mousePos = this._mouseCoords(e, win.document);
        return { x: mousePos.x - docPos.x + scrollPos.x, y: mousePos.y - docPos.y + scrollPos.y };
    };
    this._getPosition = function (target) {
        var left = 0; var top = 0;
        if (target.offsetHeight == 0) { target = target.firstChild; }
        while (target.offsetParent) {
            left += target.offsetLeft;
            top += target.offsetTop;
            target = target.offsetParent;
        }
        left += target.offsetLeft; top += target.offsetTop;
        return { x: left, y: top };
    };
    this._getScrollPosition = function (win, target) {
        var left = 0; var top = 0;
        var funContinue = function (tar) {
            if (!tar.parentNode) return false;
            if (!DragDrop_IsIE) return tar.nodeName != "BODY";
            return true;
        };
        while (funContinue(target)) {
            left += target.scrollLeft;
            top += target.scrollTop;
            target = target.parentNode;
        }
        return { x: left, y: top };
    };
    this._isMove2Top = function (e, win, target) {
        if (!this._isInArray(this.OrderPosition, 1)) {
            return true;
        }
        if (!this._isInArray(this.OrderPosition, 0)) {
            return false;
        }
        var mouseOffset = this._getMouseOffset(e, win, target);
        var rowHeight = parseInt(target.offsetHeight) / 2;
        if (mouseOffset.y > rowHeight) return false;
        return true;
    };
    this._getStyleTarget = function (target) {
        if (target.nodeName != "TD" || target.parentNode.id == "") {
            var par = target, i = 0;
            while (!(par.nodeName == "TD" && par.parentNode.id != "")) {
                par = par.parentNode;
                i++;
                if (i > 15 || par == null) return target;
            }
            return par;
        }
        return target;
    };
    this._setOrderStyle = function (arrObj, arrStyle, istop) {
        for (var i = 0, j = arrObj.length; i < j; i++) {
            if (istop)
                arrObj[i].style.borderTop = arrStyle[i];
            else
                arrObj[i].style.borderBottom = arrStyle[i];
        }
    };
    this._resetOrderStyle = function () {
        this._setOrderStyle(this._preOrderObj, this._preOrderStyle, this._preOrderIsTop);
        this._preOrderObj = null;
        this._preOrderStyle = null;
        this._preOrderObj = [];
        this._preOrderStyle = [];
    }
    this._resetOrderParamter = function () {
        this.DragOrderType = "";
        this.DropOrderType = "";
        this.DropOrderArr = ["LI", "TD"];
        this.DropOrderTypeArr = [];
        this.DragOrderObject = null;
        this.DropOrderObject = null;
        this.OrderPosition = [0, 1];
    };
    this._reset = function () {
		if (this.tarWindow != null) this.tarWindow = null;
		if(this.Div==null) return;
        
		this.Div.innerHTML="";
        this.Div.style.display="none";
		this.Div = null;

        this.OnDrop = null;
        this.OnOrder = null;
        this.IsDrag = false;
        this.IsOrder = false;
        this.IsCopy = false;
        this._moveHtml = "";
        this._copyHtml = "";
        this._startPoint = [0, 0];

        this.DragObject = null;
        this.DropObject = null;
        this.DropArr = ["SPAN"];
        this.DropTypeArr = [];

        this.DragOrderType = "";
        this.DropOrderType = "";
        this.DropOrderArr = ["LI", "TD"];
        this.DropOrderTypeArr = [];
        this.DragOrderObject = null;
        this.DropOrderObject = null;

        this.DragType = "";
        this.DropType = "";

        this.DragSrcType = "";
        this.DropDesType = "";

        this.SameFrame = true;
        this._tempDragType = "";
        if (this._pretarget != null) {
            this._pretarget.style.border = this._prestyleborder;
            //this._pretarget.style.backgroundColor = this._prestylebackcolor;
        }
        if (this._preOrderObj != null) {
            this._setOrderStyle(this._preOrderObj, this._preOrderStyle, this._preOrderIsTop);
        }
        this._pretarget = null;
        this._prestyleborder = "";
        this._prestylebackcolor = "";
        this._preOrderObj = [];
        this._preOrderStyle = [];
        this._preOrderIsTop = false;
        this.OrderPosition = [0, 1];
    };
}
var DragDrop = new DragDropClass(window);
