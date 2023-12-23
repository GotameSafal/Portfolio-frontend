"use client";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { getToken, setToken } from "@redux/user";
import {
  MdOutlineContactPage,
  GrProjects,
  GiSkills,
  FcAbout,
  MdDashboard,
} from "@utils/iconExp";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
export function SideBar({ isOpen, onOpen, onClose }) {
  const token = useSelector(getToken);
  const dispatch = useDispatch();
  const styleClass = `h-5 w-5 group-hover:fill-red-600 dark:fill-gray-600 transition-colors duration-200`;
  return (
    <>
      <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Sdev-web</DrawerHeader>
          <DrawerBody className="flex flex-col gap-2">
            <Content
              text="About"
              link="#about"
              onClose={onClose}
              icon={<FcAbout className={styleClass} />}
            />
            <Content
              text="Skills"
              link="#skills"
              onClose={onClose}
              icon={<GiSkills className={styleClass} />}
            />
            <Content
              text="Projects"
              link="#projects"
              onClose={onClose}
              icon={<GrProjects className={styleClass} />}
            />
            <Content
              text="Contact"
              link="#contacts"
              onClose={onClose}
              icon={<MdOutlineContactPage className={styleClass} />}
            />
            {token && (
              <Content
                text="Dashboard"
                link="/dashboard"
                onClose={onClose}
                icon={<MdDashboard className={styleClass} />}
              />
            )}
            {token ? (
              <Button
                onClick={() => {
                  Cookies.remove("sdev");
                  toast.success("successfully logged out");
                  dispatch(setToken(null));
                }}
                colorScheme="gray"
                className="rounded-sm ml-4"
                size="sm"
              >
                logout
              </Button>
            ) : (
              <Link href="/login">
                <Button
                  onClick={onClose}
                  colorScheme="twitter"
                  className="rounded-sm ml-4"
                  size="sm"
                >
                  login
                </Button>
              </Link>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

const Content = ({ icon, text, link }) => {
  const { onClose } = useDisclosure();
  const router = useRouter();
  return (
    <div
      onClick={() => {
        onClose();
        router.push(link);
      }}
      className="w-full flex items-center gap-x-1.5 group select-none"
    >
      <div className="w-1 rounded-xl h-8 bg-transparent transition-colors duration-200 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-[102%] translate-y-full group-hover:translate-y-0 bg-red-600 transition-all duration-300"></div>
      </div>
      <div className="group-hover:bg-white/10 font-semibold w-full group-active:scale-95 self-stretch pl-2 rounded flex items-center space-x-2 transition-all duration-200 dark:group-hover:text-gray-800 dark:hover:text-white text-sm">
        {icon}
        {text}
      </div>
    </div>
  );
};
