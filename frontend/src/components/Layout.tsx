import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <main className = "flex-1">{children}</main>
      <footer className="bg-gray-800 text-gray-400 text-sm mt-4 py-4 text-center">
        © 2025 ls -al. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;