import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { cn } from "../libs/utils";

export const HoverEffect = ({
  items,
  className
}) => {
  let [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div
      className={cn("grid grid-cols-1", className)}>
      {items.map((item, idx) => (
        <a
          href={item?.link || "#"}
          key={item?.link || idx}
          className="relative group block p-1.75 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}>
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-slate-600/[0.8] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card>
            {item.content}
          </Card>
        </a>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  children
}) => {
  return (
    <div
      className={cn(
        "rounded-2xl h-full w-full overflow-hidden bg-white border border-transparent dark:border-white/[0.2] group-hover:border-slate-700 relative z-20",
        className
      )}>
      <div className="relative z-50">
        <div className="p-0">{children}</div>
      </div>
    </div>
  );
};

// You can remove CardTitle and CardDescription if you're directly passing your CompanyCard
// as item.content and don't use them elsewhere.
// export const CardTitle = ({ className, children }) => {
//   return (
//     <h4 className={cn("text-zinc-100 font-bold tracking-wide mt-4", className)}>
//       {children}
//     </h4>
//   );
// };
// export const CardDescription = ({ className, children }) => {
//   return (
//     <p
//       className={cn("mt-8 text-zinc-400 tracking-wide leading-relaxed text-sm", className)}>
//       {children}
//     </p>
//   );
// };

