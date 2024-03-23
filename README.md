# Easy React Canvas

## Quick Usage

```tsx
<Canvas
    resizeToWindow={true}
    displayBounds={true}
    backgroundColor="black"
    style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: -1,
    }}>
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
        ></Line>
    </Rect>
    {/* Ignore not register component  */}
    <div>1</div>
</Canvas>
```

![example1.png](docs%2Fimg%2Fexample1.png)
