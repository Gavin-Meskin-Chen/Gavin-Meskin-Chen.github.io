// pjax适配
function whenDOMReady() {
    // pjax加载完成（切换页面）后需要执行的函数和代码
    console.log("pjax开启");
    musicState();
}

// 返回顶部 显示网页阅读进度
window.onscroll = percent; // 执行函数
// 页面百分比
function percent() {
    let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
        b =
            Math.max(
                document.body.scrollHeight,
                document.documentElement.scrollHeight,
                document.body.offsetHeight,
                document.documentElement.offsetHeight,
                document.body.clientHeight,
                document.documentElement.clientHeight
            ) - document.documentElement.clientHeight, // 整个网页高度 减去 可视高度
        result = Math.round((a / b) * 100), // 计算百分比
        btn = $("#percent"); // 获取图标
    result <= 99 || (result = 99), (btn.html(result));
}
document.getElementById("page-name").innerText = document.title.split(" | 参星阁")[0];

// 首页大logo
var logo = document.createElement("img");
var site = document.getElementById("site-info");
var title = document.getElementById("site-title");
logo.style = "position:relative;left:calc(50% - 75px);width:150px;height:150px";
logo.src = "https://blog-hexo-img.oss-cn-shanghai.aliyuncs.com/0Su3b.png";
site.insertBefore(logo, title);
site.style.top = "30%";
// var logo = $(document.createElement("img"));
// var site = $("site-info");
// var title = $("site-title");
// logo.css({"position":"relative","left":"calc(50% - 75px)","width":"150px","height":"150px"});
// logo.attr("src","https://blog-hexo-img.oss-cn-shanghai.aliyuncs.com/0Su3b.png");
// logo.insertBefore("site-title");
// site.css({"top":"30%"});

// 音乐状态检测（已添加事件监听器，修复点击aplayer后导航栏和控制中心不同步的问题）
function musicState() {
    const music_state = $("meting-js")[0].aplayer.audio.paused;
    if (music_state) {
        $("#music-Switch i").removeClass("fa-pause");
        $("#music-Switch i").addClass("fa-play");
        $("#console #music-ctrl-btn-center i").removeClass("fa-pause");
        $("#console #music-ctrl-btn-center i").addClass("fa-play");
    } else {
        $("#music-Switch i").removeClass("fa-play");
        $("#music-Switch i").addClass("fa-pause");
        $("#console #music-ctrl-btn-center i").removeClass("fa-play");
        $("#console #music-ctrl-btn-center i").addClass("fa-pause");
    }
}

function secToTime(s) {
    if (isNaN(s)) s = 0;
    var min = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    var t = min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');
    return t;
}

var ctrl = {

    // 深色模式开关
    switchDarkMode: function () {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        if (nowMode === 'light') {
            activateDarkMode();
            saveToLocal.set('theme', 'dark', 2);
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
            // document.querySelector("#iconDarkMode").classList.remove("fa-sun")
            // document.querySelector("#iconDarkMode").classList.add("fa-moon")
        } else {
            activateLightMode();
            saveToLocal.set('theme', 'light', 2);
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
            // document.querySelector("#iconDarkMode").classList.remove("fa-moon")
            // document.querySelector("#iconDarkMode").classList.add("fa-sun")
        }
        typeof utterancesTheme === 'function' && utterancesTheme();
        typeof changeGiscusTheme === 'function' && changeGiscusTheme();
        typeof FB === 'object' && window.loadFBComment();
        typeof runMermaid === 'function' && window.runMermaid();
    },

    //显示中控台
    showConsole: function () {
        $("#console").addClass("show");
        ctrl.initConsoleState();
    },

    //隐藏中控台
    hideConsole: function () {
        $("#console").removeClass("show");
    },

    consoleBackBtn: function () {
        var top_item = $(".item-show");
        switch (top_item[0].id) {
            case '#console-music-item-mini': break;
            case 'console-music-item-main':
                ctrl.hideConsole();
                break;
            case 'console-music-item-list':
                top_item.removeClass("item-show");
                $("#console-music-item-main").addClass("item-show");
                break;
            case 'console-music-item-lrc':
                top_item.removeClass("item-show");
                $("#console-music-item-main").addClass("item-show");
                break;
            default: console.log("异常情况");
        }
    },

    // 歌词显示开关
    ircShowHide: function () {
        const irc = $(".aplayer > .aplayer-lrc-hide"); //这里防止与音乐页面的控制冲突
        if (irc[0] === null) {
            $(".aplayer > .aplayer-lrc").addClass("aplayer-lrc-hide");
            $("#ircItem").removeClass("on");
        } else {
            $(".aplayer > .aplayer-lrc").removeClass("aplayer-lrc-hide");
            $("#ircItem").addClass("on");
        }
    },

    // 单栏显示开关
    hideAsideBtn: () => {
        const $htmlDom = document.documentElement.classList;
        if ($htmlDom.contains('hide-aside')) {
            saveToLocal.set('aside-status', 'show', 2);
            document.querySelector("#asideItem").classList.remove("on");
        } else {
            saveToLocal.set('aside-status', 'hide', 2);
            document.querySelector("#asideItem").classList.add("on");
        }
        $htmlDom.toggle('hide-aside');
    },

    settingsOpen: function () {
        alert("开发中...敬请期待！");
    },

    musicSwitch: function () {
        const music_state = $("meting-js")[0].aplayer.audio.paused;

        if (music_state) {
            $("#music-Switch i").removeClass("fa-play");
            $("#music-Switch i").addClass("fa-pause");
            $("#console #music-ctrl-btn-center i").removeClass("fa-play");
            $("#console #music-ctrl-btn-center i").addClass("fa-pause");
        } else {
            $("#music-Switch i").removeClass("fa-pause");
            $("#music-Switch i").addClass("fa-play");
            $("#console #music-ctrl-btn-center i").removeClass("fa-pause");
            $("#console #music-ctrl-btn-center i").addClass("fa-play");
        }
        $("meting-js")[0].aplayer.toggle();
    },
    musicForward: function () {
        $("meting-js")[0].aplayer.skipForward();
    },
    musicBackward: function () {
        $("meting-js")[0].aplayer.skipBack();
    },

    getMusicInfo: function () {
        var music_id = $("meting-js")[0].aplayer.list.index; //当前曲目的id
        var music_cover = $("meting-js")[0].aplayer.list.audios[music_id].cover;
        var music_author = $("meting-js")[0].aplayer.list.audios[music_id].author;
        var music_title = $("meting-js")[0].aplayer.list.audios[music_id].title;
        // 歌曲信息
        $("#console-music-cover").html("<img src='" + music_cover + "' style='width:100%;height:100%;border-radius:0.5rem;'>");
        $("#console-music-title").html(music_title);
        $("#console-music-author").html(music_author);
        // 当前时间
        var nowTime = $("meting-js")[0].aplayer.audio.currentTime;
        if (isNaN(nowTime)) nowTime = 0;
        var nowTimeString = secToTime(nowTime);
        // 总时间
        var allTime = $("meting-js")[0].aplayer.audio.duration;
        if (isNaN(allTime)) allTime = 0; //无歌曲时会返回NaN
        var allTimeString = secToTime(allTime);
        // 进度条时间
        $("#progress-low-btn").html(nowTimeString);
        $("#progress-high-btn").html(allTimeString);
        // 进度条进度
        $("#p_bar").css("width", $("#p_bar_bg")[0].offsetWidth * (nowTime / allTime) + "px");
    },

    //初始化console图标
    initConsoleState: function () {
        const irc = $(".aplayer > .aplayer-lrc-hide");
        // 防止aplayer崩了，加个判断。
        const aplayer = $(".aplayer > .aplayer-lrc");
        irc[0] === null && aplayer[0] != null
            ? $("#ircItem").addClass("on")
            : $("#ircItem").removeClass("on");
        saveToLocal.get('aside-status') === 'hide'
            ? $("#asideItem").addClass("on")
            : $("#asideItem").removeClass("on");
        var console_musicBody = $("#console .console-music-ctrl-item"); // 更新控制中心尺寸
        var console_musicCover = $("#console-music-cover");
        console_musicCover.css("height",console_musicCover[0].offsetWidth + "px");
        console_musicBody.css("height", (console_musicCover[0].offsetWidth + 240) + "px"); //(12rem + 1.5rem + 1.5rem) * 16 = 240px

        // 当前音量
        var nowVolume = $("meting-js")[0].aplayer.audio.volume;
        // 音量条进度
        $("#v_bar").css("width",$("#v_bar_bg")[0].offsetWidth * nowVolume + "px");
    }

}


// 主页/歌单页切换
var music_list_switch = $("#music-ctrl-btn-end");
music_list_switch.on("click", function(e) {
    $("#console-music-item-main").removeClass("item-show");
    $("#console-music-item-list").addClass("item-show");
});


// 歌单列表监听器
var console_music_list = $("#console-music-list");
var music_id = null;
console_music_list.on('click', function (e) {
    var ap = $("meting-js").aplayer;
    if ($(e.target).is("li")) {
        music_id = parseInt($(e.target).find(".list-music-id").text());
        ap.list.switch(music_id - 1);
        ap.play();
    } else if ($(e.target).is("div")) {
        music_id = parseInt($(e.target).parent().find(".list-music-id").text());
        ap.list.switch(music_id - 1);
        ap.play();
    } else if ($(e.target).is("a, i")) {
        music_id = parseInt($(e.target).parent().parent().find(".list-music-id").text());
        ap.list.switch(music_id - 1);
        ap.play();
    } else alert("ERROR!");
});

function importMusicList() {
    var audios = $("meting-js").aplayer.list.audios;
    var list_html;
    for (var i = 0; i < audios.length; i++) {
        list_html = $("#console-music-list").html();
        $("#console-music-list").html(list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='iconfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].title + "</a><a class='list-music-author' data-pjax-state=''> - " + audios[i].author + "</a></div></li>");
        console.log("第" + (i + 1) + "首导入成功！");
    }
}

// 音量条监听器
var music_volumebar = $("#music-volumebar");
var v_bar_bg = $("#v_bar_bg");
var v_bar = $("#v_bar");
var v_low = $("#volume-low-btn");
var v_high = $("#volume-high-btn");
var v_bar_bg_Len = v_bar_bg.width();

music_volumebar.on("mousedown", function(e) {
    v_bar_bg.css("height", "0.6rem");
    v_bar.css("background-color", "var(--anzhiyu-reverse)");
    v_low.css("color", "var(--anzhiyu-reverse)");
    v_high.css("color", "var(--anzhiyu-reverse)");
    let x = e.pageX;
    v_bar.width(0 + e.offsetX);
    let v_bar_Len = v_bar.width();
    v_bar_bg_Len = v_bar_bg.width();
    let newVolume = e.offsetX / v_bar_bg_Len;
    $("meting-js").aplayer.volume(newVolume, true);
    $(document).on("mousemove", function(e) {
        let diff = x - e.pageX;
        let v_bar_Len_New = v_bar_Len - diff;
        if (v_bar_Len_New < 0) {
            v_bar_Len_New = 0;
        } else if (v_bar_Len_New > v_bar_bg_Len) {
            v_bar_Len_New = v_bar_bg_Len;
        }
        v_bar.width(v_bar_Len_New);
        newVolume = v_bar_Len_New / v_bar_bg_Len;
        $("meting-js").aplayer.volume(newVolume, true);
    });
});

music_volumebar.on("touchstart", function(e) {
    v_bar_bg.css("height", "0.6rem");
    v_bar.css("background-color", "var(--anzhiyu-reverse)");
    v_low.css("color", "var(--anzhiyu-reverse)");
    v_high.css("color", "var(--anzhiyu-reverse)");
    let x = e.targetTouches[0].pageX;
    v_bar.width(0 + e.targetTouches[0].offsetX);
    let v_bar_Len = v_bar.width();
    v_bar_bg_Len = v_bar_bg.width();
    let newVolume = e.targetTouches[0].offsetX / v_bar_bg_Len;
    $("meting-js").aplayer.volume(newVolume, true);
    $(document).on("touchmove", function(e) {
        let diff = x - e.targetTouches[0].pageX;
        let v_bar_Len_New = v_bar_Len - diff;
        if (v_bar_Len_New < 0) {
            v_bar_Len_New = 0;
        } else if (v_bar_Len_New > v_bar_bg_Len) {
            v_bar_Len_New = v_bar_bg_Len;
        }
        v_bar.width(v_bar_Len_New);
        newVolume = v_bar_Len_New / v_bar_bg_Len;
        $("meting-js").aplayer.volume(newVolume, true);
    });
});


// 进度条监听器
var music_progressbar = document.getElementById("music-progressbar"); //扩大热区
var p_bar_bg = document.getElementById("p_bar_bg");
var p_bar = document.getElementById("p_bar");
var p_low = document.getElementById("progress-low-btn");
var p_high = document.getElementById("progress-high-btn");
var p_bar_Len_New = 0;
var p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width
var ctrl_flag = 1;
var mousemove_flag = 1;
music_progressbar.addEventListener("mousedown", function (e) { //添加监听事件
    p_bar_bg.style.height = "0.6rem";
    p_bar.style.backgroundColor = "var(--anzhiyu-reverse)";
    p_low.style.color = "var(--anzhiyu-reverse)";
    p_high.style.color = "var(--anzhiyu-reverse)";
    ctrl_flag = 0;
    global_music_flag = 1;
    let x = e.pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    let p_bar_Len = p_bar.offsetWidth; // 获取进度条的初始Width
    p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width，不知道为什么，第一次获取的值不对，这里还得再更新一次
    document.onmousemove = function (e) { // 拖动需要写到down里面
        let diff = x - e.pageX; // 获取移动的距离
        mousemove_flag = 0;
        p_bar_Len_New = p_bar_Len - diff; // 计算当前进度条的Width
        if (p_bar_Len_New < 0) { // 当超出进度条范围，控制
            p_bar_Len_New = 0;
        } else if (p_bar_Len_New > p_bar_bg_Len) {
            p_bar_Len_New = p_bar_bg_Len;
        }
        p_bar.style.width = p_bar_Len_New + "px"; // 更改进度条Width
        let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
        let current_time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.getElementById("progress-low-btn").innerHTML = secToTime(current_time);
    }
});
// 移动端适配
music_progressbar.addEventListener("touchstart", function (e) { //添加监听事件
    p_bar_bg.style.height = "0.6rem";
    // p_bar.style.height = "0.6rem";
    p_bar.style.backgroundColor = "var(--anzhiyu-reverse)";
    p_low.style.color = "var(--anzhiyu-reverse)";
    p_high.style.color = "var(--anzhiyu-reverse)";
    ctrl_flag = 0;
    global_music_flag = 1;
    let x = e.targetTouches[0].pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    // p_bar.style.width = (0 + event.targetTouches[0].offsetX) + "px"; // 按下时重新设置进度条
    let p_bar_Len = p_bar.offsetWidth; // 获取进度条的初始Width
    p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width，不知道为什么，第一次获取的值不对，这里还得再更新一次
    document.ontouchmove = function (e) { // 拖动需要写到down里面
        let diff = x - e.targetTouches[0].pageX; // 获取移动的距离
        mousemove_flag = 0;
        p_bar_Len_New = p_bar_Len - diff; // 计算当前进度条的Width
        if (p_bar_Len_New < 0) { // 当超出进度条范围，控制
            p_bar_Len_New = 0;
        } else if (p_bar_Len_New > p_bar_bg_Len) {
            p_bar_Len_New = p_bar_bg_Len;
        }
        p_bar.style.width = p_bar_Len_New + "px"; // 更改进度条Width
        let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
        let current_time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.getElementById("progress-low-btn").innerHTML = secToTime(current_time);
    }
});

$(document).mouseup(function () { //当鼠标弹起的时候，不做任何操作
    v_bar_bg.css("height", "0.4rem");
    v_bar.css("backgroundColor", "var(--font-color)");
    v_low.css("color", "var(--font-color)");
    v_high.css("color", "var(--font-color)");
    p_bar_bg.css("height", "0.4rem");
    p_bar.css("backgroundColor", "var(--font-color)");
    p_low.css("color", "var(--font-color)");
    p_high.css("color", "var(--font-color)");
    if (ctrl_flag == 0 && mousemove_flag == 0) {
        let all_Time = $("meting-js").aplayer.audio.duration;
        let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        $("meting-js").aplayer.seek(new_Time); //更改进度
    }
    global_music_flag = 0;
    ctrl_flag = 1;
    mousemove_flag = 1;
    $(document).off("mousemove");
});

$(document).on("touchend", function () {
    v_bar_bg.css("height", "0.4rem");
    v_bar.css("backgroundColor", "var(--font-color)");
    v_low.css("color", "var(--font-color)");
    v_high.css("color", "var(--font-color)");
    p_bar_bg.css("height", "0.4rem");
    p_bar.css("backgroundColor", "var(--font-color)");
    p_low.css("color", "var(--font-color)");
    p_high.css("color", "var(--font-color)");
    if (ctrl_flag == 0 && mousemove_flag == 0) {
        let all_Time = $("meting-js").aplayer.audio.duration;
        let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        $("meting-js").aplayer.seek(new_Time); //更改进度
    }
    global_music_flag = 0;
    ctrl_flag = 1;
    mousemove_flag = 1;
    $(document).off("touchmove");
});


whenDOMReady(); // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady); // pjax加载完成（切换页面）后再执行一次