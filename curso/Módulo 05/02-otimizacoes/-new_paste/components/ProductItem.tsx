import { memo } from 'react';

interface ProductItemProsp {
    product: {
        id:number;
        price: number;
        title: string;
        priceFormatted: string
    }
    onAddToWishList: (id: number) => void;
}

function ProductItemComponent ({ product, onAddToWishList }: ProductItemProsp) {
    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>
            <button onClick={() => onAddToWishList(product.id)}>Add to wishlist</button>
        </div>
    )
}

// eslint-disable-next-line react/display-name
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
});