import { Link } from "react-router";

function MainPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
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
    </div>
  );
}

export default MainPage
