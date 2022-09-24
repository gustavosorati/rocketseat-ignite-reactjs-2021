interface ProductItemProsp {
    product: {
        id:number;
        price: number;
        title: string;
    }
}

export function ProductItem({ product }: ProductItemProsp) {
    return (
        <div>
            {product.title} - <strong>{product.price}</strong>
        </div>
    )
}