## How to start repo
``
yarn start
``

## Overview

An application that shows a CSS Grid containing Stock Item Cards that are updated in Real Time. The real time updates of Stock values are coming from an active web socket connection. The Stock Item Cards have specific behavior depending on the updated value. If the new value is bigger or smaller then 25% of the previous value then the card will shake through a css animation. The color will also show red or green, depending on whether the new value is a positive or negative change. Clicking upon on each Card shows a Chart that outlines the price history of the selected stock. The application is responsive and reorganises the layout of the cards and the chart depending on the space available on screen.

## Highlights

- Servers : 
  - Backend Server : API to provide Prices history
  - Socket Server : Provide real-time Stock prie updates 

- SymbolCards
  - Contents and Selection Styling
  - Animations during Real-Time Updates
  - Custom Hook : useElementAnimation

- UX :
  - Responsive Behavior on Desktop, Tablet and Mobile Breakpoints
  - Preloaders to SymbolCards and PriceChart
  - Error Handling and NoData Message
  - Handle Fast Clicks on Cards by Aborting previous ongoing calls before making new call

- Performance :
  - Memoization of SymbolCard Child Components
  - Lazy Loading of Pages
 
- Possible Future Enhancements :
  - SymbolsView : Virtual Scrolling of Symbol Cards
    - <sub>Speed-up client side rendering when there are many cards</sub>
