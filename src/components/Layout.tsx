import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

function Layout({ children }: any) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div style={{ width: "240px", flexShrink: 0 }}>
        <Sidebar />
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#f1f5f9",
        }}
      >
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div
          style={{
            padding: "30px",
            maxWidth: "1500px",
            margin: "0 auto",
            width: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
