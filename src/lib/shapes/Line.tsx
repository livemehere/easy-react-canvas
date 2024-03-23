import { FC } from "react";
import { drawBounds } from "../utils/bounds";
import { TBaseShapeProps, TDraw } from "../types/shape";

export interface LineProps extends TBaseShapeProps<LineProps> {
  x1: number;
  y2: number;
  x2: number;
  y1: number;
  stroke: string;
  strokeWidth?: number;
  dash?: number[];
  cap?: CanvasLineCap;
}

const Line: FC<Omit<LineProps, keyof TBaseShapeProps>> = () => {
  return null;
};

const draw: TDraw<LineProps> = (ctx, props) => {
  const { x1, x2, y1, y2, stroke, strokeWidth, displayBounds, cap } = props;
  const { bounds } = props;
  if (!bounds) {
    throw new Error(
      "Bounds is required, please check render loop in <Canvas/>",
    );
  }
  /* Position origin to parent */
  const relativeX1 = x1 + bounds.x;
  const relativeY1 = y1 + bounds.y;
  const relativeX2 = x2 + bounds.x;
  const relativeY2 = y2 + bounds.y;

  if (displayBounds) {
    drawBounds(ctx, {
      x: relativeX1,
      y: relativeY1,
      width: Math.abs(relativeX2 - relativeX1),
      height: Math.abs(relativeY2 - relativeY1),
    });
  }

  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = strokeWidth ?? 1;
  ctx.lineCap = cap ?? "butt";
  ctx.moveTo(relativeX1, relativeY1);
  ctx.lineTo(relativeX2, relativeY2);
  ctx.stroke();
  ctx.restore();
};

const defaultProps: TBaseShapeProps<LineProps> = {
  drawable: true,
  type: "Line",
  draw,
};

// @ts-ignore
Line.defaultProps = defaultProps;

export default Line;
