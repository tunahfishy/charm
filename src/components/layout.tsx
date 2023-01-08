// import Head from "@nextui-org/react";
import { HTMLProps } from "react";
import Navbar from "./navbar";
import "./layout.css";

interface LayoutProps extends HTMLProps<HTMLDivElement> {
  center?: boolean;
}

const Layout = (props: LayoutProps) => {
  return (
    <>
      {/* <Head>
        <title>ChaRM</title>
        <meta name="description" content="ChaRM Your Network" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="favicon.ico" />
      </Head> */}
      <Navbar />
      <main className={"main-center"}>{props.children}</main>
      {/* <main className={"main-center"}>LAYOUT</main> */}
    </>
  );
};

export default Layout;
