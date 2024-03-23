import { FC, ReactNode } from "react";
import { DrawAbleDefaultProps, TDraw } from "../types";

interface CircleProps {
  x: number;
  y: number;
  radius: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

const Circle: FC<CircleProps> = () => {
  return null;
};

const draw: TDraw<CircleProps> = (ctx, props) => {
  const { x, y, radius, stroke, fill, strokeWidth } = props;
  const { bounds } = props;
  if (!bounds) {
    throw new Error(
      "Bounds is required, please check render loop in <Canvas/>",
    );
  }
  /* Position origin to parent */
  const relativeX = x + bounds.x;
  const relativeY = y + bounds.y;

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

const defaultProps: DrawAbleDefaultProps<CircleProps> = {
  drawable: true,
  type: "Circle",
  draw,
};

// @ts-ignore
Circle.defaultProps = defaultProps;

export default Circle;