import React from 'react';
import Link from 'next/link';

function ProductList(props) {
    // Lọc các sản phẩm có giá thấp hơn 500000
    const filteredProducts = props.data.filter(product => product.price < 500000);

    return (
        <>
            {filteredProducts.map((product) => {
                const { _id, name, img, price } = product;
                return (
                    <div className="col-sm-6 col-md-4 col-lg-3 my-3" key={_id}>
                        <div className="card position-relative p-1">
                            <img className="card-img-top mt-2" src={`http://localhost:3000/img/${img}`} height="240px" alt={name} />
                            <div className="card-body text-center">
                                <h5 className="card-title text-success">{name}</h5>
                                <p className="text-danger m-0"><b>Giá: {price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</b></p>
                                <div className="text-center">
                                    <Link href={`/productDetail/${_id}`} className="btn btn-warning text-white mt-2">Xem chi tiết</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            })}
        </>
    );
}

export default ProductList;
