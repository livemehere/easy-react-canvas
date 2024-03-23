import { ReactElement } from "react";
import { Bounds } from "../utils/bounds";

export type TShape = "Rect" | "Circle" | "Line";
export type TBaseShapeProps<S = any> = {
  type: TShape;
  drawable: boolean;
  draw: TDraw<S>;
  getBounds: (props: S) => Bounds;
};

/** (DRAW_SPEC) 👇 Type injected by <Canvas/> */
export type TFinalShapeProps<P extends TBaseShapeProps> = P & {
  children?: ReactElement<P>;
  bounds: Bounds;
  displayBounds: boolean;
};

export type TRootDraw = (
  ctx: CanvasRenderingContext2D,
  props: {
    bounds: Bounds;
    backgroundColor?: string;
    components: ReactElement[];
  },
) => void;

export type TDraw<S extends TBaseShapeProps> = (
  ctx: CanvasRenderingContext2D,
  props: TFinalShapeProps<S>,
) => void;
