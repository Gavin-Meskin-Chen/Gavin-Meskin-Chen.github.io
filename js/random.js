var posts=["post/e87ec7ea.html","post/37b27065.html","post/cef7e835.html","post/fb55a1ea.html","post/ac62cfd5.html","post/a5c582fd.html","post/7c8508a1.html","post/17173e75.html","post/32065a76.html","post/d041b9a6.html","post/2892eb80.html","post/2f20fd25.html","post/8b6f77a8.html","post/2a10698b.html","post/cddbd99a.html","post/de0459c0.html","post/7c589660.html","post/27d667eb.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};