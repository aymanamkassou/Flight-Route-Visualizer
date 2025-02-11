import { useState, useEffect, useCallback } from 'react';
import { PathResult } from '@/types';

export const usePathAnimation = (
  pathResult: PathResult | null,
  speed: number,
  isAnimating: boolean,
  isPaused: boolean,
  onAnimationComplete: () => void
) => {
  const [currentStep, setCurrentStep] = useState(0);

  const reset = useCallback(() => {
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (!pathResult || !isAnimating || isPaused) return;

    const interval = setInterval(() => {
      setCurrentStep((current) => {
	if (current >= pathResult.steps.length - 1) {
	  clearInterval(interval);
	  onAnimationComplete();
	  return current;
	}
	return current + 1;
      });
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [pathResult, speed, isAnimating, isPaused, onAnimationComplete]);

  return { currentStep, reset };
};
