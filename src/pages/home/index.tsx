import { useState } from 'react';
import reactLogo from '@/assets/react.svg';
import viteLogo from '/vite.svg'
import './Home.module.less'

// 定义一个名为Home的函数组件
function Home() {
  // 使用useState钩子，定义一个名为count的状态变量，初始值为0
  const [count, setCount] = useState(0);

  // 返回一个JSX元素，包含一个TestLint组件，三个div元素，两个a元素，一个h1元素，一个div元素，一个p元素，一个p元素
  return (
    <>
      <div>
        <br />
        <br />
        {['a', 'b', 'c'].map((item) => (
          <div key={item}>{item}</div>
        ))}
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is
          {' '}
          {count}
        </button>
        <p>
          Edit
          {' '}
          <code>src/Home.tsx</code>
          {' '}
          and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default Home;
