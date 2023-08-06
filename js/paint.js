class SmoothCorners {
    static get inputProperties() {
        return ['--smooth-level'];
    }
    paint(ctx, geom, properties) {
        const radius = parseInt(properties.get('--smooth-level').toString());
        const path = new Path2D();
        path.moveTo(radius, 0);
        path.lineTo(geom.width - radius, 0);
        path.quadraticCurveTo(geom.width, 0, geom.width, radius);
        path.lineTo(geom.width, geom.height - radius);
        path.quadraticCurveTo(geom.width, geom.height, geom.width - radius, geom.height);
        path.lineTo(radius, geom.height);
        path.quadraticCurveTo(0, geom.height, 0, geom.height - radius);
        path.lineTo(0, radius);
        path.quadraticCurveTo(0, 0, radius, 0);
        ctx.fill(path);
    }
}
registerPaint('smooth-corners', SmoothCorners);

class SmoothCorners3 {
    static get inputProperties() {
        return ['--smooth-level', '--over-level'];
    }
    paint(ctx, geom, properties) {
        const r = parseInt(properties.get('--smooth-level').toString());
        const o = parseFloat(properties.get('--over-level').toString());
        const path = new Path2D();
        const s = 1 - o;
        var w = geom.width;
        var h = geom.height;
        path.moveTo(r, 0);
        path.lineTo(w - r, 0);
        path.bezierCurveTo(w-s*r, 0, w, s*r, w, r);
        path.lineTo(w, h - r);
        path.bezierCurveTo(w, h-s*r, w-s*r, h, w - r, h);
        path.lineTo(r, h);
        path.bezierCurveTo(s*r, h, 0, h-s*r, 0, h - r);
        path.lineTo(0, r);
        path.bezierCurveTo(0, s*r, s*r, 0, r, 0);
        ctx.fill(path);
    }
}
registerPaint('smooth-corners-3', SmoothCorners3);