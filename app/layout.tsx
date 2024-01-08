'use client';
import {LayoutProvider} from '../layout/context/layoutcontext';
import {PrimeReactProvider} from 'primereact/api';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import React from "react";

interface RootLayoutProps {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Readonly<RootLayoutProps>) {
    return (
        <html lang="pt" suppressHydrationWarning>
            <head>
                <link id="theme-css" href={`/themes/lara-dark-indigo/theme.css`} rel="stylesheet"></link>
                <title>Loja Virtual</title>
            </head>
            <body>
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
