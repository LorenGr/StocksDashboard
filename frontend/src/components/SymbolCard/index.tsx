import { useCallback } from 'react';
import './symbolCard.css';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import { useAppSelector } from '@/hooks/redux';

type SymbolCardProps = {
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = ({ id, onClick, price }: SymbolCardProps) => {
  const { trend, industry, companyName, marketCap } = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <div onClick={handleOnClick} className="symbolCard">
      <div className="symbolCard__title">
        {id}
      </div>
      {/* <span> - {trend}</span> */}
      <div className="symbolCard__priceRow">
        <div className="symbolCard__priceTitle">Price:</div>
        <div className="symbolCard__priceValue">${Math.floor(price) || 0} </div>
      </div>
      <div className="symbolCard__row">
        <CompanyIcon className="symbolCard__icon" /> <div className="symbolCard__rowText">{companyName}</div>
      </div>
      <div className="symbolCard__row">
        <IndustryLogo className="symbolCard__icon" /> <div className="symbolCard__rowText">{industry}</div>
      </div>
      <div className="symbolCard__row">
        <MarketCapIcon className="symbolCard__icon" /> <div className="symbolCard__rowText">{marketCap}</div>
      </div>
    </div>
  );
};
export default SymbolCard;
