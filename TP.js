(function () {
    var _TP = {};
    _TP.taskViewSortField = null;
    _TP.planViewSortField = null;
    _TP.tempViewSortField = null;

    _TP.taskViewShowArchived = null;
    _TP.planViewShowArchived = null;
    _TP.tempViewShowArchived = null;

    _TP.taskViewHideShortcut = null;
    _TP.planViewHideShortcut = null;
    _TP.tempViewHideShortcut = null;

    _TP.tempViewShowDescendents = null;
    _TP.planViewShowDescendents = null;
    _TP.taskViewShowDescendents = null;
    _TP.KBViewShowDescendents = null;

    _TP.taskViewShowTemplateTree = null;
    _TP.planViewShowTemplateTree = null;

    _TP.tempFolderID4TempView = null;
    _TP.taskFolderID4TaskView = null;
    _TP.taskFolderID4PlanView = null;
    _TP.KBViewFolderID = null;
    _TP.tempFolderID4TaskView = null;
    _TP.tempFolderID4PlanView = null;
    _TP.TempFolderID4TempView = null;
    _TP.reportid4TaskReport = null;
    _TP.reportid4TempReport = null;

    _TP.taskViewDetailType = null;

    _TP.taskMemberID = null;
    _TP.taskStatusID = null;
    _TP.taskQueryID = null;
    _TP.taskCurPageID = null;
    _TP.taskCurItemID = null;

    _TP.planMemberID = null;
    _TP.planStatusID = null;
    _TP.planQueryID = null;
    _TP.planCurPageID = null;
    _TP.planCurItemID = null;

    _TP.tempMemberID = null;
    _TP.tempStatusID = null;
    _TP.tempQueryID = null;
    _TP.tempCurPageID = null;
    _TP.tempCurItemID = null;

    _TP.reportTaskMemberID = null;
    _TP.reportTaskStatusID = null;
    _TP.reportTaskQueryID = null;

    _TP.reportTempMemberID = null;
    _TP.reportTempStatusID = null;
    _TP.reportTempQueryID = null;

    _TP.curLoginid = null;
    _TP.isDTTPPM = null;
    _TP.isDTTPPMSimpleView = null;
    _TP.showSpace = null;
    _TP.bhasrequirementview = null;
    _TP.benableknowledge = null;

    _TP.curViewType = null;
    _TP.curProjectid = null;
    _TP.curSessionid = null;
    _TP.curPersonid = null;
    _TP.dtkProjectID = null;
    _TP.dtkUserID = null;
    _TP.specProjectID = null;
    _TP.foreignSessionID = null;
    _TP.kwProjectID = null;
    _TP.curSpecViewType = null;

    _TP.personid = null;
    _TP.mydashboardpg = null;
    _TP.bfromhomepage = null;

    _TP.hideDetailPage = null;
    _TP.bIsFromRefreshBtn = null;
    _TP.hideActionButtons = null;
    _TP.languageID = null;
    _TP.currentTheme = null;
    _TP.tempOwnerOptions = null;
    _TP.planOwnerOptions = null;
    _TP.tempExportCurPageID = null;
    _TP.planExportCurPageID = null;
    _TP.aryTreeSelectedNode = new Array();
    _TP.tempDetailPageID = null;
    _TP.planDetailPageID = null;
    _TP.bRightClickCancelEvent = null;

    _TP.curTempSecondaryTabID = null;
    _TP.curTaskSecondaryTabID = null;

    _TP.bIsDetailFrameAtBottom = null;
    _TP.showLinkReqSpaces = null;
    _TP.isTreePanelCollapsed = null;

    _TP.movingFolderID = null;
    _TP.bIsDraggingFolder = null;
    _TP.movingFolderReleaseID = null;

    var settingCache = {};
    this.getSetting = function (projid) {
        var keyname = 'p_' + projid;
        if (typeof settingCache[keyname] == "undefined") {
            var settingObject = {};
            var settingTP = {};
            $.extend(true, settingTP, _TP);
            settingObject.TP = settingTP;
            settingCache[keyname] = settingObject;
        }
        return settingCache[keyname];
    }
    this.switchProject = function (projid) {
        return;
    }
}).ns('DTT.Setting');

(function () {
    this.GetSetting = function (win) {
        var pid = 0;
        if (top.DST) {
            while (win && (typeof win.__DTT_projectid == "undefined")) {
                if (isInPopup(win)) {
                    win = top.getWindowOpener2(win);
                }
                else {
                    if (win == win.parent)
                        break;
                    else
                        win = win.parent;
                }
            }

            if (win && (typeof win.__DTT_projectid != "undefined"))
                pid = win.__DTT_projectid;
        }

        return top.DTT.Setting.getSetting(pid);
    }
}).ns('DTT');
