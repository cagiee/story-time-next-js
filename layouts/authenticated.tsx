import Footer from "@/components/layout/Footer/Footer";
import Navbar from "@/components/layout/Navbar/Navbar";
import ProtectedRoute from "@/components/layout/ProtectedRoute/ProtectedRoute";
import Sidemenu from "@/components/ui/Sidemenu/Sidemenu";

export default function AuthenticatedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <ProtectedRoute>
            <Navbar />
            <main>
                <div className="container">
                    <div className="authenticated__wrapper">
                        <div className="authenticated__sidemenu">
                            <Sidemenu />
                        </div>
                        {children}
                    </div>
                </div>
            </main>
            <Footer />
        </ProtectedRoute>
    );
}
