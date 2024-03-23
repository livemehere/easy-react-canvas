export type Bounds = {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
};

export function drawBounds(ctx: CanvasRenderingContext2D, bounds: Bounds) {
  ctx.save();
  ctx.beginPath();
  ctx.strokeStyle = "red";
  ctx.lineWidth = 1;
  ctx.rect(bounds.minX, bounds.minY, bounds.maxX, bounds.maxY);
  ctx.stroke();
  ctx.restore();
}
