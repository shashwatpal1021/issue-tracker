import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home() {
  return (
    <div className="text-3xl">
      Hello Shashwat
      <Pagination itemCount={100} pageSize={5} currentPage={10} />
    </div>
  );
}
