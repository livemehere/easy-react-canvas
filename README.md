# Easy React Canvas

## Quick Usage

```tsx
<Canvas>
    <Rect x={0} y={0} width={100} height={100} fill="red" />
    
    <Circle x={100} y={100} radius={50} fill="blue" />
    
    <Rect x={200} y={200} width={100} height={100} fill="green">
        <Circle x={50} y={50} radius={50} fill="yellow" />
        <Rect x={25} y={25} width={50} height={50} fill="purple" />
    </Rect>
</Canvas>
```

![example1.png](docs%2Fimg%2Fexample1.png)
