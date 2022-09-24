import dynamic from 'next/dynamic';
import { memo, useState } from 'react';
// import { AddProductToWishlist } from './AddProductToWishlist';
import { AddProductToWishlistProps } from './AddProductToWishlist';

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(() => {
    return import('./AddProductToWishlist').then(mod => mod.AddProductToWishlist)
}, {
    loading: () => <span>Carregando</span>
})

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
    const [isAddingToWishlist, setIsAddingToWishlist] = useState(false);


    return (
        <div>
            {product.title} - <strong>{product.priceFormatted}</strong>

            <button onClick={() => setIsAddingToWishlist(true)}>Adicionar aos favoritos</button>

            {isAddingToWishlist && (
                <AddProductToWishlist 
                    onAddToWishlist={() => onAddToWishList(product.id)}
                    onRequestClose={() => setIsAddingToWishlist(false)}
                />
            )}

        </div>
    )
}

// eslint-disable-next-line react/display-name
export const ProductItem = memo(ProductItemComponent, (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product);
});