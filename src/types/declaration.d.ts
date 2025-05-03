declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '@docusaurus/Link' {
  import { ComponentProps } from 'react';
  
  export type LinkProps = ComponentProps<'a'> & {
    to?: string;
    activeClassName?: string;
    isNavLink?: boolean;
    exact?: boolean;
  };
  
  const Link: React.FC<LinkProps>;
  export default Link;
}

// 添加@theme/Layout的类型声明
declare module '@theme/Layout' {
  import React from 'react';
  
  export interface LayoutProps {
    children?: React.ReactNode;
    title?: string;
    description?: string;
    wrapperClassName?: string;
    pageClassName?: string;
    noFooter?: boolean;
  }
  
  const Layout: React.FC<LayoutProps>;
  export default Layout;
} 