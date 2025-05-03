import React from 'react';
import Layout from '@theme/Layout';
import PluginStore from '../components/PluginStore';

export default function PluginCatalogPage(): JSX.Element {
  return (
    <Layout
      title="TabooLib 插件目录"
      description="TabooLib 插件目录 - 浏览和下载 TabooLib 插件"
    >
      <PluginStore />
    </Layout>
  );
} 