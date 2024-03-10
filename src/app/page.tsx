import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import DashboardPage from "./dashboard/page";

export default function Home() {
  return (
    <div className="p-8">
      <DashboardPage />
    </div >
  );
}
