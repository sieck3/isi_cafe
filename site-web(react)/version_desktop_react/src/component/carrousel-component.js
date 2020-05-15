import React from 'react'

const CarrouselComponent = ({ images, onChangePage }) => (
    <div id='slider'>
        <div id='slider-container' onClick={onChangePage}>
            {images.map((image, index) => <img className='img-c' key={index} src={image.path} alt={'carousel' + index + 1} />)}
            <div><label>hi</label></div>
        </div>
    </div>
)

export default CarrouselComponent

// productsQtyName[0].map((l,index) => <label key={index}>{l.name}</label>
// {commande.products.map((produit, index) => <label key={index}>{produit.name + ':' + 'cesar'}</label>)}
