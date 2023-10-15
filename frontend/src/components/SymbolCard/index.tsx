import { useCallback, useEffect, useState } from 'react';
import './symbolCard.css';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import Trend_UP from '@/assets/up.png';
import Trend_DOWN from '@/assets/down.png';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';
import { formatLargeNumber } from '@/store/helpers';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

type PriceShift = { positive: boolean, shake: boolean } | null;

const getPriceShift = (prevPrice: number, price: number): PriceShift => {
  if (price > prevPrice) { //Price went up
    return {
      positive: true,
      shake: (price - prevPrice) > (0.25 * prevPrice)
    };
  }
  if (price < prevPrice) { //Price went down
    return {
      positive: false,
      shake: (prevPrice - price) > (0.25 * prevPrice)
    }
  }
  return null;
}

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const [prevPrice, setPrevPrice] = useState<number | null>(null);
  const [priceShift, setPriceShift] = useState<PriceShift | null>(null);
  useEffect(() => {
    if (prevPrice && price !== prevPrice) { //If price changed
      setPriceShift(getPriceShift(prevPrice, price));
    }
    setPrevPrice(price);
  }, [price]);

  const { trend, industry, companyName, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [id]);

  const trendImages = {
    UP: Trend_UP,
    DOWN: Trend_DOWN
  }

  const symbolCardClasses = [
    'symbolCard',
    priceShift?.shake
      ? priceShift?.positive ? 'symbolCard__posShake' : 'symbolCard__negShake'
      : priceShift?.positive ? 'symbolCard__posGlow' : 'symbolCard__negGlow'
  ]

  return (
    <div onClick={handleOnClick} className={symbolCardClasses.join(" ")}>
      <div className="symbolCard__title">
        {id}
      </div>
      {trend && <img className="symbolCard__trend" src={trendImages[trend]} />}
      <div className="symbolCard__priceRow">
        <div className="symbolCard__priceTitle">Price: </div>
        <div className="symbolCard__priceValue">${Math.floor(price) || 0} </div>
      </div>
      <div className="symbolCard__row">
        <CompanyIcon className="symbolCard__icon" /> <div className="symbolCard__rowText">{companyName}</div>
      </div>
      <div className="symbolCard__row">
        <IndustryLogo className="symbolCard__icon" /> <div className="symbolCard__rowText">{industry}</div>
      </div>
      <div className="symbolCard__row">
        <MarketCapIcon className="symbolCard__icon" /> <div className="symbolCard__rowText">${formatLargeNumber(marketCap)}</div>
      </div>
    </div>
  );
};
export default SymbolCard;
