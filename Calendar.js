/*
* classs Calendar
* @param   beginYear 1990
* @param   endYear   2010
* @param   lang      0(chinese)|1(englisth) 
* @param   dateFormatStyle  "yyyy-MM-dd";
*/
function Calendar(beginYear, endYear, lang, dateFormatStyle) {
    this.beginYear = 1990;
    this.endYear = 2020;
    this.lang = 0;
    this.dateFormatStyle = "yyyy-MM-dd";

    if (beginYear != null && endYear != null) {
        this.beginYear = beginYear;
        this.endYear = endYear;
    }
    if (lang != null) {
        this.lang = lang
    }

    if (dateFormatStyle != null) {
        this.dateFormatStyle = dateFormatStyle
    }

    this.dateControl = null;
    this.panel = this.getElementById("calendarPanel");
    this.container = this.getElementById("ContainerPanel");
    if (document.all) {
        this.shimmer = document.getElementById("shimmerForCalendar");
    }
    this.form = null;

    this.date = new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();

    this.colors = {
        "cur_word": "#FFF",
        "cur_bg": "#0F0",
        "sel_bg": "#FCC",
        "sun_word": "#F00",
        "sat_word": "#00F",
        "td_word_light": "#333",
        "td_word_dark": "#CCC",
        "td_bg_out": "#FFF",
        "td_bg_over": "#FFCC00",
        "tr_word": "#FFF",
        "tr_bg": "#666",
        "input_border": "#CCC",
        "input_bg": "#FAFAFA"
    }

    this.draw();
    this.bindYear();
    this.bindMonth();
    this.changeSelect();
    this.bindData();

}
Calendar.language = {
    "year": [[""], [""], [""]],
    "months": [["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
        ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"]],
    "weeks": [["日", "一", "二", "三", "四", "五", "六"],
        ["S", "M", "T", "W", "T", "F", "S"],
        ["日", "月", "火", "水", "木", "金", "土"]],
    "clear": [["清空"], ["Clear"], ["クリア"]],
    "today": [["今天"], ["Today"], ["今日"]],
    "close": [["关闭"], ["Close"], ["閉じる"]]
}

Calendar.prototype.draw = function () {
    calendar = this;

    var mvAry = [];
    mvAry[mvAry.length] = '  <div name="calendarForm" style="font-size:11px;">';
    mvAry[mvAry.length] = '    <table width="100%" border="0" cellpadding="0" cellspacing="1">';
    mvAry[mvAry.length] = '      <tr>';
    mvAry[mvAry.length] = '        <th style="width:20px;text-align:left;"><input class="calendar_input"  name="prevMonth" type="button" id="prevMonth" value="&lt;" /></th>';
    mvAry[mvAry.length] = '        <th style="width:98%;text-align:center;" nowrap="nowrap"><select tabindex="1001" name="calendarYear" id="calendarYear" style="font-size:12px;"></select><select tabindex="1002" name="calendarMonth" id="calendarMonth" style="font-size:12px;width:50px;"></select></th>';
    mvAry[mvAry.length] = '        <th style="width:20px;text-align:right;"><input class="calendar_input" name="nextMonth" type="button" id="nextMonth" value="&gt;" /></th>';
    mvAry[mvAry.length] = '      </tr>';
    mvAry[mvAry.length] = '    </table>';
    mvAry[mvAry.length] = '    <table id="calendarTable" class="calendar_table" width="100%" border="0" cellpadding="2" cellspacing="1">';
    mvAry[mvAry.length] = '      <tr>';
    for (var i = 0; i < 7; i++) {
        mvAry[mvAry.length] = '      <th class="calendar_tr">' + Calendar.language["weeks"][this.lang][i] + '</th>';
    }
    mvAry[mvAry.length] = '      </tr>';
    for (var i = 0; i < 6; i++) {
        mvAry[mvAry.length] = '    <tr style="text-align: center;">';
        for (var j = 0; j < 7; j++) {
            if (j == 0) {
                mvAry[mvAry.length] = '  <td class="calendar_sun_word"></td>';
            } else if (j == 6) {
                mvAry[mvAry.length] = '  <td class="calendar_sat_word"></td>';
            } else {
                mvAry[mvAry.length] = '  <td></td>';
            }
        }
        mvAry[mvAry.length] = '    </tr>';
    }
    mvAry[mvAry.length] = '      <tr class="calendar_input_bg">';
    mvAry[mvAry.length] = '        <th colspan="2"><input name="calendarClear" type="button" id="calendarClear" value="' + Calendar.language["clear"][this.lang] + '" class="calendar_input_btn"/></th>';
    mvAry[mvAry.length] = '        <th colspan="3"><input name="calendarToday" type="button" id="calendarToday" value="' + Calendar.language["today"][this.lang] + '" class="calendar_input_btn"/></th>';
    mvAry[mvAry.length] = '        <th colspan="2"><input name="calendarClose" tabindex="1003" type="button" id="calendarClose" value="' + Calendar.language["close"][this.lang] + '" class="calendar_input_btn" /></th>';
    mvAry[mvAry.length] = '      </tr>';
    mvAry[mvAry.length] = '    </table>';
    mvAry[mvAry.length] = '  </div>';
    this.panel.innerHTML = mvAry.join("");

    var obj = this.getElementById("prevMonth");
    obj.onclick = function () { isFocus = true; calendar.goPrevMonth(calendar); }
    obj.onblur = function () { calendar.onblur(); }
    this.prevMonth = obj;

    obj = this.getElementById("nextMonth");
    obj.onclick = function () { isFocus = true; calendar.goNextMonth(calendar); }
    obj.onblur = function () { calendar.onblur(); }
    this.nextMonth = obj;

    obj = this.getElementById("calendarClear");
    obj.onclick = function () { calendar.dateControl.value = ""; calendar.hide(); calendar.ondatechange(); }
    this.calendarClear = obj;

    obj = this.getElementById("calendarClose");
    obj.onclick = function () { calendar.hide(); };
    obj.onblur = function () { calendar.onblur(); };
    obj.onfocus = function () { isFocus = true; };
    this.calendarClose = obj;

    obj = this.getElementById("calendarYear");
    obj.onclick = function () { isFocus = true; };
    obj.onchange = function () { isFocus = true; calendar.update(calendar); }
    obj.onblur = function () { calendar.onblur(); }
    this.calendarYear = obj;

    obj = this.getElementById("calendarMonth");
    obj.onclick = function () { isFocus = true; };
    obj.onfocus = function () { isFocus = true; };
    with (obj) {

        onchange = function () { calendar.update(calendar); }
        onblur = function () { calendar.onblur(); }
    } this.calendarMonth = obj;

    obj = this.getElementById("calendarToday");
    obj.onclick = function () {
        var today = new Date();
        calendar.date = today;
        calendar.year = today.getFullYear();
        calendar.month = today.getMonth();
        calendar.changeSelect();
        calendar.bindData();
        calendar.dateControl.value = today.formatEx(calendar.dateFormatStyle, false, calendar.lang);
        calendar.hide();
        calendar.ondatechange();
    }
    this.calendarToday = obj;
}

Calendar.prototype.bindYear = function () {
    var cy = this.calendarYear;
    cy.length = 0;
    for (var i = this.beginYear; i <= this.endYear; i++) {
        cy.options[cy.length] = new Option(i + Calendar.language["year"][this.lang], i);
    }
}

Calendar.prototype.bindMonth = function () {
    var cm = this.calendarMonth;
    cm.length = 0;
    for (var i = 0; i < 12; i++) {
        cm.options[cm.length] = new Option(Calendar.language["months"][this.lang][i], i);
    }
}

Calendar.prototype.goPrevMonth = function (e) {
    if (this.year == this.beginYear && this.month == 0) { return; }
    this.month--;
    if (this.month == -1) {
        this.year--;
        this.month = 11;
    }
    this.date = new Date(this.year, this.month, 1);
    this.changeSelect();
    this.bindData();
}

Calendar.prototype.goNextMonth = function (e) {
    if (this.year == this.endYear && this.month == 11) { return; }
    this.month++;
    if (this.month == 12) {
        this.year++;
        this.month = 0;
    }
    this.date = new Date(this.year, this.month, 1);
    this.changeSelect();
    this.bindData();
}

Calendar.prototype.changeSelect = function () {
    var cy = this.calendarYear;
    var cm = this.calendarMonth;
    for (var i = 0; i < cy.length; i++) {
        if (cy.options[i].value == this.date.getFullYear()) {
            cy[i].selected = true;
            break;
        }
    }
    for (var i = 0; i < cm.length; i++) {
        if (cm.options[i].value == this.date.getMonth()) {
            cm[i].selected = true;
            break;
        }
    }
}

Calendar.prototype.update = function (e) {
    this.year = e.calendarYear.options[e.calendarYear.selectedIndex].value;
    this.month = e.calendarMonth.options[e.calendarMonth.selectedIndex].value;
    this.date = new Date(this.year, this.month, 1);
    this.changeSelect();
    this.bindData();
}

Calendar.prototype.bindData = function () {
    var calendar = this;
    var lastData = null;
    var nowData = new Date();
    if (calendar.dateControl != null)
        lastData = calendar.dateControl.value.toDate(calendar.dateFormatStyle);
    else
        lastData = new Date();
    var dateArray = this.getMonthViewArray(this.date.getFullYear(), this.date.getMonth());
    var tds = this.getElementById("calendarTable").getElementsByTagName("td");
    for (var i = 0; i < tds.length; i++) {
        //tds[i].style.backgroundColor = calendar.colors["td_bg_out"];
        tds[i].setAttribute("class", "calendar_td_bg_out");
        tds[i].onclick = function () { return; }
        tds[i].onmouseover = function () { return; }
        tds[i].onmouseout = function () { return; }
        if (i > dateArray.length - 1) break;
        tds[i].innerHTML = dateArray[i];
        if (dateArray[i] != "&nbsp;") {
            tds[i].onclick = function () {
                if (calendar.dateControl != null) {
                    var nowtime = new Date();
                    calendar.dateControl.value =
                        new Date(calendar.date.getFullYear(),
                            calendar.date.getMonth(),
                            this.innerHTML,
                            nowtime.getHours(),
                            nowtime.getMinutes(),
                            nowtime.getSeconds()).formatEx(calendar.dateFormatStyle, false, calendar.lang);
                }
                calendar.hide();
                calendar.ondatechange();
            }
            tds[i].onmouseover = function () {
                //this.style.backgroundColor = calendar.colors["td_bg_over"];
                this.setAttribute("class", "calendar_td_bg_over");
            }
            tds[i].onmouseout = function () {
                //this.style.backgroundColor = calendar.colors["td_bg_out"];
                this.setAttribute("class", "calendar_td_bg_out");
            }
            //            if (new Date().formatEx(calendar.dateFormatStyle) ==
            //          new Date(calendar.date.getFullYear(),
            //                   calendar.date.getMonth(),
            //                   dateArray[i]).formatEx(calendar.dateFormatStyle))
            if (nowData.getFullYear() == calendar.date.getFullYear()
            && nowData.getMonth() == calendar.date.getMonth()
            && nowData.getDate() == dateArray[i]) {
                //tds[i].style.backgroundColor = calendar.colors["cur_bg"];
                tds[i].setAttribute("class", "calendar_cur_bg");
                tds[i].onmouseover = function () {
                    //this.style.backgroundColor = calendar.colors["td_bg_over"];
                    this.setAttribute("class", "calendar_td_bg_over");
                }
                tds[i].onmouseout = function () {
                    //this.style.backgroundColor = calendar.colors["cur_bg"];
                    this.setAttribute("class", "calendar_cur_bg");
                }
            }
            //            if (calendar.dateControl != null && calendar.dateControl.value == new Date(calendar.date.getFullYear(),
            //                   calendar.date.getMonth(),dateArray[i]).formatEx(calendar.dateFormatStyle))
            if (lastData.getFullYear() == calendar.date.getFullYear()
            && lastData.getMonth() == calendar.date.getMonth()
            && lastData.getDate() == dateArray[i]) {
                //tds[i].style.backgroundColor = calendar.colors["sel_bg"];
                tds[i].setAttribute("class", "calendar_sel_bg");
                tds[i].onmouseover = function () {
                    //this.style.backgroundColor = calendar.colors["td_bg_over"];
                    this.setAttribute("class", "calendar_td_bg_over");
                }
                tds[i].onmouseout = function () {
                    //this.style.backgroundColor = calendar.colors["sel_bg"];
                    this.setAttribute("class", "calendar_sel_bg");
                }
            }
        }
    }
}
Calendar.prototype.getMonthViewArray = function (y, m) {
    var mvArray = [];
    var dayOfFirstDay = new Date(y, m, 1).getDay();
    var daysOfMonth = new Date(y, m + 1, 0).getDate();
    for (var i = 0; i < 42; i++) {
        mvArray[i] = "&nbsp;";
    }
    for (var i = 0; i < daysOfMonth; i++) {
        mvArray[i + dayOfFirstDay] = i + 1;
    }
    return mvArray;
}
Calendar.prototype.getElementById = function (id) {
    if (typeof (id) != "string" || id == "") return null;
    if (document.getElementById) return document.getElementById(id);
    if (document.all) return document.all(id);
    try { return eval(id); } catch (e) { return null; }
}

Calendar.prototype.getElementsByTagName = function (object, tagName) {
    if (document.getElementsByTagName) return document.getElementsByTagName(tagName);
    if (document.all) return document.all.tags(tagName);
}
Calendar.prototype.getAbsPoint = function (e) {
    var x = e.offsetLeft;
    var y = e.offsetTop;
    while (e = e.offsetParent) {
        x += e.offsetLeft;
        y += e.offsetTop;
    }
    return { "x": x, "y": y };
}

Calendar.prototype.show = function (dateObj, popControl, leftposition, scrollObj) {
    if (dateObj == null) {
        throw new Error("arguments[0] is necessary")
    }
    this.dateControl = dateObj;
    this.date = (dateObj.value.length > 0) ? new Date(dateObj.value.toDate(this.dateFormatStyle).toString()) : new Date();
    this.year = this.date.getFullYear();
    this.month = this.date.getMonth();
    this.changeSelect();
    this.bindData();
    if (popControl == null) {
        popControl = dateObj;
    }


    var xy = this.getAbsPoint(popControl),
        _panelWidth = parseInt(this.panel.style.width.replace('px', '')),
        _scrollX = scrollX(),
        _viewportWidth = getViewportWidth(),
        _left = 0;

    if (leftposition == "right") {
        _left = xy.x + popControl.offsetWidth - _panelWidth + 2;
    } else {
        _left = xy.x;
    }
    if (_left + _panelWidth + 2 > _viewportWidth + _scrollX) {
        _left = _viewportWidth + _scrollX - _panelWidth - 2;
    }
    this.panel.style.left = _left + 'px';


    var modifiedHeight = xy.y + dateObj.offsetHeight;
    if (scrollObj != null && typeof (scrollObj) != "undefined") {
        var height = scrollObj.clientHeight; // height of the whole div
        var scrolltop = scrollObj.scrollTop; // current sroll bar top position
        if (modifiedHeight - scrollObj.scrollTop > 0) {
            if (modifiedHeight + 120 > height + scrolltop && modifiedHeight - 185 - scrollObj.scrollTop > 0) {// cannot show the full panel correctly
                modifiedHeight = modifiedHeight - 185 - scrollObj.scrollTop; // move the panel higher
            } else {
                modifiedHeight = modifiedHeight - scrollObj.scrollTop;
            }
        }
    }

    this.panel.style.top = modifiedHeight + "px";
    this.container.style.display = "";
    if (document.all && this.shimmer != null) {
        this.shimmer.style.left = this.panel.style.left;
        this.shimmer.style.top = this.panel.style.top;
        this.shimmer.style.height = this.panel.offsetHeight + 2;
    }

    if (scrollObj != null && typeof (scrollObj) != "undefined") {
        scrollObj.onscroll = function () {
            var newscrolltop = scrollObj.scrollTop; // current scroll bar position
            document.getElementById("calendarPanel").style.top = parseInt(document.getElementById("calendarPanel").style.top.replace("px", "")) - parseInt(newscrolltop) + parseInt(scrolltop);
            scrolltop = scrollObj.scrollTop;
        }
    }

    dateObj.onblur = function () { calendar.onblur(); }
    this.container.onmouseover = function () { isFocus = true; }
    //this.container.onmouseout = function () { isFocus = false; }
    this.getElementById("calendarClose").focus();
}

Calendar.prototype.hide = function () {
    this.container.style.display = "none";
    isFocus = false;
}

Calendar.prototype.onblur = function () {
    isFocus = false;
    setTimeout(function () {
        if (!isFocus) { this.hide(); }
    } .bind(this), 500);

}
Calendar.prototype.setDisplayStyle = function (tagName, style) {
    var tags = this.getElementsByTagName(null, tagName)
    for (var i = 0; i < tags.length; i++) {
        if (tagName.toLowerCase() == "select" &&
       (tags[i].name == "calendarYear" ||
      tags[i].name == "calendarMonth")) {
            continue;
        }
        tags[i].style.display = style;
    }
}
Calendar.prototype.ondatechange = function () {
    var change = this.dateControl.getAttributeNode("onchange");
    if (this.dateControl.dispatchEvent) {
        var evt = document.createEvent('HTMLEvents');
        evt.initEvent("change", false, true);
        this.dateControl.dispatchEvent(evt);
    }
    else if (this.dateControl.fireEvent) {
        this.dateControl.fireEvent("onchange");
    }
    else if (change != null && change.nodeValue != null && change.nodeValue != "") {
        eval(change.nodeValue);
    }
    if (typeof (OnCustomCtlChange) == "function") {
        OnCustomCtlChange(this.dateControl);
    }
}
