// pjax适配
document.addEventListener("DOMContentLoaded", () => {
    console.log("第一次加载完成");
    document.getElementById("page-name").innerText = document.title.split(" | 参星阁")[0];
    cardTimes();
    asideNote();
    cardRefreshTimes();
    percent();
    tools.getIp();
    ctrl.toPageJump();
    ctrl.getCurrentPage();
    ctrl.refreshLikeCount();
    ctrl.coverFlow();
    // sidebarWeather();
    // ctrl.refreshThemeColor();
    if (document.documentElement.scrollTop != 0) {
        document.getElementById("page-header").classList.add("is-top-bar")
    }
    if (document.getElementById('post-comment')) ctrl.owoBig();
}); //第一次

document.addEventListener("pjax:complete", () => {
    console.log("pjax加载完成（切换页面）");
    document.getElementById("page-name").innerText = document.title.split(" | 参星阁")[0];
    cardTimes();
    asideNote();
    cardRefreshTimes();
    ctrl.toPageJump();
    ctrl.getCurrentPage();
    ctrl.refreshLikeCount();
    ctrl.coverFlow();
    // sidebarWeather();
    // ctrl.refreshThemeColor();
    if (document.documentElement.scrollTop != 0) {
        document.getElementById("page-header").classList.add("is-top-bar");
    }
    if (document.getElementById('post-comment')) ctrl.owoBig();
    if (document.getElementById("category-bar-items")) {
        categoriesBarActive();
        categoryBarMask();
    }
    tagsBarActive();
    ctrl.musicState();
}) // pjax加载完成（切换页面）后再执行一次

// ************************************************ 函数部分 **************************************************************
const marqueeContainer1 = document.getElementById('console-music-title');
const marqueeContent1 = document.getElementById('console-music-title-text');
const marqueeContainer2 = document.getElementById('console-music-author');
const marqueeContent2 = document.getElementById('console-music-author-text');
var ipAddress = '';

if ('paintWorklet' in CSS) { CSS.paintWorklet.addModule('/js/paint.min.js'); }

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
        localStorage.getItem('lrc_state') == 'true' ? document.getElementById("ircSwitchBtn").click() : null;
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
    // if (set_notice.checked) tools.showNote("欢迎来到参星阁！", "success", 5);
    console.log("\n %cGC音频控制器 v1.3.2 参星阁出品%c https://gavin-chen.top \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
    console.log(`Welcome to:\n%c参星阁:%c https://gavin-chen.top%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2023/01/04 20:53:58").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
}

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
window.onscroll = percent; // 返回顶部 显示网页阅读进度

// 侧边栏日历卡片
function cardTimes() {
    year = now.getFullYear();
    month = now.getMonth();
    week = now.getDay();
    date = now.getDate();
    var cardWidgetCalendar = document.getElementById("card-widget-calendar");
    if (cardWidgetCalendar) {
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
        var calendar = cardWidgetCalendar.querySelector("#calendar-main");
        var gap = cardWidgetCalendar.querySelector("#calendar-date");
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
        cardWidgetCalendar.querySelector("#calendar-month").innerHTML = monthStr; //月份
        cardWidgetCalendar.querySelector("#calendar-week").innerHTML = weekStr; //星期
        cardWidgetCalendar.querySelector("#calendar-date").innerHTML = date.toString().padStart(2, '0'); //日期
        cardWidgetCalendar.querySelector("#calendar-animal").innerHTML = ganzhiYear + animalYear + "年"; //年份
        cardWidgetCalendar.querySelector("#calendar-lunar").innerHTML = lunarMon + lunarDay; //农历
        cardWidgetCalendar.querySelector("#aside-time-left").innerHTML = year + "&nbsp;&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>第</a>&nbsp;" + asideWeekNum + "&nbsp;<a style='font-size:1.1rem;font-weight:bold;'>周</a>";
    }
}

// 侧边公告卡片
function asideNote() {
    var noteCard = document.querySelector(".card-widget.card-announcement");
    var noteArea = document.querySelector(".card-widget.card-announcement .announcement_content");
    if (date == dates) {
        noteCard.style.display = "";
        noteArea.innerHTML = "<p align='center'>今天月末，做好总结</p>";
        // if (set_notice.checked) tools.showNote("今天月末，做好总结", "warning", 5)
    } else if (date == 1) {
        noteCard.style.display = "";
        noteArea.innerHTML = "<p align='center'>今天月初，做好规划</p>";
        // if (set_notice.checked) tools.showNote("今天月初，做好规划", "warning", 5)
    } else {
        switch (lunarDay) {
            case "十六":
                noteCard.style.display = "";
                noteArea.innerHTML = "<p align='center'>今晚月圆</p>";
                // if (set_notice.checked) tools.showNote("今晚月圆", "success", 5)
                break;
            default: noteCard.style.display = "none";
        }
    }
}

// ***************************************************** 工具模块 ***************************************************************

var tools = {
    secToTime(s) {
        if (isNaN(s)) s = 0;
        var min = Math.floor(s / 60);
        var sec = Math.floor(s % 60);
        var t = min.toString().padStart(2, '0') + ":" + sec.toString().padStart(2, '0');
        return t;
    },

    detectBrowser() {
        const userAgent = navigator.userAgent;
        let browserName, fullVersion, majorVersion;
        function getHard(str) {
            let str1 = str.substring(str.indexOf("("), str.indexOf(")"));
            return str1.substring(str1.lastIndexOf(";") + 2, str1.length)
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

    getOSInfo() {
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

    getMemoryUsage() {
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

    getBatteryInfo() {
        if ('getBattery' in navigator) {
            navigator.getBattery().then(function (battery) {
                console.log("Battery level: " + battery.level * 100 + "%");
                console.log("Battery state: " + battery.charging);
                return {
                    level: battery.level,
                    state: battery.charging
                };
            });
        }
    },

    getIp() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                ipAddress = data.ip;
                console.log('您的 IP 地址：' + ipAddress);
            })
            .catch(error => {
                console.error('获取 IP 地址失败:', error);
            });
    },

    showNote(text, style, delay) {
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

    showMessage(text, style, delay) {
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

    randomColor() {
        var colors = ["rgba(0,150,255,.95)", "rgba(0,255,150,.95)", "rgba(255,150,0,.95)", "rgba(255,0,150,.95)", "rgba(150,255,0,.95)", "rgba(150,0,255,.95)"];
        var n = Math.floor(Math.random() * 6); //随机0-5
        return colors[n];
    }
}

// *************************************************** 控制模块 ***************************************************************

var ctrl = {

    GlobalTheme(e) {
        console.log(`changed to ${e.matches ? "dark" : "light"} mode`);
        if (e.matches) {
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
    switchDarkMode() {
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
    showConsole() {
        document.querySelector("#console-music-item-main").classList.add("item-show");
        document.querySelector("#console").classList.add("show");
        document.body.style.overflow = 'hidden';
        ctrl.initConsoleState();
    },

    // 隐藏中控台
    hideConsole() {
        var items = document.querySelectorAll(".item-show");
        for (let i = 0; i < items.length; i++) items[i].classList.remove("item-show");
        document.querySelector("#console").classList.remove("show");
        document.body.style.overflow = '';
    },

    // 菜单返回
    consoleBackBtn() {
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
    ircShowHide() {
        var irc = document.querySelector(".aplayer > .aplayer-lrc-hide"); //这里防止与音乐页面的控制冲突
        var a = document.querySelector(".aplayer > .aplayer-lrc");
        var b = document.querySelector("#ircItem");
        if (a && b) {
            if (irc === null) {
                a.classList.add("aplayer-lrc-hide");
                b.classList.remove("on");
                localStorage.setItem('lrc_state', false);
                if (set_notice.checked) tools.showMessage("桌面歌词已关闭", "success", 2);
            } else {
                a.classList.remove("aplayer-lrc-hide");
                b.classList.add("on");
                localStorage.setItem('lrc_state', true);
                if (set_notice.checked) tools.showMessage("桌面歌词已打开", "success", 2);
            }
        }
    },

    // 单栏显示
    hideAsideBtn() {
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

    settingsOpen() {
        alert("开发中...敬请期待！");
    },

    // 导航栏音乐
    musicSwitch() {
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

    musicForward() {
        document.querySelector("meting-js").aplayer.skipForward();
        ctrl.getMusicInfo();
    },

    musicBackward() {
        document.querySelector("meting-js").aplayer.skipBack();
        ctrl.getMusicInfo();
    },

    // 获取歌曲信息
    getMusicInfo() {
        var music_id = document.querySelector("meting-js").aplayer.list.index; //当前曲目的id
        var music_cover = document.querySelector("meting-js").aplayer.list.audios[music_id].cover;
        var music_author = document.querySelector("meting-js").aplayer.list.audios[music_id].author;
        var music_title = document.querySelector("meting-js").aplayer.list.audios[music_id].title;
        document.getElementById("console-music-cover").innerHTML = "<img src='" + music_cover + "' style='width:100%;height:100%;border-radius:8px;'>";// 歌曲信息
        document.getElementById("console-music-title-text").innerHTML = music_title;
        document.getElementById("console-music-author-text").innerHTML = music_author;
        ctrl.marqueeMusicInfo();
    },

    refreshProgress() {
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
    importMusicList() {
        var audios = document.querySelector("meting-js").aplayer.list.audios;
        var list_html;
        for (let i = 0; i < audios.length; i++) {
            list_html = document.getElementById("console-music-list").innerHTML;
            document.getElementById("console-music-list").innerHTML = list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='iconfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].title + "</a><a class='list-music-author' data-pjax-state=''> - " + audios[i].author + "</a></div></li>";
        }
    },

    // 歌单切换
    changeMusicList(Music_id, Music_server) {
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

    JayMusicList() {
        var ap = document.querySelector("meting-js").aplayer;
        ap.list.clear();
        console.log("本专辑有" + JaySongsheet.length + "首歌曲");
        ap.list.add(JaySongsheet);
    },

    JokerMusicList() {
        var ap = document.querySelector("meting-js").aplayer;
        ap.list.clear();
        console.log("本专辑有" + QianSongsheet.length + "首歌曲");
        ap.list.add(QianSongsheet);
    },

    // 音乐状态检测（已添加事件监听器，修复点击aplayer后导航栏和控制中心不同步的问题）
    musicState() {
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
    },

    marqueeMusicInfo() {
        if (marqueeContent1.offsetWidth > marqueeContainer1.offsetWidth) {
            // marqueeContent1.style.animation = 'marquee-1 10s linear infinite'
            var speed = marqueeContent1.offsetWidth / marqueeContainer1.offsetWidth * 6
            marqueeContent1.style.animation = 'marquee-1 ' + speed + 's linear infinite'
        } else {
            marqueeContent1.style.animation = ''
        }
        if (marqueeContent2.offsetWidth > marqueeContainer2.offsetWidth) {
            // marqueeContent2.style.animation = 'marquee-1 10s linear infinite'
            var speed = marqueeContent2.offsetWidth / marqueeContainer2.offsetWidth * 6
            marqueeContent2.style.animation = 'marquee-1 ' + speed + 's linear infinite'
        } else {
            marqueeContent2.style.animation = ''
        }
    },

    //初始化console图标
    initConsoleState() {
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
    },

    // 获取并刷新主题色
    refreshThemeColor() {
        var cover = document.getElementById("page-header");
        if (cover) {
            var apiUrl = cover.style.backgroundImage.slice(5, -2) + "?x-oss-process=image/average-hue";
            fetch(apiUrl).then(response => response.json()).then(data => {
                var mainColor = "#" + data.RGB.slice(2,);
                console.log("主色调为：" + mainColor);
                document.documentElement.style.setProperty('--gavin-main-color', mainColor);
            })
                .catch(error => console.error(error));
        }
    },

    //侧滑菜单只展开一节
    sidebarItemsFold() {
        let e = document.querySelectorAll("#sidebar-menus .menus_items .site-page.group");
        e && e.forEach(t => {
            t.addEventListener("click", () => {
                e.forEach(e => {
                    e != t && e.classList.add("hide")
                })
            })
        })
    },

    // 页码跳转
    toPageJump() {
        let e = document.querySelector("#pagination input.toPageInput");
        function k(v) {
            var p = window.location.pathname,
                i = [],
                c = -1;
            while ((c = p.indexOf('/', c + 1)) !== -1) i.push(c) // i是所有/的索引
            var l = i.length
            if (l == 1 || p.substring(1, i[l-2]) == "page") return ["/#content-inner", `/page/${v}/#content-inner`]
            else if (l >= 4 && p.substring(i[l-3]+1, i[l-2]) == "page") {
                var j = p.substring(0, i[l-3]+1)
                return [`${j}`, `${j}page/${v}/`]
            } else return [`${p}`, `${p}page/${v}/`]
        }
        e && (e.addEventListener("input", () => {
            let t = document.querySelectorAll(".page-number")
                , n = t[t.length - 1].innerHTML;
            Number(e.value) > n && (e.value = n),
                Number(e.value) < 1 && (e.value = "")
        }),
            e.addEventListener("keyup", t => {
                "Enter" == t.key && "" != e.value && "0" != e.value && pjax.loadUrl("1" == e.value ? k(e.value)[0] : k(e.value)[1])
            })
        )
    },

    getCurrentPage() {
        if (window.innerWidth <= 768 && (document.querySelector("#body-wrap.page.home") || document.getElementById("tag") || document.getElementById("category") || document.getElementById("archive"))) {
            var currentPage = document.querySelector(".pagination .page-number.current").innerHTML;
            if (currentPage) {
                var toPage = document.querySelector(".pagination .toPageInput");
                if (toPage) {
                    toPage.placeholder = "第 " + currentPage + " 页";
                }
            }
        }
    },

    scrollCategoryBarToRight() {
        var e = document.getElementById("category-bar-items")
            , t = document.querySelector(".category-bar-more");
        function o() {
            t.style.transform = Math.ceil(e.scrollLeft) + Math.ceil(e.clientWidth) >= Math.ceil(e.scrollWidth) ? "rotate(180deg)" : ""
        }
        e.addEventListener("scroll", o);
        var n = Math.ceil(e.clientWidth);
        e && (Math.ceil(e.scrollLeft) + Math.ceil(e.clientWidth) >= Math.ceil(e.scrollWidth) ? (e.scroll({
            left: 0,
            behavior: "smooth"
        }),
            t.style.transform = "",
            e.removeEventListener("scroll", o)) : (e.scrollBy({
                left: n,
                behavior: "smooth"
            }),
                t.style.transform = ""))
    },

    scrollTagBarToEnd() {
        var e = document.getElementById("tag-bar-items")
            , t = document.querySelector(".tag-bar-more i");
        if (t.style.transform == "rotate(180deg)") {
            e.style.maxHeight = window.innerWidth <= 768 ? "111px" : "32px";
            t.style.transform = ""
        } else {
            e.style.maxHeight = "calc(100vh - 155px)"
            t.style.transform = "rotate(180deg)"
        }
    },

    refreshLikeCount() {
        var p = window.location.pathname
        var q = p.substring(1,5)
        if (q == 'post') {
            var i = p.substring(6,14)
            fetch(`https://apis.cansin.top/likecount?mode=get&id=${i}`)
                .then(response => response.json())
                .then(data => {
                    if (data.code == 200) {
                        var likeCount = data.content[0].count
                        document.querySelector(".post-reward .like-button .like-count").innerText = likeCount
                    } else console.log(data.message)
                })
                .catch(error => {
                    console.error('获取点赞信息失败:', error)
                })
        }
    },

    sendArticleLike() {
        var a = document.querySelector(".post-reward .like-button")
        var i = window.location.pathname.substring(6,14)
        a.classList.add("loading")
        fetch(`https://apis.cansin.top/likecount?mode=add&id=${i}&ip=${ipAddress}`)
            .then(response => response.json())
            .then(data => {
                if (data.code == 200) {
                    var likeCount = data.content[0].count
                    a.querySelector(".like-count").innerText = likeCount
                    a.classList.remove("loading")
                    tools.showMessage("感谢您的认可！", "success", 2)
                } else if(data.code == 205) {
                    a.classList.remove("loading")
                    tools.showMessage(data.message, "warning", 2)
                } else {
                    a.classList.remove("loading")
                    console.log(data.message)
                    tools.showMessage(data.message, "error", 2)
                }
            })
            .catch(error => {
                console.error('获取点赞信息失败:', error)
                a.classList.remove("loading")
            })
    },

    getLocationWeather() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                ipAddress = data.ip;
                console.log("IP 地址：" + ipAddress);
                fetch('https://apis.cansin.top/weather?ip=' + ipAddress + '&output=jsonp')
                    .then(response => response.json())
                    .then(data => {
                        console.log(data);
                        var day0 = data.weatherJson.daily[0];
                        var day1 = data.weatherJson.daily[1];
                        var day2 = data.weatherJson.daily[2];
                        var district = data.locationJson.result.ad_info.district;
                        var city = data.locationJson.result.ad_info.city;
                        var province = data.locationJson.result.ad_info.province;
                    })
                    .catch(error => {
                        console.error('获取天气信息失败:', error);
                    })
            })
            .catch(error => {
                console.error('获取 IP 地址失败:', error);
            });
    },

    // 表情放大
    owoBig() {
        let flag = 1, // 设置节流阀
            owo_time = '', // 设置计时器
            m = 3; // 设置放大倍数
        // 创建盒子
        let div = document.createElement('div'),
            body = document.querySelector('body');
        // 设置ID
        div.id = 'owo-big';
        // 插入盒子
        body.appendChild(div);
        // 构造observer
        let observer = new MutationObserver(mutations => {
            for (let i = 0; i < mutations.length; i++) {
                let dom = mutations[i].addedNodes,
                    owo_body = '';
                if (dom.length == 2 && dom[1].className == 'OwO-body') owo_body = dom[1];
                // 如果需要在评论内容中启用此功能请解除下面的注释
                // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
                else continue;
                // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
                if (document.body.clientWidth <= 768) owo_body.addEventListener('contextmenu', e => e.preventDefault());
                // 鼠标移入
                owo_body.onmouseover = (e) => {
                    if (flag && e.target.tagName == 'IMG') {
                        flag = 0;
                        // 移入300毫秒后显示盒子
                        owo_time = setTimeout(() => {
                            let height = e.target.clientHeight * m, // 盒子高 2023-02-16更新
                                width = e.target.clientWidth * m, // 盒子宽 2023-02-16更新
                                left = (e.x - e.offsetX) - (width - e.target.clientWidth) / 2, // 盒子与屏幕左边距离 2023-02-16更新
                                top = e.y - e.offsetY; // 盒子与屏幕顶部距离
                            if ((left + width) > body.clientWidth) left -= ((left + width) - body.clientWidth + 10); // 右边缘检测，防止超出屏幕
                            if (left < 0) left = 10; // 左边缘检测，防止超出屏幕
                            // 设置盒子样式
                            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
                            // 在盒子中插入图片
                            div.innerHTML = `<img src="${e.target.src}">`
                        }, 300);
                    }
                };
                // 鼠标移出隐藏盒子
                owo_body.onmouseout = () => { div.style.display = 'none', flag = 1, clearTimeout(owo_time); }
            }
        })
        observer.observe(document.getElementById('post-comment'), { subtree: true, childList: true }) // 监听的 元素 和 配置项
    },

    coverFlow() {
        var p = window.location.pathname
        var q = p != '/' ? p.match(/\/([^/]+)\//)[1] : ''
        if (q == 'movies') {
            var a = document.getElementById('head-cover')
            var b = a.querySelector('.head-cover-img')
            // const w0 = 2485;
            // const h0 = 600;
            // var w1 = a.clientWidth
            // var h1 = a.clientHeight
            // var w = h1 / h0 * w0
            // var t = (w - w1) / 5
            if (!b.style.objectPosition) b.style.objectPosition = 'calc(50% - 75px) center'
            if (!b.style.filter) b.style.filter = 'blur(1.5px) brightness(0.7)'
            if (!b.style.transform) b.style.transform = 'rotate(-15deg) scale(2)'
            if (!b.style.animation) b.style.animation = 'coverFlow ' + 30 + 's infinite linear'
        } else if (q == 'about') {
            var b = document.querySelector('#head-cover .head-cover-img')
            if (!b.style.objectPosition) b.style.objectPosition = 'center 20%'
        } else if (q == 'link') {
            document.querySelector('#post-comment .comment-head').insertAdjacentHTML('beforeend', '<a class="apply-for-flink" onclick="ctrl.applyForFlink()">申请友链</a>')
        }
    },

    applyForFlink() {// 快速申请友链
        document.querySelector('#twikoo .tk-comments > .tk-submit .el-textarea textarea').value = '```YML\n- name: \n  link: \n  avatar: \n  descr: \n  siteshot: \n```'
    }
}

// +++++++++++++++++++++++++++ categoryBar分类条（或标签条） +++++++++++++++++++++++++++++++
if (document.getElementById("category-bar-items")) {
    categoriesBarActive();
    // topCategoriesBarScroll();
    categoryBarMask();
}

function categoryBarMask() {
    var categoryBarItems = document.getElementById("category-bar-items");
    var x = Math.ceil(categoryBarItems.scrollLeft)
        , y = Math.ceil(categoryBarItems.clientWidth)
        , z = Math.ceil(categoryBarItems.scrollWidth);
    if (x == 0 && z <= y) {
        categoryBarItems.style.webkitMaskImage = ""
    } else if (x == 0 && z > y) {
        categoryBarItems.style.webkitMaskImage = "linear-gradient(-90deg,transparent,#fff 20px)"
    } else if (x > 0 && x + y < z) {
        categoryBarItems.style.webkitMaskImage = "linear-gradient(90deg,transparent,#fff 20px,#fff calc(100% - 20px),transparent)"
    } else if (x > 0 && x + y >= z) {
        categoryBarItems.style.webkitMaskImage = "linear-gradient(90deg,transparent,#fff 20px)"
    }
    categoryBarItems.addEventListener("scroll", categoryBarMask);
}

//分类条
function categoriesBarActive() {
    if (document.querySelector('#category-bar')) {
        $(".category-bar-item").removeClass("select")
    }
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    // console.log(urlinfo);
    //判断是否是首页
    if (urlinfo == '/') {
        if (document.querySelector('#category-bar')) {
            document.getElementById('首页').classList.add("select")
        }
    } else {
        // 验证是否是分类链接
        var pattern = /\/categories\/.*?\//;
        var patbool = pattern.test(urlinfo);
        // console.log(patbool);
        // 获取当前的分类
        if (patbool) {
            var valuegroup = urlinfo.split("/");
            // console.log(valuegroup[2]);
            // 获取当前分类
            var nowCategorie = valuegroup[2];
            if (document.querySelector('#category-bar')) {
                document.getElementById(nowCategorie).classList.add("select");
            }
        }
    }
}

// 如果是标签条则启用，同时注释掉分类条
// tagsBarActive()
//标签条
function tagsBarActive() {
    if (document.getElementById("tag-bar-items")) {
        var j = document.querySelector(".article-sort-title").innerText.slice(5);
        document.getElementById(j).classList.add("select");
    }
}

tagsBarActive();

function tagsBarActive_0() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    //console.log(urlinfo);
    //判断是否是首页
    if (urlinfo == '/') {
        if (document.querySelector('#tags-bar')) {
            document.getElementById('首页').classList.add("select")
        }
    } else {
        // 验证是否是分类链接
        var pattern = /\/tags\/.*?\//;
        var patbool = pattern.test(urlinfo);
        //console.log(patbool);
        // 获取当前的标签
        if (patbool) {
            var valuegroup = urlinfo.split("/");
            //console.log(valuegroup[2]);
            // 获取当前分类
            var nowTag = valuegroup[2];
            if (document.querySelector('#category-bar')) {
                document.getElementById(nowTag).classList.add("select");
            }
        }
    }
}

//鼠标控制横向滚动
function topCategoriesBarScroll() {
    if (document.getElementById("category-bar-items")) {
        let xscroll = document.getElementById("category-bar-items");
        xscroll.addEventListener("mousewheel", function (e) {
            //计算鼠标滚轮滚动的距离
            let v = -e.wheelDelta / 2;
            xscroll.scrollLeft += v;
            //阻止浏览器默认方法
            e.preventDefault();
        }, false);
    }
}

// ******************************************************** 监听器 *******************************************************************

// F12控制台
document.onkeydown = function (e) {
    if (123 == e.keyCode || (e.ctrlKey && e.shiftKey && (74 === e.keyCode || 73 === e.keyCode || 67 === e.keyCode)) || (e.ctrlKey && 85 === e.keyCode)) return tools.showNote("开发者模式已打开，请遵循GPL协议", "warning", 5)
};

// 复制事件
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
    // document.getElementById("console-music-item-main").classList.remove("item-show");
    document.getElementById("console-music-item-list").classList.add("item-show");
});
music_list_title.addEventListener("click", () => {
    // document.getElementById("console-music-item-list").classList.remove("item-show");
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
        localStorage.setItem('system_theme_state', true);
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
        localStorage.setItem('system_theme_state', false);
        colorSchemeQuery.removeListener(ctrl.GlobalTheme);
    }
});

// 字体大小设置
var set_font_size = document.querySelector("#set-font-size input");
set_font_size.addEventListener("change", () => {
    // getComputedStyle(document.documentElement).getPropertyValue('--global-font-size')
    document.documentElement.style.setProperty('--global-font-size', set_font_size.value + 'px');
});


// 歌单列表监听器
const songsheets = [
    { id: "songsheet-1", text: "周杰伦", flag: 1, func: () => ctrl.JayMusicList() },
    { id: "songsheet-2", text: "薛之谦/李荣浩", flag: 1, func: () => ctrl.JokerMusicList() },
    { id: "songsheet-3", text: "纯音乐", flag: 1, func: () => ctrl.changeMusicList("8167030216", "netease") },
    { id: "songsheet-4", text: "外语", flag: 1, func: () => ctrl.changeMusicList("8658340188", "netease") },
    { id: "songsheet-5", text: "古风", flag: 1, func: () => ctrl.changeMusicList("8167066222", "netease") },
    { id: "songsheet-6", text: "默认歌单", flag: 1, func: () => ctrl.changeMusicList("8086610771", "netease") }
];
songsheets.forEach((songsheet, index) => {
    const element = document.getElementById(songsheet.id);
    element.addEventListener("click", () => {
        document.getElementById("console-loading-icon").classList.add("show");
        console.log(`正在切换至${songsheet.text}专辑`);
        global_music_flag = songsheet.flag;
        songsheet.func();
        document.getElementById("music-list-title").innerHTML = songsheet.text;
    });
});

var addSongsheet = document.getElementById("songsheet-add");
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
