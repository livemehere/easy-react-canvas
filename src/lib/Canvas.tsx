import React, {
  Children,
  FC,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import useResizeObserver from "./hooks/useResizeObserver";
import { DrawAbleProps, TRootDraw } from "./types";

interface Props {
  children?: ReactNode;
  resizeToWindow?: boolean;
  backgroundColor?: string;
}

const Canvas: FC<Props & HTMLAttributes<HTMLCanvasElement>> = ({
  children,
  resizeToWindow = false,
  backgroundColor,
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
      rafRef.current = requestAnimationFrame(loop);
      const { width, height } = sizeRef.current;
      rootDraw(ctx, {
        bounds: { x: 0, y: 0, width, height },
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

  /** Pure function */
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
      bounds: { x: 0, y: 0, width: stageWidth, height: stageHeight },
      backgroundColor,
      components: toDrawAbleComponentArray(children),
    });
  };

  /** Pure function */
  const rootDraw: TRootDraw = (ctx, props) => {
    console.log("DEBUG :: root draw");
    const { bounds, backgroundColor } = props;
    /* clear */
    if (backgroundColor) {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(bounds.x, bounds.y, bounds.width, bounds.height);
    } else {
      ctx.clearRect(bounds.x, bounds.y, bounds.width, bounds.height);
    }
    traverseShape(ctx, toDrawAbleComponentArray(children), {
      rootBounds: bounds,
    });
  };

  /** Pure function */
  const toDrawAbleComponentArray = (children: ReactNode) => {
    return Children.toArray(children).filter(
      (child) => React.isValidElement(child) && child?.props.drawable,
    ) as ReactElement<DrawAbleProps>[];
  };

  /** Pure function */
  const traverseShape = (
    ctx: CanvasRenderingContext2D,
    children: ReactElement<DrawAbleProps>[],
    options: {
      parent?: ReactElement<DrawAbleProps>;
      rootBounds: { x: number; y: number; width: number; height: number };
    },
  ) => {
    children.forEach((child) => {
      const { parent } = options;
      const bounds = parent
        ? {
            x: parent.props.x + options.rootBounds.x,
            y: parent.props.y + options.rootBounds.y,
            width: parent.props.width,
            height: parent.props.height,
          }
        : options.rootBounds;

      const me = React.cloneElement<DrawAbleProps>(child, {
        ...child.props,
        bounds,
      });

      /* Draw */
      child.props.draw(ctx, me.props);

      /* Draw children over parent */
      if (me.props.children) {
        traverseShape(ctx, toDrawAbleComponentArray(me.props.children), {
          parent: me,
          rootBounds: bounds,
        });
      }
    });
  };

  return <canvas ref={canvasRef} {...props} />;
};

export default Canvas;
