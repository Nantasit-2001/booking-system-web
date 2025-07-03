'use client';
import { useEffect } from "react";
import { useRouter } from 'next/navigation';
import AdminGuard from "@/components/auth/AdminGuard";

export default function AdminPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace('/admin/rooms');
    }, [router]);

    return (
        <AdminGuard>
            <div></div>
        </AdminGuard>
    );
}