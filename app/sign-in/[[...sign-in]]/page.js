import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
export default function Page() {
  return(<div>
    <Image src='/BGHOME.jpg' width={900} height={1000}
    className=" object-cover h-full w-full"/>
    <div className=" absolute top-20 right-4">
    <SignIn />
    </div>
     
     </div>);
}