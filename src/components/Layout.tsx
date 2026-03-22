import Sidebar from "./Sidebar";

function Layout({ children }: any) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div
        style={{
          marginLeft: 240,
          padding: "20px",
          width: "100%",
          background: "#f1f5f9",
          minHeight: "100vh",
        }}
      >
        {children}
      </div>
    </div>
  );
}

export default Layout;
