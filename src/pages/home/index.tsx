import { useState } from 'react';
import IconInternet from '@/assets/svg/icon_internet.svg?react';
import styles from  './index.module.less';

// 定义一个名为Home的函数组件
function Home() {
  // 使用useState钩子，定义一个名为count的状态变量，初始值为0
  const [count, setCount] = useState(0);

  // 返回一个JSX元素，包含一个TestLint组件，三个div元素，两个a元素，一个h1元素，一个div元素，一个p元素，一个p元素
  return (
    <>
      <div>
        <br />
        <span className={styles.icon}>
          <IconInternet className="tc-svg-icon" />
        </span>
      </div>
    </>
  );
}

export default Home;
