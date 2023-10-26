import { ReactNode, useEffect, useState } from 'react';
import './priceChart.css';
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import { useAppDispatch, useAppSelector } from '@/hooks/redux';
import { PriceHistoryResponse, fetchPriceHistory, selectors } from '@/store/priceHistorySlice';
import Loading from '../Loading';
import { AsyncThunkAction } from '@reduxjs/toolkit';
type PriceChartProps = {
  symbolId: string | null;
  noData: ReactNode
};
const PriceChart = ({ noData, symbolId }: PriceChartProps) => {
  const dispatch = useAppDispatch();
  const [fetchPriceHistoryPromise, setFetchPriceHistoryPromise] = useState<ReturnType<AsyncThunkAction<PriceHistoryResponse, string, {}>> | undefined>();
  useEffect(() => {
    if (symbolId !== null) {
      // Abort previous request
      if (fetchPriceHistoryPromise) {
        console.log(`Aborting Request: "${fetchPriceHistoryPromise.requestId}" with ${fetchPriceHistoryPromise.arg}`, fetchPriceHistoryPromise);
        fetchPriceHistoryPromise?.abort();
      }
      const promise = dispatch(fetchPriceHistory(symbolId));
      setFetchPriceHistoryPromise(promise);
    }
  }, [dispatch, symbolId]);

  const apiState = useAppSelector(selectors.apiState);
  const data = useAppSelector(selectors.selectPriceHistory);
  const symbolInfo = useAppSelector(selectors.selectSymbolInfo);
  return <div className="priceChart__container">{
    apiState.loading
      ? <div className="priceChart__loader"><Loading /></div>
      : symbolId
        ? (
          <div className="priceChart">
            <div className="priceChart__activeTitle">{symbolInfo}</div>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data.map((e) => ({ ...e, time: new Date(e.time).toLocaleTimeString() }))}>
                <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
                <XAxis dataKey="time" />
                <YAxis />
              </LineChart>
            </ResponsiveContainer>
          </div>
        )
        : <div className="priceChart__noData">{noData}</div>
  }</div>
};

export default PriceChart;
