import { Link } from "react-router";
import Layout from "@/components/Layout";

function MainPage() {
  return (
    <Layout>
      {/* Navbar */}
      <nav className="bg-gray-800 p-4 shadow-md flex justify-between items-center">
        ls -al
        <Link
          to="/login"
          className="ml-auto cursor-pointer hover:bg-gray-700 text-white px-4 py-2 rounded-lg">
          Login
        </Link>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-8">
        Main Area <br />
        Maybe Something like an image, or something that shows how to use this page? <br />
      </main>
    </Layout>
  );
}

export default MainPage
