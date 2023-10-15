import { RefObject } from 'react';
import './animations.css';

type AnimationFunction = () => void;

const useElementAnimation = (elementRef: RefObject<HTMLElement | null>) => {
    const addAnimation = (animationClass: string): AnimationFunction => () => {
        if (elementRef.current) {
            const element = elementRef.current;
            element.classList.add(animationClass);

            setTimeout(() => {
                element.classList.remove(animationClass);
            }, 1000);
        }
    };

    return {
        addShake: (isPositive: boolean) =>
            addAnimation(`elementAnimation__${isPositive ? 'pos' : 'neg'}Shake`)(),
        addGlow: (isPositive: boolean) =>
            addAnimation(`elementAnimation__${isPositive ? 'pos' : 'neg'}Glow`)(),
    };
};

export default useElementAnimation;
