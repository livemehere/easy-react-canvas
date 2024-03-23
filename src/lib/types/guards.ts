import { isValidElement, ReactElement, ReactNode } from "react";
import { CircleProps } from "../shapes/Circle";
import { RectProps } from "../shapes/Rect";
import { TBaseShapeProps } from "./shape";
import { LineProps } from "../shapes/Line";

export function isCircle(
  component: ReactElement<TBaseShapeProps>,
): component is ReactElement<CircleProps> {
  return isValidElement(component) && component.props.type === "Circle";
}

export function isRect(
  component: ReactNode,
): component is ReactElement<RectProps> {
  return isValidElement(component) && component.props.type === "Rect";
}

export function isLine(
  component: ReactNode,
): component is ReactElement<LineProps> {
  return isValidElement(component) && component.props.type === "Line";
}
