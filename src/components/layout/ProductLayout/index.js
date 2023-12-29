import "../../../App.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Content from "../components/Content";

export default function DefaultLayout({ children }) {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <div className="container mx-auto p-4 flex h-full">
        <Sidebar></Sidebar>
        <Content>{children}</Content>
      </div>
    </div>
  );
}
