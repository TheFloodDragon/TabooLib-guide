import React from 'react';
import Layout from '@theme/Layout';
import PluginStore from '../components/PluginStore';

export default function PluginStorePage(): JSX.Element {
  return (
    <Layout
      title="TabooLib 插件商店"
      description="TabooLib 插件商店 - 浏览和下载 TabooLib 插件"
    >
      <PluginStore />
    </Layout>
  );
} 