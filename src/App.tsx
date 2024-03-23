import Canvas from "./lib/Canvas";
import { useState } from "react";
import Rect from "./lib/shapes/Rect";
import Circle from "./lib/shapes/Circle";

function App() {
  const [resizeToWindow, setResizeToWindow] = useState(true);
  const [x, setX] = useState(100);
  return (
    <main>
      <div
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <button onClick={() => setResizeToWindow(!resizeToWindow)}>
          Toggle Resize to Window
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
          backgroundColor="black"
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
        >
          <Rect x={x} y={100} width={100} height={100} fill="red">
            <Rect x={10} y={10} width={50} height={50} fill="blue" />
          </Rect>
          <Circle x={100} y={100} radius={50} fill="green">
            <Circle x={10} y={10} radius={20} fill="yellow" />
          </Circle>

          {/* Ignore not register component  */}
          <div>1</div>
        </Canvas>
      </section>
    </main>
  );
}

export default App;
