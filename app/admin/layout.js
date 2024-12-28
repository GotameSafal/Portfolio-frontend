"use client";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, Menu, Search, X } from "lucide-react";
import { useState } from "react";
import { LogOut } from "lucide-react";
import { navigation } from "@utils/adminNavigation";
import {
  adminItemVariants,
  adminMobileMenuVariants,
  containerVariants,
} from "@utils/motionVariants";
import {toast} from "react-toastify"
import { usePathname, useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { resetConfigUser } from "@redux/slices/configUser";
import { getLogout } from "@components/Apis";
import { useDispatch } from "@node_modules/react-redux/dist/react-redux";

const layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
const dispatch = useDispatch()
  const NavigationMenu = ({ isMobile = false }) => (
    <motion.div
      variants={adminMobileMenuVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className={`
        ${
          isMobile
            ? "fixed inset-0 z-50 bg-gray-950/95 backdrop-blur-lg p-6 space-y-2"
            : "bg-white/5 backdrop-blur-sm border-r border-gray-800 h-full p-6 space-y-2 hidden md:block"
        }
      `}
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-white">Eduverse</h1>
          <p className="text-sm text-gray-400">Admin Dashboard</p>
        </div>
        {isMobile && (
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-white"
          >
            <X className="w-6 h-6" />
          </motion.button>
        )}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {navigation.map((item) => (
          <motion.button
            key={item.section}
            variants={adminItemVariants}
            whileHover="hover"
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              if (isMobile) setIsMobileMenuOpen(false);
              router.push(item?.link || "/admin");
            }}
            className={`
              w-full flex items-center space-x-3 p-3 rounded-lg transition
              ${
                pathname === item.link
                  ? "bg-blue-600/20 text-blue-400"
                  : "text-gray-400 hover:bg-white/10"
              }
            `}
          >
            <item.icon className="w-5 h-5" />
            <span className="text-sm font-medium">{item.title}</span>
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );

  const Header = () => (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 10,
      }}
      className="flex items-center justify-between p-4 border-b border-gray-800 bg-white/5 backdrop-blur-sm"
    >
      <div className="flex items-center w-full max-w-md space-x-4">
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="mr-2 md:hidden"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 10,
        }}
        className="flex items-center space-x-4"
      >
        <div className="flex items-center space-x-2">
          <div className="hidden md:block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  <AvatarImage src="@assets/image.png" alt="@shadcn" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="text-white bg-gray-800 border-gray-700"
              >
                <DropdownMenuItem
                  onSelect={async () => {
                    dispatch(resetConfigUser());
                    await getLogout();
                    toast.success("Successfully logout");
                    router.replace("/");
                  }}
                  className="text-red-400 cursor-pointer hover:bg-gray-700"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <div className="flex flex-col min-h-screen text-white bg-gray-950 md:flex-row">
      <AnimatePresence>
        {isMobileMenuOpen && <NavigationMenu isMobile={true} />}
      </AnimatePresence>

      <div className="flex-shrink-0 hidden w-64 md:block">
        <NavigationMenu />
      </div>

      <div className="flex-1">
        <Header />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: 0.5,
            type: "tween",
          }}
        >
          {/* Your dashboard content here */}

          {children}
        </motion.div>
      </div>
    </div>
  );
};

export default layout;
