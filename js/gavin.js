// // pjax适配
// function whenDOMReady() {
//     // pjax加载完成（切换页面）后需要执行的函数和代码
//     console.log("pjax开启");
//     musicState();
//     cardTimes();
//     asideNote();
// }

document.addEventListener("DOMContentLoaded", ()=>{
    console.log("第一次加载完成");
    cardTimes();
    asideNote();
    if(document.documentElement.scrollTop != 0){
        document.getElementById("page-header").classList.add("is-top-bar")
    }
}); //第一次

document.addEventListener("pjax:complete", ()=>{
    console.log("pjax加载完成（切换页面）");
    document.getElementById("page-name").innerText = document.title.split(" | 参星阁")[0];
    musicState();
    cardTimes();
    asideNote();
    if(document.documentElement.scrollTop != 0){
        document.getElementById("page-header").classList.add("is-top-bar")
    }
}) // pjax加载完成（切换页面）后再执行一次

if ('paintWorklet' in CSS) { CSS.paintWorklet.addModule('/js/paint.js'); console.log("注册成功");}


window.onload = function () {
    var set_music = document.querySelector("#set-switch-music input");
    var mplayer = document.getElementById("mplayer");
    mplayer.style.display = set_music.checked ? "" : "none";
    set_music.addEventListener('change', () => {
        mplayer.style.display = set_music.checked ? "" : "none";
    });
    if (localStorage.getItem('notice_state') != null) {
        set_notice.checked = localStorage.getItem('notice_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('lrc_state') != null) {
        localStorage.getItem('lrc_state') == 'true' ? document.getElementById("ircSwitchBtn").click() : null ;
    }
    if (localStorage.getItem('system_theme_state') != null) {
        set_sys_theme.checked = localStorage.getItem('system_theme_state') == 'true' ? true : false;
    }
    if (set_sys_theme.checked) {
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (isLightMode) {
            activateLightMode();
            document.querySelector("#set-theme-light input").checked = true;
            saveToLocal.set('theme', 'light', 2);
        } else if (isDarkMode) {
            activateDarkMode();
            document.querySelector("#set-theme-dark input").checked = true;
            saveToLocal.set('theme', 'dark', 2);
        }
        colorSchemeQuery.addListener(ctrl.GlobalTheme);
    }
    if (saveToLocal.get('theme') != null) {
        saveToLocal.get('theme') == 'light' ? document.querySelector("#set-theme-light input").checked = true : document.querySelector("#set-theme-dark input").checked = true;
    }
    // new Vue().$mount('#aside-system')
    if (set_notice.checked) tools.showNote("欢迎来到参星阁！", "success", 5);
    console.log("\n %cGC音频控制器 v1.3.2 参星阁出品%c https://gavin-chen.top \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
    console.log(`Welcome to:\n%c参星阁:%c https://gavin-chen.top%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2023/01/04 20:53:58").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
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
    var row_h = 7 - week_first; //第一行天数
    var row_f = (dates - row_h) % 7; //最后一行的天数
    var rows = row_f == 0 ? Math.floor((dates - row_h) / 7) + 1 : Math.floor((dates - row_h) / 7) + 2;
    var calendar = document.getElementById("calendar-main");
    var gap = document.getElementById("calendar-date");
    switch (rows) {
        case 4: gap.style.marginBottom = ""; break;
        case 5: gap.style.marginBottom = "1.2rem"; break;
        case 6: gap.style.marginBottom = "2.4rem"; break;
        default: gap.style.marginBottom = "2.4rem";
    }
    for (let r = 0; r < rows; r++) {
        if (calendar.querySelector(".calendar-r" + r) == null) {
            calendar.innerHTML += "<div class='calendar-r" + r + "'></div>";
        }
        for (let d = 0; d < 7; d++) {
            if (r == 0 && d == week_first) { //本月第一天
                count_days = 1;
                count_flag = true;
            }
            if (count_days == date) { //当日日期
                ds = " class='now'";
            } else ds = "";
            if (calendar.querySelector(".calendar-r" + r + " .calendar-d" + d + " a") == null) {
                calendar.querySelector(".calendar-r" + r).innerHTML += "<div class='calendar-d" + d + "'><a" + ds + ">" + count_days + "</a></div>";
            }
            if (count_days >= dates) {
                count_days = "";
                count_flag = false;
            }
            if (count_flag) count_days += 1;
        }
    }
    var lunar = chineseLunar.solarToLunar(new Date(year, month, date));
    animalYear = chineseLunar.format(lunar, "A"); //生肖属相
    ganzhiYear = chineseLunar.format(lunar, "T").slice(0, -1); //天干地支
    lunarMon = chineseLunar.format(lunar, "M"); //月份
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
    if (c_m) c_m.innerHTML = monthStr; //月份
    if (c_w) c_w.innerHTML = weekStr; //星期
    if (c_d) c_d.innerHTML = date.toString().padStart(2, '0'); //日期
    if (c_a) c_a.innerHTML = ganzhiYear + animalYear + "年"; //年份
    if (c_l) c_l.innerHTML = lunarMon + lunarDay; //农历
    if (a_t_l) a_t_l.innerHTML = year + "&nbsp;&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>第</a>&nbsp;" + asideWeekNum + "&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>周</a>";
}

function asideNote() {
    var noteCard = document.querySelector(".card-widget.card-announcement");
    var noteArea = document.querySelector(".card-widget.card-announcement .announcement_content");
    if (date == dates) {
        noteCard.style.display = "";
        noteArea.innerHTML = "<p align='center'>今天月末，做好总结</p>";
        if (set_notice.checked) tools.showNote("今天月末，做好总结", "warning", 5)
    } else if (date == 1) {
        noteCard.style.display = "";
        noteArea.innerHTML = "<p align='center'>今天月初，做好规划</p>";
        if (set_notice.checked) tools.showNote("今天月初，做好规划", "warning", 5)
    } else {
        switch (lunarDay) {
            case "十六":
                noteCard.style.display = "";
                noteArea.innerHTML = "<p align='center'>今晚月圆</p>";
                if (set_notice.checked) tools.showNote("今晚月圆", "success", 5)
                break;
            default: noteCard.style.display = "none";
        }
    }
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

    detectBrowser: function () {
        const userAgent = navigator.userAgent;
        let browserName, fullVersion, majorVersion;
        function getHard(str) {
            let str1 = str.substring(str.indexOf("("),str.indexOf(")"));
            return str1.substring(str1.lastIndexOf(";")+2, str1.length)
        }
        let hard = getHard(userAgent);
        if (/Firefox[\/\s](\d+\.\d+\.\d+\.\d+)/.test(userAgent)) {// 检测Firefox
            browserName = 'Firefox';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/Edge[\/\s](\d+\.\d+\.\d+\.\d+)/.test(userAgent)) {// 检测Edge
            browserName = 'Edge (Chromium)';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/Edg[\/\s](\d+\.\d+\.\d+\.\d+)/.test(userAgent)) {// 检测Edge (旧版)
            browserName = 'Edge';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/OPR[\/\s](\d+\.\d+\.\d+\.\d+)/.test(userAgent)) {// 检测Opera
            browserName = 'Opera';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/Chrome[\/\s](\d+\.\d+\.\d+\.\d+)/.test(userAgent)) {// 检测Chrome
            browserName = 'Chrome';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/Safari[\/\s](\d+\.\d+\.\d+\.\d+)/.test(userAgent)) {// 检测Safari
            browserName = 'Safari';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/MSIE (\d+\.\d+);/.test(userAgent) || /Trident[\/\s](\d+\.\d+)/.test(userAgent)) {// 检测IE
            browserName = 'Internet Explorer';
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else {// 无法检测浏览器
            browserName = 'Unknown';
            fullVersion = 'Unknown';
            majorVersion = 0;
        }
        return {
            name: browserName, //浏览器名称
            version: fullVersion, //浏览器详细版本号
            majorVersion: majorVersion, //主版本号
            hard: hard //硬件平台
        };
    },

    getOSInfo: function () {
        let osName = "unknown";
        let osVersion = "unknown";
        if (navigator.userAgent.indexOf("Windows") != -1) {
            osName = "Windows";
            if (navigator.userAgent.indexOf("Windows NT 10.0") != -1) {
                osVersion = "10";
            } else if (navigator.userAgent.indexOf("Windows NT 6.3") != -1) {
                osVersion = "8.1";
            } else if (navigator.userAgent.indexOf("Windows NT 6.2") != -1) {
                osVersion = "8";
            } else if (navigator.userAgent.indexOf("Windows NT 6.1") != -1) {
                osVersion = "7";
            } else if (navigator.userAgent.indexOf("Windows NT 6.0") != -1) {
                osVersion = "Vista";
            } else if (navigator.userAgent.indexOf("Windows NT 5.1") != -1) {
                osVersion = "XP";
            } else if (navigator.userAgent.indexOf("Windows NT 5.0") != -1) {
                osVersion = "2000";
            }
        } else if (navigator.userAgent.indexOf("Mac OS X") != -1) {
            osName = "macOS";
            osVersion = navigator.userAgent.match(/Mac OS X\s([\d_]+)/)[1].replace(/_/g, '.');
        } else if (navigator.userAgent.indexOf("Linux; Android 11") != -1) {
            osName = "HarmonyOS";
            osVersion = 2;
        } else if (navigator.userAgent.indexOf("Linux; Android 12") != -1) {
            osName = "HarmonyOS";
            osVersion = 3;
        } else if (navigator.userAgent.indexOf("Linux") != -1) {
            osName = "Linux";
        } else if (navigator.userAgent.indexOf("Android") != -1) {
            osName = "Android";
            osVersion = navigator.userAgent.match(/Android\s([\d.]+)/)[1];
        } else if (navigator.userAgent.indexOf("iOS") != -1) {
            osName = "iOS";
            osVersion = navigator.userAgent.match(/OS\s([\d_]+)/)[1].replace(/_/g, '.');
        }
        return `${osName} ${osVersion}`;
    },

    getMemoryUsage: function () {
        const memory = performance.memory;
        const totalMemory = memory.totalJSHeapSize / (1024 * 1024);
        const usedMemory = memory.usedJSHeapSize / (1024 * 1024);
        const memoryLimit = memory.jsHeapSizeLimit / (1024 * 1024);
        console.log(`Total memory: ${totalMemory.toFixed(2)} MB`);
        console.log(`Used memory: ${usedMemory.toFixed(2)} MB`);
        console.log(`Memory limit: ${memoryLimit.toFixed(2)} MB`);
        return {
            totalM: totalMemory.toFixed(2),
            usedM: usedMemory.toFixed(2),
            limitM: memoryLimit.toFixed(2)
        }
    },

    getBatteryInfo: function () {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function(battery) {
                console.log("Battery level: " + battery.level * 100 + "%");
                console.log("Battery state: " + battery.charging);
                return {
                    level: battery.level,
                    state: battery.charging
                };
            });
        }
    },

    showNote: function (text, style, delay) {
        new Vue({
            data: function () {
                this.$notify({
                    title: '阁主令',
                    message: text,
                    position: 'top-left',
                    showClose: true,
                    customClass: 'element-note-bg-' + style,
                    type: style,
                    duration: delay * 1000
                });
            }
        })
    },

    showMessage: function (text, style, delay) {
        new Vue({
            data: function () {
                this.$message({
                    message: text,
                    showClose: true,
                    type: style,
                    duration: delay * 1000
                });
            }
        })
    },

    randomColor: function () {
        var colors = ["rgba(0,150,255,.95)", "rgba(0,255,150,.95)", "rgba(255,150,0,.95)", "rgba(255,0,150,.95)", "rgba(150,255,0,.95)", "rgba(150,0,255,.95)"];
        var n = Math.floor(Math.random() * 6); //随机0-5
        return colors[n];
    }
}

var ctrl = {

    GlobalTheme: function(e) {
        console.log(`changed to ${e.matches ? "dark" : "light"} mode`);
        if(e.matches){
            activateDarkMode();
            document.querySelector("#set-theme-dark input").checked = true;
            saveToLocal.set('theme', 'dark', 2);
        } else {
            activateLightMode();
            document.querySelector("#set-theme-light input").checked = true;
            saveToLocal.set('theme', 'light', 2);
        }
    },

    // 深色模式
    switchDarkMode: function () {
        const nowMode = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
        if (nowMode === 'light') {
            document.querySelector("#set-theme-dark").click();
        } else {
            document.querySelector("#set-theme-light").click();
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
        var top_item = document.querySelectorAll(".item-show");
        if (top_item.length == 1) {
            switch (top_item[0].id) {
                case 'console-music-item-mini': break;
                case 'console-music-item-main': ctrl.hideConsole(); break;
                case 'console-music-item-list':
                    top_item[0].classList.remove("item-show");
                    document.getElementById("console-music-item-main").classList.add("item-show");
                    break;
                case 'console-songsheet-item-list':
                    top_item[0].classList.remove("item-show");
                    document.getElementById("console-music-item-list").classList.add("item-show");
                    break;
                default: console.log("异常情况");
            }
        } else {
            top_item[top_item.length - 1].classList.remove("item-show");
            // if (top_item.length == 2) {
            //     document.querySelector("#console .console-btn-group").style.opacity = 1;
            //     document.querySelector("#console .console-btn-group").style.pointerEvents = 'all';            
            // }
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
            localStorage.setItem('lrc_state',false);
            if (set_notice.checked) tools.showMessage("桌面歌词已关闭", "success", 2);
        } else {
            a.classList.remove("aplayer-lrc-hide");
            b.classList.add("on");
            localStorage.setItem('lrc_state',true);
            if (set_notice.checked) tools.showMessage("桌面歌词已打开", "success", 2);
        }
    },

    // 单栏显示
    hideAsideBtn: () => {
        const $htmlDom = document.documentElement.classList;
        if ($htmlDom.contains('hide-aside')) {
            saveToLocal.set('aside-status', 'show', 2);
            document.querySelector("#asideItem").classList.remove("on");
            if (set_notice.checked) tools.showMessage("侧边栏已启用", "success", 2);
        } else {
            saveToLocal.set('aside-status', 'hide', 2);
            document.querySelector("#asideItem").classList.add("on");
            if (set_notice.checked) tools.showMessage("侧边栏已隐藏", "success", 2);
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
        var console_musicBody = document.querySelector("#console .console-mainbox"); // 更新控制中心尺寸
        var console_musicCover = document.getElementById("console-music-cover");
        console_musicCover.style.height = console_musicCover.offsetWidth + "px";
        console_musicBody.style.height = (console_musicCover.offsetWidth + 236) + "px"; //(12rem + 1.3rem + 1.3rem) * 16 = 233.6px
        ctrl.getMusicInfo();
        var nowVolume = document.querySelector("meting-js").aplayer.audio.volume;// 当前音量
        document.querySelector("#v_bar").style.width = document.querySelector("#v_bar_bg").offsetWidth * nowVolume + "px";// 音量条进度
        saveToLocal.get('theme') == 'light' ? document.querySelector("#set-theme-light input").checked = true : document.querySelector("#set-theme-dark input").checked = true;
    }

}

document.addEventListener("copy", () => {
    if (set_notice.checked) tools.showMessage("复制成功！转载请注明来源！", "success", 2);
});
var set_notice = document.querySelector("#set-switch-notice input");
set_notice.addEventListener("change", () => {
    set_notice.checked ? localStorage.setItem('notice_state', true) : localStorage.setItem('notice_state', false);
});


// 主页/音乐列表/歌单列表/设置 切换
var music_list_switch = document.getElementById("music-ctrl-btn-end");
var music_list_title = document.getElementById("music-list-title");
var settings_btn = document.querySelector("#console .settings-btn");
var to_display = document.querySelector("#li-set-display .setting-next");
var to_about = document.querySelector("#li-set-about .setting-next");
// var to_wallpaper = document.querySelector("#li-set-wallpaper .setting-next");
var setting_info1 = document.getElementById("console-setting-info1");
var setting_title1 = document.querySelector("#console-setting-info1 .setting-title");
var setting_info2 = document.getElementById("console-setting-info2");
var setting_title2 = document.querySelector("#console-setting-info2 .setting-title");
// var setting_info3 = document.getElementById("console-setting-info3");
// var setting_title3 = document.querySelector("#console-setting-info3 .setting-title");
music_list_switch.addEventListener("click", () => {
    document.getElementById("console-music-item-main").classList.remove("item-show");
    document.getElementById("console-music-item-list").classList.add("item-show");
});
music_list_title.addEventListener("click", () => {
    document.getElementById("console-music-item-list").classList.remove("item-show");
    document.getElementById("console-songsheet-item-list").classList.add("item-show");
});
settings_btn.addEventListener("click", () => {
    // document.querySelector("#console .console-btn-group").style.opacity = 0;
    // document.querySelector("#console .console-btn-group").style.pointerEvents = 'none';
    document.getElementById("console-settings").classList.add("item-show");
});
to_display.addEventListener("click", () => {
    setting_title1.innerHTML = "显示和文本";
    setting_info1.classList.add("item-show");
});
to_about.addEventListener("click", () => {
    setting_title2.innerHTML = "关于本机";
    if (document.querySelector("#set-theme-dark input").checked) {
        document.querySelector("#set-sys-logo img").src = "https://blog-hexo-img.oss-cn-shanghai.aliyuncs.com/f1olM.webp";
    } else {
        document.querySelector("#set-sys-logo img").src = "https://blog-hexo-img.oss-cn-shanghai.aliyuncs.com/f15BG.webp";
    }
    document.querySelector("#console-setting-info2 .set-box-normal:nth-child(3) .setting-detail").innerHTML = tools.detectBrowser().hard;
    document.querySelector("#console-setting-info2 .set-box-normal:nth-child(4) .setting-detail").innerHTML = tools.getOSInfo();
    document.querySelector("#console-setting-info2 .set-box-normal:nth-child(5) .setting-detail").innerHTML = tools.detectBrowser().name + " " + tools.detectBrowser().version;
    setting_info2.classList.add("item-show");
});
// to_wallpaper.addEventListener("click", () => {
//     setting_title3.innerHTML = "桌面和壁纸";
//     setting_info3.classList.add("item-show");
// });

// 主题设置
document.getElementById("set-theme-light").addEventListener("click", () => {
    document.querySelector("#set-theme-light input").checked = true;
    activateLightMode();
    saveToLocal.set('theme', 'light', 2);
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof changeGiscusTheme === 'function' && changeGiscusTheme();
    typeof FB === 'object' && window.loadFBComment();
    typeof runMermaid === 'function' && window.runMermaid();
    if (set_notice.checked) tools.showMessage("已切换至浅色模式", "success", 2);
});
document.getElementById("set-theme-dark").addEventListener("click", () => {
    document.querySelector("#set-theme-dark input").checked = true;
    activateDarkMode();
    saveToLocal.set('theme', 'dark', 2);
    GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
    typeof utterancesTheme === 'function' && utterancesTheme();
    typeof changeGiscusTheme === 'function' && changeGiscusTheme();
    typeof FB === 'object' && window.loadFBComment();
    typeof runMermaid === 'function' && window.runMermaid();
    if (set_notice.checked) tools.showMessage("已切换至深色模式", "success", 2);
});
var set_sys_theme = document.querySelector("#set-switch-systheme input");
set_sys_theme.addEventListener("change", () => {
    if (set_sys_theme.checked) {
        localStorage.setItem('system_theme_state',true);
        const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches;
        if (isLightMode) {
            activateLightMode();
            document.querySelector("#set-theme-light input").checked = true;
            saveToLocal.set('theme', 'light', 2);
        } else if (isDarkMode) {
            activateDarkMode();
            document.querySelector("#set-theme-dark input").checked = true;
            saveToLocal.set('theme', 'dark', 2);
        }
        colorSchemeQuery.addListener(ctrl.GlobalTheme);
    } else {
        localStorage.setItem('system_theme_state',false);
        colorSchemeQuery.removeListener(ctrl.GlobalTheme);
    }
});

// 字体大小设置
var set_font_size = document.querySelector("#set-font-size input");
set_font_size.addEventListener("change", () => {
// getComputedStyle(document.documentElement).getPropertyValue('--global-font-size')
    document.documentElement.style.setProperty('--global-font-size',set_font_size.value + 'px');
});


// 歌单列表监听器
var songsheet0 = document.getElementById("songsheet-X");
var songsheet1 = document.getElementById("songsheet-A");
var songsheet2 = document.getElementById("songsheet-B");
var songsheet3 = document.getElementById("songsheet-C");
var songsheet4 = document.getElementById("songsheet-D");
var addSongsheet = document.getElementById("songsheet-add");
songsheet0.addEventListener("click", () => {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至默认专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8086610771", "netease");
    document.getElementById("music-list-title").innerHTML = "网易云";
});
songsheet1.addEventListener("click", () => {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至纯音乐专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8167030216", "netease");
    document.getElementById("music-list-title").innerHTML = "纯音乐";
});
songsheet2.addEventListener("click", () => {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至周杰伦专辑");
    global_music_flag = 1;
    ctrl.JayMusicList();
    document.getElementById("music-list-title").innerHTML = "周杰伦";
});
songsheet3.addEventListener("click", () => {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至薛之谦/李荣浩专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8163994837", "netease");
    document.getElementById("music-list-title").innerHTML = "薛之谦/李荣浩";
});
songsheet4.addEventListener("click", () => {
    document.getElementById("console-loading-icon").classList.add("show");
    console.log("正在切换至古风专辑");
    global_music_flag = 1;
    ctrl.changeMusicList("8167066222", "netease");
    document.getElementById("music-list-title").innerHTML = "古风";
});
addSongsheet.addEventListener("click", () => {
    console.log("自定义专辑");
    if (set_notice.checked) tools.showNote("有空再写吧", "warning", 3)
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
    v_bar_bg.style.height = "0.8rem";
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
    v_bar_bg.style.height = "0.8rem";
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
    p_bar_bg.style.height = "0.8rem";
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
    p_bar_bg.style.height = "0.8rem";
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


// whenDOMReady(); // 打开网站先执行一次
// document.addEventListener("pjax:complete", whenDOMReady); // pjax加载完成（切换页面）后再执行一次
// whenDOMReady函数外放一些打开网站之后只需要执行一次的函数和代码，比如一些监听代码。
// 监听代码只需要执行一次即可，不需要每次加载pjax都执行，会出现一些Bug。至于为什么，我也不知道，可以自己试一下。

// // 申请新浪微博开发者账号，获取app key和app secret
// var appKey = 'your_app_key';
// var appSecret = 'your_app_secret';

// // 构造认证URL，引导用户授权
// var authUrl = 'https://api.weibo.com/oauth2/authorize?client_id=' + appKey + '&redirect_uri=http://localhost&response_type=code';
// console.log('请访问以下链接进行授权：', authUrl);

// // 获取access token
// var code = prompt('请将授权后获得的code输入到此处');
// var tokenUrl = 'https://api.weibo.com/oauth2/access_token?client_id=' + appKey + '&client_secret=' + appSecret + '&grant_type=authorization_code&code=' + code + '&redirect_uri=http://localhost';
// fetch(tokenUrl)
//   .then(response => response.json())
//   .then(data => {
//     console.log('access token:', data.access_token);
//     getLatestWeibo(data.access_token);
//   });

// // 获取最新微博
// function getLatestWeibo(accessToken) {
//   var uid = 'your_user_id'; // 新浪微博用户的uid
//   var apiUrl = 'https://api.weibo.com/2/statuses/user_timeline.json?access_token=' + accessToken + '&uid=' + uid + '&count=1'; // count参数表示获取微博数
//   fetch(apiUrl)
//     .then(response => response.json())
//     .then(data => {
//       var weibo = data.statuses[0];
//       console.log('微博内容:', weibo.text);
//       if (weibo.pic_urls && weibo.pic_urls.length > 0) {
//         console.log('微博图片:', weibo.pic_urls);
//       }
//     });
// }
