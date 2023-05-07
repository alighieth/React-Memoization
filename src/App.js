import logo from "./logo.svg";
import "./App.css";
import React, { useState, memo, useMemo } from "react";

const TimerComponent = () => {
  console.log("TimerComponent have rerendered");
  return <span>Hello World</span>;
};

const MemoizedTimerComponent = memo(TimerComponent);
// memo is a higher order component which basically wraps the old component in our case it is the TimerComponent

const ColorBox = ({ color }) => {
  console.log(`ColorBox rerendered: ${color}`);

  return (
    <div
      style={{
        backgroundColor: color,
        width: "50vw",
        height: "20vh",
      }}
    ></div>
  );
};

// so how does react memoize work?
// it doesn't log all memoized components, what is does it that it compares previous props with new props
// and then if they are different the component will rerender, else nothing will change

// what are props ?
// properties of a component, in other words any properties that you pass to the component

// the cache of the component, or memoized component is only for the specific instance of that component,
// so if we had to colorboxes and they had different props, it wont affect each other's renders , they are totally different instances

// in React the DOM is not rendered totally. What happens is that once you render the component, this is then translated to something called
// the VDOM, whixh is a virtual DOM, this is used by react to minimize the rendering operations of the DOM which is really expensive.
// The virtual DOM (VDOM) is a programming concept where an ideal, or “virtual”, representation of a UI is kept in memory and synced with the “real” DOM by a library such as ReactDOM. This process is called reconciliation.
// https://legacy.reactjs.org/docs/faq-internals.html
// https://legacy.reactjs.org/docs/reconciliation.html

// There are some generic solutions to this algorithmic problem of generating the minimum number of operations to transform one tree into another. However, the state of the art algorithms have a complexity in the order of O(n3) where n is the number of elements in the tree.

// If we used this in React, displaying 1000 elements would require in the order of one billion comparisons. This is far too expensive. Instead, React implements a heuristic O(n) algorithm based on two assumptions:

// Two elements of different types will produce different trees.
// The developer can hint at which child elements may be stable across different renders with a key prop.
// In practice, these assumptions are valid for almost all practical use cases.

const MemoizedColorBox = memo(ColorBox);

function App() {
  const [time, setTime] = useState(0);
  const [color, setColor] = useState("red");

  console.log(`App rerendered ${time}`);

  return (
    <div className="App">
      <button
        onClick={() => {
          setTime(() => time + 1);
        }}
      >
        Re-render App
      </button>
      <button
        onClick={() => {
          setColor(color === "red" ? "green" : "red");
        }}
      >
        Change Color
      </button>
      <MemoizedTimerComponent />
      <MemoizedColorBox color={color} />
      <MemoizedColorBox color={color === "red" ? "green" : "red"} />
    </div>
  );
}

export default App;
