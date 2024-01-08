import { Metadata } from 'next';
import Layout from '../../layout/layout';
import React from "react";

interface AppLayoutProps {
    children: React.ReactNode;
}

export const metadata: Metadata = {
    title: 'Loja Virtual',
    robots: { index: false, follow: false },
    viewport: { initialScale: 1, width: 'device-width' },

    icons: {
        icon: '/favicon.ico'
    }
};

export default function AppLayout({ children }: AppLayoutProps) {
    return <Layout>{children}</Layout>;
}
