import './App.css';
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

const countAtom = atom(0);
const progressAtom = atom((get) => {
  const count = get(countAtom);
  return `${count}입니다`;
});
function App() {
  const count = useAtomValue(progressAtom);
  const setCount = useSetAtom(countAtom);

  return (
    <>
      <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      <div>{count}</div>
      <button onClick={() => setCount((prev) => prev - 1)}>-</button>
    </>
  );
}

export default App;
