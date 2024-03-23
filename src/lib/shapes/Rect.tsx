import { FC, ReactNode } from "react";
import { DrawAbleDefaultProps, TDraw } from "../types";

interface RectProps {
  x: number;
  y: number;
  width: number;
  height: number;
  stroke?: string;
  fill?: string;
  strokeWidth?: number;
  children?: ReactNode;
}

const Rect: FC<RectProps> = () => {
  return null;
};

const draw: TDraw<RectProps> = (ctx, props) => {
  const { x, y, width, height, stroke, fill, strokeWidth } = props;
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
  ctx.rect(relativeX, relativeY, width, height);
  ctx.stroke();
  ctx.fill();
  ctx.restore();
};

const defaultProps: DrawAbleDefaultProps<RectProps> = {
  drawable: true,
  type: "Rect",
  draw,
};

// @ts-ignore
Rect.defaultProps = defaultProps;

export default Rect;
