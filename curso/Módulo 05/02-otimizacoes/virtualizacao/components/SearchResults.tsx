import { List, AutoSize, ListRowRenderer } from 'react-virtualized'

import { useMemo } from "react";
import { ProductItem } from "./ProductItem";

type SearchResultsProps = {
    results: any[];
    onAddToWishList: (id: number) => void;
    totalPrice: number;
}

export function SearchResults({ results, onAddToWishList, totalPrice } : SearchResultsProps) {
    const rowRenderer: ListRowRenderer = ({index, key, style}) => {
        return (
            <div key={key} style={style}>
                <ProductItem 
                    product={results[index]} 
                    onAddToWishList={onAddToWishList}
                />
            </div>
        )
    }

    return (
        <div>
            <h2>{totalPrice}</h2>

            <List 
                height={300}
                rowHeight={30}
                width={900}
                overscanRowCount={5}
                rowRenderer={rowRenderer}
            />
        </div>
    )
}