import Carousel from "@/components/home-desktop/Carousel";
import { FooterHome } from "./Footer";
import { HeaderHome } from "./Header";

export default function DesktopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-lg:flex max-lg:flex-col max-lg:h-screen max-lg:overflow-hidden">
      <HeaderHome />
      {/* <Carousel /> */}
      {children}
      <FooterHome />
    </div>
  );
}
