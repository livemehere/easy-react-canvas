import { isCircle, isLine, isRect } from "../types/guards";
import { ReactElement } from "react";
import { TBaseShapeProps } from "../types/shape";

export type Bounds = {
  x: number;
  y: number;
  width: number;
  height: number;
};

/* FIXME: type */
export function getBounds(component: ReactElement<TBaseShapeProps>): Bounds {
  if (isCircle(component)) {
    const { x, y, radius } = component.props;
    return {
      x: x - radius,
      y: y - radius,
      width: radius * 2,
      height: radius * 2,
    };
  }

  if (isRect(component)) {
    const { x, y, width, height } = component.props;
    const minX = Math.min(x, x + width);
    const minY = Math.min(y, y + height);
    const maxX = Math.max(x, x + width);
    const maxY = Math.max(y, y + height);
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  if (isLine(component)) {
    const { x1, y1, x2, y2 } = component.props;
    const minX = Math.min(x1, x2);
    const minY = Math.min(y1, y2);
    const maxX = Math.max(x1, x2);
    const maxY = Math.max(y1, y2);
    return {
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY,
    };
  }

  throw new Error("Invalid Shape Component type");
}

export function drawBounds(ctx: CanvasRenderingContext2D, bounds: Bounds) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
  ctx.stroke();
  ctx.restore();
}
