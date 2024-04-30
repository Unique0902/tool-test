import { useState } from 'react';
import './App.css';
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
const countState = atom({
  key: 'counter', // unique ID (with respect to other atoms/selectors)
  default: 0, // default value (aka initial value)
});

const charCountState = selector({
  key: 'charCountState', // unique ID (with respect to other atoms/selectors)
  get: ({ get }) => {
    const count = get(countState);

    return `${count}입니당`;
  },
});
function App() {
  const [count, setCount] = useRecoilState(countState);
  const charCount = useRecoilValue(charCountState);
  return (
    <>
      <button onClick={() => setCount((va) => va + 1)}>+</button>
      {charCount}
      <button onClick={() => setCount((va) => va - 1)}>-</button>
    </>
  );
}

export default App;
