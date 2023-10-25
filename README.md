## How to start repo
``
yarn start
``

## Stack and Packages

- Express
- React
- Typescript
- ReduxToolKit
- ReactVirtualScroll
- Recharts

## Overview

StocksDashboard is a sample web application designed for real-time monitoring and analysis of stock market data. This tool provides dynamic insights into stock prices and their fluctuations.

## Key Features:

1. **Real-Time Updates:** StocksDashboard leverages an active WebSocket connection to deliver real-time updates of stock values. Users can stay informed about market changes as they happen.

2. **Responsive Design:** The application offers a seamless user experience across various devices. Its responsive design optimizes layout and functionality to adapt to different screen sizes, ensuring users can access critical information from anywhere.

3. **Dynamic CSS Grid:** Stock items are displayed in a dynamic CSS Grid layout. Each stock item is presented as an interactive card, and the grid auto-adjusts based on available screen space.

4. **Visual Feedback:** Stock Item Cards provide visual feedback on price changes. When a stock's value deviates by more than 25% from its previous value, the card undergoes a subtle shaking animation, highlighting significant changes. Additionally, cards change color to red for negative changes and green for positive changes.

5. **Interactive Charts:** Users can dive deeper into stock performance by clicking on any card. This action opens an interactive chart that displays the price history of the selected stock. This feature empowers users with the tools they need for in-depth analysis.

6. **Optimized Performance:** StocksDashboard ensures smooth user interactions. When a user clicks quickly on multiple cards, the application automatically aborts any previous calls, preventing the accumulation and queuing of requests. This smart handling of rapid clicks enhances performance and responsiveness. There's no memory leak, as the application efficiently manages resources to provide a seamless user experience.

7. **Mobile Optimization:** On mobile devices, StocksDashboard optimizes performance and user experience. Instead of a grid, stock cards are presented within a Virtual Scrolling container, ensuring maximum speed and efficiency on smaller screens.

8. **Custom Animation Hook:** A custom hook: [useElementAnimation](https://github.com/LorenGr/StocksDashboard/tree/main/frontend/src/hooks/useElementAnimation) is available that simplifies the integration of animations within React components. This hook seamlessly adds animation classes to HTML elements, enabling developers to create smooth and visually appealing transitions in their applications.