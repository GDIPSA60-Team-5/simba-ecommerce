interface PageButtonProps {
    page: number;
    currentPage: number;
    onClick: (page: number) => void;
}

export const PageButton = ({ page, currentPage, onClick }: PageButtonProps) => {
    return (
        <button
            onClick={() => onClick(page)}
            className={`px-3 py-1 border border-black/30 hover:bg-black hover:text-white cursor-pointer transition-color duration-300 ${page === currentPage ? "bg-black text-white" : ""
                }`}
        >
            {page}
        </button>
    );
};
