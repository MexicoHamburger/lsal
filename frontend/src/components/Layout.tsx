import React from "react";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      {children}
    </div>
  );
};

export default Layout;