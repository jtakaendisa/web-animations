'use client';

import { useState } from 'react';

export const useSliderIndex = (isFocused: boolean) => {
  const [isHovered, setIsHovered] = useState(false);
  const showMarker = isFocused || isHovered;

  const toggleIsHovered = () => setIsHovered((prev) => !prev);

  return { showMarker, toggleIsHovered };
};
