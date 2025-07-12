import { contactLinks, navbarData, socialLinks } from "@/constants/data";
import Link from "next/link";
import Image from "next/image";
import NewsLetterForm from "../layout/NewsLetterForm";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className="w-full inset-0 relative ">
      <div className="container mx-auto max-w-7xl pt-14 pb-4 p-1 relative">
        
        <div className="grid grid-cols-1 lg:grid-cols-6 gap-10 text-center lg:text-left ">
          <Link
            href="/"
            aria-label="Moussaoui Logo"
            className="hidden lg:flex flex-col col-span-1 items-start mt-1"
          >
            <Image
              src="/logo/figmaLogo.png"
              alt="Moussaoui Logo"
              width={150}
              height={50}
              className="mb-2"
            />
          </Link>

          {/* Products */}
          <div className="col-span-1">
            <h3 className="sub-heading-black-left mb-6">Products</h3>
            <ul className="space-y-1 text-xs opacity-80 tracking-[-0.5%] ">
              {navbarData.desktopNavBarList.map((item, index) => (
                <li key={index}>
                  <Link href={item.link} className="hover:text-primary">
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Informations */}
          <div className="col-span-1">
            <h3 className="sub-heading-black-left mb-6">Informations</h3>
            <Link href="/privacy-policy" className="text-xs hover:text-primary tracking-[-0.5%] opacity-80">
              Privacy Policy
            </Link>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="sub-heading-black-left mb-6">Contact Us</h3>
            <ul className="space-y-2 text-xs tracking-[-0.5%] opacity-80">
              {contactLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="flex justify-center lg:justify-start items-center gap-2 hover:text-primary"
                  >
                    <item.icons
                      style={{ color: item.iconColor }}
                      className="text-[16px]"
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="col-span-1">
            <h3 className="sub-heading-black-left mb-6">Social</h3>
            <ul className="space-y-2 text-xs tracking-[-0.5%] opacity-80">
              {socialLinks.map((item, index) => (
                <li key={index}>
                  <Link
                    href={item.link}
                    target="_blank"
                    className="flex justify-center lg:justify-start items-center gap-2 hover:text-primary"
                  >
                    <item.icons
                      style={{ color: item.iconColor }}
                      className="text-[16px]"
                    />
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col items-center lg:items-start top-2 ">
            <h3 className="text-xl md:text-xs text-center lg:text-left  font-medium text-secondary-foreground opacity-80 tracking-[-0.5%]  mb-6">Join Our Newsletter</h3>
            <NewsLetterForm />
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-6" />

        {/* Copyright */}
        <p className="text-xs text-muted-foreground text-center">
          © {currentYear} Moussaoui | All Rights Reserved
        </p>
      </div>
    </div>
  );
};

export default Footer;
