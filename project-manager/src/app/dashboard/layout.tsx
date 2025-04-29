import { Toaster } from "sonner";
import ProtectedComponent from "../components/ProtectedComponent";
import Sidebar from "../components/SideBar";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                <Toaster
                    position="top-center"
                />
                <ProtectedComponent>
                    <div className='flex min-h-screen'>
                        {/*SideBar*/}
                        <Sidebar />
                        {/* Page Content */}
                        <div className='flex-1 p-4 bg-gray-100 overflow-y-auto scrollbar-hide'>
                            {children}
                        </div>
                    </div>
                </ProtectedComponent>
            </body>
        </html>
    );
}