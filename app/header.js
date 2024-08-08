"use client";
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';


const Header = () => {
    const cartItems = useSelector((state) => state.cart.items);
    const cartCount = cartItems.reduce((count, item) => count + Number(item.quantity), 0);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
        const token = document.cookie.split(';').find((c) => c.trim().startsWith('token='));
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <>
            <header className="header">
                <div className="header__top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__left">
                                    <ul>
                                        <form className="d-flex ms-4" action="/search">
                                            <input className="form-control me-2" name="keyword" placeholder="Nhập tên sản phẩm" />
                                            <button className="btn btn-outline-success" type="submit" >Tìm</button>
                                        </form>
                                    </ul>
                                </div>
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <div className="header__top__right">
                                    <div className="header__top__right__social">
                                        <Link href="#"><i className="fa fa-facebook"></i></Link>
                                        <Link href="#"><i className="fa fa-twitter"></i></Link>
                                        <Link href="#"><i className="fa fa-linkedin"></i></Link>
                                        <Link href="#"><i className="fa fa-pinterest-p"></i></Link>
                                    </div>
                                    <div className="header__top__right__language">
                                        <img src="img/language.png" alt="" />
                                        <div>English</div>
                                        <span className="arrow_carrot-down"></span>
                                        <ul>
                                            <li><Link href="#">Spanis</Link></li>
                                            <li><Link href="#">English</Link></li>
                                        </ul>
                                    </div>
                                    <div className="header__top__right__auth">
                                        <Link href={isLoggedIn ? '/info' : '/login'}><i className="fa fa-user"></i> userdetail</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3">
                            <div className="header__logo">
                                <Link href="/"><img src="img/logo.png" alt="" /></Link>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <nav className="header__menu">
                                <ul>
                                    <li className="active"><Link href="/">Home</Link></li>
                                    <li><Link href="./shop-grid.html">Shop</Link></li>
                                    <li><Link href="#">Pages</Link>
                                        <ul className="header__menu__dropdown">
                                            <li><Link href="/cart">Giỏ hàng</Link></li>
                                            <li><Link href="/products">Sản phẩm</Link></li>
                                            <li><Link href="/login">Đăng Nhập</Link></li>
                                            <li><Link href="/register">Đăng ký</Link></li>
                                        </ul>
                                    </li>
                                    <li><Link href="./blog.html">Blog</Link></li>
                                    <li><Link href="./contact.html">Contact</Link></li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-lg-3">
                            <div className="header__cart">
                                <ul>
                                    <li><Link href="#"><i className="fa fa-heart"></i> <span>1</span></Link></li>
                                    <li><Link href="/cart"><i className="fa fa-shopping-bag"></i> <span>{cartCount}</span></Link></li>
                                </ul>
                                <div className="header__cart__price">item: <span>$150.00</span></div>
                            </div>
                        </div>
                    </div>
                    <div className="humberger__open">
                        <i className="fa fa-bars"></i>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;


