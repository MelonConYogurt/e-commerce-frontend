"use client";

import {useStore} from "@/hooks/cart";

function Counter() {
  const {count, increase, decrease} = useStore();
  return (
    <div>
      <h1>{count}</h1>
      <button onClick={increase}>Increase</button>
      <button onClick={decrease}>Decrease</button>
    </div>
  );
}

export default Counter;
