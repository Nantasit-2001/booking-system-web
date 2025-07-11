// src/components/auth/AdminGuard.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { LoadingComponent } from '../loading';

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { getToken, isSignedIn } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkRole() {
      const token = await getToken();
      if (!token) {
        router.push('/'); // ไม่ได้ login
        return;
      }
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/role`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        router.push('/');
        return;
      }

      const data = await res.json();
      if (data.role !== 'admin') {
        router.push('/');
      } else {
        setLoading(false);
      }
    }

    checkRole();
  }, [isSignedIn]);

  if (loading) return 
          <div className="flex justify-center items-center h-screen">
            <LoadingComponent text='loading room details...'/>
          </div>
  return <>{children}</>;
}
