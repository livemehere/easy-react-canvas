import React, {
  Children,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useResizeObserver from "./hooks/useResizeObserver";
import { Bounds } from "./utils/bounds";
import { TFinalShapeProps, TRootDraw, TBaseShapeProps } from "./types/shape";

interface Props {
  children?: ReactNode;
  resizeToWindow?: boolean;
  backgroundColor?: string;
  displayBounds?: boolean;
}

const Canvas: FC<Props & HTMLAttributes<HTMLCanvasElement>> = ({
  children,
  resizeToWindow = false,
  backgroundColor,
  displayBounds = false,
  ...props
}) => {
  const rafRef = useRef<number | null>(null);
  const sizeRef = useRef<{ width: number; height: number }>({
    width: 0,
    height: 0,
  });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [parentElement, setParentElement] = useState<HTMLElement | null>(null);

  /** Start draw with Children */
  useLayoutEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    setParentElement(canvas.parentElement);

    const loop = () => {
      // rafRef.current = requestAnimationFrame(loop);
      const { width, height } = sizeRef.current;
      rootDraw(ctx, {
        bounds: { minX: 0, minY: 0, maxX: width, maxY: height },
        backgroundColor,
        components: toDrawAbleComponentArray(children),
      });
    };

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [children]);

  /** Resize when parent element resize */
  useResizeObserver(
    parentElement,
    (entry) => {
      const canvas = canvasRef.current;
      if (!canvas || resizeToWindow) return;

      console.log("DEBUG :: resize observer");
      const { width, height } = entry.contentRect;
      sizeRef.current = { width, height };
      setCanvasSize(canvas, width, height);
    },
    [resizeToWindow],
  );

  /** Resize when window resize */
  useLayoutEffect(() => {
    const resizeToWindowHandler = () => {
      const canvas = canvasRef.current;
      if (!canvas || !resizeToWindow) return;

      console.log("DEBUG :: resize to window");
      sizeRef.current = {
        width: window.innerWidth,
        height: window.innerHeight,
      };
      setCanvasSize(canvas, window.innerWidth, window.innerHeight);
    };

    if (resizeToWindow) {
      resizeToWindowHandler();
      window.addEventListener("resize", resizeToWindowHandler);
    }

    return () => {
      if (resizeToWindow) {
        window.removeEventListener("resize", resizeToWindowHandler);
      }
    };
  }, [resizeToWindow]);

  /* Pure function */
  const toDrawAbleComponentArray = (children: ReactNode) => {
    return Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child?.props.drawable,
    ) as ReactElement<TBaseShapeProps>[];
  };

  /* Pure function */
  const setCanvasSize = (
    canvas: HTMLCanvasElement,
    width: number,
    height: number,
  ) => {
    const dpr = window.devicePixelRatio > 1 ? 2 : 1;
    const stageWidth = width * dpr;
    const stageHeight = height * dpr;
    canvas.width = stageWidth;
    canvas.height = stageHeight;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;

    const ctx = canvas.getContext("2d")!;
    ctx.scale(dpr, dpr);
    rootDraw(ctx, {
      bounds: { minX: 0, minY: 0, maxX: stageWidth, maxY: stageHeight },
      backgroundColor,
      components: toDrawAbleComponentArray(children),
    });
  };

  /* Pure function */
  const rootDraw: TRootDraw = (ctx, props) => {
    console.log("DEBUG :: root draw");
    const { bounds, backgroundColor, components } = props;
    /* clear */
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    } else {
      ctx.clearRect(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
    }
    /** (DRAW_SPEC) 👇 If Draw spec changed, append options */
    traverseShape(ctx, components, {
      rootBounds: bounds,
      displayBounds,
    });
  };

  /* Pure function */
  const traverseShape = (
    ctx: CanvasRenderingContext2D,
    children: ReactElement<TBaseShapeProps>[],
    options: {
      parent?: ReactElement<TFinalShapeProps<TBaseShapeProps>>;
      rootBounds: Bounds;
      displayBounds: boolean;
    },
  ) => {
    children.forEach((child) => {
      const { parent, displayBounds } = options;

      const bounds = parent
        ? parent.props.getBounds(parent.props)
        : options.rootBounds;

      // @ts-ignore
      const me = React.cloneElement<TFinalShapeProps<TBaseShapeProps>>(child, {
        ...child.props,
        bounds,
        displayBounds,
      });

      /* Draw */
      me.props.draw(ctx, me.props);

      const meChildren = me.props.children;
      /* Draw children over parent */
      if (meChildren) {
        /** (DRAW_SPEC) 👇 If Draw spec changed, append options */
        traverseShape(ctx, toDrawAbleComponentArray(meChildren), {
          parent: me,
          rootBounds: bounds,
          displayBounds,
        });
      }
    });
  };

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
