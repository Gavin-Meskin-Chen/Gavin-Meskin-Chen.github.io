var posts=["post/fb55a1ea.html","post/a5c582fd.html","post/cef7e835.html","post/ac62cfd5.html","post/17173e75.html","post/32065a76.html","post/d041b9a6.html","post/cddbd99a.html","post/4a17b156.html","post/2892eb80.html","post/37b27065.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};