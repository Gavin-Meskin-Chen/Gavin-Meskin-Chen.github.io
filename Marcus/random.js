var posts=["post/cef7e835.html","post/fb55a1ea.html","post/a5c582fd.html","post/ac62cfd5.html","post/32065a76.html","post/17173e75.html","post/d041b9a6.html","post/2892eb80.html","post/cddbd99a.html","post/4a17b156.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};