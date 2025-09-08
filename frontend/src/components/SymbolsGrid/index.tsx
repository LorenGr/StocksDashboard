import { useEffect } from 'react';
import './symbolsGrid.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import Loading from '../Loading';
import useDeviceDetect from '@/hooks/useDeviceDetect';
import VirtualScroll from "react-dynamic-virtual-scroll";

interface SymbolsGridWrapperProps {
  onSymbolClick: (symbolId: string) => void;
  activeSymbol: null | string;
};

interface SymbolsGridProps extends SymbolsGridWrapperProps {
  stockSymbols: string[],
  prices: Record<string, number>
}

const SymbolsGridDesktop = ({ stockSymbols, prices, onSymbolClick, activeSymbol }: SymbolsGridProps) => (
  <>
    {stockSymbols.map((id, i) => (
      <SymbolCard
        active={activeSymbol == null ? null : activeSymbol == id}
        price={prices[id]}
        onClick={onSymbolClick}
        key={i}
        id={id}
      />
    ))}
  </>
);

const SymbolsGridMobile = ({ stockSymbols, prices, onSymbolClick, activeSymbol }: SymbolsGridProps) =>
  <VirtualScroll
    minItemHeight={173}
    totalLength={stockSymbols.length}
    renderItem={(rowIndex: number) => (
      <SymbolCard
        cardClassName="symbolCard__mobile"
        active={activeSymbol == null ? null : activeSymbol == stockSymbols[rowIndex]}
        price={prices[stockSymbols[rowIndex]]}
        onClick={onSymbolClick}
        key={rowIndex}
        id={stockSymbols[rowIndex]} />
    )}
  />;


const SymbolsGrid = (props: SymbolsGridWrapperProps) => {
  const apiState = useAppSelector(selectors.apiState);
  const isTouchDevice = useDeviceDetect();
  const data = {
    stockSymbols: useAppSelector(selectors.selectStockIds),
    prices: useAppSelector((state) => state.prices)
  }

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchAllStocks());
  }, [dispatch]);

  return (
    <div className="symbolsGrid">
      {apiState.error
        ? <div>Failed to get stocks</div>
        : apiState.loading
          ? <Loading />
          : isTouchDevice
            ? <SymbolsGridMobile
              {...data}
              {...props}
            />
            : <SymbolsGridDesktop
              {...data}
              {...props}
            />}
    </div>
  );
};

export default SymbolsGrid;
