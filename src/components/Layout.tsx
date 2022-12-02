import { motion } from 'framer-motion';

interface Props {
  children: React.ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <motion.main
      className="overflow-x-hidden mx-auto w-full lg:w-3/5 md:w-5/6 p-8 pb-20 py-28"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{
        duration: 0.2,
        ease: 'easeOut'
      }}
    >
      {children}
    </motion.main>
  );
}