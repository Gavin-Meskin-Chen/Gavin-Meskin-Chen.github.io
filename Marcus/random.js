var posts=["post/e87ec7ea.html","post/cef7e835.html","post/37b27065.html","post/fb55a1ea.html","post/ac62cfd5.html","post/a5c582fd.html","post/32065a76.html","post/d041b9a6.html","post/17173e75.html","post/2892eb80.html","post/cddbd99a.html","post/7c589660.html","post/8b6f77a8.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};