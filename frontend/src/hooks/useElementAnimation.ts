import { RefObject } from 'react';
import './animations.css';

type AnimationFunction = () => void;

const animationClassNames = [
    'elementAnimation__posShake',
    'elementAnimation__negShake',
    'elementAnimation__posGlow',
    'elementAnimation__negGlow',
];

const useElementAnimation = (elementRef: RefObject<HTMLElement | null>) => {

    let timer: string | number | NodeJS.Timeout | undefined;

    const addAnimation = (animationClass: string): AnimationFunction => () => {

        if (elementRef.current) {
            clearTimeout(timer);
            const element = elementRef.current;

            animationClassNames.forEach(
                name => element.classList.remove(name)
            );
            element.classList.add(animationClass);

            timer = setTimeout(() => {
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
