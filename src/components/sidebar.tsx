import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CardContent,
  Card,
  CardTitle,
  CardHeader,
  CardDescription,
} from "@/components/ui/card";

import { FaExternalLinkSquareAlt } from "react-icons/fa";

export const Sidebar = () => {
  return (
    <aside className="w-80 overflow-y-scroll border-l p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">New Info</h2>
        <Badge variant="default">Indonesia</Badge>
      </div>
      <div className="mb-4">
        <Card className="bg-foreground/10">
          <CardHeader>
            <CardTitle>Jenjang Pemilu</CardTitle>
            <CardDescription>Menuju 14 Februari 2024</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold">Jawa Tengah</span>
              <Badge variant="default">9 upvotes</Badge>
            </div>
            <p className="mt-2 text-sm">
              Dibutuhkan pengurus yang berkompeten untuk membantu jalannya
              pemilu di beberapa daerah karena disebabkan ada kurangnya
              personil.
              <br />
              <br />
              Silahkan hubungi kami untuk informasi lebih lanjut.
            </p>
            <div className="mt-2 flex items-center justify-between text-xs text-gray-400">
              <span>18 comments</span>
              <FaExternalLinkSquareAlt className="h-4 w-4" />
            </div>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};
