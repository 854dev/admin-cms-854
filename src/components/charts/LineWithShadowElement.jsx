import { Chart as ChartJS, LineElement } from 'chart.js';

class LineWithShadowElement extends LineElement {
  draw(ctx) {
    const originalStroke = ctx.stroke;

    ctx.stroke = function () {
      ctx.save();
      ctx.shadowColor = 'rgba(0, 0, 0, 0.25)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 4;
      originalStroke.apply(this, arguments);
      ctx.restore();
    };

    LineElement.prototype.draw.apply(this, arguments);
  }
}

LineWithShadowElement.id = 'lineWithShadowElement';

ChartJS.register(LineWithShadowElement);
