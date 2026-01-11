import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="max-h-dvh scrollbar-hide overflow-y-auto">
            {children}
        </div>
    );
};

export default layout;

