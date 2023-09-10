import Link from "next/link";

export default function Header() {
  return (
    <header>
      <nav>
        <Link href={'/'}>Home</Link>
        <Link href={'/pages'}>Pages</Link>
        <Link href={'/posts'}>Posts</Link>
      </nav>
    </header>
  );
}
