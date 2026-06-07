import { useEffect } from 'react';
import { ref, get } from 'firebase/database';
import type { DataSnapshot } from 'firebase/database';
import { db } from '../lib/firebase';
import { setCount } from '../lib/countUtils';

export function useWaitlistCount(): void {
  useEffect(() => {
    setCount(null);

    get(ref(db, 'waitlistCount'))
      .then((snap: DataSnapshot) => {
        setCount((snap.val() as number) || 0, { animate: true });
      })
      .catch(() => {
        setCount(null);
      });
  }, []);
}
