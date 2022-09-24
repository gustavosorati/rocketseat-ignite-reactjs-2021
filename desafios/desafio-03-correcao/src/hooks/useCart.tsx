import { createContext, ReactNode, useContext, useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
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

  // Bônus: Substitui os vários setItens, deixando o código mais limpo e organizado
  // const prevCartRef = useRef<Product[]>();

  // useEffect(() => {
  //   prevCartRef.current = cart;
  // });

  // const cartPreviousValue = prevCartRef.current ?? cart;

  // useEffect(() => {
  //   if(cartPreviousValue !== cart){
  //     localStorage.setItem('@RocketShoes:cart', JSON.stringify(cart));
  //   }
  // }, [cart, cartPreviousValue]);

  const addProduct = async (productId: number) => {
    try {
      // Ao invez de fazer a manipulação do próprio estado cart, criamos um array que contem 
      // os dados do cart, para não ferir o principio da imutabilidade do React
      const updatedCart = [...cart];

      // verifica se o produto existe
      const productExists = updatedCart.find(product => product.id === productId);

      const { data: stock } = await api.get<Stock>(`/stock/${productId}`);

      const currentAmout = productExists ? productExists.amount : 0;
      const amount = currentAmout + 1;

      // verifica se existe estoque suficiente
      if(amount > stock.amount){
        toast.error('Quantidade solicitada fora de estoque');
        return;
      } 

      if(productExists){
        productExists.amount = amount;
      } else {
        const product = await api.get(`/products/${productId}`);

        const newProduct = {
          ...product.data,
          amount: 1
        };

        updatedCart.push(newProduct);
      }

      setCart(updatedCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const updatedCart = [...cart];

      const productIndex = updatedCart.findIndex(product => productId === product.id);

      if(productIndex >= 0){
        updatedCart.splice(productIndex, 1);

        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      } else {
        throw Error;
      }
      
    } catch {
      toast.error('Erro na remoção do produto')
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      if(amount <= 0){
        return;
      } 

      const {data: stock} = await api.get<Stock>(`/stock/${productId}`);

      if (amount > stock.amount){
        toast.error('Quantidade solicitada fora de estoque');
        return;
      } 

      const updatedCart = [...cart];
      const productExists = updatedCart.find(product => productId === product.id);

      if(productExists){
        productExists.amount = amount;
        setCart(updatedCart);
        localStorage.setItem('@RocketShoes:cart', JSON.stringify(updatedCart));
      } else {
        throw Error();
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
