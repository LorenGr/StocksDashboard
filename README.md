# FE-CHALLENGE

Custom Hook 
# useElementAnimation

A custom React hook that adds animation classes to an HTML element, allowing for easy integration of click animations in React applications.
### Parameters
- 'elementRef' *(RefObject<HTMLElement | null>)*: A React ref object that references the HTML element to which the animations will be applied.
### Returns
- 'useElementAnimationMethods': An object containing two methods for adding shake and glow animations to the element.
### Example Usage
```
import { useRef } from 'react';
import useElementAnimation from './useElementAnimation';

const MyComponent = () => {
  const elementRef = useRef(null);
  const { addShake, addGlow } = useElementAnimation(elementRef);

  return (
    <div>
      <button onClick={() => addShake(true)}>Shake</button>
      <button onClick={() => addGlow(true)}>Glow</button>
      <div ref={elementRef}>Element to animate</div>
    </div>
  );
};
```

In the example above, we create a ref using the **useRef** hook and pass it to the **useElementAnimation** hook. We then use the returned **addShake** and **addGlow** methods to add shake and glow animations to the element when the corresponding buttons are clicked.

The **addShake** and **addGlow** methods accept a boolean parameter **isPositive**, which determines whether the animation should be a positive (green) or negative (red) animation.