var posts=["post/e87ec7ea.html","post/37b27065.html","post/cef7e835.html","post/fb55a1ea.html","post/32065a76.html","post/ac62cfd5.html","post/a5c582fd.html","post/cddbd99a.html","post/7c8508a1.html","post/a6751e89.html","post/2f20fd25.html","post/2892eb80.html","post/8b6f77a8.html","post/ca0077c.html","post/efb0b0af.html","post/27d667eb.html","post/fbfe8234.html","post/2a10698b.html","post/8eb385ff.html","post/7c589660.html","post/de0459c0.html"];function toRandomPost(){pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);};