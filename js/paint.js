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
    // 三次贝塞尔曲线
    // paint(ctx, geom, properties) {
    //     const radius = parseInt(properties.get('--smooth-level').toString());
    //     const path = new Path2D();
    //     path.moveTo(radius, 0);
    //     path.lineTo(geom.width - radius, 0);
    //     path.bezierCurveTo(geom.width, 0, geom.width, 0, geom.width, radius);
    //     path.lineTo(geom.width, geom.height - radius);
    //     path.bezierCurveTo(geom.width, geom.height, geom.width, geom.height, geom.width - radius, geom.height);
    //     path.lineTo(radius, geom.height);
    //     path.bezierCurveTo(0, geom.height, 0, geom.height, 0, geom.height - radius);
    //     path.lineTo(0, radius);
    //     path.bezierCurveTo(0, 0, 0, 0, radius, 0);
    //     ctx.fill(path);
    // }
}
registerPaint('smooth-corners', SmoothCorners);