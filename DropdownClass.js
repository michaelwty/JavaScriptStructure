var TxJsCtl = {};
TxJsCtl.QuickSearchString = (typeof (LOther) != "undefined" && LOther.QuickSearchString) ? LOther.QuickSearchString : "Quick Search...";
TxJsCtl.NextItemString = (typeof (LOther) != "undefined" && LOther.NextItemString) ? LOther.NextItemString : "Next 50 Items";
TxJsCtl.PrevItemString = (typeof (LOther) != "undefined" && LOther.PrevItemString) ? LOther.PrevItemString : "Previous 50 Items";
TxJsCtl.SelectAllString = (typeof (LOther) != "undefined" && LOther.SelectAllString) ? LOther.SelectAllString : "Select All";

TxJsCtl.ITEM_VALUE_SELECTALL = -99999999;
TxJsCtl.ITEM_TEXT_SELECTALL = TxJsCtl.SelectAllString; //"Select All";
TxJsCtl.ITEM_TITLE_SELECTALL = "{All Selected}";
TxJsCtl.NUMBER_PER_PAGE = 50;

TxJsCtl.StringBuilder = function (txt) {
    this._parts = (typeof (txt) !== 'undefined' && initialText !== null && txt !== '') ? [txt.toString()] : [];
    this._value = {}; this._len = 0;
    this.append = function (text) { this._parts[this._parts.length] = text; }
    this.appendFormat = function (format, args) { this._parts[this._parts.length] = String._toFormattedString(false, arguments); }
    this.appendLine = function (text) { this._parts[this._parts.length] = ((typeof (text) === 'undefined') || (text === null) || (text === '')) ? '\r\n' : text + '\r\n'; }
    this.clear = function () { this._parts = []; this._value = {}; this._len = 0; }
    this.isEmpty = function () { if (this._parts.length === 0) return true; return this.toString() === ''; }
    this.toString = function (p) {
        p = p || ''; var parts = this._parts;
        if (this._len !== parts.length) { this._value = {}; this._len = parts.length; } var val = this._value;
        if (typeof (val[p]) === 'undefined') {
            if (p !== '') {
                for (var i = 0; i < parts.length;) {
                    if ((typeof (parts[i]) === 'undefined') || (parts[i] === '') || (parts[i] === null)) parts.splice(i, 1);
                    else i++;
                }
            } val[p] = this._parts.join(p);
        } return val[p];
    }
}
TxJsCtl.HtmlEncode = function (str) {
    if (typeof (str) == "object") return str;
    if (str == null || typeof (str) == "undefined" || !str) return "";
    if (typeof (str) == "number") return str;
    str = str.replace(/&/g, "&amp;");
    str = str.replace(/</g, "&lt;");
    str = str.replace(/>/g, "&gt;");
    str = str.replace(/\"/g, "&quot;");
    str = str.replace(/\'/g, "&#39;");
    return str;
}
TxJsCtl.IsInArray = function (arr, val) {
    for (var i = 0, j = arr.length; i < j; i++) {
        if (arr[i] == val)
            return true;
    }
    return false;
}
TxJsCtl.FindInArray = function (arr, val) {
    for (var i = 0, j = arr.length; i < j; i++) {
        if (arr[i] == val)
            return i;
    }
    return -1;
}
TxJsCtl.isNumber = function (str) {
    var pattern = /^\d+$/;
    return pattern.test(str);
},
TxJsCtl.isIE = function () { return (!!window.ActiveXObject || "ActiveXObject" in window) }
TxJsCtl.isIpadIpohne = function () {return (navigator.userAgent.toLowerCase().indexOf('ipad') != -1 || navigator.userAgent.toLowerCase().indexOf('iphone') != -1 || navigator.userAgent.toLowerCase().indexOf('android') != -1) }
String.prototype.endsWith = function String$endsWith(suffix) { return (this.substr(this.length - suffix.length) === suffix); }
String.prototype.startsWith = function String$startsWith(prefix) { return (this.substr(0, prefix.length) === prefix); }
String.prototype.trim = function String$trim() { return this.replace(/^\s+|\s+$/g, ''); }
String.prototype.trimEnd = function String$trimEnd() { return this.replace(/\s+$/, ''); }
String.prototype.trimStart = function String$trimStart() { return this.replace(/^\s+/, ''); }
String.format = function String$format(format, args) { return String._toFormattedString(false, arguments); }
String.localeFormat = function String$localeFormat(format, args) { return String._toFormattedString(true, arguments); }
String._toFormattedString = function String$_toFormattedString(useLocale, args) {
    var result = ''; var format = args[0];
    for (var i = 0; ;) {
        var open = format.indexOf('{', i); var close = format.indexOf('}', i); if ((open < 0) && (close < 0)) { result += format.slice(i); break; }
        if ((close > 0) && ((close < open) || (open < 0))) { result += format.slice(i, close + 1); i = close + 2; continue; }
        result += format.slice(i, open); i = open + 1; if (format.charAt(i) === '{') { result += '{'; i++; continue; }
        var brace = format.substring(i, close); var colonIndex = brace.indexOf(':'); var argNumber = parseInt((colonIndex < 0) ? brace : brace.substring(0, colonIndex)) + 1;
        var argFormat = (colonIndex < 0) ? '' : brace.substring(colonIndex + 1); var arg = args[argNumber];
        if (typeof (arg) === "undefined" || arg === null) { arg = ''; }
        if (arg.toFormattedString) { result += arg.toFormattedString(argFormat); }
        else if (useLocale && arg.localeFormat) { result += arg.localeFormat(argFormat); }
        else if (arg.format) { result += arg.format(argFormat); }
        else result += arg.toString();
        i = close + 1;
    } return result;
}
TxJsCtl._cancelBubble = function (e) {
    if (e.stopPropagation) e.stopPropagation();
    else e.cancelBubble = true;
}
TxJsCtl.getPosition = function (obj) { if (null == obj) return new Array(); var ary = new Array(); ary[0] = obj.offsetLeft; ary[1] = obj.offsetTop; while (obj = obj.offsetParent) { ary[0] += obj.offsetLeft; ary[1] += obj.offsetTop; } return ary; }

TxJsCtl.getScrollPosition = function (target) {
    var left = 0; var top = 0;
    var funContinue = function (tar) {
        if (!tar.parentNode) return false;
        if (!document.all) return tar.nodeName != "BODY";
        return true;
    };
    while (funContinue(target)) {
        left += target.scrollLeft;
        top += target.scrollTop;

        if (typeof (target.parentNode) == "object")
            target = target.parentNode;
        else
            target = target.parentElement;
    }
	
    return { x: left, y: top };
}
TxJsCtl.GetScroolObj = function (target) {
    var result = target;
    if (typeof (result.parentNode) == "object")
        result = result.parentNode;
    else
        result = result.parentElement;
    var funContinue = function (tar) {
        if (tar==null || !tar.parentNode) return false;
        if (tar.nodeName == "BODY") return false;
        return tar.clientHeight == 0 || (tar.scrollHeight - tar.clientHeight < 5);
    };
    while (funContinue(result)) {
        if (typeof (result.parentNode) == "object")
            result = result.parentNode;
        else
            result = result.parentElement;
    }
    return $(result).add($(document));
}
TxJsCtl.GetControlSettingInfo = function (obj, eve) {
    var set = new Object();
    var zoom = 1;

    if (typeof top.DetectZoom == 'object' && typeof top.DetectZoom.zoom == 'function') {
        zoom = top.DetectZoom.zoom();
    }
    if (eve != null) {
        var poz = TxJsCtl.getPosition(obj);
        var scroll = TxJsCtl.getScrollPosition(obj);
        var x = 0;
        var y = 0;
        var IsChrome = navigator.userAgent.toLowerCase().indexOf('chrome') != -1;
        var IsEdge = navigator.userAgent.toLowerCase().indexOf('edge') != -1;
        //var IsAir = navigator.userAgent.toLowerCase().indexOf('adobeair') != -1;
        
        if (TxJsCtl.isIE() || $.browser.opera || IsEdge) {
            x = (eve.screenX ? eve.screenX : window.event.screenX) - top.screenLeft * zoom;
            y = (eve.screenY ? eve.screenY : window.event.screenY) - top.screenTop * zoom;
	        if(IsEdge) y+=5;
        }
        else if (IsChrome) {
            var diffY = top.window.outerHeight - top.window.innerHeight * zoom + self.screenTop;
            var diffX = top.window.outerWidth - top.window.innerWidth * zoom + self.screenLeft;
            x = eve.screenX - diffX;
            y = eve.screenY - diffY + 6;
        }
        else if ($.browser.safari) {
            var diffY = top.window.outerHeight - top.window.innerHeight * zoom + self.screenTop;
            var diffX = top.window.outerWidth - top.window.innerWidth * zoom + self.screenLeft;
            if (TxJsCtl.isIpadIpohne()) {
                x = eve.screenX;
                y = eve.screenY;
            }
            else {
                if (self == top) {
                    x = eve.clientX;
                    y = eve.clientY + 6;
                } 
                else
                {
                    if (top.window.outerHeight == 0 && top.window.outerWidth == 0) {
                        x = eve.clientX;
                        y = eve.clientY + 6;
                    }
                    else {
                        x = eve.screenX - diffX + 8;
                        y = eve.screenY - diffY + 10;
                    }
                }
            }
        }
        else if ($.browser.mozilla && typeof (top.window.mozInnerScreenX) != "undefined") {
            x = eve.screenX - top.window.mozInnerScreenX * zoom;
            y = eve.screenY - top.window.mozInnerScreenY * zoom + 6;
        }
        else {
            x = (eve.screenX ? eve.screenX : window.event.screenX) - top.screenLeft * zoom;
            y = (eve.screenY ? eve.screenY : window.event.screenY) - top.screenTop * zoom;
        }
        x = x / zoom;
        y = y / zoom;
        var a = (eve.clientX ? eve.clientX : window.event.clientX) - poz[0];
        var b = (eve.clientY ? eve.clientY : window.event.clientY) - poz[1];
        x = x - a - scroll.x;
		y = y - b - scroll.y;		
        //if (!TxJsCtl.isIE()) {
        if (window != top) {
            var scrollTop = parseInt(document.body.scrollTop || document.documentElement.scrollTop || window.pageYOffset);
            var scrollLeft = parseInt(document.body.scrollLeft || document.documentElement.scrollLeft || window.pageXOffset);
            if (scrollTop > 0 ) {
                y = y - scrollTop;
            }
            if (scrollLeft > 0) {
                x = x - scrollLeft;
            }
        }
        
        set.x = x;
        set.y = y;
        var h = top.document.body.clientHeight;
        if (y + 150 > h) {
            set.ShowAbove = true;
            if ($.browser.mozilla)
                set.Height = y + obj.offsetHeight - 5;
            else
                set.Height = y + obj.clientHeight - 5;
        }
        else {
            set.ShowAbove = false;
            set.Height = h - y - 5;
        }
    }

    set.ClientWidth = $(obj).outerWidth();
/*
    if (set.ClientWidth == 0) {
        var parent = $(obj).parent();
        var count = 0;
        var realWidth = 0;
        var neednext = function (p) {
            if (p.length < 0) return false;
            if (count > 10) return false;
            var cw = 0;
            if ($.browser.mozilla)
                cw = p[0].offsetWidth;
            else
                cw = p[0].clientWidth;
            if (cw > 22) {
                realWidth = cw;
                return false;
            }
            if (!p[0].style) return false;
            var w = p[0].style.width;
            if (w == "") return true;
            if (w == "100%") return true;
            if (w == "0px") return true;
            if (w == "0") return true;
            if (w.indexOf("px") > -1) {
                realWidth = parseInt(w.replace("px", ""), 10);
            }
            else if (w.indexOf("%") > -1) {
                realWidth = document.body.clientWidth * parseInt(w.replace("%", ""), 10) / 100;
            }
            return false;
            count++;
        }
        while (neednext(parent)) {
            parent = parent.parent();
        }
        if (realWidth > 0) {
            set.ClientWidth = realWidth;
        }
    }
	*/
    if ($.browser.msie && ($.browser.version == "7.0" || $.browser.version == "6.0")) set.ClientWidth += 22;
    set.IsCombo = false;
    set.MultiSelect = false;
    set.SelectAll = true;
	set.ClearAll = false;
    set.SelectObject = $(obj);
    set.NeedHideSelect = false;
    var pos = $(obj).position();
    set.Left = pos.left;
    set.Top = pos.top;
    set.IsNewCtl = false;
    set.Proxy = null;
    set.Ids = null;
    set.Names = null;
    set.NeedSetPosition = true;
    set.NeedCheckChange = true;
    set.IsEnable = true;

    return set;
}
TxJsCtl.InitDropdown = function (obj, set, scrollObj, ongetdata) {
    var selText = set.IsCombo ? obj.val() : (obj[0].selectedIndex == -1 ? "" : (obj[0].options[obj[0].selectedIndex].text + ""));
    if (set.MultiSelect == true) {
        var selectText = new Array();
        var selectValue = new Array();
        for (var i = 0, j = obj[0].options.length; i < j; i++) {
            if (obj[0].options[i].selected) {
				if (obj[0].options[i].value == TxJsCtl.ITEM_VALUE_SELECTALL)
					selectText.push(TxJsCtl.ITEM_TITLE_SELECTALL);
				else
					selectText.push(obj[0].options[i].text);
                selectValue.push(obj[0].options[i].value);
            }
        }
        set._SelectText = selectText;
        set._SelectValue = selectValue;
        selText = selectText.join(",");
    }
    selText = selText.replace("\xa0\xa0\xa0\xa0", "");
    if (selText == null || !selText) selText = "";
    var val = "";
    var keyword = "";
    var lastval = "";
    var lastchar = "";
    var TimeID = null;
    var EventTimeID = null;
    if (!set.IsCombo) val = obj[0].selectedIndex == -1 ? "" : (obj[0].options[obj[0].selectedIndex].value + "");
    lastval = val;

    $("#DropDownProxy_" + obj.attr("id"), obj[0].ownerDocument).remove();
    if(set.IsEnable || typeof set.IsEnable == 'undefined')
        var html = '<div id="DropDownProxy_' + obj.attr("id") + '" class="menu-ddp dropdown_proxy" style="box-sizing:border-box; height:26px; padding:0 21px 0 0;">';
    else
        var html = '<div id="DropDownProxy_' + obj.attr("id") + '" class="menu-ddp dropdown_proxy dropdown_disabled" style="box-sizing:border-box; height:26px; padding:0 21px 0 0;">';

    if (set.IsCombo) {
        html += "<div class='dropdown_proxytext_Combo' style=\"width:100%;\"><input type='text' value=\"" + val + "\" class='dropdown_searchinput dropdown_searchinput_combo' ></input></div>";
    }
    else {
        html += '<div class="dropdown_proxytext" style=\"width:100%;\" value="' + val + '" title="' + TxJsCtl.HtmlEncode(selText) + '">' + TxJsCtl.HtmlEncode(selText) + '</div>';
    }
	if (set.MultiSelect == true && set.ClearAll == true && set.IsEnable!=false){
		html += '<a id="lnkClearTxt" href="javascript:void(0);" class="searchbox-cleartxt tx-icon-btn" title="Clear all selection"><span class="tx-icon tx-i-red-close"></span></a>';
	}
	
    html += '</div>';
    var proxy = $(html);
	if (selText != ""){
		$("#lnkClearTxt", proxy).show();
	}

	if (set.ClientWidth == 0){
		proxy.css({"width": "100%"});
	}
	else{
		if (set.ClientWidth < 30) {
			set.ClientWidth = obj.parent().width();
			if (set.ClientWidth == 0) {
				set.ClientWidth = 100;
			}
		}
		proxy.css({"width": set.ClientWidth+"px"});
	}
	/*
    if (set.NeedSetPosition) {
        proxy.width(set.ClientWidth - 2);
        proxy.css({ 'padding': 0 });
        if (TxJsCtl.isIE())
            proxy.find("DIV").width(set.ClientWidth - 17-6);
        else
            proxy.find("DIV").width(set.ClientWidth - 21 - 3);
    } else {
        proxy.width(set.ClientWidth - 21 - 2);
        proxy.find("DIV").width(set.ClientWidth - 21 - 2 - 3);
    }
	*/
    if (set.NeedSetPosition) {
        proxy.css({ "left": set.Left, "top": set.Top, "position": "absolute" });
    }

    proxy.attr("tabindex", $(obj).attr("tabindex"));
    var select = function (newval, txt) {
        if (EventTimeID != null) {
            clearTimeout(EventTimeID);
            EventTimeID == null;
        }
        if (!set.IsCombo) {
            var getOptionIndex = function (sel, val, txt) {
                for (var i = 0, j = sel.options.length; i < j; i++) {
                    if (sel.options[i].value == val)//&& sel.options[i].text==txt
                    {
                        return i;
                    }
                }
                return -1;
            };
            var oOption = document.createElement("OPTION");
            oOption.text = txt.replace("\xa0\xa0\xa0\xa0", "");
            oOption.value = newval;
            if (obj[0].selectedIndex == -1) {
                obj[0].options.add(oOption);
                obj[0].selectedIndex = 0;
            }
            else {
                var nIndex = getOptionIndex(obj[0], newval, txt);
                if (nIndex > -1) {
                    obj[0].selectedIndex = nIndex;
                }
                else {
                    obj[0].options.add(oOption);
                    obj[0].selectedIndex = obj[0].options.length - 1;
                }
            }
            val = newval;
            selText = txt;
            proxy.find("DIV").attr("title", txt);
            proxy.find("DIV").attr("value", newval);
        }
        else {
            obj.val(txt);
            selText = txt;
        }

        EventTimeID = setTimeout(onselect, 700);
        return false;
    };
    var onselect = function () {
        EventTimeID = null;
        if (lastval == val) return;
        lastval = val;
        var onchange = obj.prop("onchange");
        if (typeof onchange == "function") {
            obj.change();
        }
        else {
            if (obj[0].dispatchEvent) {
                var evt = document.createEvent('HTMLEvents');
                evt.initEvent("change", false, true);
                obj[0].dispatchEvent(evt);
            }
            else if (obj[0].fireEvent) {
                obj[0].fireEvent("onchange");
            }
        }

        if (set.IsCombo && set.SelectObject != null) {
            var selonchange = set.SelectObject.prop("onchange");
            if (typeof selonchange == "function") {
                set.SelectObject.change();
            }
            else {
                if (set.SelectObject[0].dispatchEvent) {
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent("change", false, true);
                    set.SelectObject[0].dispatchEvent(evt);
                }
                else if (set.SelectObject[0].fireEvent) {
                    set.SelectObject[0].fireEvent("onchange");
                }
            }
        }
    };
    //var setting = {};
	proxy.bind("click", function (e) {
		TxJsCtl._cancelBubble(e);
        if (set.IsEnable == false) return;
        var dropdown = $('#dropdown_' + obj.attr("id"), top.document.body);
        if (dropdown.length > 0 && dropdown[0].style.display != "none") {
            if (TxJsCtl.PreDropdownHideFun) {
                TxJsCtl.PreDropdownHideFun();
                delete TxJsCtl.PreDropdownHideFun;
                TxJsCtl.PreDropdownHideFun = null;
            }
            return false;
        }
        var showdropdown = function () {
            var setting = TxJsCtl.GetControlSettingInfo(proxy[0], e);
            for (var i in set) setting[i] = set[i];
            setting.IsNewCtl = true;
            setting.Proxy = proxy;
            setting.ClientWidth = set.ClientWidth;
            TxJsCtl.DisplayDropdown(obj, set.Ids, set.Names, e, setting, scrollObj);
        };
        if (set.Ids == null || set.Names == null || 
            typeof parent.support_coowner_event !== 'undefined' && parent.support_coowner_event &&
            $('td.tabs_on', parent.document).text().toLowerCase() === 'current status') {
            ongetdata(obj, function (gids, gnames) {
                set.Ids = gids;
                set.Names = gnames;
                showdropdown();
            });
        }
        else {
            showdropdown();
        }
		
    }).bind("keydown", function (e) {
		TxJsCtl._cancelBubble(e);
        if (set.IsEnable == false) return;
        val = proxy.find("DIV").attr("value");
        var getcurrentindex = function (start, key) {
            var searchIndex = -1;
            for (var i = start, j = set.Names.length; i < j; i++) {
                if ((set.Ids[i] + "") == key) {
                    searchIndex = i;
                    break;
                }
            }
            return searchIndex;
        };
        var getnextindex = function (fromindex, key) {
            var searchIndex = -1;
            for (var i = fromindex, j = set.Names.length; i < j; i++) {
                if ((set.Names[i] + "").toLowerCase().replace(/\W/ig, "").indexOf(key.toLowerCase()) == 0) {
                    searchIndex = i;
                    break;
                }
            }
            return searchIndex;
        };
        var fkeydown = function () {
            if (!set.IsCombo) {
                var searchIndex = -1;
                for (var i = 0, j = set.Ids.length; i < j; i++) {
                    if ((set.Ids[i] + "") == val) {
                        searchIndex = i;
                        break;
                    }
                }
                if (searchIndex == -1) searchIndex = 0;
                if (searchIndex > -1 && searchIndex < set.Ids.length - 1) {
                    proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[searchIndex + 1]));
                    val = set.Ids[searchIndex + 1];
                    select(val, set.Names[searchIndex + 1]);
                }
            }
            else {
                var searchIndex = -1;
                for (var i = 0, j = set.Names.length; i < j; i++) {
                    if ((set.Names[i] + "") == val) {
                        searchIndex = i;
                        break;
                    }
                }
                if (searchIndex == -1) searchIndex = 0;
                if (searchIndex > -1 && searchIndex < set.Ids.length - 1) {
                    proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[searchIndex + 1]));
                    select("", set.Names[searchIndex + 1]);
                }
            }
        };
        var fkeyup = function () {
            if (!set.IsCombo) {
                var searchIndex = -1;
                for (var i = 0, j = set.Ids.length; i < j; i++) {
                    if ((set.Ids[i] + "") == val) {
                        searchIndex = i;
                        break;
                    }
                }
                if (searchIndex > 0) {
                    proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[searchIndex - 1]));
                    val = set.Ids[searchIndex - 1];
                    select(val, set.Names[searchIndex - 1]);
                }
            }
            else {
                var searchIndex = -1;
                for (var i = 0, j = set.Names.length; i < j; i++) {
                    if ((set.Names[i] + "") == val) {
                        searchIndex = i;
                        break;
                    }
                }
                if (searchIndex > 0) {
                    proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[searchIndex - 1]));
                    select("", set.Names[searchIndex - 1]);
                }
            }
        };
        var fsearch = function () {
            var searchIndex = -1;
            for (var i = 0, j = set.Names.length; i < j; i++) {
                if (((set.Names[i] + "" == "") && keyword == " ") || ((set.Names[i] + "").toLowerCase().replace(/\W/ig, "").indexOf(keyword.toLowerCase()) == 0)) {
                    searchIndex = i;
                    break;
                }
            }
            if (searchIndex > -1) {
                proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[searchIndex]));
                val = set.Ids[searchIndex];
                select(val, set.Names[searchIndex]);
            }
        };

        var gotoindex = function (gindex) {
            if (gindex > -1 && gindex < set.Ids.length) {
                if (!set.IsCombo) {
                    proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[gindex]));
                    val = set.Ids[gindex];
                    select(val, set.Names[gindex]);
                }
                else {
                    proxy.find("DIV").html(TxJsCtl.HtmlEncode(set.Names[gindex]));
                    select("", set.Names[gindex]);
                }
            }
        };

        if (e.keyCode == 40)//down
        {
            if (set.Ids == null || set.Names == null) {
                ongetdata(obj, function (gids, gnames) {
                    set.Ids = gids;
                    set.Names = gnames;
                    fkeydown();
                });
            }
            else {
                fkeydown();
            }
            return false;
        }
        else if (e.keyCode == 38)//up
        {
            if (set.Ids == null || set.Names == null) {
                ongetdata(obj, function (gids, gnames) {
                    set.Ids = gids;
                    set.Names = gnames;
                    fkeyup();
                });
            }
            else {
                fkeyup();
            }
            return false;
        }
        else if (e.keyCode == 109 || e.keyCode == 107)//+ -
        {
            return true;
        }
        else if ((e.keyCode >= 48 && e.keyCode <= 122) || e.keyCode == 32) {
            if (TimeID != null) clearTimeout(TimeID);
            var newkey = String.fromCharCode(e.keyCode);
            keyword += newkey;
            lastchar = newkey;
            TimeID = setTimeout(function () { keyword = ""; TimeID = null; }, 500);
            var issamekey = function (key, newchar) {
                for (var i = 0, j = key.length; i < j; i++) {
                    if (key[i] != newchar) return false;
                }
                return true;
            };
            var getLastKey = function (key) {
                return key.substr(0, key.length - 1);
            };
            if (set.Ids == null || set.Names == null) {
                ongetdata(obj, function (gids, gnames) {
                    set.Ids = gids;
                    set.Names = gnames;
                    var cindex = getcurrentindex(0, val);
                    var nindex = getnextindex((keyword.length > 1 ? cindex : (cindex + 1)), keyword);
                    if (nindex > -1)
                        gotoindex(nindex);
                    else {
                        var lastkey = "";
                        if (keyword.length > 1) lastkey = getLastKey(keyword);
                        if (keyword.length > 1 && issamekey(keyword, newkey)) {
                            nindex = getnextindex(cindex + 1, newkey);
                            if (nindex > -1) gotoindex(nindex);
                            else {
                                nindex = getnextindex(0, newkey);
                                if (nindex > -1) gotoindex(nindex);
                            }
                        }
                        else if (keyword.length > 1 && issamekey(lastkey, keyword[0]) && !issamekey(lastkey, newkey)) {
                            keyword = keyword[0] + newkey;
                            nindex = getnextindex((keyword.length > 1 ? cindex : (cindex + 1)), keyword);
                            if (nindex > -1) gotoindex(nindex);
                            else {
                                nindex = getnextindex(0, keyword);
                                if (nindex > -1) gotoindex(nindex);
                            }
                        }
                        else {
                            nindex = getnextindex(0, keyword);
                            if (nindex > -1) gotoindex(nindex);
                        }
                    }
                });
            }
            else {
                var cindex = getcurrentindex(0, val);
                var nindex = getnextindex((keyword.length > 1 ? cindex : (cindex + 1)), keyword);
                if (nindex > -1)
                    gotoindex(nindex);
                else {
                    var lastkey = "";
                    if (keyword.length > 1) lastkey = getLastKey(keyword);
                    if (keyword.length > 1 && issamekey(keyword, newkey)) {
                        nindex = getnextindex(cindex + 1, newkey);
                        if (nindex > -1) gotoindex(nindex);
                        else {
                            nindex = getnextindex(0, newkey);
                            if (nindex > -1) gotoindex(nindex);
                        }
                    }
                    else if (keyword.length > 1 && issamekey(lastkey, keyword[0]) && !issamekey(lastkey, newkey)) {
                        keyword = keyword[0] + newkey;
                        nindex = getnextindex((keyword.length > 1 ? cindex : (cindex + 1)), keyword);
                        if (nindex > -1) gotoindex(nindex);
                        else {
                            nindex = getnextindex(0, keyword);
                            if (nindex > -1) gotoindex(nindex);
                        }
                    }
                    else {
                        nindex = getnextindex(0, keyword);
                        if (nindex > -1) gotoindex(nindex);
                    }
                }
            }
            return false;
        }
        else {
            return true;
        }
    });
    obj.before(proxy);
    obj.css("visibility", "hidden");
    if (!set.NeedSetPosition) {
        obj.css({ "width": "0px", "height": "0px", "left": -100, "top": -100, "position": "absolute" });
        $(window).resize(function (ev) {
            setTimeout(function () {
                if (set.ClientWidth == 0) set.ClientWidth = proxy.parent().width();
                proxy.width(set.ClientWidth - 12);
                proxy.find("DIV").width(set.ClientWidth - 21 - 12 - 3);
            }, 50);
        });
    }

    $(window).resize(function (ev) {
        //proxy.width(set.SelectObject.outerWidth()-2);
		proxy.css({width:set.SelectObject.outerWidth() +"px"});
    });
	
	$("#lnkClearTxt", proxy).click(function(e){
		TxJsCtl._cancelBubble(e);
        if (set.IsEnable == false) return;
		$(".dropdown_proxytext", proxy).html("").attr("title", "");
		set._SelectValue.splice(0, set._SelectValue.length);
		set._SelectText.splice(0, set._SelectText.length);
		for (var i = 0, j = obj[0].options.length; i < j; i++) {
			obj[0].options[i].selected = false;
		}
		$(this).hide();
        var dropdown = $('#dropdown_' + obj.attr("id"), top.document.body);
        if (dropdown.length > 0 && dropdown[0].style.display != "none") {
			dropdown.trigger("clearAll");
        }
	});
	
}
TxJsCtl.DisplayDropdown = function (obj, ids, names, e, set, scrollObj) {
    if (TxJsCtl.PreDropdownHideFun) {
        TxJsCtl.PreDropdownHideFun();
        delete TxJsCtl.PreDropdownHideFun;
        TxJsCtl.PreDropdownHideFun = null;
    }

    if (!set.IsNewCtl) obj.hide();

    if (set.NeedHideSelect && set.SelectObject != null) {
        set.SelectObject.hide();
    }
    var isfocus = true;
    var timer = null;
    var lastchar = "";
    var TimeID = null;
    var blurhander = function (ev) {
        isfocus = false;
        TxJsCtl._cancelBubble(e);
        if (timer) clearTimeout(timer);
        timer = setTimeout(function () {
            if (timer) clearTimeout(timer);
            if (!isfocus) hide();
        }, 250);
    };
    var focushander = function (ev) {
        isfocus = true;
        TxJsCtl._cancelBubble(e);
        if (timer) clearTimeout(timer);
    };
    var dropdown = $('#dropdown_' + obj.attr("id"), top.document.body);
    var keyword = "";
    var selectitem = null;
    var prevalue = "";
    if (set.IsCombo) prevalue = obj.val();
    var sids = [], snames = [];
    var nextpage = function (index, notfocus) {
        if (typeof (index) == "undefined" || typeof (index) == "object") index = parseInt($(this).attr("index"));
        var html = getpagehtml(index);
        var needshowbottom = false; //ids.length>50;
        var needshowsearch = true; // ids.length > 9;
        var pagehtml = "";
        if (needshowbottom) pagehtml = getpaginghtml(index);
        var prew = $("table.dropdown_contenttable", dropdown).width();
        var preh = $("table.dropdown_contenttable", dropdown).height();
        var predivh = $("div.dropdown_content", dropdown).height() + ($("div.dropdown_bottom", dropdown).css("display") == "none" ? 0 : 30);
        $("div.dropdown_bottom", dropdown).html(pagehtml).css({ "display": needshowbottom ? "" : "none" });

        $("div.dropdown_content", dropdown).html(html).scrollTop(0);
        html = null;
        pagehtml = null;
        var newh = $("table.dropdown_contenttable", dropdown).height();
        var neww = $("table.dropdown_contenttable", dropdown).width();
        var newdivh = $("div.dropdown_content", dropdown).height() + ($("div.dropdown_bottom", dropdown).css("display") == "none" ? 0 : 30);
        var newdivw = $("div.dropdown_content", dropdown).width();
        var seth = set.Height;
        if (needshowsearch) seth -= 26;
        if (set.ShowAbove) {
            seth += 2;
            if (!set.IsCombo) seth += 2;
        }
        var showh = newdivh;

        if (showh > seth) showh = seth;
        var maxh = 347;
        if (set.IsCombo) maxh += 22;
        if (showh >= maxh) showh = maxh;
        if (newh > preh) {
            showh = newh;
            if (showh > seth) showh = seth;
        }
        else {
            if (newh <= newdivh) {
                showh = newh;
            }
        }
        if (neww > newdivw) {
            showh += 22;
        }
        if (showh >= maxh) showh = maxh;
        $("div.dropdown_content", dropdown).height(showh);
        if (needshowsearch)
            dropdown.height(showh + 21 + 24);
        else
            dropdown.height(showh + 21);
        if (set.ShowAbove) {
            var t = dropdown.position().top;
            dropdown.css({ 'top': t + predivh - showh });
        }

        var showw = neww + 2;
        if (newh - showh > 0) showw += 18;
        if (set.ClientWidth > showw) {
            showw = set.ClientWidth;
        }
        //if (showw > 800) showw = 800;

        dropdown.width(showw);
        if (newh - showh > 0)
            $("table.dropdown_contenttable", dropdown).width(showw - 18);
        else
            $("table.dropdown_contenttable", dropdown).width(showw);
        $("div.dropdown_content", dropdown).width(showw);
        $("div.dropdown_bottom", dropdown).width(showw);
        $("div.dropdown_search", dropdown).width(showw);


        $("td.dropdown_next,td.dropdown_pre,img.dropdown_page", dropdown).bind("click", nextpage);
        $("td.dropdown_item", dropdown).bind("click", select);
        $("input.dropdown_ckb,label.dropdown_ckb", dropdown).unbind("click", oncheck).bind("click", oncheck);
        $("#dropdown_checkbox_selectall", dropdown).unbind("click", selectall).bind("click", selectall);
        $("td.dropdown_item,td.dropdown_pre,td.dropdown_next", dropdown).bind("mouseout", function () {
            $(this).css({ "background-color": "", "border": "", "padding": "1px 1px 1px 8px" });
            if (selectitem != null) {
                selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                selectitem = null;
            }
        })
        .bind("mouseover", function () {
            if (selectitem != null) {
                selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
            }
            $(this).css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
            if ($(this).attr("value") == "undefined" || $(this).attr("value") == "") {
                selectitem = null;
            }
            else {
                selectitem = $(this).parent();
            }
        });
    };
    var findinoption = function (sel, val) {
        for (var i = 0, j = sel.options.length; i < j; i++) {
            if (sel.options[i].value == val) return i;
        }
        return -1;
    };
    //var onchecklabel = function (e) { return true; };
    var selectall = function (e) {
        var isallchecked = dropdown.find("INPUT.dropdown_selectall")[0].checked;
        dropdown.find("INPUT.dropdown_ckb").each(function (i) {
            this.checked = isallchecked;
        });
        TxJsCtl._cancelBubble(e);
        oncheck(e);
    };
    var oncheck = function (e) {
        TxJsCtl._cancelBubble(e);
        var selectText = set._SelectText;
        var selectValue = set._SelectValue;
        var tar = e.target;
        if (typeof (tar) == "undefined" || tar == null) {
            return;
        }
		/*
		var v = $(tar).val();
		if (v == TxJsCtl.ITEM_VALUE_SELECTALL){
			var index4SelectAll = findinoption(obj[0], TxJsCtl.ITEM_VALUE_SELECTALL);
			if (index4SelectAll >= 0){
				var isallchecked = tar.checked;
				dropdown.find("INPUT.dropdown_ckb").each(function (i) {
					this.checked = isallchecked;
				});
				
				for (var i = 0, j = obj[0].options.length; i < j; i++) {
					obj[0].options[i].selected = false;
				}
				obj[0].options[index4SelectAll].selected = isallchecked;
				if (isallchecked){
					selectText = [$(tar).parent().parent().attr("title")];
					selectValue = [v];
				}
				else{
					selectText = [];
					selectValue = [];
				}
			}
		}
        else */
		if ($(tar).attr("class") == "dropdown_selectall") {
            dropdown.find("INPUT.dropdown_ckb").each(function (i) {
                var nIndex = TxJsCtl.FindInArray(selectValue, $(this).val());
                if (this.checked) {
                    if (nIndex == -1) {
                        selectText.push($(this).parent().parent().attr("title"));
                        selectValue.push($(this).val());
                    }
                }
                else {
                    if (nIndex > -1) {
                        selectText.splice(nIndex, 1);
                        selectValue.splice(nIndex, 1);
                    }
                }
            });
        }
        else if ($(tar).attr("class") != "dropdown_ckb") {
            return
        }
        else {
            if (tar.checked) {
                selectText.push($(tar).parent().parent().attr("title"));
                selectValue.push($(tar).val());
            }
            else {
                var nIndex = TxJsCtl.FindInArray(selectValue, $(tar).val());
                if (nIndex > -1) {
                    selectText.splice(nIndex, 1);
                    selectValue.splice(nIndex, 1);
                }
            }
			/* "select all" item 
			var index4SelectAll = findinoption(obj[0], TxJsCtl.ITEM_VALUE_SELECTALL);
			if (index4SelectAll>=0){
				var $elChecked = dropdown.find("INPUT.dropdown_ckb[value!='" + TxJsCtl.ITEM_VALUE_SELECTALL + "']:checked");
				var $elAll = dropdown.find("INPUT.dropdown_ckb[value!='" + TxJsCtl.ITEM_VALUE_SELECTALL + "']");
				if ($elChecked.length == $elAll.length && $elChecked.length > 0){
					selectText = [$(tar).parent().parent().attr("title")];
					selectValue = [v];
					dropdown.find("INPUT.dropdown_ckb[value='" + TxJsCtl.ITEM_VALUE_SELECTALL + "']").each(function(){this.indeterminate=false;this.checked=true;});
					obj[0].options[index4SelectAll].selected = true;
				}
				else{
					if ($elChecked.length == 0){
						dropdown.find("INPUT.dropdown_ckb[value='" + TxJsCtl.ITEM_VALUE_SELECTALL + "']").each(function(){this.indeterminate=false;this.checked=false;});
					}
					else{
						dropdown.find("INPUT.dropdown_ckb[value='" + TxJsCtl.ITEM_VALUE_SELECTALL + "']").each(function(){this.indeterminate=true;});
					}
					obj[0].options[index4SelectAll].selected = false;
					var nIndex = TxJsCtl.FindInArray(selectValue, TxJsCtl.ITEM_VALUE_SELECTALL);
					if (nIndex > -1) {
						selectText = [];
						selectValue = [];
						$elChecked.each(function(){
							selectText.push($(this).parent().parent().attr("title"));
							selectValue.push($(this).val());
						});
					}
				}
			}
			*/
        }
        set._SelectText = selectText;
        set._SelectValue = selectValue;
        if (set.Proxy != null) {
			var text = selectText.join(",");
            set.Proxy.find("DIV").html(TxJsCtl.HtmlEncode(text)).attr("title", text);
			if (text != "")
				set.Proxy.find("#lnkClearTxt").show();
			else
				set.Proxy.find("#lnkClearTxt").hide();
        }
		if (selectValue[0] != TxJsCtl.ITEM_VALUE_SELECTALL){
			for (var i = 0, j = obj[0].options.length; i < j; i++) {
				obj[0].options[i].selected = false;
			}
			for (var i = 0, j = selectValue.length; i < j; i++) {
				var nIndex = findinoption(obj[0], selectValue[i]);
				if (nIndex > -1) {
					obj[0].options[nIndex].selected = true;
				}
				else {
					var oOption = document.createElement("OPTION");
					oOption.text = selectText[i];
					oOption.value = selectValue[i];
					oOption.selected = true;
					obj[0].options.add(oOption);
				}
			}
		}
        //        for (var i = 0, j = obj[0].options.length; i < j; i++) {
        //            if (TxJsCtl.IsInArray(selectValue, obj[0].options[i].value)) {
        //                obj[0].options[i].selected = true;
        //            }
        //        }

        if (e.target.tagName != "LABEL") {
            var onchange = obj.prop("onchange");
            if (typeof onchange == "function") {
                obj.change();
            }
            else {
                if (obj[0].dispatchEvent) {
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent("change", false, true);
                    obj[0].dispatchEvent(evt);
                }
                else if (obj[0].fireEvent) {
                    obj[0].fireEvent("onchange");
                }
            }
        }
        //valuechanged4multiselect(); //this is not control work(please do this on chagne event). and this will produce other bug.
    };
    var valuechanged4multiselect = function () {
        selectText = set._SelectText;
        selectValue = set._SelectValue;
        var curid = obj.attr('id');
        var postfix = curid;
        if (curid != null) {
            var n = curid.lastIndexOf('_');
            if (n >= 0) {
                postfix = curid.substr(n + 1);
            }
        }
        $('[id$=' + postfix + ']').each(function (ind) {
            if ($(this).attr('id') != curid && this.tagName.toUpperCase() == "SELECT") {
                var s = this;
                for (var i = 0, j = s.options.length; i < j; i++) {
                    s.options[i].selected = false;
                }
                for (var i = 0, j = selectValue.length; i < j; i++) {
                    var nIndex = findinoption(s, selectValue[i]);
                    if (nIndex > -1) {
                        s.options[nIndex].selected = true;
                    }
                    else {
                        var oOption = document.createElement("OPTION");
                        oOption.text = selectText[i];
                        oOption.value = selectValue[i];
                        oOption.selected = true;
                        s.options.add(oOption);
                    }
                }
                var onchange = $(s).prop("onchange");
                if (typeof onchange == "function") {
                    $(s).change();
                }
                else {
                    if (s.dispatchEvent) {
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent("change", false, true);
                        s.dispatchEvent(evt);
                    }
                    else if (s.fireEvent) {
                        s.fireEvent("onchange");
                    }
                }
                $(s).trigger("refresh", [set._SelectText, set._SelectValue]);
            }
        });
    };
    var select = function (e) {
        if (set.MultiSelect) {
            return;
        }
        var getOptionIndex = function (sel, val, txt) {
            for (var i = 0, j = sel.options.length; i < j; i++) {
                if (sel.options[i].value == val)//&& sel.options[i].text==txt
                {
                    return i;
                }
            }
            return -1;
        };
        var ischange = false;
        if (!set.IsCombo) {
            var oOption = document.createElement("OPTION");
            oOption.text = $(this).attr("title").replace("\xa0\xa0\xa0\xa0", "");
            oOption.value = $(this).attr("value");
            if (obj[0].selectedIndex == -1) {
                obj[0].options.add(oOption);
                var nIndex = getOptionIndex(obj[0], $(this).attr("value"), $(this).attr("title"));
                if (nIndex > -1) {
                    obj[0].selectedIndex = nIndex;
                }
                else {
                    obj[0].selectedIndex = obj[0].options.length - 1;
                }
                ischange = true;
            }
            else {
                var nIndex = getOptionIndex(obj[0], $(this).attr("value"), $(this).attr("title"));
                ischange = obj[0].options[obj[0].selectedIndex].value != $(this).attr("value");
                if (ischange) {
                    if (nIndex > -1) {
                        obj[0].selectedIndex = nIndex;
                    }
                    else {
                        obj[0].options.add(oOption);
                        obj[0].selectedIndex = obj[0].options.length - 1;
                    }
                }
            }
            if (set.Proxy != null) {
                set.Proxy.find("DIV").html(TxJsCtl.HtmlEncode($(this).attr("title").replace("\xa0\xa0\xa0\xa0", "")));
                set.Proxy.find("DIV").attr("title", $(this).attr("title").replace("\xa0\xa0\xa0\xa0", ""));
                set.Proxy.find("DIV").attr("value", $(this).attr("value"));
            }
        }
        else {
            obj.val($(this).text());
            var onkeyup = obj.prop('onkeyup');
            if (typeof onkeyup == "function") {
                obj.keyup();
            }
            if (set.Proxy != null) set.Proxy.find("INPUT").val($(this).text());
        }
        hide(e, set.IsCombo);
        if (!set.NeedCheckChange) ischange = true;
        if (ischange) {
            var onchange = obj.prop("onchange");
            if (typeof onchange == "function") {
                obj.change();
            }
            else {
                if (obj[0].dispatchEvent) {
                    var evt = document.createEvent('HTMLEvents');
                    evt.initEvent("change", false, true);
                    obj[0].dispatchEvent(evt);
                }
                else if (obj[0].fireEvent) {
                    obj[0].fireEvent("onchange");
                }
            }
        }
        if (set.IsCombo && set.SelectObject != null) {
            var oOption = document.createElement("OPTION");
            oOption.text = $(this).attr("title").replace("\xa0\xa0\xa0\xa0", "");
            oOption.value = $(this).attr("value");
            if (set.SelectObject[0].selectedIndex == -1) {
                set.SelectObject[0].options.add(oOption);
                set.SelectObject[0].selectedIndex = set.SelectObject[0].options.length - 1;
                ischange = true;
            }
            else {
                var nIndex = getOptionIndex(set.SelectObject[0], $(this).attr("value"), $(this).attr("title"));
                ischange = set.SelectObject[0].options[set.SelectObject[0].selectedIndex].value != $(this).attr("value");
                if (ischange) {
                    if (nIndex > -1) {
                        set.SelectObject[0].selectedIndex = nIndex;
                    }
                    else {
                        set.SelectObject[0].options.add(oOption);
                        set.SelectObject[0].selectedIndex = set.SelectObject[0].options.length - 1;
                    }
                }
            }
            if (ischange) {
                var selonchange = set.SelectObject.prop("onchange");
                if (typeof selonchange == "function") {
                    set.SelectObject.change();
                }
                else {
                    if (set.SelectObject[0].dispatchEvent) {
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent("change", false, true);
                        set.SelectObject[0].dispatchEvent(evt);
                    }
                    else if (set.SelectObject[0].fireEvent) {
                        set.SelectObject[0].fireEvent("onchange");
                    }
                }
            }
        }

        return false;
    };

    var ok = function () { hide(); };
    var cancel = function () { hide(); };
    var clearsearch = function (ev) { keyword = ""; $("input.dropdown_searchinput", dropdown).val(""); $("div.calclesearchicon", dropdown).hide(); nextpage(0); };
    var search = function (ev) {
        if (ev.keyCode == 27)//esc
        {
            if (set.IsCombo || keyword == "") {
                hide();
                return;
            }
            keyword = "";
            $(this).val("");
            nextpage(0);
        }
        else if (ev.keyCode == 38 || ev.keyCode == 40) {
            return true;
        }
        else {
            keyword = $(this).val();
            if (keyword != "") {
                $("div.calclesearchicon", dropdown).show();
            }
            if (ev.keyCode == 13 && set.IsCombo) {
                obj.val(keyword);
                keyword = "";
                hide();
                return;
            }
            dosearch();
            nextpage(0, true);
        }
    };
    var getselectitem = function () {
        var result = null;
        $("div.dropdown_content", dropdown).find("tr").each(function (i) {
            if ($(this).css("background-color") == "#cbdaf0" || $(this).css("background-color") == "rgb(203, 218, 240)") {
                result = $(this);
                return false;
            }
            var td = $(this).find("td");
            if (td.css("background-color") == "#dfe8f6" || td.css("background-color") == "rgb(223, 232, 246)") {
                result = $(this);
                return false;
            }
        });
        return result;
    };
    var keyup = function (e) {
        if (e.keyCode == 27)//esc
        {
            if (set.IsCombo || keyword == "") {
                try { hide(); } catch (ex) { }
                return false;
            }
            keyword = "";
            $("input.dropdown_searchinput", dropdown).val("");
            nextpage(0);
        }
        return true;
    };
    var combokeyup = function (e) {
        obj.val($(this).val());
        var onkeyup = obj.prop('onkeyup');
        if (typeof onkeyup == "function") {
            obj.keyup();
        }
    };
    var keydown = function (e) {
        if (e.keyCode == 40)//down
        {
            var havedefaultitem = false;
            if (selectitem == null) {
                selectitem = getselectitem();
            }
            if (selectitem == null) {
                selectitem = $("div.dropdown_content", dropdown).find("tr").first();
                if (selectitem.find("td").attr("class") == "dropdown_pre") {
                    selectitem = selectitem.next();
                }
            }
            else {
                //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                selectitem.find("td").removeClass("dropdown_item_select");
                selectitem = selectitem.next();
            }
            if (selectitem.find("td").attr("class") == "dropdown_next") {
                selectitem.find("td").click();
                return false;
            }
            else if (selectitem.length == 0) {
                selectitem = $("div.dropdown_content", dropdown).find("tr").first()
                if (selectitem.find("td").attr("class") == "dropdown_pre") {
                    selectitem = selectitem.next();
                }
            }
            //selectitem.find("td").css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
            selectitem.find("td").addClass("dropdown_item_select");
            var div = $("div.dropdown_content", dropdown);
            if (selectitem[0].offsetTop - div.scrollTop() + selectitem.height() > div.height()) {
                selectitem[0].scrollIntoView(false);
            }
            return false;
        }
        else if (e.keyCode == 38)//up
        {
            var havedefaultitem = false;
            if (selectitem == null) {
                selectitem = getselectitem();
            }
            if (selectitem == null) {
                selectitem = $("div.dropdown_content", dropdown).find("tr").last();
                if (selectitem.find("td").attr("class") == "dropdown_next") {
                    selectitem = selectitem.prev();
                }
            }
            else {
                //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                selectitem.find("td").removeClass("dropdown_item_select");
                selectitem = selectitem.prev();
            }
            if (selectitem.find("td").attr("class") == "dropdown_pre") {
                selectitem.find("td").click();
                return false;
            }
            else if (selectitem.length == 0) {
                selectitem = $("div.dropdown_content", dropdown).find("tr").last()
                if (selectitem.find("td").attr("class") == "dropdown_next") {
                    selectitem = selectitem.prev();
                }
            }
            //selectitem.find("td").css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
            selectitem.find("td").addClass("dropdown_item_select");
            var div = $("div.dropdown_content", dropdown);
            if (selectitem[0].offsetTop - div.scrollTop() > div.height()) {
                selectitem[0].scrollIntoView(false);
            }
            else if (selectitem[0].offsetTop - div.scrollTop() < 0) {
                selectitem[0].scrollIntoView(true);
            }

            return false;
        }
        else if (e.keyCode == 27)//esc
        {
            if (set.IsCombo || keyword == "") {
                hide();
                return false;
            }
            keyword = "";
            $("input.dropdown_searchinput", dropdown).val("");
            nextpage(0);
        }
        else if (e.keyCode == 13)//enter
        {
            if (selectitem != null) {
                selectitem.find("td").click();
                return false;
            }
        }
        else if (e.keyCode == 9)//table
        {
            if (selectitem != null) {
                selectitem.find("td").click();
                return false;
            }
        }
        else if (e.keyCode == 109 || e.keyCode == 107)//+ -
        {
            return true;
        }
        else if ((e.keyCode >= 48 && e.keyCode <= 122) || e.keyCode == 32) {
            var havesearch = true; // ids.length > 9;
            if (havesearch || set.IsCombo) {
                $("input.dropdown_searchinput", dropdown).focus();
            }
            else {
                if (TimeID != null) clearTimeout(TimeID);
                var newchar = String.fromCharCode(e.keyCode);
                var result = null;
                var isgotonext = false;
                if (newchar == lastchar && keyword.length < 2) isgotonext = true;
                else keyword += newchar;
                lastchar = newchar;
                TimeID = setTimeout(function () { keyword = ""; TimeID == null }, 500);

                var getnextitem = function (citem, key, fromnext) {
                    var result = citem;
                    if (fromnext) result = result.next();
                    while (result.length > 0 && result.find("td").attr("title").replace(/\W/ig, "").toLowerCase().indexOf(key.toLowerCase()) != 0) {
                        result = result.next();
                    }
                    if (result.length > 0 && result.find("td").attr("title").replace(/\W/ig, "").toLowerCase().indexOf(key.toLowerCase()) == 0)
                        return result;
                    else
                        return null;
                };

                if (isgotonext) {
                    var citem = selectitem;
                    if (citem == null) citem = getselectitem();
                    if (citem != null) {
                        var nitem = getnextitem(citem, newchar, true);
                        //citem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                        citem.find("td").removeClass("dropdown_item_select");
                        if (nitem != null && nitem.length != 0) {
                            if (selectitem != null) {
                                //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                                selectitem.find("td").removeClass("dropdown_item_select");
                            }
                            //nitem.find("td").css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
                            nitem.find("td").addClass("dropdown_item_select");
                            selectitem = nitem;
                            return false;
                        }
                    }
                }
                var citem = selectitem;
                if (citem == null) citem = getselectitem();
                if (citem != null) {
                    var nitem = getnextitem(citem, keyword, keyword.length > 1 ? false : true);
                    if (nitem != null && nitem.length != 0) {
                        if (selectitem != null) {
                            //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                            selectitem.find("td").removeClass("dropdown_item_select");
                        }
                        //nitem.find("td").css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
                        nitem.find("td").addClass("dropdown_item_select");
                        selectitem = nitem;
                        return false;
                    }
                }
                $("div.dropdown_content", dropdown).find("tr").each(function (i) {
                    var td = $(this).find("td");
                    if ((td.attr("title") == "    " && keyword == " ") || (td.attr("title").toLowerCase().replace(/\W/ig, "").indexOf(keyword.toLowerCase()) == 0)) {
                        result = $(this);
                        return false;
                    }
                });

                if (result != null) {
                    if (selectitem != null) {
                        //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
                        selectitem.find("td").removeClass("dropdown_item_select");
                    }
                    //result.find("td").css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
                    result.find("td").addClass("dropdown_item_select");
                    selectitem = result;

                }
                return false;
            }
        }
        else {
            selectitem = null;
        }
        return true;
    };
    var dosearch = function () {
        sids = [];
        snames = [];
        var index = -1;
        var showname = "";
        for (var i = 0, j = names.length; i < j; i++) {
            showname = names[i]//TxJsCtl.HtmlEncode;
            var isarray = false;
            if (typeof (showname) == "object") {
                showname = showname[0];
                isarray = true;
            }
            index = showname.toLowerCase().indexOf(keyword.toLowerCase());
            if (index > -1) {
                sids.push(ids[i]);
                if (isarray) {
                    var sarray = new Array();
                    sarray.push(TxJsCtl.HtmlEncode(showname.substr(0, index)) + "<font color='red'>" + TxJsCtl.HtmlEncode(showname.substr(index, keyword.length)) + "</font>" + TxJsCtl.HtmlEncode(showname.substr(index + keyword.length)));
                    for (var m = 1, n = names[i].length; m < n; m++) {
                        sarray.push(m);
                    }
                    snames.push(sarray);
                }
                else {
                    snames.push(TxJsCtl.HtmlEncode(showname.substr(0, index)) + "<font color='red'>" + TxJsCtl.HtmlEncode(showname.substr(index, keyword.length)) + "</font>" + TxJsCtl.HtmlEncode(showname.substr(index + keyword.length)));
                }
            }
        }
    };
    var searchclick = function (e) { if ($(this).val() == TxJsCtl.QuickSearchString) { $(this).val(""); $(this).css({ "color": "#000000" }); } TxJsCtl._cancelBubble(e); };
    var hide = function (e, needsetcombo) {
        document.body.onscroll = null;
        if (dropdown[0].style.display == "none") {
            if (!set.IsNewCtl) obj.show();
            return;
        }

        if (!set.IsNewCtl) obj.show();
        dropdown.hide();

		if (typeof(set.onCollapseHandle) == 'function'){
			set.onCollapseHandle.call();
		}
		
        if (!needsetcombo && set.IsCombo) {
            var isvaluechanged = prevalue != $("input.dropdown_searchinput", dropdown).val();

            var isTextMode = false;
            var index = set.SelectObject[0].selectedIndex;
            if (index < 0) {
                isTextMode = true;
            }
            else {
                var selText = set.SelectObject[0].options[index].text;
                isTextMode = (selText != obj.val());
                isvaluechanged = (selText != obj.val());
            }
            if (isTextMode) {
                set.SelectObject[0].selectedIndex = -1;
                var onNoSelected = set.SelectObject.prop("onNoSelected");
                if (onNoSelected != null) {
                    eval(onNoSelected);
                }
            }

            obj.val($("input.dropdown_searchinput", dropdown).val());
            if (isvaluechanged) {
                var onkeyup = obj.prop("onkeyup");
                if (typeof onkeyup == "function") {
                    obj.keyup();
                }
                else {
                    if (obj[0].dispatchEvent) {
                        var evt = document.createEvent('HTMLEvents');
                        evt.initEvent("change", false, true);
                        obj[0].dispatchEvent(evt);
                    }
                    else if (obj[0].fireEvent) {
                        obj[0].fireEvent("onchange");
                    }

                }
            }
        }

        if (TxJsCtl.isIE()) { $("object").css("visibility", "visible"); }
        if (set.NeedHideSelect && set.SelectObject != null) {
            set.SelectObject.show();
        }

        delete ids;
        delete names;
        delete sids;
        delete snames
        sids = null;
        snames = null;
        $("#dropdown_" + obj.attr("id"), top.document.body).remove();
        delete TxJsCtl.PreDropdownHideFun;
        TxJsCtl.PreDropdownHideFun = null;
        getpaginghtml = null;
        getpagehtml = null;
        searchclick = null;
        dosearch = null;
        keydown = null;
        combokeyup = null;
        keyup = null;
        getselectitem = null;
        search = null;
        ok = null;
        cancel = null;
        select = null;
        nextpage = null;
        focushander = null;
        blurhander = null;
        hide = null;
        if (!set.IsNewCtl) obj.focus();
        else set.Proxy.focus();
        return false;
    };
    this.HideDropDown = function (e) { try { hide(e) } catch (ex) { } };

    var getpaginghtml = function (index) {
        var html = new TxJsCtl.StringBuilder();
        var isSearch = keyword != "";
        var allcount = (isSearch ? sids.length : ids.length);
        var j = allcount;
        var islastpage = true;
        var count = j / TxJsCtl.NUMBER_PER_PAGE;
        if (j > ((index + 1) * TxJsCtl.NUMBER_PER_PAGE)) {
            j = (index + 1) * TxJsCtl.NUMBER_PER_PAGE;
            islastpage = false;
        }
        var tocount = (index + 1) * TxJsCtl.NUMBER_PER_PAGE;
        if (tocount > allcount) tocount = allcount;
        html.appendFormat('<div style="padding:5px 0px 0px 0px;font-size:12px; color:#525252;"><img class="dropdown_page" src="/DevSuiteWebControl/style/img/page_first.gif" border="0" style="{0}" index="0" title="First Page" />', index > 0 ? "cursor:pointer;" : "");
        html.appendFormat('&nbsp;&nbsp;<img src="/DevSuiteWebControl/style/img/page_pre.gif" class="dropdown_page" border="0" index="{0}" style="{1}" title="Previous Page" />', index > 0 ? index - 1 : 0, index > 0 ? "cursor:pointer;" : "");
        html.appendFormat('&nbsp;&nbsp;{1}-{2}&nbsp;&nbsp;of&nbsp;&nbsp;{0}', allcount, index * TxJsCtl.NUMBER_PER_PAGE, tocount);
        html.appendFormat('&nbsp;&nbsp;<img src="/DevSuiteWebControl/style/img/page_next.gif" class="dropdown_page" border="0" index="{0}" style="{1}" title="Next Page" />', islastpage ? index : index + 1, islastpage ? "" : "cursor:pointer;");
        html.appendFormat('&nbsp;&nbsp;<img src="/DevSuiteWebControl/style/img/page_last.gif" class="dropdown_page" border="0" index="{0}" style="{1}" title="Last Page" /></div>', islastpage ? index : count, islastpage ? "" : "cursor:pointer;");
        return html.toString();
    }
    var getpagehtml = function (index) {
        var html = new TxJsCtl.StringBuilder();
        var isSearch = keyword != "";
        var ismulticolumn = typeof (set.head) != "undefined";
        var haveselet = false;
        var selectValue = new Array();
        if (set.MultiSelect) {
            haveselet = true;
            for (var m = 0, n = obj[0].options.length; m < n; m++) {
                if (obj[0].options[m].selected == true) {
                    selectValue.push(obj[0].options[m].value);
                }
            }
        }
		
        html.append('<table class="dropdown_contenttable" border="0" cellspacing="0" cellpadding="0">');
        if (ismulticolumn == true) {
            html.append('<tr><td class="dropdown_column" style="text-align:center;" nowrap >');
            for (var i = 0, j = set.head.length; i < j; i++) {
                html.appendFormat('<div style="float:left;width:{0}; text-align:{2};font-weight:bold;">{1}</div>', set.head[i].width, TxJsCtl.HtmlEncode(set.head[i].name), set.head[i].align);
            }
            html.append('</td></tr>');
        }
        else if (set.MultiSelect && set.SelectAll) {
            html.append('<tr><td class="dropdown_column" style="text-align:left;" nowrap >');
            html.appendFormat('<label class=\"cbx_wrap\"><input class="dropdown_selectall" id="dropdown_checkbox_selectall" type="checkbox" /><span></span></label><label for="dropdown_checkbox_selectall" >{0}</label></td></tr>', TxJsCtl.SelectAllString);
        }
		else if (set.MultiSelect && findinoption(obj[0], TxJsCtl.ITEM_VALUE_SELECTALL)>=0){
			if (selectValue.length>0 && selectValue[0]==TxJsCtl.ITEM_VALUE_SELECTALL) {
				html.appendFormat('<tr><td class="dropdown_item"  nowrap value="{0}" title="{2}"><label class=\"cbx_wrap\"><input class="dropdown_ckb" type="checkbox" id="dropdown_checkbox_{0}" value="{0}" checked="checked" /><span></span></label><label class="dropdown_ckb" for="dropdown_checkbox_{0}" style="width:100%;">{1}</label></td></tr>', TxJsCtl.ITEM_VALUE_SELECTALL, TxJsCtl.ITEM_TEXT_SELECTALL, TxJsCtl.ITEM_TITLE_SELECTALL);
			}
			else {
				html.appendFormat('<tr><td class="dropdown_item"  nowrap value="{0}" title="{2}"><label class=\"cbx_wrap\"><input class="dropdown_ckb" type="checkbox" id="dropdown_checkbox_{0}" value="{0}" /><span></span></label><label class="dropdown_ckb" for="dropdown_checkbox_{0}" style="width:100%;">{1}</label></td></tr>', TxJsCtl.ITEM_VALUE_SELECTALL, TxJsCtl.ITEM_TEXT_SELECTALL, TxJsCtl.ITEM_TITLE_SELECTALL);
			}
		}

        if (index > 0) {
            html.appendFormat('<tr><td class="dropdown_pre" nowrap index="{0}"><img src="/DevSuiteWebControl/style/img/page_up3.gif" border="0" />&nbsp;' + TxJsCtl.PrevItemString + '</td></tr>', (index - 1));
        }
        var j = (isSearch ? sids.length : ids.length);
        var islastpage = true;
        if (j > ((index + 1) * TxJsCtl.NUMBER_PER_PAGE)) {
            j = (index + 1) * TxJsCtl.NUMBER_PER_PAGE;
            islastpage = false;
        }
        var cid = 0;
        var cname = "";
        var mname = null;
        var ctitle = "";

        for (var i = index * TxJsCtl.NUMBER_PER_PAGE; i < j; i++) {
            cid = isSearch ? sids[i] : ids[i];
			if (cid == TxJsCtl.ITEM_VALUE_SELECTALL) continue;
            if (ismulticolumn) {
                cname = (isSearch ? snames[i][0] : names[i][0]) == "" ? "&nbsp;&nbsp;&nbsp;&nbsp;" : (isSearch ? snames[i][0] : TxJsCtl.HtmlEncode(names[i][0]));
                mname = isSearch ? snames[i] : names[i];
            }
            else {
                cname = (isSearch ? snames[i] : names[i]) == "" ? "&nbsp;&nbsp;&nbsp;&nbsp;" : (isSearch ? snames[i] : TxJsCtl.HtmlEncode(names[i]));
            }
            ctitle = cname.replace("<font color='red'>", "").replace("</font>", "");
            if (!haveselet && ((set.IsCombo && obj.val() == cname) || (!set.IsCombo && obj.val() == cid + ""))) {
                haveselet = true;
                if (ismulticolumn) {
                    html.appendFormat('<tr style="background-color:#cbdaf0;" class="dropdown_td_select"><td class="dropdown_item" nowrap value="{0}" title="{1}">', cid, ctitle);
                    for (var m = 0, n = mname.length; m < n; m++) {
                        html.appendFormat('<div style="float:left;width:{0};text-align:{2}">{1}</div>', set.head[m].width, mname[m], set.head[m].align);
                    }
                    html.append('</td></tr>');
                }
                else {
                    if (set.MultiSelect) {
                        html.appendFormat('<tr style="background-color:#cbdaf0;" class="dropdown_td_select"><td class="dropdown_item" nowrap value="{0}" title="{2}"><input class="dropdown_ckb" id="dropdown_checkbox_{0}" type="checkbox"  /><a class="null"><span style="color:#333;"><label for="dropdown_checkbox_{0}" >{1}</label></span></a></td></tr>', cid, cname, ctitle);
                    } else {
                        html.appendFormat('<tr style="background-color:#cbdaf0;" class="dropdown_td_select"><td class="dropdown_item" nowrap value="{0}" title="{2}"><a class="null"><span style="color:#333;">{1}</span></a></td></tr>', cid, cname, ctitle);
                    }
                }
            }
            else {
                if (ismulticolumn) {
                    html.appendFormat('<tr><td class="dropdown_item" nowrap value="{0}" title="{1}">', cid, ctitle);
                    for (var m = 0, n = mname.length; m < n; m++) {
                        html.appendFormat('<div style="float:left;width:{0};text-align:{2}">{1}</div>', set.head[m].width, mname[m], set.head[m].align);
                    }
                    html.append('</td></tr>');
                }
                else {
                    if (set.MultiSelect) {
                        if (TxJsCtl.IsInArray(selectValue, cid + "") || (selectValue.length>0 && selectValue[0]==TxJsCtl.ITEM_VALUE_SELECTALL)) {
                            html.appendFormat('<tr><td class="dropdown_item"  nowrap value="{0}" title="{2}"><label class=\"cbx_wrap\"><input class="dropdown_ckb" type="checkbox" id="dropdown_checkbox_{0}" value="{0}" checked="checked" /><span></span></label><label class="dropdown_ckb" for="dropdown_checkbox_{0}" style="width:100%;">{1}</label></td></tr>', cid, cname, ctitle);
                        }
                        else {
                            html.appendFormat('<tr><td class="dropdown_item"  nowrap value="{0}" title="{2}"><label class=\"cbx_wrap\"><input class="dropdown_ckb" type="checkbox" id="dropdown_checkbox_{0}" value="{0}" /><span></span></label><label class="dropdown_ckb" for="dropdown_checkbox_{0}" style="width:100%;">{1}</label></td></tr>', cid, cname, ctitle);
                        }
                    }
                    else {
                        html.appendFormat('<tr><td class="dropdown_item"  nowrap value="{0}" title="{2}"><a class="null"><span style="color:#333;">{1}</span></a></td></tr>', cid, cname, ctitle);
                    }
                }
            }
        }
        if (j == 0) {
            html.appendFormat('<tr><td style="height:18px;padding:1px 0px 1px 8px;" >{0}</td></tr>', "No items");
        }
        if (!islastpage) {
            html.appendFormat('<tr><td class="dropdown_next" nowrap index="{0}"><img src="/DevSuiteWebControl/style/img/page_down3.gif" border="0" />&nbsp;' + TxJsCtl.NextItemString + '</td></tr>', (index + 1));
        }
        html.append('</table>');
        return html.toString();
    };
    if (keyword != "") dosearch();
    var html = new TxJsCtl.StringBuilder();
    var needshowbottom = false;
    var needshowsearch = true; //ids.length > 9;
    if (dropdown.length == 0) {
        html.appendFormat('<div id="dropdown_{0}" style="z-index:9999;">', obj.attr("id"));
    }

    var getMaxlengthAttr = function (o) {
        var s = o.attr('maxlength');
        if (TxJsCtl.isNumber(s)) {
            return "maxlength=\"" + s + "\"";
        }
        return "";
    }

    if (!set.ShowAbove) {
        if (!set.IsCombo) {
            if (!set.IsNewCtl) {
                html.append("<div class='dropdown_head dropdown_head_dropdown' noWrap ");
                html.append("\"></div>");
            }
        }
        else {
            if (!set.IsNewCtl) {
                html.append("<div class='dropdown_head dropdown_head_combo' noWrap style='box-sizing:border-box; width:100%; padding:0 21px 0 0; height:26px;'>");
                html.append("<input type='text' class='dropdown_searchinput' " + getMaxlengthAttr(obj) + " style=\"width:100%;border:0px;height:22px;padding:1px 3px;\"></input>");
				html.append("<img src='/DevSuiteWebControl/style/img/page_down2.gif' style='position:absolute;right:0;top:0;' /><input type='text' class='dropdown_hide' style='width:0px;position:absolute; left:-9000px;'></input></div>");
            }
        }
    }
    if (!set.IsCombo && needshowsearch)
        html.appendFormat('<div class="dropdown_search" ><input type="text" class="dropdown_searchinput dropdown_searchinput_dropdown" ' + getMaxlengthAttr(obj) + ' style="{1}" value="{0}"></input><input type="text" class="dropdown_hide" style="width:0px;position:absolute; left:-9000px;"></input><div class="calclesearchicon"><img src="/DevSuiteWebControl/style/img/search_cancel.gif" style="cursor:pointer;" border="0" /></div></div>', keyword != "" ? keyword : TxJsCtl.QuickSearchString, keyword != "" ? "color:#000000;" : "color:#999999;");

    html.appendFormat('<div class="dropdown_content" {2} style="{0}{1}overflow-x:hidden;">', (set.IsCombo || !needshowsearch) ? "border-top:#B0AFAF 1px solid;" : "", needshowbottom ? "" : "border-bottom:#B0AFAF 1px solid;", TxJsCtl.isIE() ? '' : 'tabindex="0"');
    html.append(getpagehtml(0));
    html.append('</div>');
    html.appendFormat('<div class="dropdown_bottom" style="{0}">', needshowbottom ? "" : "display:none;");

    if (!set.MultiSelect) {
        html.append(getpaginghtml(0));
    }
    else {
        html.append('<table border="0" cellspacing="0" cellpadding="0" style="width:100%;"><tr><td style="width:50%;padding:0px 0px 0px 5px;" class="dropdown_count"></td><td style="text-align:right; width:48%;padding-right:2px"><button class="dropdown_ok" style="border:#B0AFAF 1px solid;height:20px;width:35px;">OK</button>&nbsp;<button class="dropdown_cancel" style="border:#B0AFAF 1px solid;height:20px;width:55px;">Cancel</button></td></tr></table>');
    }
    html.append('</div>');
    if (set.ShowAbove) {
        if (!set.IsCombo) {
            if (!set.IsNewCtl) {
                html.append("<div class='dropdown_head dropdown_head_dropdown' noWrap ");
                html.append("\"></div>");
            }
        }
        else {
            if (!set.IsNewCtl) {
                html.append("<div class='dropdown_head dropdown_head_combo' noWrap style='box-sizing:border-box; width:100%; padding:0 21px 0 0; height:26px;'>");
                html.append("<input type='text' class='dropdown_searchinput dropdown_searchinput_combo' " + getMaxlengthAttr(obj) + " style=\"width:100%;border:0px;height:22px;padding:1px 3px;\"></input>");
				html.append("<img src='/DevSuiteWebControl/style/img/page_down2.gif' style='position:absolute;right:0;top:0;' /></div>");
            }
        }
    }
    if (dropdown.length == 0) {
        html.append('</div>');
    }
    if (dropdown.length == 0) {
        dropdown = $(html.toString(), top.document.body).appendTo(top.document.body);
    }
    else {
        dropdown[0].innerHTML = html.toString();
    }
	
    html = null;
	
	var clearAll = function(){
		set._SelectValue.splice(0, set._SelectValue.length);
		set._SelectText.splice(0, set._SelectText.length);
		for (var i = 0, j = obj[0].options.length; i < j; i++) {
			obj[0].options[i].selected = false;
		}
		$("input:checkbox", this).each(function(){this.checked=false;});
	}
	dropdown.unbind("clearAll", clearAll).bind("clearAll", clearAll);
    $("td.dropdown_pre", dropdown).bind("click", nextpage);
    $("td.dropdown_next,img.dropdown_page", dropdown).bind("click", nextpage);
    $("td.dropdown_item", dropdown).bind("click", select);
    //$("input.dropdown_ckb,label.dropdown_ckb", dropdown).unbind("click", oncheck).bind("click", oncheck);
    $("input.dropdown_ckb", dropdown).unbind("click", oncheck).bind("click", oncheck);
    $("#dropdown_checkbox_selectall", dropdown).unbind("click", selectall).bind("click", selectall);
    //$("label.dropdown_ckb", dropdown).bind("click", onchecklabel);
    $("td.dropdown_item,td.dropdown_pre,td.dropdown_next", dropdown).bind("mouseout", function () {
        //$(this).css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
        $(this).removeClass("dropdown_item_select");
        if (selectitem != null) {
            //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
            selectitem.find("td").removeClass("dropdown_item_select");
            selectitem = null;
        }
    })
    .bind("mouseover", function () {
        if (selectitem != null) {
            //selectitem.find("td").css({ "background-color": "", "border": "", "padding": "1px 0px 1px 8px" });
            selectitem.find("td").removeClass("dropdown_item_select");
        }
        //$(this).css({ "background-color": "#dfe8f6", "border-top": "#8eabe4 dotted 1px", "border-bottom": "#8eabe4 dotted 1px", "padding": "0px 0px 0px 8px" });
        $(this).addClass("dropdown_item_select");
        if ($(this).attr("value") == "undefined" || $(this).attr("value") == "") {
            selectitem = null;
        }
        else {
            selectitem = $(this).parent();
        }
    });
	
    $("button.dropdown_ok", dropdown).bind("click", ok);
    $("button.dropdown_cancel", dropdown).bind("click", cancel);
    $("input.dropdown_searchinput", dropdown).bind("keyup", search);
    $("div.calclesearchicon", dropdown).bind("click", clearsearch);
    $("input.dropdown_searchinput", dropdown).bind("focus", searchclick);
    if (!set.IsCombo)
        $("div.dropdown_head", dropdown).bind("click", function () { hide() });
    dropdown.css({ position: 'absolute', 'z-index': '9400' }).hide();
    var selText = set.IsCombo ? obj.val() : (obj[0].selectedIndex == -1 ? "" : (obj[0].options[obj[0].selectedIndex].text + ""));
    if (selText == null || !selText) selText = "";
    if (!set.IsCombo)
        $("div.dropdown_head", dropdown).html(selText);
	
    dropdown.height("auto");
    if (!set.ShowAbove) {
        var MAXH = 371;
        var MINH = 70;
        if (set.IsCombo) {
            if (TxJsCtl.isIE())
                set.y -= 0;
            else
                set.y -= 6;
        }
        else if (set.IsNewCtl) {
            if (TxJsCtl.isIE())
                set.y = set.y + 25;
            else
                set.y = set.y + 20;
            set.Height = set.Height - 20;
            MINH = 49;
        }
        dropdown.css({ 'left': set.x, 'top': set.y });
        dropdown.show();
        var h = set.Height;

        if (h >= MAXH) h = MAXH;
        var dh = dropdown.height();
        if (dh <= MAXH && ids.length > 20) dh = MAXH;
        if (!set.IsCombo && dh <= h) h = dh;
        dropdown.height(h);
        if (!needshowbottom) h += 25;
        if (!needshowsearch || set.IsCombo) h += 22;
        if ($("table.dropdown_contenttable", dropdown).height() < (h - MINH)) {
            h = $("table.dropdown_contenttable", dropdown).height() + MINH;
            if ($("table.dropdown_contenttable", dropdown).width() - $("div.dropdown_content", dropdown).width() > 2) {
                h += 22;
            }
            dropdown.height(h - 21);
        }
        $("div.dropdown_content", dropdown).height(h - MINH);
    }
    else {
        var MAXH = 371;
        if (set.IsNewCtl) {
            set.Height = set.Height - 20;
        }
        var h = set.Height;
        if (h >= MAXH) h = MAXH;
        if (set.IsCombo) h -= 2;
        var dh = dropdown.height();
        if (dh <= MAXH && ids.length > 20) dh = MAXH;
        if (!set.IsCombo && dh <= h) h = dh; 
        if (set.IsNewCtl) {
			var IsEdge = navigator.userAgent.toLowerCase().indexOf('edge') != -1;
			if (TxJsCtl.isIE() || $.browser.opera || IsEdge)
				dropdown.css({ 'left': set.x, 'top': set.y - h - 1 });
			else
				dropdown.css({ 'left': set.x, 'top': set.y - h - 5 });
        }
        else {
            dropdown.css({ 'left': set.x, 'top': set.y - h + $(obj).height() });
        }

        dropdown.show();
        dropdown.height(h);
        if (!needshowbottom) h += 29;
        if (!needshowsearch && !set.IsCombo) h += 26;
        if ($("table.dropdown_contenttable", dropdown).height() < (set.IsCombo ? (h - 49) : (h - 75))) {
            if ($("table.dropdown_contenttable", dropdown).width() - $("div.dropdown_content", dropdown).width() > 2) {
                h += 22;
            }
            var diff = h - $("table.dropdown_contenttable", dropdown).height() - (set.IsCombo ? 49 : 75)
            h = $("table.dropdown_contenttable", dropdown).height() + (set.IsCombo ? 49 : 75);
            var t = dropdown.position().top;
            dropdown.css({ 'left': set.x, 'top': t + diff });
            dropdown.height(dropdown.height() - diff);
        }
        if (set.IsNewCtl)
            $("div.dropdown_content", dropdown).height(set.IsCombo ? (h-29-1) : (h-55));
        else
            $("div.dropdown_content", dropdown).height(set.IsCombo ? (h-49-1) : (h-75-1));
    }

	if (typeof(set.onExpandHandle) == 'function'){
		set.onExpandHandle.call();
	}
	
    if (set.IsCombo) {
        if (set.IsNewCtl) {
            obj.focus();
        }
        else {
            $("input.dropdown_searchinput", dropdown).val(selText).focus().select();
            if ($("input.dropdown_searchinput", dropdown)[0].setSelectionRange)
                $("input.dropdown_searchinput", dropdown)[0].setSelectionRange(selText.length, selText.length);
            else {
                var rng = document.selection.createRange();
                rng.moveStart("character", selText.length);
                rng.moveEnd("character", 0);
                rng.select();
            }
        }
    }
    else {
        if (set.IsNewCtl) {
            $("div.dropdown_content", dropdown).focus();
        }
        else {
            $("div.dropdown_content", dropdown).focus();
        }
    }

    var ddw = $("table.dropdown_contenttable", dropdown).width() + 2;
    var havevs = $("table.dropdown_contenttable", dropdown).height() - $("div.dropdown_content", dropdown).height() > 0;
    if (havevs) ddw += 18;
    if (set.ClientWidth > ddw) {
        ddw = set.ClientWidth;
    }
    //if (ddw > 800) ddw = 800;
    dropdown.width(ddw);
    $("table.dropdown_contenttable", dropdown).css('width', '100%');
	/*
    if (havevs)
        $("table.dropdown_contenttable", dropdown).width(ddw - 18-2);
    else
        $("table.dropdown_contenttable", dropdown).width(ddw-2);
	*/
    $("div.dropdown_content", dropdown).width(ddw-2);
    //$("div.dropdown_head", dropdown).width(set.ClientWidth - 3);
    //$("input.dropdown_searchinput", dropdown).width(set.ClientWidth - 20);
    $("div.dropdown_bottom", dropdown).width(ddw-2);
    $("div.dropdown_search", dropdown).width(ddw-2);
    dropdown.bind("click", function (e) { TxJsCtl._cancelBubble(e);});
    $("div.dropdown_content,input.dropdown_searchinput,div.dropdown_head,input.dropdown_hide", dropdown).bind('keydown', keydown).bind('keyup', keyup);
    if (set.IsCombo) {
        $("input.dropdown_searchinput", dropdown).bind('keyup', combokeyup);
        $("div.dropdown_head", dropdown).find("IMG").bind("click", hide);
    }
	
	if (window!=top) {		
		var sitem = getselectitem();
		if (sitem == null || sitem.length == 0) {
			$("div.dropdown_content", dropdown).scrollTop(0);
		}
		else {
			sitem[0].scrollIntoView(false);
		}
	}
	
    if (TxJsCtl.isIE()) { $("object").css("visibility", "hidden"); }
    $(document).one('click', hide);
    $(window).bind("unload", hide);
    if (!TxJsCtl.isIpadIpohne()) { document.body.onscroll = function (e) { hide(e); }; }
    TxJsCtl.CheckFrameClick(top, 0, this.HideDropDown);

    if (scrollObj && scrollObj.length > 0 && !TxJsCtl.isIpadIpohne()) scrollObj.bind("scroll", hide);
    TxJsCtl.PreDropdownHideFun = hide;
    TxJsCtl._cancelBubble(e);
    return false;
}
TxJsCtl.CheckFrameClick = function (w, depth, hander) {
    TxJsCtl.AddEventToFrame(w, hander);
    for (var i = 0, j = w.frames.length; i < j; i++) {
        if (depth < 15) {
            TxJsCtl.CheckFrameClick(w.frames[i], ++depth, hander);
        }
    }
}
TxJsCtl.AddEventToFrame = function (w, hander) {
    try {
        if (typeof (w) == "undefined" || typeof (w.document) == "undefined" || typeof (w.document.body) == "undefined" || !w.document.body) {
            return;
        }
        $(w.document.body).unbind("click", hander).bind("click", hander).bind("contextmenu", hander);
    }
    catch (ex) { }
}


TxJsCtl.defaults = {
    multiple: false
};
TxJsCtl.Dropdown = function (obj, options) {
    if (obj.length <= 0) return;
    var settings = $.extend({}, TxJsCtl.defaults, options);
    obj.each(function (index) {
        var dd = this;
        var setting = TxJsCtl.GetControlSettingInfo(dd, null);
        var scrollObj = TxJsCtl.GetScroolObj(dd);
        setting.MultiSelect = settings.multiple;
        setting.IsEnable    = settings.IsEnable;
		if (typeof(settings.ClearAll)!='undefined') setting.ClearAll = settings.ClearAll;
		if (typeof(settings.onExpandHandle)=='function') setting.onExpandHandle = settings.onExpandHandle;
		if (typeof(settings.onCollapseHandle)=='function') setting.onCollapseHandle = settings.onCollapseHandle;
        if (setting.MultiSelect) {
			if (typeof(options.SelectAll) == 'undefined')
				setting.SelectAll = (dd.options.length > 0);
			else
				setting.SelectAll = options.SelectAll;
            if (typeof ($(dd).attr("name")) == "undefined") {
                $(dd).attr('name', $(dd).attr('id'));
            }
        }
        setting.fromcache = true;
        if (typeof ($(dd).attr("ids")) == "undefined") {
            var ids = new Array();
            var names = new Array();
            for (var m = 0, n = dd.options.length; m < n; m++) {
                ids.push(dd.options[m].value);
                names.push(dd.options[m].text);
            }
            setting.Ids = ids;
            setting.Names = names;
            setting.fromcache = false;
        }
        TxJsCtl.InitDropdown($(dd), setting, scrollObj, null);
    });
}
