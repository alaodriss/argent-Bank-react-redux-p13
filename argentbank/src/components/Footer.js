import React from 'react';
import styled from 'styled-components'

function Footer () {

    const FooterWrapper = styled.div`
    .footer {
        display: flex;
        justify-content: center;
        border-top: 2px solid #ccc;
        padding: 2rem 0 1.5rem;
    }

.footer-text {
        margin: 0;
        padding: 0;
    }
        `



    return (
        <FooterWrapper>
            <footer className="footer">
                <p className="footer-text">Copyright 2020 Argent Bank</p>
            </footer>
        </FooterWrapper>
        );

}

export default Footer;
