import useElementAnimation from "@/hooks/useElementAnimation/useElementAnimation";
import { useEffect, useRef, useState } from "react";

type PriceShift = { positive: boolean, shake: boolean } | null;

interface SymbolCardContainerProps {
    price: number;
    children: React.ReactElement,
    onClick: () => void;
    active: boolean | null
}

const getPriceShift = (prevPrice: number, price: number): PriceShift => {
    if (!price) return null;
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

export const SymbolCardContainer = ({ active, price, children, onClick }: SymbolCardContainerProps) => {

    const cardRef = useRef<any>();
    const { addShake, addGlow } = useElementAnimation(cardRef);

    const [prevPrice, setPrevPrice] = useState<number | null>(null);
    const [priceShift, setPriceShift] = useState<PriceShift | null>(null);

    const symbolCardClasses = [
        'symbolCard',
        active != null ? (active ? 'symbolCard__active' : 'symbolCard__inactive') : ''
    ]

    useEffect(() => {
        if (prevPrice && price !== prevPrice) { //If price changed
            setPriceShift(getPriceShift(prevPrice, price));
        }
        setPrevPrice(price);
    }, [price]);

    useEffect(() => {
        if (priceShift) {
            if (priceShift?.shake) {
                priceShift.positive
                    ? addShake(true)
                    : addShake(false);
            } else {
                priceShift?.positive
                    ? addGlow(true)
                    : addGlow(false);
            }
        }
    }, [priceShift]);


    return <div
        ref={cardRef}
        onClick={onClick}
        className={symbolCardClasses.join(" ")}>
        {children}
    </div>
}