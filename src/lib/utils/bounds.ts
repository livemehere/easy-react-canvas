import { isCircle, isRect } from "../types/guards";
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
    return {
      x,
      y,
      width,
      height,
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
