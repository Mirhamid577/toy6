import { motion } from "framer-motion";

const base = {
  hidden: { opacity: 0, y: 26, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Reveal({
  as = "div",
  delay = 0,
  duration = 0.7,
  amount = 0.25,
  once = true,
  variants = base,
  className,
  style,
  children,
  ...rest
}) {
  const Comp = motion[as] || motion.div;
  return (
    <Comp
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
      style={style}
      {...rest}
    >
      {children}
    </Comp>
  );
}
