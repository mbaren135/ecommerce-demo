import { motion } from "framer-motion";
import {
  Dispatch,
  forwardRef,
  ReactNode,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

type IndicatorType = { top: number; height: number; width: number };

export default function SideNav({
  content,
  setContent,
}: {
  content: "details" | "cart" | "delete";
  setContent: Dispatch<SetStateAction<"details" | "cart" | "delete">>;
}) {
  const [indicator, setIndicator] = useState<IndicatorType | null>({
    top: 0,
    height: 0,
    width: 0,
  });

  const firstItemRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (firstItemRef.current) {
      const { width, height } = firstItemRef.current.getBoundingClientRect();
      setIndicator({
        top: firstItemRef.current.offsetTop,
        width,
        height,
      });
    }
  }, []);

  return (
    <aside className="flex justify-center w-1/4 bg-brand-accent text-brand-primary">
      <div className="container flex flex-col gap-4 p-6 font-sans">
        <div className="flex flex-col gap-4">
          <p className="text-3xl font-semibold">Your Account</p>
          <hr />
        </div>
        <ul className="relative flex flex-col gap-4">
          <ListItem
            ref={firstItemRef}
            addHr
            setContent={setContent}
            contentValue="details"
            setIndicator={setIndicator}
          >
            Account Details
          </ListItem>
          <ListItem
            addHr
            setContent={setContent}
            contentValue="cart"
            setIndicator={setIndicator}
          >
            View Cart Drops
          </ListItem>
          <ListItem
            setContent={setContent}
            contentValue="delete"
            setIndicator={setIndicator}
          >
            Delete Account
          </ListItem>
          <Indicator indicator={indicator} />
        </ul>
      </div>
    </aside>
  );
}

const ListItem = forwardRef<
  HTMLParagraphElement,
  {
    children: ReactNode;
    contentValue: "details" | "cart" | "delete";
    setContent: Dispatch<SetStateAction<"details" | "cart" | "delete">>;
    setIndicator: Dispatch<SetStateAction<IndicatorType | null>>;
    addHr?: boolean;
  }
>(function ListItem(
  { children, contentValue, setContent, setIndicator, addHr = false },
  forwardedRef
) {
  const internalRef = useRef<HTMLParagraphElement>(null);
  const ref = forwardedRef || internalRef;

  return (
    <li
      className="flex flex-col "
      onClick={() => {
        setContent(contentValue);

        const currentRef = typeof ref === "function" ? null : ref?.current;
        if (currentRef) {
          const { width, height } = currentRef.getBoundingClientRect();
          setIndicator((prev) => ({
            ...prev,
            top: currentRef.offsetTop,
            width,
            height,
          }));
        }
      }}
    >
      <p
        className="relative p-2 text-lg cursor-pointer hover:text-xl hover:underline z-10"
        ref={ref}
      >
        {children}
      </p>
      {addHr && <hr className="mt-4" />}
    </li>
  );
});

function Indicator({ indicator }: { indicator: IndicatorType | null }) {
  return (
    <motion.li
      animate={{ ...indicator }}
      className="absolute rounded-md bg-brand-accent-400 z-0"
    />
  );
}
