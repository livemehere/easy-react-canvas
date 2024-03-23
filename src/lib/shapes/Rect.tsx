import { FC, ReactNode } from "react";
import { drawBounds } from "../utils/bounds";
import { TBaseShapeProps, TDraw } from "../types/shape";

export interface RectProps extends TBaseShapeProps<RectProps> {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

const Rect: FC<Omit<RectProps, keyof TBaseShapeProps>> = () => {
  return null;
};

const draw: TDraw<RectProps> = (ctx, props) => {
  const {
    x,
    y,
    width,
    height,
    stroke,
    fill,
    strokeWidth,
    bounds,
    displayBounds,
  } = props;

  if (!bounds) {
    throw new Error(
      "Bounds is required, please check render loop in <Canvas/>",
    );
  }
  /* Position origin to parent */
  const relativeX = x + bounds.x;
  const relativeY = y + bounds.y;

  if (displayBounds) {
    drawBounds(ctx, {
      x: relativeX,
      y: relativeY,
      width,
      height,
    });
  }

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = stroke ?? "transparent";
  ctx.fillStyle = fill ?? "transparent";
  ctx.lineWidth = strokeWidth ?? 1;
  ctx.rect(relativeX, relativeY, width, height);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};
const defaultProps: TBaseShapeProps<RectProps> = {
  drawable: true,
  type: "Rect",
  draw,
};

// @ts-ignore
Rect.defaultProps = defaultProps;

export default Rect;
