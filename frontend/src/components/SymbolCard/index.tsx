import { useCallback } from 'react';
import './symbolCard.css';
import { useAppSelector } from '@/hooks/redux';
import React from 'react';
import { SymbolCardBody } from './body';
import { SymbolCardContainer } from './container';

type SymbolCardProps = {
  active: boolean | null;
  id: string;
  onClick: (symbolId: string) => void;
  price: number;
};

const SymbolCard = React.memo(({ active, id, onClick, price }: SymbolCardProps) => {

  const stockEntities = useAppSelector(
    (state) => state.stocks.entities[id]
  );
  const handleOnClick = useCallback(() => {
    onClick(id);
  }, [id]);

  return (
    <SymbolCardContainer
      active={active}
      onClick={handleOnClick}
      price={price}>
      <SymbolCardBody
        price={price}
        id={id}
        {...stockEntities} />
    </SymbolCardContainer>
  );
});
export default SymbolCard;