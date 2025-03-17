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
    if (set_fps.checked || localStorage.getItem('fps_state') === 'true') {
        tools.updateFPS();
        document.getElementById("fps-box").style.display = 'flex';
    }
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
    if (set_fps.checked || localStorage.getItem('fps_state') === 'true') {
        document.getElementById("fps-box").style.display = 'flex';
    }
}) // pjax加载完成（切换页面）后再执行一次

// ************************************************ 函数部分 **************************************************************
const marqueeContainer1 = document.getElementById('console-music-title');
const marqueeContent1 = document.getElementById('console-music-title-text');
const marqueeContainer2 = document.getElementById('console-music-author');
const marqueeContent2 = document.getElementById('console-music-author-text');
var userInfo;
var ipAddress = '';
var frameCount = 0;
var startTime = performance.now();
let animationId;
var winbox = '';

if ('paintWorklet' in CSS) { CSS.paintWorklet.addModule(CDNURL + '/js/paint.min.js'); }

window.onload = function () {
    var set_music = document.querySelector("#set-switch-music input");
    function dodododoooAdd() {
        var link = document.createElement('link');
        link.id = 'dodododooocss';
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = 'https://dodododooo.com/mplayer2/remote/css/app-mplayer.css';
        var head = document.head || document.getElementsByTagName('head')[0];
        head.appendChild(link);
        var script = document.createElement('script');
        script.id = 'dodododooojs';
        script.type = 'text/javascript';
        script.src = 'https://dodododooo.com/mplayer2/remote/js/app-mplayer.js';
        document.body.appendChild(script);
    }
    function dodododoooDel() {
        var link = document.getElementById('dodododooocss');
        if (link) document.head.removeChild(link);
        var script1 = document.getElementById('dodododooojs');
        if (script1) document.body.removeChild(script1);
        var script2 = document.getElementById('mplayer');
        if (script2) document.body.removeChild(script2);
    }
    if (set_music.checked) dodododoooAdd();
    set_music.addEventListener('change', () => {
        set_music.checked ? dodododoooAdd() : dodododoooDel();
    });
    if (localStorage.getItem('notice_state') != null) {
        set_notice.checked = localStorage.getItem('notice_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('fps_state') != null) {
        set_fps.checked = localStorage.getItem('fps_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('scroll_state') != null) {
        set_scroll.checked = localStorage.getItem('scroll_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('lrc_state') != null) {
        localStorage.getItem('lrc_state') == 'true' ? document.getElementById("lrcSwitchBtn").click() : null;
    }
    if (localStorage.getItem('system_theme_state') != null) {
        set_sys_theme.checked = localStorage.getItem('system_theme_state') == 'true' ? true : false;
    }
    if (localStorage.getItem('theme-color') != null) {
        ctrl.changeThemeColor(localStorage.getItem('theme-color'))
    }
    if (localStorage.getItem('aside-direction') != null) {
        if (localStorage.getItem('aside-direction') == 'right') ctrl.asideContentDirection()
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
    // console.clear();
    console.log("\n %c GC音频控制器 v1.3.2 参星阁出品 %c https://blog.cancin.cn \n", "color: #fadfa3; background: #030307; padding:5px 0;", "background: #fadfa3; padding:5px 0;")
    console.log(`Welcome to:\n%c参星阁:%c https://blog.cancin.cn%c\nThis site has been running stably for %c${Math.round(((new Date).getTime() - new Date("2023/01/04 20:53:58").getTime()) / 864e5)} %c days`, "border:1px #888 solid;border-right:0;border-radius:5px 0 0 5px;padding: 5px 10px;color:white;background:#4976f5;margin:10px 0", "border:1px #888 solid;border-left:0;border-radius:0 5px 5px 0;padding: 5px 10px;", "", "color:#4976f5", "")
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
        btn = document.getElementById("percent"); // 获取图标
        // opacity = Math.floor(a) / document.documentElement.clientHeight;
    result <= 99 || (result = 99), (btn.innerHTML = result);
    // let h = document.documentElement.clientHeight;
    // if (document.getElementById('body-wrap').classList.contains('home')) {
    //     if(!document.getElementById('page-header').classList.contains('nav-visible') && a > 50 && a < h / 2){
    //         btf.scrollToDest(document.getElementById('content-inner').offsetTop, 300)
    //     }else if(document.getElementById('page-header').classList.contains('nav-visible') && a < h - 50 && a >= h / 2){
    //         btf.scrollToDest(document.getElementById('body-wrap').offsetTop, 300)
    //     }
    // }
    // document.documentElement.getAttribute('data-theme') === 'dark' ? 
    //     document.documentElement.style.setProperty('--web-bg', 'rgba(0,0,0,' + (opacity * 0.75 + 0.25) + ')') : 
    //     document.documentElement.style.setProperty('--web-bg', 'rgba(241,243,245,' + opacity + ')');
}
window.onscroll = percent; // 返回顶部 显示网页阅读进度

// 侧边栏日历卡片
function cardTimes() {
    year = now.getFullYear();
    month = now.getMonth();
    week = now.getDay();
    date = now.getDate();
    hours = now.getHours();
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
            case 0: monthStr = "1月"; dates = 31; break;
            case 1: monthStr = "2月"; dates = year_flag ? 29 : 28; break;
            case 2: monthStr = "3月"; dates = 31; break;
            case 3: monthStr = "4月"; dates = 30; break;
            case 4: monthStr = "5月"; dates = 31; break;
            case 5: monthStr = "6月"; dates = 30; break;
            case 6: monthStr = "7月"; dates = 31; break;
            case 7: monthStr = "8月"; dates = 31; break;
            case 8: monthStr = "9月"; dates = 30; break;
            case 9: monthStr = "10月"; dates = 31; break;
            case 10: monthStr = "11月"; dates = 30; break;
            case 11: monthStr = "12月"; dates = 31; break;
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
            case 4: gap.style.fontSize = "36px"; break;
            case 5: gap.style.fontSize = "48px"; break;
            case 6: gap.style.fontSize = "64px"; break;
            default: gap.style.fontSize = "64px";
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
        const t_y = new Date().getFullYear();
        var anniversary = new Date(t_y + "/12/20 08:30:00");
        var countDown = Math.floor((anniversary - now) / 1e3 / 60 / 60 / 24);
        asideTime = new Date(t_y + "/01/01 00:00:00");	// 侧边栏倒计时
        asideDay = (now - asideTime) / 1e3 / 60 / 60 / 24;
        asideDayNum = Math.floor(asideDay);
        var asideWeekNum = ((week - asideDayNum % 7) >= 0) ? (Math.ceil(asideDayNum / 7)) : (Math.ceil(asideDayNum / 7) + 1);
        cardWidgetCalendar.querySelector("#calendar-week").innerHTML = "第" + asideWeekNum + "周&nbsp;" + weekStr; //星期
        cardWidgetCalendar.querySelector("#calendar-date").innerHTML = date.toString().padStart(2, '0'); //日期
        cardWidgetCalendar.querySelector("#calendar-solar").innerHTML = year + "年" + monthStr + "&nbsp;第" + asideDay.toFixed(0) + "天"; //年份
        cardWidgetCalendar.querySelector("#calendar-lunar").innerHTML = ganzhiYear + animalYear + "年&nbsp;" + lunarMon + lunarDay; //农历
        document.getElementById("schedule-days").innerHTML = countDown; //农历
    }
}

// 侧边公告卡片
function asideNote() {
    var noteCard = document.querySelector(".card-widget.card-announcement");
    if (noteCard) {
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
            return str1.substring(str1.lastIndexOf(";") + 2, str1.length);
        }
        let h = userAgent.substring(userAgent.indexOf("(") + 1, userAgent.indexOf(")")).toLowerCase();
        let hard;
        if (h.indexOf("hmscore") != -1 || h.indexOf("huawei") != -1 || h.indexOf("harmonyos") != -1) {
            hard = 'HarmonyOS设备'
        } else if (h.indexOf("windows") != -1) {
            hard = 'PC'
        } else if (h.indexOf("iphone") != -1) {
            hard = 'iPhone'
        } else if (h.indexOf("ipad") != -1) {
            hard = 'iPad'
        } else if (h.indexOf("macintosh") != -1) {
            hard = 'Mac'
        } else if (h.indexOf("android") != -1) {
            hard = 'Android';
        } else if (h.indexOf("cros") != -1) {
            hard = 'ChromeOS设备';
        } else if (h.indexOf("playstation") != -1) {
            hard = 'PlayStation';
        } else if (h.indexOf("symbian") != -1) {
            hard = 'Symbian';
        } else if (h.indexOf("linux") != -1) {
            hard = 'Linux';
        }
        let u = userAgent.toLowerCase();
        if (/firefox[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测Firefox
            browserName = "Firefox";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/edge[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /edg[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /edga[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /edgios[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测Edge
            browserName = "Edge";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/hbpc[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /huaweibrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测华为浏览器
            browserName = "HUAWEI Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/miuibrowser[\/\s](\d+\.\d+\.\d+)/.test(u)) {
            // 检测小米浏览器
            browserName = "MIUI Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/vivobrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测vivo浏览器
            browserName = "vivo Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/heytapbrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测vivo浏览器
            browserName = "OPPO Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/baiduboxapp[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /baidubrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测百度浏览器
            browserName = "Baidu Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/ucbrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /ubrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测UC浏览器
            browserName = "UC Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/quark[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测夸克浏览器
            browserName = "Quark Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/mqqbrowser[\/\s](\d+\.\d+\.\d+)/.test(u) || /mqqbrowser[\/\s](\d+\.\d+)/.test(u) || /qqbrowser[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测QQ浏览器
            browserName = "QQ Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/micromessenger[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测微信浏览器
            browserName = "Wechat Browser";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/opr[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测Opera
            browserName = "Opera";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/crios[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u) || /chrome[\/\s](\d+\.\d+\.\d+\.\d+)/.test(u)) {
            // 检测Chrome
            browserName = "Chrome";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/safari[\/\s](\d+\.\d+\.\d+)/.test(u) || /safari[\/\s](\d+\.\d+)/.test(u)) {
            // 检测Safari
            /version[\/\s](\d+\.\d+)/.test(u);
            browserName = "Safari";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else if (/msie (\d+\.\d+);/.test(u) || /trident[\/\s](\d+\.\d+)/.test(u)) {
            // 检测IE
            browserName = "Internet Explorer";
            fullVersion = RegExp.$1;
            majorVersion = parseInt(RegExp.$1, 10);
        } else {
            // 无法检测浏览器
            browserName = "Unknown";
            fullVersion = "Unknown";
            majorVersion = 0;
        }
        return {
            name: browserName, // 浏览器名称
            version: fullVersion, // 浏览器详细版本号
            majorVersion: majorVersion, // 主版本号
            hard: hard // 硬件平台
        };
    },
    // 帮我改进以上的代码，目前有几个识别错误：
    // 第一个是PC端华为浏览器，userAgent的值是：Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36 HBPC/12.1.3.306。可以增加对HBPC字段的匹配，识别为华为浏览器PC版，版本号为12.1.3.306，硬件平台是x64；
    // 第二个是移动端华为浏览器，userAgent的值是：Mozilla/5.0 (Linux; Android 12; HarmonyOS; NOH-AN00; HMSCore 6.12.2.302) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.88 HuaweiBrowser/14.0.3.340 Mobile Safari/537.36。可以增加对HuaweiBrowser字段的匹配，识别为华为浏览器，版本号为14.0.3.340，硬件平台是NOH-AN00；
    // 第三个是手机端的Edge浏览器，userAgent的值是：Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Mobile Safari/537.36 EdgA/118.0.2088.66。可以增加对EdgA字段的匹配，识别为Edge浏览器，版本号为118.0.2088.66，硬件平台是K；
    // 第四个是PC端的Edge浏览器，userAgent的值是：'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'。增加对Edg字段的匹配，识别为Edge浏览器，版本号为119.0.0.0，硬件平台是x64；
    // 第五个是iPad端的Safari浏览器，userAgent的值是：Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15，应该识别到Safari浏览器，版本号为17.2，硬件平台是iPad；
    // 第六个是iPad端的Chrome浏览器，userAgent的值是：Mozilla/5.0 (iPad; CPU OS 17_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/119.0.6045.109 Mobile/15E148 Safari/604.1。增加对CriOS字段的匹配，识别为Chrome（iPad版）浏览器，版本号为119.0.6045.109，硬件平台是iPad。
    // 第七个是手机端的小米浏览器，Mozilla/5.0 (Linux; U; Android 13; zh-cn; 22127RK46C Build/TKQ1.220905.001) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/100.0.4896.127 Mobile Safari/537.36 XiaoMi/MiuiBrowser/17.6.70714 swan-mibrowser。增加对MiuiBrowser字段的匹配，识别为小米浏览器，版本号为17.6.70714。
    getOSInfo() {
        let osName = "unknown";
        let osVersion = "unknown";
        let u = navigator.userAgent;
        if (u.indexOf("Windows") != -1) {
            osName = "Windows";
            if (u.indexOf("Windows NT 10.0") != -1) {
                osVersion = "10";
            } else if (u.indexOf("Windows NT 6.3") != -1) {
                osVersion = "8.1";
            } else if (u.indexOf("Windows NT 6.2") != -1) {
                osVersion = "8";
            } else if (u.indexOf("Windows NT 6.1") != -1) {
                osVersion = "7";
            } else if (u.indexOf("Windows NT 6.0") != -1) {
                osVersion = "Vista";
            } else if (u.indexOf("Windows NT 5.1") != -1) {
                osVersion = "XP";
            } else if (u.indexOf("Windows NT 5.0") != -1) {
                osVersion = "2000";
            }
        } else if (u.indexOf("iPhone OS") != -1) {
            osName = "iOS";
            osVersion = u.match(/OS\s([\d_]+)/)[1].replace(/_/g, '.');
        } else if (u.indexOf("iPad") != -1) {
            osName = "iPadOS";
            osVersion = u.match(/CPU OS\s([\d_]+)/)[1].replace(/_/g, '.');
        } else if (u.indexOf("Mac OS X") != -1) {
            osName = "macOS";
            osVersion = u.match(/Mac OS X\s([\d_]+)/)[1].replace(/_/g, '.');
        } else if (u.indexOf("Android 10") != -1 && (u.toLowerCase().indexOf("huawei") != -1 || u.indexOf("HarmonyOS") != -1 || u.indexOf("HMSCore") != -1)) {
            osName = "HarmonyOS";
            osVersion = 3;
        } else if (u.indexOf("Android 11") != -1 && (u.toLowerCase().indexOf("huawei") != -1 || u.indexOf("HarmonyOS") != -1 || u.indexOf("HMSCore") != -1)) {
            osName = "HarmonyOS";
            osVersion = 3;
        } else if (u.indexOf("Android 12") != -1 && (u.toLowerCase().indexOf("huawei") != -1 || u.indexOf("HarmonyOS") != -1 || u.indexOf("HMSCore") != -1)) {
            osName = "HarmonyOS";
            osVersion = 4;
        } else if (navigator.userAgent.indexOf("Android") != -1) {
            osName = "Android";
            osVersion = navigator.userAgent.match(/Android\s([\d.]+)/)[1];
        } else if (navigator.userAgent.indexOf("Linux") != -1) {
            osName = "Linux";
        }
        return {
            name: osName,
            version: osVersion
        };
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
        // https://ip.jackjyq.com/json, https://2024.ipchaxun.com, https://api.ipify.org/?format=json
        if (localStorage.getItem('ipAddress') == null) {
            fetch(ipAPI)
                .then(response => response.json())
                .then(data => {
                    // userInfo = data;
                    ipAddress = data.ip;
                    localStorage.setItem('ipAddress', ipAddress);
                    console.log('您的 IP 地址：' + ipAddress);
                })
                .catch(error => {
                    console.error('获取 IP 地址失败:', error);
                });
        } else {
            ipAddress = localStorage.getItem('ipAddress');
        }
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

    updateFPS() {
        frameCount++;
        var currentTime = performance.now();
        var elapsedTime = currentTime - startTime;
        if (elapsedTime >= 1000) {
            var fps = Math.round((frameCount * 1000) / elapsedTime);
            document.querySelector("#fps-box .fps-text").textContent = fps;
            // 重置计数器
            frameCount = 0;
            startTime = currentTime;
        }
        animationId = requestAnimationFrame(tools.updateFPS);
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
            document.getElementById("set-theme-dark").click();
        } else {
            document.getElementById("set-theme-light").click();
        }
        typeof utterancesTheme === 'function' && utterancesTheme();
        typeof changeGiscusTheme === 'function' && changeGiscusTheme();
        typeof FB === 'object' && window.loadFBComment();
        typeof runMermaid === 'function' && window.runMermaid();
    },

    // 显示中控台
    showConsole() {
        document.getElementById("console-music-item-main").classList.add("item-show");
        document.getElementById("console").classList.add("show");
        if(!set_scroll.checked || localStorage.getItem('scroll_state') === 'false')document.body.style.overflow = 'hidden';
        ctrl.initConsoleState();
    },

    // 隐藏中控台
    hideConsole() {
        var items = document.querySelectorAll(".item-show");
        for (let i = 0; i < items.length; i++) items[i].classList.remove("item-show");
        document.getElementById("console").classList.remove("show");
        document.body.style.overflow = '';
    },

    // 菜单返回
    consoleBackBtn() {
        var top_item = document.querySelectorAll(".item-show");
        if (top_item.length > 0) {
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
        }
    },

    // 桌面歌词
    lrcShowHide() {
        var a = document.querySelector(".global-music .aplayer-lrc");
        var b = document.getElementById("lrcItem");
        if (a && b) {
            if (!a.classList.contains("aplayer-lrc-hide")) {
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
            document.getElementById("asideItem").classList.remove("on");
            if (set_notice.checked) tools.showMessage("侧边栏已启用", "success", 2);
        } else {
            saveToLocal.set('aside-status', 'hide', 2);
            document.getElementById("asideItem").classList.add("on");
            if (set_notice.checked) tools.showMessage("侧边栏已隐藏", "success", 2);
        }
        $htmlDom.toggle('hide-aside');
    },

    settingsOpen() {
        alert("开发中...敬请期待！");
    },

    // 导航栏音乐
    musicSwitch() {
        var music_state = document.querySelector(".global-music").aplayer.audio.paused;
        var a = document.querySelector("#music-Switch i");
        var b = document.querySelector("#music-ctrl-btn-center i");
        if (music_state) {
            a.classList.remove("icon-play");
            a.classList.add("icon-pause");
            b.classList.remove("icon-play");
            b.classList.add("icon-pause");
        } else {
            a.classList.remove("icon-pause");
            a.classList.add("icon-play");
            b.classList.remove("icon-pause");
            b.classList.add("icon-play");
        }
        document.querySelector(".global-music").aplayer.toggle();
    },

    musicForward() {
        document.querySelector(".global-music").aplayer.skipForward();
        ctrl.getMusicInfo();
    },

    musicBackward() {
        document.querySelector(".global-music").aplayer.skipBack();
        ctrl.getMusicInfo();
    },

    // 获取歌曲信息
    getMusicInfo() {
        var music_id = document.querySelector(".global-music").aplayer.list.index; // 当前曲目的id
        var music_cover = document.querySelector(".global-music").aplayer.list.audios[music_id].cover;
        var music_author = document.querySelector(".global-music").aplayer.list.audios[music_id].author;
        // var music_author = document.querySelector(".global-music").aplayer.list.audios[music_id].artist;
        var music_title = document.querySelector(".global-music").aplayer.list.audios[music_id].title;
        // var music_title = document.querySelector(".global-music").aplayer.list.audios[music_id].name;
        document.getElementById("console-music-cover").innerHTML = "<img src='" + music_cover + "'>";// 歌曲信息
        document.querySelector("#console-music-item-main .cover-shadow").style.background =  "url('" + music_cover + "') center center / 100% 100% no-repeat";
        document.getElementById("console-music-title-text").innerHTML = music_title;
        document.getElementById("console-music-author-text").innerHTML = music_author;
        ctrl.marqueeMusicInfo();
    },

    refreshProgress() {
        var nowTime = document.querySelector(".global-music").aplayer.audio.currentTime;// 当前时间
        if (isNaN(nowTime)) nowTime = 0;
        var nowTimeString = tools.secToTime(nowTime);
        var allTime = document.querySelector(".global-music").aplayer.audio.duration;// 总时间
        if (isNaN(allTime)) allTime = 0; // 无歌曲时会返回NaN
        var allTimeString = tools.secToTime(allTime);
        document.getElementById("progress-low-btn").innerHTML = nowTimeString;// 进度条时间
        document.getElementById("progress-high-btn").innerHTML = allTimeString;
        document.getElementById("p_bar").style.transform = "translateX(-" + (1 - (nowTime / allTime)) * 100 + "%)";// 进度条进度
    },

    // 导入歌单
    importMusicList() {
        var audios = document.querySelector(".global-music").aplayer.list.audios;
        var list_html;
        for (let i = 0; i < audios.length; i++) {
            list_html = document.getElementById("console-music-list").innerHTML;
            // document.getElementById("console-music-list").innerHTML = list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='iconfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].title + "</a><a class='list-music-author' data-pjax-state=''>&nbsp;-&nbsp;" + audios[i].author + "</a></div></li>";
            document.getElementById("console-music-list").innerHTML = list_html + "<li class='music-list-item'><div class='list-music-info1'><a class='list-music-id' data-pjax-state=''>" + (i + 1) + "</a><a class='list-music-state' data-pjax-state=''><i class='iconfont icon-waveform'></i></a></div><div class='list-music-info2'><a class='list-music-title' data-pjax-state=''>" + audios[i].name + "</a><a class='list-music-author' data-pjax-state=''>&nbsp;-&nbsp;" + audios[i].artist + "</a></div></li>";
        }
    },

    // 歌单切换
    changeMusicList(Music_id, Music_server) {
        var ap = document.querySelector(".global-music").aplayer;
        var music_list_url_str = "https://metingjs.cancin.cn/api?server=" + Music_server + "&type=playlist" + "&id=" + Music_id;
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
        var ap = document.querySelector(".global-music").aplayer;
        ap.list.clear();
        console.log("本专辑有" + JaySongsheet.length + "首歌曲");
        ap.list.add(JaySongsheet);
    },

    JokerMusicList() {
        var ap = document.querySelector(".global-music").aplayer;
        ap.list.clear();
        console.log("本专辑有" + QianSongsheet.length + "首歌曲");
        ap.list.add(QianSongsheet);
    },

    // 音乐状态检测（已添加事件监听器，修复点击aplayer后导航栏和控制中心不同步的问题）
    musicState() {
        var music_state = document.querySelector(".global-music").aplayer.audio.paused;
        var a = document.querySelector("#music-Switch i");
        var b = document.querySelector("#music-ctrl-btn-center i");
        if (music_state) {
            a.classList.remove("icon-pause");
            a.classList.add("icon-play");
            b.classList.remove("icon-pause");
            b.classList.add("icon-play");
        } else {
            a.classList.remove("icon-play");
            a.classList.add("icon-pause");
            b.classList.remove("icon-play");
            b.classList.add("icon-pause");
        }
    },

    clearConsoleMusicList() {
        document.getElementById("console-music-list").innerHTML = ''
    },

    addMusicToList(title, author, url, pic, lrc) {
        var ap = document.querySelector(".global-music").aplayer;
        ctrl.clearConsoleMusicList();
        // ap.list.clear();
        ap.list.add([{title: title, author: author, url: url, pic: pic, lrc: lrc}]);
        ap.list.switch(ap.list.audios.length - 1)
    },

    mcToggleMusic(id, url) {
        const mc = document.getElementById(id)
        if (mc) {
            const c = mc.querySelector(".content")
            if (!c.classList.contains("canplay")) {
                const a = mc.querySelector(".audio")
                a.src = url
                a.addEventListener('loadeddata', function f() {
                    c.classList.add("canplay")
                    a.removeEventListener('loadeddata', f)
                });
            }
            const mc_audio = mc.querySelector(".audio")
            if (mc_audio.paused) {
                mc_audio.play()
            } else {
                mc_audio.pause()
            }
        }
    },

    mcRefreshTime(id) {
        var mc = document.getElementById(id)
        if (mc) {
            var mc_audio = mc.querySelector(".audio")
            var t0 = mc_audio.currentTime + 0.5
            var t1 = mc_audio.duration
            var _t0 = tools.secToTime(t0)
            var _t1 = tools.secToTime(t1)
            mc.querySelector(".time").innerHTML = `${_t0}&nbsp;/&nbsp;${_t1}`
            mc.querySelector(".mc-progressbar").style.transform = "translateX(-" + ((1 - (t0 / t1)) * 100) + "%)"
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

    // 初始化console图标
    initConsoleState() {
        var lrc = document.querySelector(".aplayer > .aplayer-lrc-hide");
        var aplayer = document.querySelector(".aplayer > .aplayer-lrc");
        lrc === null && aplayer != null
            ? document.getElementById("lrcItem").classList.add("on")
            : document.getElementById("lrcItem").classList.remove("on");
        saveToLocal.get('aside-status') === 'hide'
            ? document.getElementById("asideItem").classList.add("on")
            : document.getElementById("asideItem").classList.remove("on");
        // var console_musicBody = document.querySelector("#console .console-mainbox"); // 更新控制中心尺寸
        // var console_musicCover = document.getElementById("console-music-cover");
        // console_musicCover.style.height = console_musicCover.offsetWidth + "px";
        // console_musicBody.style.height = (console_musicCover.offsetWidth + 236) + "px"; //(12rem + 1.3rem + 1.3rem) * 16 = 233.6px
        ctrl.getMusicInfo();
        var nowVolume = document.querySelector(".global-music").aplayer.audio.volume;// 当前音量
        document.getElementById("v_bar").style.transform = "translateX(-" + (1 - nowVolume) * 100 + "%)";// 音量条进度
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

    // 侧滑菜单只展开一节
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
                ("Enter" == t.key || t.keyCode == 13) && "" != e.value && "0" != e.value && pjax.loadUrl("1" == e.value ? k(e.value)[0] : k(e.value)[1])
            })
        )
    },

    getCurrentPage() {
        if (window.innerWidth <= 768 && (document.getElementById("recent-posts") || document.getElementById("tag") || document.getElementById("category") || document.getElementById("archive"))) {
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
            e.style.maxHeight = window.innerWidth <= 768 ? "105px" : "32px";
            t.style.transform = ""
        } else {
            e.style.maxHeight = "calc(100vh - 155px)"
            t.style.transform = "rotate(180deg)"
        }
    },

    scrollBackground() {
        const u = window.location.pathname;
        if (u == '/' || /^\/page\/\d+\/$/.test(u)) {
            const h0 = window.innerHeight - 80;
            const h1 = window.scrollY;
            const op = h1 / h0 > 1 ? 1 : h1 / h0;
            document.getElementById('body-wrap').style.background = `rgba(var(--gavin-bg),${op})`;
        } else document.getElementById('body-wrap').style.background = 'var(--gavin-background)';
    },

    refreshLikeCount() {
        var p = window.location.pathname
        var q = p.substring(1,5)
        if (q == 'post') {
            var i = p.substring(6,14)
            fetch(`https://apis.cancin.cn/likecount?mode=get&id=${i}`)
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
        if (!a.classList.contains("loading")) {
            var i = window.location.pathname.substring(6,14)
            a.classList.add("loading")
            fetch(`https://apis.cancin.cn/likecount?mode=add&id=${i}&ip=${ipAddress}`)
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
        }
    },

    getLocationWeather() {
        fetch('https://api.ipify.org?format=json')
            .then(response => response.json())
            .then(data => {
                ipAddress = data.ip;
                console.log("IP 地址：" + ipAddress);
                fetch('https://apis.cancin.cn/weather?ip=' + ipAddress + '&output=jsonp')
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

    toggleSocial() {
        document.querySelector('.author-info-social .social-icons').classList.toggle('show');
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
            if (!b.style.filter) b.style.filter = document.documentElement.getAttribute('data-theme') === 'dark' ? 'blur(1.5px) brightness(0.7)' : 'blur(1.5px)'
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
        var a = document.querySelector('#twikoo .tk-comments > .tk-submit .el-textarea textarea')
        a.value = '```YML\n- name: \n  link: \n  avatar: \n  descr: \n  siteshot: \n```'
        a.style.height = '159px'
        // a.parentElement.querySelector('.el-input__count').innerHTML = '62/1000'
    },

    // 更改主题色
    changeThemeColor(i) {
        var colors = [['0,100,255','0,150,255'], ['129,78,250', '0,234,208'], ['66,90,239', '255,190,0']]
        var a = document.querySelector('.setting-right .checked')
        if (a) a.classList.remove('checked')
        document.querySelector('.setting-right .theme-color-'+i).classList.add('checked')
        document.documentElement.style.setProperty('--gavin-theme-color-light', colors[i-1][0]);
        document.documentElement.style.setProperty('--gavin-theme-color-dark', colors[i-1][1]);
        localStorage.setItem('theme-color', i);
        // localStorage.setItem('theme-color-light', '129,78,250');
        // localStorage.setItem('theme-color-dark', '0,234,208');
    },

    // 更改侧边栏位置
    asideContentDirection() {
        var style = document.getElementById('asideContentDirection')
        if (style) {
            document.head.removeChild(style)
            document.querySelector('#set-aside-direction .label-active').style.left = '3px'
            document.querySelector('#set-aside-direction .right').classList.remove('active')
            document.querySelector('#set-aside-direction .left').classList.add('active')
            localStorage.setItem('aside-direction', 'left')
        } else {
            var styleTag = document.createElement('style')
            styleTag.type = 'text/css'
            styleTag.id = 'asideContentDirection'
            styleTag.innerHTML = '#aside-content{order:2;}'
            document.head.appendChild(styleTag)
            document.querySelector('#set-aside-direction .label-active').style.left = '48px'
            document.querySelector('#set-aside-direction .left').classList.remove('active')
            document.querySelector('#set-aside-direction .right').classList.add('active')
            localStorage.setItem('aside-direction', 'right')
        }
    },

    // 运行JavaScript调试
    jsDebug(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault(); // 阻止换行
            a();
        }
        function a() {
            var code = document.getElementById("jsDebugInput").value;
            try {
                var result = eval(code);
                document.getElementById("jsDebugOutput").value = result;
            } catch (error) {
                document.getElementById("jsDebugOutput").value = "运行出错：" + error;
            }
        }
    },

    // 显示应用中心
    showAPPs() {
        document.getElementById("apps").classList.add("show");
        if(!set_scroll.checked || localStorage.getItem('scroll_state') === 'false')document.body.style.overflow = 'hidden';
    },

    // 隐藏应用中心
    hideAPPs() {
        document.getElementById("apps").classList.remove("show");
        document.body.style.overflow = '';
    },

    // sidebarWeather() {
    //     document.querySelector('.sidebar-weather .city').innerHTML = document.querySelector('.s-sticker-city ').innerHTML
    //     document.querySelector('.sidebar-weather .condition').innerHTML = document.querySelector('.s-sticker-cond ').innerHTML;
    //     document.querySelector('.sidebar-weather .temperature').innerHTML = document.querySelector('.s-sticker-tmp').innerHTML
    // },

    toggleWinbox(app) {
        if (document.getElementById('winboxForApps')) winbox.toggleClass('hide');
        else ctrl.createWinboxForApps(app);
    },

    resizeWinbox() {
        let box = document.getElementById('winboxForApps');
        if (!box || box.classList.contains('min') || box.classList.contains('max')) return
        var offsetWid = document.documentElement.clientWidth;
        if (offsetWid <= 768) {
            winbox.resize(offsetWid * 0.95 + "px", "80%").move("center", "center");
        } else {
            winbox.resize(offsetWid * 0.6 + "px", "70%").move("center", "center");
        }
    },

    createWinboxForApps(app) {
        var title = '',
            className = '',
            html = '';
        switch (app) {
            case "encryption": 
                title = '参星阁 - 加密工具';
                className = 'encryption';
                html=`
                    <div class="select-items">
                        <select class="select-item type">
                            <option class="opt" value="MD5">MD5</option>
                            <option class="opt" value="SHA1">SHA1</option>
                            <option class="opt" value="SHA3">SHA3</option>
                            <option class="opt" value="SHA224">SHA224</option>
                            <option class="opt" value="SHA256">SHA256</option>
                            <option class="opt" value="SHA384">SHA384</option>
                            <option class="opt" value="SHA512">SHA512</option>
                            <option class="opt" value="RIPEMD160">RIPEMD160</option>
                            <option class="opt" value="AESEncode">AES加密</option>
                            <option class="opt" value="AESDecode">AES解密</option>
                        </select>
                        <select class="select-item code">
                            <option class="opt" value="Hex">Hex</option>
                            <option class="opt" value="Base64">Base64</option>
                        </select>
                        <select class="select-item case">
                            <option class="opt" value="Lower">小写</option>
                            <option class="opt" value="Upper">大写</option>
                        </select>
                        <select class="select-item mode hide">
                            <option class="opt" value="CBC">CBC</option>
                            <option class="opt" value="CFB">CFB</option>
                            <option class="opt" value="CTR">CTR</option>
                            <option class="opt" value="OFB">OFB</option>
                            <option class="opt" value="ECB">ECB</option>
                        </select>
                        <select class="select-item pad hide">
                            <option class="opt" value="Pkcs7">Pkcs7</option>
                            <option class="opt" value="Iso97971">Iso97971</option>
                            <option class="opt" value="Iso10126">Iso10126</option>
                            <option class="opt" value="AnsiX923">AnsiX923</option>
                            <option class="opt" value="ZeroPadding">ZeroPadding</option>
                            <option class="opt" value="NoPadding">NoPadding</option>
                        </select>
                        <input type="text" class="select-item key hide" placeholder="密钥">
                        <input type="text" class="select-item iv hide" placeholder="偏移量">
                    </div>
                    <textarea autocomplete="off" rows="6" placeholder="请输入或者粘贴需要处理的文本" class="inner" style="min-height: 32.6px;"></textarea>
                    <textarea autocomplete="off" rows="6" placeholder="处理结果" class="outer lock" style="min-height: 32.6px;" disabled="disabled"></textarea>
                    <div class="btns">
                        <button class="btn blue" type="button" onclick="transcode()">转码</button>
                        <button class="btn green" type="button" onclick="copyTranscode()">复制</button>
                        <button class="btn red" type="button" onclick="clearTranscode()">清空</button>
                    </div>
                    `;
                document.head.appendChild(Object.assign(document.createElement("script"), { src: "https://lf26-cdn-tos.bytecdntp.com/cdn/expire-1-M/crypto-js/4.1.1/crypto-js.min.js", id: "crypto-js" }));
                break;
            case "clipboard": 
                title = '参星阁 - 云剪贴板-Beta';
                className = 'clipboard';
                html = `
                <input type="text" class="select-item id" placeholder="请输入对接暗号">
                <textarea autocomplete="off" rows="12" placeholder="发送/接收文本区域" style="min-height: 32.6px;"></textarea>
                <div class="btns">
                    <button class="btn blue" type="button" onclick="sendTextToClipboard()">我要发送</button>
                    <button class="btn green" type="button" onclick="getTextFromClipboard()">我要接收</button>
                </div>
                `;
                break;
            default:
                title = '参星阁 - App';
                className = '';
                html = '暂无应用程序';
        }
        let div = document.createElement('div');
        document.body.appendChild(div);
        winbox = WinBox({
            id: 'winboxForApps',
            class: className,
            index: 989,
            title: title,
            x: "center",
            y: "center",
            minwidth: '300px',
            height: "60%",
            background: '#29516C',
            onmaximize: () => { div.innerHTML = `<style>body::-webkit-scrollbar {display: none;}div#winboxForApps {width: 100% !important;}</style>` },
            onrestore: () => { div.innerHTML = '' }
        });
        ctrl.resizeWinbox();
        window.addEventListener('resize', ctrl.resizeWinbox);
        winbox.body.innerHTML = html;
        // https://cdn.cbd.int/cansin-blogdata@latest
        document.head.appendChild(Object.assign(document.createElement("script"), { src: CDNURL + "/js/" + className + ".min.js", id: "appScript" }));
        document.querySelector('.wb-header .wb-close').addEventListener('click', ()=>{
            var script = document.getElementById('appScript');
            if (script) document.head.removeChild(script);
            var script1 = document.getElementById('crypto-js');
            if (script1) document.head.removeChild(script1);
            // document.getElementById('appScript')?.remove();
            // document.getElementById('crypto-js')?.remove();
        })
        ctrl.hideAPPs();
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

// 分类条
function categoriesBarActive() {
    if (document.getElementById('category-bar')) {
        document.querySelector(".category-bar-item").classList.remove("select")
    }
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    // console.log(urlinfo);
    // 判断是否是首页
    if (urlinfo == '/') {
        if (document.getElementById('category-bar')) {
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
            if (document.getElementById('category-bar')) {
                document.getElementById(nowCategorie).classList.add("select");
            }
        }
    }
}

// 如果是标签条则启用，同时注释掉分类条
// tagsBarActive()
// 标签条
function tagsBarActive() {
    if (document.getElementById("tag-bar-items")) {
        var urlinfo = window.location.pathname;
        urlinfo = decodeURIComponent(urlinfo);
        var pattern = /\/tags\/.*?\//;
        var valuegroup = urlinfo.split("/");
        var j = valuegroup[2];
        console.log(j);
        // var j = document.querySelector(".article-sort-title").innerText.slice(5);
        document.getElementById(j).classList.add("select");
    }
}

tagsBarActive();

function tagsBarActive_0() {
    var urlinfo = window.location.pathname;
    urlinfo = decodeURIComponent(urlinfo)
    // console.log(urlinfo);
    // 判断是否是首页
    if (urlinfo == '/') {
        if (document.querySelector('#tags-bar')) {
            document.getElementById('首页').classList.add("select")
        }
    } else {
        // 验证是否是分类链接
        var pattern = /\/tags\/.*?\//;
        var patbool = pattern.test(urlinfo);
        // console.log(patbool);
        // 获取当前的标签
        if (patbool) {
            var valuegroup = urlinfo.split("/");
            // console.log(valuegroup[2]);
            // 获取当前分类
            var nowTag = valuegroup[2];
            if (document.querySelector('#category-bar')) {
                document.getElementById(nowTag).classList.add("select");
            }
        }
    }
}

// 鼠标控制横向滚动
function topCategoriesBarScroll() {
    if (document.getElementById("category-bar-items")) {
        let xscroll = document.getElementById("category-bar-items");
        xscroll.addEventListener("mousewheel", function (e) {
            // 计算鼠标滚轮滚动的距离
            let v = -e.wheelDelta / 2;
            xscroll.scrollLeft += v;
            // 阻止浏览器默认方法
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

// 通知开关
var set_notice = document.querySelector("#set-switch-notice input");
set_notice.addEventListener("change", () => {
    set_notice.checked ? localStorage.setItem('notice_state', true) : localStorage.setItem('notice_state', false);
});

// 主页/音乐列表/歌单列表/设置 切换
var music_list_switch = document.getElementById("music-ctrl-btn-end");
var music_list_title = document.getElementById("music-list-title");
var settings_btn = document.querySelector("#console .settings-btn");
var to_display = document.getElementById("li-set-display");
var to_tools = document.getElementById("li-set-tools");
var to_about = document.getElementById("li-set-about");
// var to_wallpaper = document.querySelector("#li-set-wallpaper .setting-next");
var setting_info1 = document.getElementById("console-setting-info1");
var setting_title1 = setting_info1.querySelector(".setting-title");
var setting_info2 = document.getElementById("console-setting-info2");
var setting_title2 = setting_info2.querySelector(".setting-title");
var setting_info3 = document.getElementById("console-setting-info3");
var setting_title3 = setting_info3.querySelector(".setting-title");
music_list_switch.addEventListener("click", () => {
    // document.getElementById("console-music-item-main").classList.remove("item-show");
    document.getElementById("console-music-item-list").classList.add("item-show");
    // if (document.querySelector('li.music-list-item.current-play')) {document.querySelector('li.music-list-item.current-play').scrollIntoView({ behavior: 'smooth' });}
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
    document.querySelector("#console-setting-info2 .set-box-normal:nth-child(4) .setting-detail").innerHTML = tools.getOSInfo().name + " " + tools.getOSInfo().version;
    document.querySelector("#console-setting-info2 .set-box-normal:nth-child(5) .setting-detail").innerHTML = tools.detectBrowser().name + " " + tools.detectBrowser().version;
    // document.querySelector("#console-setting-info2 .set-box-normal:nth-child(3) .setting-detail").innerHTML = userInfo.device;
    // document.querySelector("#console-setting-info2 .set-box-normal:nth-child(4) .setting-detail").innerHTML = tools.getOSInfo().name == 'unknown' || tools.getOSInfo().version == 'unknown' ? userInfo.os : tools.getOSInfo().name + " " + tools.getOSInfo().version;
    // document.querySelector("#console-setting-info2 .set-box-normal:nth-child(5) .setting-detail").innerHTML = tools.detectBrowser().name == 'unknown' || tools.detectBrowser().version == 'unknown' ? userInfo.browser : tools.detectBrowser().name + " " + tools.detectBrowser().version;
    setting_info2.classList.add("item-show");
});
to_tools.addEventListener("click", () => {
    setting_title3.innerHTML = "辅助功能";
    setting_info3.classList.add("item-show");
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

// 滚动条显示
var set_scroll = document.querySelector("#set-switch-scroll input");
set_scroll.addEventListener("change", () => {
    if (set_scroll.checked) {
        localStorage.setItem('scroll_state', true);
        if (set_notice.checked) tools.showMessage("滚动条显示已打开", "success", 2);
    } else {
        localStorage.setItem('scroll_state', false);
        if (set_notice.checked) tools.showMessage("滚动条显示已关闭", "success", 2);
    }
});

// 帧率显示
var set_fps = document.querySelector("#set-switch-fps input");
set_fps.addEventListener("change", () => {
    if (set_fps.checked) {
        localStorage.setItem('fps_state', true);
        tools.updateFPS();
        document.getElementById("fps-box").style.display = 'flex';
        if (set_notice.checked) tools.showMessage("实时帧率已打开", "success", 2);
    } else {
        localStorage.setItem('fps_state', false);
        cancelAnimationFrame(animationId);
        document.getElementById("fps-box").style.display = 'none';
        if (set_notice.checked) tools.showMessage("实时帧率已关闭", "success", 2);
    }
});

document.getElementById('jsDebugInput').addEventListener('input', ()=>{
    document.getElementById('jsDebugOutput').value = '';
})

// 歌单列表监听器
const songsheets = [
    { id: "songsheet-1", text: "<i class='blogfont icon-spinner'></i> 周杰伦", flag: 1, func: () => ctrl.JayMusicList() },
    { id: "songsheet-2", text: "<i class='blogfont icon-spinner'></i> 薛之谦/李荣浩", flag: 1, func: () => ctrl.JokerMusicList() },
    { id: "songsheet-3", text: "<i class='blogfont icon-spinner'></i> 纯音乐", flag: 1, func: () => ctrl.changeMusicList("8167030216", "netease") },
    { id: "songsheet-4", text: "<i class='blogfont icon-spinner'></i> 外语", flag: 1, func: () => ctrl.changeMusicList("8658340188", "netease") },
    { id: "songsheet-5", text: "<i class='blogfont icon-spinner'></i> 古风", flag: 1, func: () => ctrl.changeMusicList("8167066222", "netease") },
    { id: "songsheet-6", text: "<i class='blogfont icon-spinner'></i> 默认歌单", flag: 1, func: () => ctrl.changeMusicList("8086610771", "netease") }
];
songsheets.forEach((songsheet, index) => {
    const element = document.getElementById(songsheet.id);
    element.addEventListener("click", () => {
        document.getElementById("console-loading-icon").classList.add("show");
        console.log(`正在切换至${songsheet.text}专辑`);
        global_music_flag = songsheet.flag;
        songsheet.func();
        document.getElementById("music-list-title").innerHTML = songsheet.text;
        ctrl.consoleBackBtn();
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
    var ap = document.querySelector(".global-music").aplayer
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
    let x = e.clientX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    let v_bar_Len = v_bar.getBoundingClientRect().right - v_bar_bg.getBoundingClientRect().left; // 获取进度条的初始Width
    v_bar_bg_Len = v_bar_bg.offsetWidth;
    let newVolume = (x - v_bar_bg.getBoundingClientRect().left) / v_bar_bg_Len;
    v_bar.style.transform = "translateX(-" + (1 - newVolume) * 100 + "%)"; // 按下时重新设置进度条
    const v = document.querySelector(".global-music");
    v.aplayer.volume(newVolume, true); // 更改音量
    document.onmousemove = function (e) { // 拖动需要写到down里面
        let diff = x - e.clientX; // 获取移动的距离
        let v_bar_Len_New = v_bar_Len - diff; // 计算当前进度条的Width
        if (v_bar_Len_New < 0) { // 当超出进度条范围，控制
            v_bar_Len_New = 0;
        } else if (v_bar_Len_New > v_bar_bg_Len) {
            v_bar_Len_New = v_bar_bg_Len;
        }
        // v_bar.style.transform = "translateX(-" + (1 - (v_bar_Len_New / v_bar_bg_Len)) * 100 + "%)"; // 更改进度条Width
        newVolume = v_bar_Len_New / v_bar_bg_Len;
        v_bar.style.transform = "translateX(-" + (1 - newVolume) * 100 + "%)"
        v.aplayer.volume(newVolume, true); // 更改音量
    }
});

// 触摸按下
music_volumebar.addEventListener("touchstart", function (e) { //添加监听事件
    v_bar_bg.style.height = "0.8rem";
    v_bar.style.backgroundColor = "var(--dis-f-0)";
    v_low.style.color = "var(--dis-f-0)";
    v_high.style.color = "var(--dis-f-0)";
    let x = e.targetTouches[0].pageX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    let v_bar_Len = v_bar.getBoundingClientRect().right - v_bar_bg.getBoundingClientRect().left; // 获取进度条的初始Width
    v_bar_bg_Len = v_bar_bg.offsetWidth;
    let newVolume = (x - v_bar_bg.getBoundingClientRect().left) / v_bar_bg_Len;
    v_bar.style.transform = "translateX(-" + (1 - newVolume) * 100 + "%)"; // 按下时重新设置进度条
    const v = document.querySelector(".global-music");
    v.aplayer.volume(newVolume, true); // 更改音量
    document.ontouchmove = function (e) { // 拖动需要写到down里面
        let diff = x - e.targetTouches[0].pageX; // 获取移动的距离
        let v_bar_Len_New = v_bar_Len - diff; // 计算当前进度条的Width
        if (v_bar_Len_New < 0) { // 当超出进度条范围，控制
            v_bar_Len_New = 0;
        } else if (v_bar_Len_New > v_bar_bg_Len) {
            v_bar_Len_New = v_bar_bg_Len;
        }
        // v_bar.style.transform = "translateX(-" + (1 - (v_bar_Len_New / v_bar_bg_Len)) * 100 + "%)"; // 更改进度条Width
        newVolume = v_bar_Len_New / v_bar_bg_Len;
        v_bar.style.transform = "translateX(-" + (1 - newVolume) * 100 + "%)"
        v.aplayer.volume(newVolume, true); // 更改音量
    }
}, { passive: true });

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
    let x = e.clientX; // 获取按下时鼠标初始位置 // pageX是绝对位置 offsetX是相对位置
    let p_bar_Len = p_bar.getBoundingClientRect().right - p_bar_bg.getBoundingClientRect().left; // 获取进度条的初始Width
    p_bar_bg_Len = p_bar_bg.offsetWidth; // 获取进度条总长Width，不知道为什么，第一次获取的值不对，这里还得再更新一次
    document.onmousemove = function (e) { // 拖动需要写到down里面
        let diff = x - e.clientX; // 获取移动的距离
        mousemove_flag = 0;
        p_bar_Len_New = p_bar_Len - diff; // 计算当前进度条的Width
        if (p_bar_Len_New < 0) { // 当超出进度条范围，控制
            p_bar_Len_New = 0;
        } else if (p_bar_Len_New > p_bar_bg_Len) {
            p_bar_Len_New = p_bar_bg_Len;
        }
        p_bar.style.transform = "translateX(-" + (1 - (p_bar_Len_New / p_bar_bg_Len)) * 100 + "%)"; // 更改进度条Width
        let all_Time = document.querySelector(".global-music").aplayer.audio.duration;
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
    let p_bar_Len = p_bar.getBoundingClientRect().right - p_bar_bg.getBoundingClientRect().left; // 获取进度条的初始Width
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
        p_bar.style.transform = "translateX(-" + (1 - (p_bar_Len_New / p_bar_bg_Len)) * 100 + "%)"; // 更改进度条Width
        let all_Time = document.querySelector(".global-music").aplayer.audio.duration;
        let current_time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.getElementById("progress-low-btn").innerHTML = tools.secToTime(current_time);
    }
}, { passive: true });

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
        let all_Time = document.querySelector(".global-music").aplayer.audio.duration;
        let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.querySelector(".global-music").aplayer.seek(new_Time); //更改进度
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
        let all_Time = document.querySelector(".global-music").aplayer.audio.duration;
        let new_Time = (p_bar_Len_New / p_bar_bg_Len) * all_Time;
        document.querySelector(".global-music").aplayer.seek(new_Time); //更改进度
    }
    global_music_flag = 0;
    ctrl_flag = 1;
    mousemove_flag = 1;
    document.ontouchmove = null;
};







// var progress = mc.querySelector(".mc-progress")
// var progressbar = mc.querySelector(".mc-progressbar")
// var mc_l0 = 0
// var mc_l1 = progress.offsetWidth
// progress.addEventListener("mousedown", function (e) {
//     mc.classList.add("seeking")
//     mcSeekFlag = 1
//     let x = e.pageX
//     let l0 = progressbar.offsetWidth
//     l1 = progress.offsetWidth
//     document.onmousemove = function (e) {
//         let bias = x - e.pageX
//         mc_l0 = l0 - bias
//         if (mc_l0 < 0) {
//             mc_l0 = 0;
//         } else if (mc_l0 > l1) {
//             mc_l0 = l1;
//         }
//         progressbar.style.width = mc_l0 + "px"
//         let t1 = mc.querySelector(".audio").duration
//         let t0 = (mc_l0 / l1) * t1
//         let _t0 = tools.secToTime(t0)
//         let _t1 = tools.secToTime(t1)
//         mc.querySelector(".time").innerHTML = _t0 + "&nbsp;/&nbsp;" + _t1
//     }
// })




























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
