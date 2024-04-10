import Image from "next/image";
import Pagination from "./components/Pagination";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="text-3xl">
      Hello Shashwat
      <Pagination
        itemCount={100}
        pageSize={10}
        currentPage={parseInt(searchParams.page)}
      />
    </div>
  );
}
