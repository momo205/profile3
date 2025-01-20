import Head from "next/head";

export default function Mycomponent() {
  return (
    <Head>
      <link rel="preload" href="./page.module.css" as="style" />
      <link rel="preload" href="./gloabls.css" />
    </Head>
  );
}
