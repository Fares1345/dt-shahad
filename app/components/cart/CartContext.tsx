import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { ReactNode } from 'react';

/**
 * Cart state bound to the real Salla cart. No localStorage, no fake items —
 * every mutation goes through the Salla SDK and the drawer renders whatever
 * `salla.api.cart.details()` returns for the current customer.
 */

export interface CartItemView {
  id: string;
  productId: number | string;
  name: string;
  image: string;
  url: string;
  quantity: number;
  price: number;
  total: number;
  available: boolean;
}

export interface CartTotalsView {
  subTotal: number;
  discount: number;
  taxAmount: number;
  total: number;
}

interface CartContextValue {
  items: CartItemView[];
  count: number;
  totals: CartTotalsView | null;
  isLoading: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  refreshCart: () => Promise<void>;
  addToCart: (productId: string | number, quantity?: number) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  removeItem: (itemId: string) => Promise<void>;
  submitCart: () => Promise<void>;
}

const CartContext = createContext<CartContextValue | null>(null);

interface SallaCartDetailsItem {
  id: string;
  product_id: number;
  product_name: string;
  product_image: string;
  url: string;
  quantity: number;
  price: number;
  total: number;
  is_available: boolean;
}

interface SallaCartDetails {
  items?: SallaCartDetailsItem[];
  count?: number;
  sub_total: number;
  total: number;
  discount: number;
  tax_amount: number;
}

interface SallaLike {
  cart: {
    addItem: (productId: number | string, quantity?: number) => Promise<void>;
    updateItem: (payload: { id: number | string; quantity: number }) => Promise<void>;
    deleteItem: (itemId: number | string) => Promise<void>;
    submit: () => Promise<void>;
  };
  api: {
    cart: {
      details: () => Promise<{ data?: { cart?: SallaCartDetails } }>;
    };
  };
  event: {
    on: (event: string, callback: () => void) => unknown;
    off: (event: string, callback: () => void) => unknown;
  };
}

function getSalla(): SallaLike | undefined {
  if (typeof window === 'undefined') return undefined;
  return (window as unknown as { salla?: SallaLike }).salla;
}

const CART_EVENTS = ['Product Added', 'Product Removed', 'Cart Updated'];

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemView[]>([]);
  const [count, setCount] = useState(0);
  const [totals, setTotals] = useState<CartTotalsView | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const refreshIdRef = useRef(0);

  const refreshCart = useCallback(async () => {
    const salla = getSalla();
    if (!salla) {
      setIsLoading(false);
      return;
    }
    const runId = ++refreshIdRef.current;
    setIsLoading(true);
    try {
      // `salla.api.cart.details()` resolves the current customer/session cart
      // without needing a cart ID.
      const response = await salla.api.cart.details();
      const cart = response?.data?.cart;
      if (!cart) return;
      setItems(
        (cart.items ?? []).map((item) => ({
          id: item.id,
          productId: item.product_id,
          name: item.product_name,
          image: item.product_image,
          url: item.url,
          quantity: item.quantity,
          price: item.price,
          total: item.total,
          available: item.is_available,
        }))
      );
      setCount(cart.count ?? cart.items?.length ?? 0);
      setTotals({
        subTotal: cart.sub_total,
        discount: cart.discount,
        taxAmount: cart.tax_amount,
        total: cart.total,
      });
    } catch {
      // Keep the last known cart state; the SDK already surfaces errors.
    } finally {
      if (runId === refreshIdRef.current) setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshCart();
    const salla = getSalla();
    if (!salla) return;
    const handler = () => void refreshCart();
    CART_EVENTS.forEach((event) => salla.event.on(event, handler));
    return () => {
      CART_EVENTS.forEach((event) => salla.event.off(event, handler));
    };
  }, [refreshCart]);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const addToCart = useCallback(
    async (productId: string | number, quantity = 1) => {
      const salla = getSalla();
      if (!salla) return;
      try {
        await salla.cart.addItem(productId, quantity);
        openCart();
        await refreshCart();
      } catch {
        // The SDK shows the failure toast to the customer.
      }
    },
    [openCart, refreshCart]
  );

  const updateQuantity = useCallback(
    async (itemId: string, quantity: number) => {
      const salla = getSalla();
      if (!salla || quantity < 1) return;
      try {
        await salla.cart.updateItem({ id: itemId, quantity });
        await refreshCart();
      } catch {
        // The SDK shows the failure toast to the customer.
      }
    },
    [refreshCart]
  );

  const removeItem = useCallback(
    async (itemId: string) => {
      const salla = getSalla();
      if (!salla) return;
      try {
        await salla.cart.deleteItem(itemId);
        await refreshCart();
      } catch {
        // The SDK shows the failure toast to the customer.
      }
    },
    [refreshCart]
  );

  const submitCart = useCallback(async () => {
    const salla = getSalla();
    if (!salla) return;
    try {
      await salla.cart.submit();
    } catch {
      // The SDK shows the failure toast to the customer.
    }
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count,
      totals,
      isLoading,
      isOpen,
      openCart,
      closeCart,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
      submitCart,
    }),
    [
      items,
      count,
      totals,
      isLoading,
      isOpen,
      openCart,
      closeCart,
      refreshCart,
      addToCart,
      updateQuantity,
      removeItem,
      submitCart,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}