import { ReactElement } from "react";

export type DrawType = "Rect" | "Circle";

export type TRootDraw = (
  ctx: CanvasRenderingContext2D,
  props: {
    bounds: {
      x: number;
      y: number;
      width: number;
      height: number;
    };
    backgroundColor?: string;
    components: ReactElement<DrawAbleProps<any>>[];
  },
) => void;

export type TDraw<ShapeProps> = (
  ctx: CanvasRenderingContext2D,
  props: DrawAbleProps<ShapeProps>,
) => void;

/* Default Props */
export type DrawAbleDefaultProps<ShapeProps> = {
  drawable: boolean;
  type: DrawType;
  draw: TDraw<ShapeProps>;
};

/* Final Props = ShapeProps + DefaultProps */
export type DrawAbleProps<ShapeProps = Record<string, any>> = ShapeProps & {
  drawable: boolean;
  type: DrawType;
  /* Set from Root Canvas */
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  children?: ReactElement<DrawAbleProps<any>>;
};
