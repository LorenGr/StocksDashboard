import { formatLargeNumber } from "@/store/helpers";
import { ReactComponent as MarketCapIcon } from '@/assets/market_cap.svg';
import Trend_UP from '@/assets/up.png';
import Trend_DOWN from '@/assets/down.png';
import { ReactComponent as IndustryLogo } from '@/assets/industry.svg';
import { ReactComponent as CompanyIcon } from '@/assets/company.svg';

import React from "react";

type SymbolCardBodyProps = {
    id: string;
    price: number;
    companyName: string;
    industry: string;
    marketCap: number;
    trend: string | null;
}

const trendImages: Record<string, string> = {
    UP: Trend_UP,
    DOWN: Trend_DOWN
}

export const SymbolCardBody = ({ price, id, trend, companyName, industry, marketCap }: SymbolCardBodyProps) => (

    <React.Fragment>
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
    </React.Fragment>

)