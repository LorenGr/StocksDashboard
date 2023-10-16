# FE-CHALLENGE

## Changes

- NavBar Contents and Selection Styling

- SymbolCards
  - Contents and Selection Styling
  - Animations during Real-Time Updates
  - Creation of Custom Hook [useElementAnimation](#useElementAnimation)

- Experience Improvements :
  - Responsive Behavior on Desktop, Tablet and Mobile Breakpoints
  - Preloaders added to SymbolCards and PriceChart
  - Error Handling and NoData Message

- Performance Improvements :
  - Memoization of SymbolCard Child Components
  - Lazy Loading of Pages
 
- Possible Future Enhancements :
  - SymbolsView : Virtual Scrolling of Symbol Cards
    - Speed-up client side rendering when there are many cards

<a id="useElementAnimation"></a>
# useElementAnimation *(Custom Hook)* 

A custom React hook that adds animation classes to an HTML element, allowing for easy integration of transitions in React Components.
### Parameters
- 'elementRef' *(RefObject<HTMLElement | null>)*: A React ref object that references the HTML element to which the animations will be applied.
### Returns
- 'useElementAnimationMethods': An object containing two methods for adding shake and glow animations to the element.
### Example Usage
```js
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
