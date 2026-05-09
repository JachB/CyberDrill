'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { copy } from '@/lib/copy';

export function StarRating() {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const display = hover || rating;

  const feedback =
    rating === 0
      ? null
      : rating <= 2
      ? copy.phished.ratingFeedback.hard
      : rating === 3
      ? copy.phished.ratingFeedback.medium
      : copy.phished.ratingFeedback.easy;

  return (
    <section className="space-y-3">
      <h3 className="text-sm font-semibold text-[color:var(--color-text)]">
        {copy.phished.ratingHeading}
      </h3>
      <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setRating(n)}
            onMouseEnter={() => setHover(n)}
            className="p-1 rounded transition-transform hover:scale-110"
            aria-label={`${n} z 5`}
          >
            <Star
              className={`w-7 h-7 transition-colors ${
                n <= display ? 'text-[color:var(--color-warning)] fill-current' : 'text-[color:var(--color-muted)]'
              }`}
            />
          </button>
        ))}
      </div>
      {feedback && (
        <p className="text-sm text-[color:var(--color-muted)] italic">{feedback}</p>
      )}
    </section>
  );
}
