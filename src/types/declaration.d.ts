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