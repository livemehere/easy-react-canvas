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
  const relativeX1 = x1 + bounds.minX;
  const relativeY1 = y1 + bounds.minY;
  const relativeX2 = x2 + bounds.minX;
  const relativeY2 = y2 + bounds.minY;

  if (displayBounds) {
    drawBounds(ctx, {
      minX: relativeX1,
      minY: relativeY1,
      maxX: Math.abs(relativeX2 - relativeX1),
      maxY: Math.abs(relativeY2 - relativeY1),
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

const getBounds = (props: LineProps) => {
  const { x1, y1, x2, y2 } = props;
  const minX = Math.min(x1, x2);
  const minY = Math.min(y1, y2);
  const maxX = Math.max(x1, x2);
  const maxY = Math.max(y1, y2);
  return {
    minX,
    minY,
    maxX,
    maxY,
  };
};

const defaultProps: TBaseShapeProps<LineProps> = {
  drawable: true,
  type: "Line",
  draw,
  getBounds,
};

// @ts-ignore
Line.defaultProps = defaultProps;

export default Line;
