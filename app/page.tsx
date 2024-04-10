import LatestIssues from "./LatestIssues";

export default function Home({
  searchParams,
}: {
  searchParams: { page: string };
}) {
  return (
    <div className="text-3xl">
      Hello Shashwat
      <LatestIssues />
    </div>
  );
}
