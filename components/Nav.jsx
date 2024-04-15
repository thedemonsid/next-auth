import Link from "next/link";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
const Nav = async() => {
  const session = await getServerSession(options)
  return (
    <header>
      <nav className="flex justify-between bg-gray-600 text-white p-4">
        <div className="underline">
          <Link href={"/"}>My Site</Link>
        </div>
        <div className="flex gap-10">
          <Link href={"/"}>Home</Link>
          <Link href={"/Member"}>Member</Link>
          <Link href={"/ClientMember"}>ClientMember</Link>
          <Link href={"CreateUser"}>CreateUser</Link>
          <Link href={"/Public"}>Public</Link>
          {session ? <Link href={"/api/auth/signout?callbackUrl=/"}>Logout</Link> : <Link href={"/api/auth/signin"}>Login</Link>}
        </div>
      </nav>
    </header>
  );
};

export default Nav;
