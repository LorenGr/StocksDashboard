## Highlights

- SymbolCards
  - Contents and Selection Styling
  - Animations during Real-Time Updates
  - Creation of Custom Hook : useElementAnimation

- UX :
  - Responsive Behavior on Desktop, Tablet and Mobile Breakpoints
  - Preloaders to SymbolCards and PriceChart
  - Error Handling and NoData Message
  - Fast Clicks on Cards during Slow Connection
    - <sub>Race Condition with flashing of Charts due to multiple queued requests avoided.</sub>

- Performance :
  - Memoization of SymbolCard Child Components
  - Lazy Loading of Pages
  - Abort any previous PriceHistory Request before making a new one.
 
- Possible Future Enhancements :
  - SymbolsView : Virtual Scrolling of Symbol Cards
    - <sub>Speed-up client side rendering when there are many cards</sub>
