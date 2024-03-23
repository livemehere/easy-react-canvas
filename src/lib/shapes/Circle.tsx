import { FC, ReactNode } from "react";
import { drawBounds } from "../utils/bounds";
import { TBaseShapeProps, TDraw } from "../types/shape";

export interface CircleProps extends TBaseShapeProps<CircleProps> {
  x: number;
  y: number;
  radius: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

const Circle: FC<Omit<CircleProps, keyof TBaseShapeProps>> = () => {
  return null;
};

const draw: TDraw<CircleProps> = (ctx, props) => {
  const { x, y, radius, stroke, fill, strokeWidth, displayBounds } = props;
  const { bounds } = props;
  if (!bounds) {
    throw new Error(
      "Bounds is required, please check render loop in <Canvas/>",
    );
  }
  /* Position origin to parent */
  const relativeX = x + bounds.minX;
  const relativeY = y + bounds.minY;

  if (displayBounds) {
    drawBounds(ctx, {
      minX: relativeX - radius,
      minY: relativeY - radius,
      maxX: radius * 2,
      maxY: radius * 2,
    });
  }

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = stroke ?? "transparent";
  ctx.fillStyle = fill ?? "transparent";
  ctx.lineWidth = strokeWidth ?? 1;
  ctx.arc(relativeX, relativeY, radius, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};

const defaultProps: TBaseShapeProps<CircleProps> = {
  drawable: true,
  type: "Circle",
  draw,
};

// @ts-ignore
Circle.defaultProps = defaultProps;

export default Circle;
