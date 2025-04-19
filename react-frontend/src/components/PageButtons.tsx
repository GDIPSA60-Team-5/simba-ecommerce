import { PageButton } from "./PageButton";


interface PageButtonsProps {
    currentPage: number;
    totalPages: number;
    handleClick: (page: number) => void;
}

export const PageButtons = ({
    currentPage,
    totalPages,
    handleClick,
}: PageButtonsProps) => {
    const buttons = [];
    const delta = 1;

    const range: number[] = [];
    for (
        let i = Math.max(2, currentPage - delta);
        i <= Math.min(totalPages - 1, currentPage + delta);
        i++
    ) {
        range.push(i);
    }

    const hasLeftEllipsis = currentPage - delta > 2;
    const hasRightEllipsis = currentPage + delta < totalPages - 1;

    buttons.push(
        <PageButton
            key={1}
            page={1}
            currentPage={currentPage}
            onClick={handleClick}
        />
    );

    if (hasLeftEllipsis) {
        buttons.push(
            <span key="left-ellipsis" className="px-2 text-gray-500">
                ...
            </span>
        );
    }

    range.forEach((page) => {
        buttons.push(
            <PageButton
                key={page}
                page={page}
                currentPage={currentPage}
                onClick={handleClick}
            />
        );
    });

    if (hasRightEllipsis) {
        buttons.push(
            <span key="right-ellipsis" className="px-2 text-gray-500">
                ...
            </span>
        );
    }

    if (totalPages > 1) {
        buttons.push(
            <PageButton
                key={totalPages}
                page={totalPages}
                currentPage={currentPage}
                onClick={handleClick}
            />
        );
    }

    return <>{buttons}</>;
};
