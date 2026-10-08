import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo-icon.png";
import Hero from "@/components/Hero";
export default function Home() {
   return(
    <div className=" bg-base-300 pt-5">
      <Hero/>
    </div>
   )
}
