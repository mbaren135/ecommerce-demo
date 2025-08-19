import { ReactNode } from "react";

export default function PageContainer({children}: {children: ReactNode}) {
    return (
        <div className="py-12 min-w-full min-h-screen overflow-x-none">
            {children}
        </div>
    )
}