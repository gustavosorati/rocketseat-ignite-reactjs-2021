import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { createIf } from 'typescript';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);


export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  useEffect(() => console.log(cart), [cart]);


  const addProduct = async (productId: number) => {
    try {
      const productExists = cart.find(product => product.id === productId);

      if(typeof productExists === "undefined") {
        const {data} = await api.get<Product>(`/products/${productId}`);
        
        setCart(rest => [...rest, { ...data, amount: 1 }]);

      } else {
        const {data: stockProduct} = await api.get<Stock>(`/stock/${productId}`);

        const newCartItens = cart.map(product => {

          if(productId === product.id) {
            if(stockProduct.amount <= product.amount){
              throw new Error();
            } else{
              product.amount = product.amount + 1;
            }
          }            
          
          return product;
        });

        setCart(newCartItens);
      }
      
      // atualiza o localstorage com o produto
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
    } catch (err) {
      
      toast.error('Quantidade solicitada fora de estoque');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const index = cart.findIndex(product => productId === product.id);

      if(index < 0){
        toast.error('Erro na remoção do produto');
        return;
      } else {
        const updatedCart = cart.filter(product => productId !== product.id);

        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      }
      
    } catch {
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({ productId, amount }: UpdateProductAmount) => {
    try {
      
      // Busca o total de estoque do Produto na API
      const amountProductOfStock = await api.get<Stock>(`/stock/${productId}`);

      // Condicionais que verificam a validade da incrementação do amount
      if(amountProductOfStock.data.amount < amount){
        amount--;
        toast.error('Quantidade solicitada fora de estoque');
      } else if(amount === 0) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      } else {
        const updatedCart = cart.map(product => {
          if(productId === product.id) 
            product.amount = amount;

          return product;
        });

          setCart(updatedCart);
          localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
      }

    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
