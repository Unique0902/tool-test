import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { observer } from 'mobx-react-lite';
import { makeAutoObservable } from 'mobx';
class Counter {
  countPassed = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increaseCounter() {
    this.countPassed += 1;
  }
  decreaseCounter() {
    this.countPassed -= 1;
  }
}
const myCounter = new Counter();
// 어렵군

const App = observer(({ counter }: { counter: Counter }) => {
  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => counter.increaseCounter()}>
          count is {counter.countPassed}
        </button>
        <button onClick={() => counter.decreaseCounter()}>
          count is {counter.countPassed}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
});

const App2 = () => {
  return <App counter={myCounter} />;
};

export default App2;
