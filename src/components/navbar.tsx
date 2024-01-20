import { FaFire, FaHome } from "react-icons/fa";
import { Button } from "./ui/button";
import Link from "next/link";
import { provinces } from "@/lib/utils";

export const Navbar = () => {
  return (
    <nav className="flex w-60 flex-col overflow-y-scroll border-r p-4">
      <div className="flex flex-col space-y-2">
        <Link href="/">
          <Button className="flex w-full items-center space-x-2 rounded bg-foreground/10 px-4 py-2 text-white">
            <FaHome className="h-6 w-6" />
            <span>Home</span>
          </Button>
        </Link>
        <Link href="/sort/popular">
          <Button className="flex w-full items-center space-x-2 rounded bg-foreground/10 px-4 py-2 text-white">
            <FaFire className="h-6 w-6" />
            <span>Popular</span>
          </Button>
        </Link>
      </div>
      <div className="mt-6">
        <h2 className="text-xs font-semibold uppercase text-gray-500">
          Provinces
        </h2>
        <div className="mt-2 space-y-3 p-2">
          {provinces.map((provinsi, index) => (
            <div key={index} className="mb-1 flex items-center space-x-2">
              {/* <Avatar className="h-6 w-6">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar> */}
              <Link
                href={`/provinsi/${provinsi.toLowerCase()}`}
                className="text-sm"
              >
                {provinsi}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </nav>
  );
};
