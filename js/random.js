var posts=["post/37b27065.html","post/e87ec7ea.html","post/cef7e835.html","post/fb55a1ea.html","post/a5c582fd.html","post/ac62cfd5.html","post/17173e75.html","post/32065a76.html","post/7c8508a1.html","post/d041b9a6.html","post/2892eb80.html","post/2f20fd25.html","post/cddbd99a.html","post/27d667eb.html","post/8b6f77a8.html","post/2a10698b.html","post/de0459c0.html","post/7c589660.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};