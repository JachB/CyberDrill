'use client';

import { useEffect, useState } from 'react';

interface Props {
  target: number;
  duration?: number;
}

export function StatCountUp({ target, duration = 1500 }: Props) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const progress = Math.min((Date.now() - start) / duration, 1);
      setValue(Math.round(target * progress));
      if (progress >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [target, duration]);

  return <span>{value}</span>;
}
