import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface PageHeaderProps {
    title: string;
    breadcrumb: string;
    backgroundImage?: string;
}

export default function PageHeader({
    title,
    breadcrumb,
    backgroundImage = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
}: PageHeaderProps) {
    return (
        <section className="relative bg-[#0f172a] pb-24 pt-32 overflow-hidden">
            <div className="absolute inset-0 bg-black/50 z-10"></div>
            <div
                className="absolute inset-0 bg-cover bg-center z-0 opacity-30"
                style={{
                    backgroundImage: `url('${backgroundImage}')`,
                }}
            ></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
                <h1 className="text-5xl font-bold text-white mb-6 animate-fade-in-up">
                    {title}
                </h1>
                <div className="flex items-center gap-2 text-gray-300 text-sm animate-fade-in-up delay-100">
                    <Link to="/" className="hover:text-white cursor-pointer transition-colors">
                        Home
                    </Link>
                    <ChevronRight className="w-4 h-4" />
                    <span className="text-[#00b4d8]">{breadcrumb}</span>
                </div>
            </div>
        </section>
    );
}
