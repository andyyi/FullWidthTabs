
//图片滚动列表 16css.com
var Speed = 10; //速度(毫秒)
var MovePace = 5; //每次移动(px)
var PageWidth = 132; //翻页宽度
var fill = 0; //整体移位
var MoveLock = false;
var MoveTimeObj;
var Comp = 0;
var OriginalImageList, BackupImageList, ImageList;

function GetElement(element) {
    if (document.getElementById) {
        return eval('document.getElementById("' + element + '")')
    }
    else {
        return eval('document.all.' + element)
    }
}

function GoPrevious() { //上翻开始
    if (MoveLock) return;

    MoveLock = true;
    MoveTimeObj = setInterval('ScrollPrevious()', Speed);
}

function StopGoPrvious() { //上翻停止
    clearInterval(MoveTimeObj);
    if (OriginalImageList.scrollLeft % PageWidth - fill != 0) {
        Comp = fill - (OriginalImageList.scrollLeft % PageWidth);
        CompScr();
    } else {
        MoveLock = false;
    }
}

function ScrollPrevious() { //上翻动作
    if (OriginalImageList.scrollLeft <= 0) {
        OriginalImageList.scrollLeft = OriginalImageList.scrollLeft + GetElement('ImageList').offsetWidth;
    }

    OriginalImageList.scrollLeft -= MovePace;
}

function GoNext() { //下翻
    clearInterval(MoveTimeObj);
    if (MoveLock) return;

    MoveLock = true;
    ScrollNext();
    MoveTimeObj = setInterval('ScrollNext()', Speed);
}
function StopGoNext() {
    clearInterval(MoveTimeObj);
    if (OriginalImageList.scrollLeft % PageWidth - fill != 0) {
        Comp = PageWidth - OriginalImageList.scrollLeft % PageWidth + fill;
        CompScr();
    } else {
        MoveLock = false;
    }
}

function ScrollNext() {
    if (OriginalImageList.scrollLeft >= GetElement('ImageList').scrollWidth) { OriginalImageList.scrollLeft = OriginalImageList.scrollLeft - GetElement('ImageList').scrollWidth; }
    OriginalImageList.scrollLeft += MovePace;
}

function CompScr() {
    var num;
    if (Comp == 0) { MoveLock = false; return; }
    if (Comp < 0) { //上翻
        if (Comp < -MovePace) {
            Comp += MovePace;
            num = MovePace;
        } else {
            num = -Comp;
            Comp = 0;
        }
        OriginalImageList.scrollLeft -= num;
        setTimeout('CompScr()', Speed);
    } else { //下翻
        if (Comp > MovePace) {
            Comp -= MovePace;
            num = MovePace;
        } else {
            num = Comp;
            Comp = 0;
        }
        OriginalImageList.scrollLeft += num;
        setTimeout('CompScr()', Speed);
    }
}

$(function () {

    new CBPFWTabs(document.getElementById('tabs'));

    OriginalImageList = GetElement("ImageListContainer");
    BackupImageList = GetElement("ImageListBackup");
    ImageList = GetElement("ImageList");

    BackupImageList.innerHTML = ImageList.innerHTML;
    OriginalImageList.scrollLeft = fill;
});