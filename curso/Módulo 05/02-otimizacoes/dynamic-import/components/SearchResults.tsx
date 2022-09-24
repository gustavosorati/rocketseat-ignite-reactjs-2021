import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
    results: any[];
    onAddToWishList: (id: number) => void;
    totalPrice: number;
}

export function SearchResults({ results, onAddToWishList, totalPrice } : SearchResultsProps) {
    console.log(results)
    // const totalPrice = useMemo(() => {
    //     return results.reduce((total, produto) => {
    //         return total + produto.price;
    //     }, 0)
    // }, [results]);

    return (
        <div>
            <h2>{totalPrice}</h2>

            {results.map(product => {
                return (
                    <ProductItem 
                        key={product.title}
                        product={product} 
                        onAddToWishList={onAddToWishList}
                    />
                )
            })}
        </div>
    )
}