import { useEffect } from 'react';
import './symbolsGrid.css';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import SymbolCard from '../SymbolCard';
import { fetchAllStocks, selectors } from '@/store/stocksSlice';
import Loading from '../Loading';
type SymbolsGridProps = {
  onSymbolClick: (symbolId: string) => void;
  activeSymbol: null | string;
};

const SymbolsGrid = ({ onSymbolClick, activeSymbol }: SymbolsGridProps) => {
  const apiState = useAppSelector(selectors.apiState);
  const stockSymbols = useAppSelector(selectors.selectStockIds);
  const prices = useAppSelector((state) => state.prices);
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
          : stockSymbols.map((id, i) => (
            <SymbolCard
              active={activeSymbol == null ? null : activeSymbol == id}
              price={prices[id]}
              onClick={onSymbolClick}
              key={i}
              id={id} />
          ))}
    </div>
  );
};

export default SymbolsGrid;
