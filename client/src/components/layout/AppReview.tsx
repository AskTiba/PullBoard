import { Link } from "react-router-dom";

export default function AppReview() {
  return (
    <main>
      <h2 className="text-center text-2xl font-bold text-gray-800 mb-12">
        Application Preview
      </h2>
      <div className="flex gap-4 justify-center">
        <Link to="/open-prs" className=" bg-blue-700 px-4 py-2 rounded">
          <span className="text-white">Open PRs</span>
        </Link>
        <Link to="/closed-prs" className=" bg-blue-700 px-4 py-2 rounded">
          <span className="text-white">Closed PRs</span>
        </Link>
        <Link to="/dashboard" className=" bg-blue-700 px-4 py-2 rounded">
          <span className="text-white">Dashboard</span>
        </Link>
      </div>
    </main>
  );
}
