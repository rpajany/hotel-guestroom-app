import React from 'react'

function Footer() {
    const style = {
        height: '40px',
        padding: '10px',
        // Adding media query..
        '@media print': {
            display: 'none',
        },
    };

    return (

        <footer id="noprint" class="main-footer bg-light noprint" style={{ height: '40px', padding: '10px' }} >

            <div class="float-right d-none d-sm-inline">
                {/* -*- */}
            </div>

            {/* <strong>Copyright &copy; 2020 <a href="https://vishwakarma-technologies.business.site/">VISHWAKARMA TECHNOLOGIES</a>.</strong> All rights reserved. */}
            <strong>Copyright &copy;  <a href="https://vishwakarma-technologies.business.site/">VISHWAKARMA TECHNOLOGIES</a>.</strong>
        </footer>
    )
}

export default Footer;