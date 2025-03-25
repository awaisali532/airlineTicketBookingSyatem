import React from 'react';

import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className='header_main'>
        <div className='container'>
            <div className='header_inr'>
                <div className='logo_main'>
                    <Link to="/" className='logo_otr'>
                        <img className='logo_img' src='' alt='' />
                    </Link>
                </div>
                <nav className='menu_otr'>
                    <ul className='menu_ul'>
                        <li className='menu_li'>
                            <Link to='/' className='menu_a heading-ssb'>Home</Link>
                        </li>
                        <li className='menu_li'>
                            <Link to='/' className='menu_a heading-ssb'>About</Link>
                        </li>
                        <li className='menu_li'>
                            <Link to='/' className='menu_a heading-ssb'>Pages</Link>
                        </li>
                        <li className='menu_li'>
                            <Link to='/' className='menu_a heading-ssb'>Blog</Link>
                        </li>
                        <li className='menu_li'>
                            <Link to='/' className='menu_a heading-ssb'>Contact</Link>
                        </li>
                    </ul>
                </nav>

                <div className='action_otr'>
                    <Link to='/' className='primary_btn'>
                        <span className='button_text'>Sign In</span>
                    </Link>
                </div>
            </div>
        </div>
    </header>
  )
}

export default Header
