import { Dispatch, SetStateAction } from "react";
import { ShoppingCart, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { CartType, ProductType } from "@/lib/types";

export default function CartExpander({
  cart,
  openCart,
  setOpenCart,
  index,
}: {
  cart: CartType;
  openCart: number | null;
  setOpenCart: Dispatch<SetStateAction<number | null>>;
  index: number;
}) {
  const isOpen = openCart === cart.id;
  const total = cart.products.reduce((acc, item) => {
    if (item.product) {
      acc += item.product.price * item.quantity;
    }
    return acc;
  }, 0);

  return (
    <motion.div
      animate={isOpen ? "expanded" : "closed"}
      variants={wrapperVariants}
      className="relative w-full rounded-lg border border-brand-accent text-brand-primary font-sans"
    >
      <button
        className="flex justify-between items-center p-4 w-full bg-brand-light-100 hover:bg-brand-primary-100 focus:outline-none rounded-lg cursor-pointer max-h-fit"
        onClick={() => setOpenCart(isOpen ? null : cart.id)}
      >
        <span className="flex items-center gap-4 font-semibold text-lg rounded-b-lg">
          <ShoppingCart className="h-5 w-5" /> Cart {index}
        </span>
        <motion.span
          animate={isOpen ? "expanded" : "closed"}
          variants={iconVariants}
          className="text-sm text-brand-accent"
        >
          <ChevronDown />
        </motion.span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <>
            {cart.products.length > 0 ? (
              <motion.ul
                initial={productListVariants.closed}
                animate={productListVariants.expanded}
                exit={productListVariants.closed}
                className="space-y-2 p-4"
              >
                {cart.products.map((item, i) => (
                  <ProductInfo
                    key={`product-${i}`}
                    product={item.product}
                    quantity={item.quantity}
                  />
                ))}
                <motion.li className="flex justify-end">
                  <span className="font-semibold text-brand-accent mr-2">Total: </span> ${total.toFixed(2)}
                </motion.li>
              </motion.ul>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-lg p-4"
              >
                This cart is empty.
              </motion.p>
            )}
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function ProductInfo({
  product,
  quantity,
}: {
  product: ProductType | null;
  quantity: number;
}) {
  return (
    <motion.li className="flex flex-col gap-2 pb-2" variants={productVariants}>
      <div className="flex justify-between gap-4">
        <p className="overflow-ellipsis max-w-3/4">
          {product ? product.title : "Could not load product!"}
        </p>
        <div className="flex justify-end gap-6">
          <span>Qty: {quantity}</span>
          <p>Price: {product ? "$" + product.price.toFixed(2) : "N/A"}</p>
        </div>
      </div>
      <hr className="text-brand-light-300"/>
    </motion.li>
  );
}

const wrapperVariants = {
  expanded: {
    height: "auto",
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.3,
      height: { duration: 0.3, ease: "easeInOut" },
    },
  },
  closed: {
    height: "63px", // Height of just the button (p-4 = 16px top + 16px bottom + content height)
    transition: {
      when: "afterChildren",
      staggerChildren: 0.3,
      height: { duration: 0.3, ease: "easeInOut" },
    },
  },
};

const productListVariants = {
  expanded: {
    scaleY: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.3 },
  },
  closed: {
    scaleY: 0,
    transition: { when: "afterChildren", staggerChildren: 0.3 },
  },
};

const productVariants = {
  expanded: {
    opacity: 1,
    y: 0,
    transition: { when: "beforeChildren", staggerChildren: 0.3 },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: { when: "afterChildren", staggerChildren: 0.3 },
  },
};

const iconVariants = {
  expanded: { rotate: 180, transition: { duration: 0.3 } },
  closed: { rotate: 0, transition: { duration: 0.3 } },
};
