import Image from "next/image";
import Link from "next/link";
import React from "react";
import logo from "../../public/logo.png";

const Navbar = () => {
  return (
    <div>
      <nav className="flex justify-between ">
        <div className="">
          <Link href={"/"}>
            <Image
              src={logo}
              width={80}
              height={30}
              alt="This is docappointment logo"
            />
          </Link>
        </div>

        <ul className="flex justify-between gap-5">
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/appointments"}>All Appointments</Link>
          </li>
          <li>
            <Link href={"/dashboard"}>Dashboard</Link>
          </li>
        </ul>


        <ul className="flex justify-between gap-5">
          
          <li>
            <Link href={"/login"}>Login</Link>
          </li>
          <li>
            <Link href={"/register"}>Register</Link>
          </li>
        </ul>



      </nav>
    </div>
  );
};

export default Navbar;
