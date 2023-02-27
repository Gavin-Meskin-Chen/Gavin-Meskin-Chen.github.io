// pjax适配
function whenDOMReady() {
    // pjax加载完成（切换页面）后需要执行的函数和代码
    console.log("pjax开启");
    musicState();
    cardTimes();
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
        btn = document.querySelector("#percent"); // 获取图标
    result <= 99 || (result = 99), (btn.innerHTML = result);
}
document.getElementById("page-name").innerText = document.title.split(" | 参星阁")[0];

// 首页大logo
var logo = document.createElement("img");
var site = document.getElementById("site-info");
var title = document.getElementById("site-title");
logo.style = "position:relative;left:calc(50% - 75px);width:150px;height:150px";
logo.src = "https://i.imgtg.com/2023/02/06/0Su3b.png";
site.insertBefore(logo, title);
site.style.top = "30%";

// 侧边栏日历卡片
function cardTimes() {
    year = now.getFullYear();
    month = now.getMonth();
    week = now.getDay();
    date = now.getDate();
    var year_flag = year % 4 == 0 && year % 100 != 0 || year % 400 == 0 ? true : false;
    switch (week) {
        case 0: weekStr = "周日"; break;
        case 1: weekStr = "周一"; break;
        case 2: weekStr = "周二"; break;
        case 3: weekStr = "周三"; break;
        case 4: weekStr = "周四"; break;
        case 5: weekStr = "周五"; break;
        case 6: weekStr = "周六"; break;
        default: console.log("异常情况");
    }
    switch (month) {
        case 0: monthStr = "一月"; dates = 31; break;
        case 1: monthStr = "二月"; dates = year_flag ? 29 : 28; break;
        case 2: monthStr = "三月"; dates = 31; break;
        case 3: monthStr = "四月"; dates = 30; break;
        case 4: monthStr = "五月"; dates = 31; break;
        case 5: monthStr = "六月"; dates = 30; break;
        case 6: monthStr = "七月"; dates = 31; break;
        case 7: monthStr = "八月"; dates = 31; break;
        case 8: monthStr = "九月"; dates = 30; break;
        case 9: monthStr = "十月"; dates = 31; break;
        case 10: monthStr = "十一月"; dates = 30; break;
        case 11: monthStr = "十二月"; dates = 31; break;
        default: console.log("异常情况");
    }
    var week_first = (week + 8 - date % 7) % 7;
    var count_days = "";
    var count_flag = false;
    var ds;
    for (let r = 0; r < 5; r++) {
        for (let d = 0; d < 7; d++) {
            ds = document.querySelector(".calendar-r" + r + " .calendar-d" + d + " a"); //日历
            if(ds){
                if (r == 0 && d == week_first) {
                    count_days = 1;
                    count_flag = true;
                }
                ds.innerHTML = count_days;
                if (count_days == date) {
                    var dd = document.querySelector("a.now");
                    if(dd)dd.classList.remove("now");
                    ds.classList.add("now");
                };
                if (count_days > dates) {
                    count_days = "";
                    count_flag = false;
                }
                if (count_flag) count_days += 1;
            }
        }
    }
    var lunar = chineseLunar.solarToLunar(new Date(year, month, date));
    var animalYear = chineseLunar.format(lunar, "A"), //生肖属相
        ganzhiYear = chineseLunar.format(lunar, "T").slice(0,-1), //天干地支
        lunarMon = chineseLunar.format(lunar, "M"), //月份
        lunarDay = chineseLunar.format(lunar, "d"); //日期
    asideTime = new Date("2023/01/01 00:00:00");	// 侧边栏倒计时
    asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
    asideDayNum = Math.floor(asideDay);
    var asideWeekNum = ((week - asideDayNum % 7) >= 0) ? (Math.ceil(asideDayNum / 7)) : (Math.ceil(asideDayNum / 7) + 1);
    var c_m = document.getElementById("calendar-month");
    var c_w = document.getElementById("calendar-week");
    var c_d = document.getElementById("calendar-date");
    var c_a = document.getElementById("calendar-animal");
    var c_l = document.getElementById("calendar-lunar");
    var a_t_l = document.getElementById("aside-time-left");
    if(c_m)c_m.innerHTML = monthStr; //月份
    if(c_w)c_w.innerHTML = weekStr; //星期
    if(c_d)c_d.innerHTML = date; //日期
    if(c_a)c_a.innerHTML = ganzhiYear + animalYear + "年"; //年份
    if(c_l)c_l.innerHTML = lunarMon + lunarDay; //农历
    if(a_t_l)a_t_l.innerHTML = year + "&nbsp;&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>第</a>&nbsp;" + asideWeekNum + "&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>周</a>";
}

// 音乐状态检测（已添加事件监听器，修复点击aplayer后导航栏和控制中心不同步的问题）
function musicState() {
    var music_state = document.querySelector("meting-js").aplayer.audio.paused;
    var a = document.querySelector("#music-Switch i");
    var b = document.querySelector("#music-ctrl-btn-center i");
    if (music_state) {
        a.classList.remove("fa-pause");
        a.classList.add("fa-play");
        b.classList.remove("fa-pause");
        b.classList.add("fa-play");
    } else {
        a.classList.remove("fa-play");
        a.classList.add("fa-pause");
        b.classList.remove("fa-play");
        b.classList.add("fa-pause");
    }
}

var tools = {
    secToTime: function (s) {
        if (isNaN(s)) s = 0;
        var min = Math.floor(s / 60);
        var sec = Math.floor(s % 60);
        var t = min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');
        return t;
    },

    randomColor: function () {
        var colors = ["rgba(0,150,255,.95)", "rgba(0,255,150,.95)", "rgba(255,150,0,.95)", "rgba(255,0,150,.95)", "rgba(150,255,0,.95)", "rgba(150,0,255,.95)"];
        var n = Math.floor(Math.random() * 6); //随机0-5
        return colors[n];
    }
}

var ctrl = {

    // 深色模式
    switchDarkMode: function () {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        if (nowMode === 'light') {
            activateDarkMode();
            saveToLocal.set('theme', 'dark', 2);
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
        } else {
            activateLightMode();
            saveToLocal.set('theme', 'light', 2);
            GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
        }
        typeof utterancesTheme === 'function' && utterancesTheme();
        typeof changeGiscusTheme === 'function' && changeGiscusTheme();
        typeof FB === 'object' && window.loadFBComment();
        typeof runMermaid === 'function' && window.runMermaid();
    },

    // 显示中控台
    showConsole: function () {
        document.querySelector("#console-music-item-main").classList.add("item-show");
        document.querySelector("#console").classList.add("show");
        ctrl.initConsoleState();
    },

    // 隐藏中控台
    hideConsole: function () {
        var items = document.querySelectorAll(".item-show");
        for (let i = 0; i < items.length; i++) items[i].classList.remove("item-show");
        document.querySelector("#console").classList.remove("show");
    },

    // 菜单返回
    consoleBackBtn: function () {
        var top_item = document.querySelector(".item-show");
        switch (top_item.id) {
            case 'console-music-item-mini': break;
            case 'console-music-item-main': ctrl.hideConsole(); break;
            case 'console-music-item-list':
                top_item.classList.remove("item-show");
                document.getElementById("console-music-item-main").classList.add("item-show");
                break;
            case 'console-songsheet-item-list':
                top_item.classList.remove("item-show");
                document.getElementById("console-music-item-list").classList.add("item-show");
                break;
            case 'console-music-item-lrc':
                top_item.classList.remove("item-show");
                document.getElementById("console-music-item-main").classList.add("item-show");
                break;
            default: console.log("异常情况");
        }
    },

    // 桌面歌词
    ircShowHide: function () {
        var irc = document.querySelector(".aplayer > .aplayer-lrc-hide"); //这里防止与音乐页面的控制冲突
        var a = document.querySelector(".aplayer > .aplayer-lrc");
        var b = document.querySelector("#ircItem");
        if (irc === null) {
            a.classList.add("aplayer-lrc-hide");
            b.classList.remove("on");
        } else {
            a.classList.remove("aplayer-lrc-hide");
            b.classList.add("on");
        }
    },

    // 单栏显示
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

    // 导航栏音乐
    musicSwitch: function () {
        var music_state = document.querySelector("meting-js").aplayer.audio.paused;
        var a = document.querySelector("#music-Switch i");
        var b = document.querySelector("#music-ctrl-btn-center i");
        if (music_state) {
            a.classList.remove("fa-play");
            a.classList.add("fa-pause");
            b.classList.remove("fa-play");
            b.classList.add("fa-pause");
        } else {
            a.classList.remove("fa-pause");
            a.classList.add("fa-play");
            b.classList.remove("fa-pause");
            b.classList.add("fa-play");
        }
        document.querySelector("meting-js").aplayer.toggle();
    },

    musicForward: function () {
        document.querySelector("meting-js").aplayer.skipForward();
        ctrl.getMusicInfo();
    },

    musicBackward: function () {
        document.querySelector("meting-js").aplayer.skipBack();
        ctrl.getMusicInfo();
    },

    // 音乐进度更新
    getMusicInfo: function () {
        var music_id = document.querySelector("meting-js").aplayer.list.index; //当前曲目的id
        var music_cover = document.querySelector("meting-js").aplayer.list.audios[music_id].cover;
        var music_author = document.querySelector("meting-js").aplayer.list.audios[music_id].author;
        var music_title = document.querySelector("meting-js").aplayer.list.audios[music_id].title;
        document.getElementById("console-music-cover").innerHTML = "<img src='" + music_cover + "' style='width:100%;height:100%;border-radius:0.5rem;'>";// 歌曲信息
        document.getElementById("console-music-title").innerHTML = music_title;
        document.getElementById("console-music-author").innerHTML = music_author;
    },

    refreshProgress: function () {
        var nowTime = document.querySelector("meting-js").aplayer.audio.currentTime;// 当前时间
        if (isNaN(nowTime)) nowTime = 0;
        var nowTimeString = tools.secToTime(nowTime);
        var allTime = document.querySelector("meting-js").aplayer.audio.duration;// 总时间
        if (isNaN(allTime)) allTime = 0; //无歌曲时会返回NaN
        var allTimeString = tools.secToTime(allTime);
        document.getElementById("progress-low-btn").innerHTML = nowTimeString;// 进度条时间
        document.getElementById("progress-high-btn").innerHTML = allTimeString;
        document.querySelector("#p_bar").style.width = document.querySelector("#p_bar_bg").offsetWidth * (nowTime / allTime) + "px";// 进度条进度
    },

    // 导入歌单
    importMusicList: function () {
        var audios = document.querySelector("meting-js").aplayer.list.audios;
        var list_html;
        for (let i = 0; i < audios.length; i++) {
            list_html = document.getElementById("console-music-list").innerHTML;
            document.getElementById("console-music-list").innerHTML = list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='iconfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].title + "</a><a class='list-music-author' data-pjax-state=''> - " + audios[i].author + "</a></div></li>";
            // console.log("第" + (i + 1) + "首导入成功！");
        }
    },

    // 歌单切换
    changeMusicList: function (Music_id, Music_server) {
        var ap = document.querySelector("meting-js").aplayer;
        var music_list_url_str = "https://metingjs.gavin-chen.top/api?server=" + Music_server + "&type=playlist" + "&id=" + Music_id;
        ap.list.clear();
        fetch(music_list_url_str).then(response => response.json()).then(data => {
            // 在这里使用返回的JSON数据
            newSongsheetLen = data.length;
            console.log("本专辑有" + newSongsheetLen + "首歌曲");
            ap.list.add(data);
        })
            .catch(error => console.error(error));
    },

    JayMusicList: function () {
        var ap = document.querySelector("meting-js").aplayer;
        ap.list.clear();
        ap.list.add(JaySongsheet);
    },

    //初始化console图标
    initConsoleState: function () {
        var irc = document.querySelector(".aplayer > .aplayer-lrc-hide");
        var aplayer = document.querySelector(".aplayer > .aplayer-lrc");
        irc === null && aplayer != null
            ? document.querySelector("#ircItem").classList.add("on")
            : document.querySelector("#ircItem").classList.remove("on");
        saveToLocal.get('aside-status') === 'hide'
            ? document.querySelector("#asideItem").classList.add("on")
            : document.querySelector("#asideItem").classList.remove("on");
        var console_musicBody = document.querySelector("#console .console-music-ctrl-item"); // 更新控制中心尺寸
        var console_musicCover = document.getElementById("console-music-cover");
        console_musicCover.style.height = console_musicCover.offsetWidth + "px";
        console_musicBody.style.height = (console_musicCover.offsetWidth + 236) + "px"; //(12rem + 1.3rem + 1.3rem) * 16 = 233.6px
        ctrl.getMusicInfo();
        var nowVolume = document.querySelector("meting-js").aplayer.audio.volume;// 当前音量
        document.querySelector("#v_bar").style.width = document.querySelector("#v_bar_bg").offsetWidth * nowVolume + "px";// 音量条进度
    }

}

// 主页/音乐列表/歌单列表 切换
var music_list_switch = document.getElementById("music-ctrl-btn-end");
var music_list_title = document.getElementById("music-list-title");
music_list_switch.addEventListener("click", function (e) {
    document.getElementById("console-music-item-main").classList.remove("item-show");
    document.getElementById("console-music-item-list").classList.add("item-show");
});
music_list_title.addEventListener("click", function (e) {
    document.getElementById("console-music-item-list").classList.remove("item-show");
    document.getElementById("console-songsheet-item-list").classList.add("item-show");
});

// 歌单列表监听器
var songsheet0 = document.getElementById("songsheet-X");
var songsheet1 = document.getElementById("songsheet-A");
var songsheet2 = document.getElementById("songsheet-B");
var songsheet3 = document.getElementById("songsheet-C");
var songsheet4 = document.getElementById("songsheet-D");
var addSongsheet = document.getElementById("songsheet-add");
songsheet0.addEventListener("click", function (e) {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至默认专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8086610771", "netease");
    document.getElementById("music-list-title").innerHTML = "网易云";
});
songsheet1.addEventListener("click", function (e) {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至纯音乐专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8167030216", "netease");
    document.getElementById("music-list-title").innerHTML = "纯音乐";
});
songsheet2.addEventListener("click", function (e) {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至周杰伦专辑");
    global_music_flag = 1;
    ctrl.JayMusicList();
    document.getElementById("music-list-title").innerHTML = "周杰伦";
});
songsheet3.addEventListener("click", function (e) {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至薛之谦/李荣浩专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8163994837", "netease");
    document.getElementById("music-list-title").innerHTML = "薛之谦/李荣浩";
});
songsheet4.addEventListener("click", function (e) {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至古风专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8167066222", "netease");
    document.getElementById("music-list-title").innerHTML = "古风";
});
addSongsheet.addEventListener("click", function (e) {
    console.log("自定义专辑");
    alert("有空再写...");
});


// 音乐列表监听器
var console_music_list = document.getElementById("console-music-list");
var music_id = null;
console_music_list.addEventListener('click', function (e) {
    var ap = document.querySelector("meting-js").aplayer
    if (e.target && e.target.nodeName.toUpperCase() == "LI") {
        music_id = parseInt(e.target.querySelector(".list-music-id").innerHTML);
        ap.list.switch(music_id - 1);
        ap.play();
        ctrl.getMusicInfo();
    } else if (e.target && e.target.nodeName.toUpperCase() == "DIV") {
        music_id = parseInt(e.target.parentElement.querySelector(".list-music-id").innerHTML);
        ap.list.switch(music_id - 1);
        ap.play();
        ctrl.getMusicInfo();
    } else if (e.target && (e.target.nodeName.toUpperCase() == "A" || e.target.nodeName.toUpperCase() == "I")) {
        music_id = parseInt(e.target.parentElement.parentElement.querySelector(".list-music-id").innerHTML);
        ap.list.switch(music_id - 1);
        ap.play();
        ctrl.getMusicInfo();
    } else alert("ERROR!")
}, false);


// 音量条监听器
var music_volumebar = document.getElementById("music-volumebar"); //扩大热区
var v_bar_bg = document.getElementById("v_bar_bg");
var v_bar = document.getElementById("v_bar");
var v_low = document.getElementById("volume-low-btn");
var v_high = document.getElementById("volume-high-btn");
var v_bar_bg_Len = v_bar_bg.offsetWidth; // 获取进度条总长Width

// 按键按下
music_volumebar.addEventListener("mousedown", function (e) { //添加监听事件
    v_bar_bg.style.height = "0.6rem";
    v_bar.style.backgroundColor = "var(--dis-f-0)";
    v_low.style.color = "var(--dis-f-0)";
    v_high.style.color = "var(--dis-f-0)";
    let x = e.pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    v_bar.style.width = (0 + e.offsetX) + "px"; // 按下时重新设置进度条
    let v_bar_Len = v_bar.offsetWidth; // 获取进度条的初始Width
    v_bar_bg_Len = v_bar_bg.offsetWidth;
    let newVolume = e.offsetX / v_bar_bg_Len;
    document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
    document.onmousemove = function (e) { // 拖动需要写到down里面
        let diff = x - e.pageX; // 获取移动的距离
        let v_bar_Len_New = v_bar_Len - diff; // 计算当前进度条的Width
        if (v_bar_Len_New < 0) { // 当超出进度条范围，控制
            v_bar_Len_New = 0;
        } else if (v_bar_Len_New > v_bar_bg_Len) {
            v_bar_Len_New = v_bar_bg_Len;
        }
        v_bar.style.width = v_bar_Len_New + "px"; // 更改进度条Width
        newVolume = v_bar_Len_New / v_bar_bg_Len;
        document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
    }
});

// 触摸按下
music_volumebar.addEventListener("touchstart", function (e) { //添加监听事件
    v_bar_bg.style.height = "0.6rem";
    v_bar.style.backgroundColor = "var(--dis-f-0)";
    v_low.style.color = "var(--dis-f-0)";
    v_high.style.color = "var(--dis-f-0)";
    let x = e.targetTouches[0].pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    v_bar.style.width = (0 + e.targetTouches[0].offsetX) + "px"; // 按下时重新设置进度条
    let v_bar_Len = v_bar.offsetWidth; // 获取进度条的初始Width
    v_bar_bg_Len = v_bar_bg.offsetWidth;
    let newVolume = e.targetTouches[0].offsetX / v_bar_bg_Len;
    document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
    document.ontouchmove = function (e) { // 拖动需要写到down里面
        let diff = x - e.targetTouches[0].pageX; // 获取移动的距离
        let v_bar_Len_New = v_bar_Len - diff; // 计算当前进度条的Width
        if (v_bar_Len_New < 0) { // 当超出进度条范围，控制
            v_bar_Len_New = 0;
        } else if (v_bar_Len_New > v_bar_bg_Len) {
            v_bar_Len_New = v_bar_bg_Len;
        }
        v_bar.style.width = v_bar_Len_New + "px"; // 更改进度条Width
        newVolume = v_bar_Len_New / v_bar_bg_Len;
        document.querySelector("meting-js").aplayer.volume(newVolume, true); // 更改音量
    }
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

// 按键按下
music_progressbar.addEventListener("mousedown", function (e) { //添加监听事件
    p_bar_bg.style.height = "0.6rem";
    p_bar.style.backgroundColor = "var(--dis-f-0)";
    p_low.style.color = "var(--dis-f-0)";
    p_high.style.color = "var(--dis-f-0)";
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
        document.getElementById("progress-low-btn").innerHTML = tools.secToTime(current_time);
    }
});

// 触摸按下
music_progressbar.addEventListener("touchstart", function (e) { //添加监听事件
    p_bar_bg.style.height = "0.6rem";
    p_bar.style.backgroundColor = "var(--dis-f-0)";
    p_low.style.color = "var(--dis-f-0)";
    p_high.style.color = "var(--dis-f-0)";
    ctrl_flag = 0;
    global_music_flag = 1;
    let x = e.targetTouches[0].pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
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
        document.getElementById("progress-low-btn").innerHTML = tools.secToTime(current_time);
    }
});

// 按键抬起
document.onmouseup = function () { //当鼠标弹起的时候，不做任何操作
    v_bar_bg.style.height = "0.4rem";
    v_bar.style.backgroundColor = "var(--font-color)";
    v_low.style.color = "var(--font-color)";
    v_high.style.color = "var(--font-color)";
    p_bar_bg.style.height = "0.4rem";
    p_bar.style.backgroundColor = "var(--font-color)";
    p_low.style.color = "var(--font-color)";
    p_high.style.color = "var(--font-color)";
    if (ctrl_flag == 0 && mousemove_flag == 0) {
        let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
        let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.querySelector("meting-js").aplayer.seek(new_Time); //更改进度
    }
    global_music_flag = 0;
    ctrl_flag = 1;
    mousemove_flag = 1;
    document.onmousemove = null;
};

// 触摸抬起
document.ontouchend = function () {
    v_bar_bg.style.height = "0.4rem";
    v_bar.style.backgroundColor = "var(--font-color)";
    v_low.style.color = "var(--font-color)";
    v_high.style.color = "var(--font-color)";
    p_bar_bg.style.height = "0.4rem";
    p_bar.style.backgroundColor = "var(--font-color)";
    p_low.style.color = "var(--font-color)";
    p_high.style.color = "var(--font-color)";
    if (ctrl_flag == 0 && mousemove_flag == 0) {
        let all_Time = document.querySelector("meting-js").aplayer.audio.duration;
        let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.querySelector("meting-js").aplayer.seek(new_Time); //更改进度
    }
    global_music_flag = 0;
    ctrl_flag = 1;
    mousemove_flag = 1;
    document.ontouchmove = null;
};


whenDOMReady(); // 打开网站先执行一次
document.addEventListener("pjax:complete", whenDOMReady); // pjax加载完成（切换页面）后再执行一次
// whenDOMReady函数外放一些打开网站之后只需要执行一次的函数和代码，比如一些监听代码。
// 监听代码只需要执行一次即可，不需要每次加载pjax都执行，会出现一些Bug。至于为什么，我也不知道，可以自己试一下。