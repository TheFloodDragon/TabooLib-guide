import React from 'react';
import Layout from '@theme/Layout';
import KetherList from '../components/KetherList';
import Head from '@docusaurus/Head';

export default function KetherListPage(): JSX.Element {
  return (
    <Layout
      title="Kether Explorer"
      description="探索与搜索Kether动作库"
    >
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta name="theme-color" content="#2563EB" />
      </Head>
      <main style={{ 
        padding: '0', 
        maxWidth: '100%', 
        overflow: 'hidden',
        minHeight: '100vh'
      }}>
        <KetherList />
      </main>
    </Layout>
  );
} 