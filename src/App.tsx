import Canvas from "./lib/Canvas";
import { useState } from "react";
import Rect from "./lib/shapes/Rect";
import Circle from "./lib/shapes/Circle";
import Line from "./lib/shapes/Line";

function App() {
  const [resizeToWindow, setResizeToWindow] = useState(true);
  const [x, setX] = useState(100);
  const [r, setR] = useState(50);
  const [displayBounds, setDisplayBounds] = useState(false);
  return (
    <main>
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <button onClick={() => setDisplayBounds(!displayBounds)}>
          Toggle Bounds {displayBounds ? "ON" : "OFF"}
        </button>
        <button onClick={() => setResizeToWindow((prev) => !prev)}>
          Toggle resizeToWindow {resizeToWindow ? "ON" : "OFF"}
        </button>
        <button onClick={() => setX((prev) => prev + 10)}>Move Right</button>
        <button onClick={() => setX((prev) => prev - 10)}>Move Left</button>
        <button onClick={() => setR((prev) => prev + 10)}>
          Increase Radius
        </button>
      </div>

      <section
        style={{
          height: "400px",
        }}
      >
        <Canvas
          resizeToWindow={true}
          displayBounds={true}
          backgroundColor="black"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <Rect x={x} y={300} width={300} height={300} fill={"white"}>
            <Circle x={80} y={100} radius={r} fill="red"></Circle>
            <Circle x={300 - 80} y={100} radius={r} fill="blue"></Circle>
            <Line
              x1={80}
              y1={250}
              x2={300 - 80}
              y2={250}
              stroke="black"
              strokeWidth={10}
            />
          </Rect>
          {/* Ignore not register component  */}
          <div>1</div>
        </Canvas>
      </section>
    </main>
  );
}

export default App;
