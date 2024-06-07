
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
export default function NavLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    return (
      <div className="w-full">

        <Navbar/>{children}
        <Footer/>
   
      </div>
    );
  }

 