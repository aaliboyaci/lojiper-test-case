import Link from "next/link";
import "../src/styles/MainStyles.css";

export default function notFound() {
  return (
    <div className="main">
      <h1>404 - Sayfa Bulunamadı</h1>
      <Link href="/"> Anasayfa</Link>
    </div>
  );
}
