import Canvas from "./lib/Canvas";
import { useState } from "react";
import Rect from "./lib/shapes/Rect";
import Circle from "./lib/shapes/Circle";

function App() {
  const [resizeToWindow, setResizeToWindow] = useState(true);
  const [x, setX] = useState(100);
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
          Toggle Resize to Window {displayBounds ? "ON" : "OFF"}
        </button>
        <button onClick={() => setX((prev) => prev + 10)}>Move Right</button>
      </div>

      <section
        style={{
          height: "400px",
        }}
      >
        <Canvas
          resizeToWindow={resizeToWindow}
          displayBounds={displayBounds}
          backgroundColor="black"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <Rect x={10} y={10} width={100} height={100} fill="red" />
          <Circle x={100} y={100} radius={50} fill="blue" />
          <Rect x={200} y={200} width={100} height={100} fill="green">
            <Circle x={50} y={50} radius={50} fill="yellow" />
            <Rect x={25} y={25} width={50} height={50} fill="purple" />
          </Rect>

          {/* Ignore not register component  */}
          <div>1</div>
        </Canvas>
      </section>
    </main>
  );
}

export default App;
