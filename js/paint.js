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

class RoundedRectWithCircle {
    static get inputProperties() { return ['--border-radius', '--circle-radius', '--border-width', '--border-color', '--background-color']; }
  
    paint(ctx, size, props) {
      const borderRadius = parseInt(props.get('--border-radius').toString());
      const circleRadius = parseInt(props.get('--circle-radius').toString());
      const borderWidth = parseInt(props.get('--border-width').toString());
      const borderColor = props.get('--border-color').toString();
      const backgroundColor = props.get('--background-color').toString();
  
      const x = borderWidth / 2;
      const y = borderWidth / 2;
      const w = size.width - borderWidth;
      const h = size.height - borderWidth;
      const r = Math.min(borderRadius, w / 2, h / 2);
      const cx = size.width / 2;
      const cy = size.height / 2;
  
      // 绘制圆角矩形
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.arcTo(w + x, y, w + x, h + y, r);
      ctx.arcTo(w + x, h + y, x, h + y, r);
      ctx.arcTo(x, h + y, x, y, r);
      ctx.arcTo(x, y, w + x, y, r);
      ctx.closePath();
      ctx.fillStyle = backgroundColor;
      ctx.fill();
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
  
      // 绘制空心圆
      ctx.beginPath();
      ctx.arc(cx, cy, circleRadius, 0, 2 * Math.PI);
      ctx.lineWidth = borderWidth;
      ctx.strokeStyle = borderColor;
      ctx.stroke();
    }
  }
  
  registerPaint('rounded-rect-with-circle', RoundedRectWithCircle);
  