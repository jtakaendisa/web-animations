'use client';

import { useCallback, useState } from 'react';

export const useSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleUpdateIndex = useCallback((index: number) => setCurrentIndex(index), []);

  return { currentIndex, handleUpdateIndex };
};
