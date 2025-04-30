import React from 'react';
import Logo from '@theme/Logo';
import Link from '@docusaurus/Link';

export default function NavbarLogo() {
    return (
        <div className="navbar__brand__wrapper">
            <Link to="/" className="logo">
                <div className="navbar__brand">
                    <div className="light">Taboo</div>
                    <div>Lib</div>
                </div>
            </Link>
        </div>
    );
}
