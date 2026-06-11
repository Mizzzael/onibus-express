import {Pagination} from "@heroui/react";
import {useState} from "react";
import {HiChevronDoubleLeft} from "react-icons/hi2";
import {HiChevronDoubleRight} from "react-icons/hi2";
import {useEffect} from "react";

export type TPaginationComponentProps = {
    page: number;
    totalPages: number;
    onChangePage?: (page: number) => void;
}

export default function PaginationComponent({
    page,
    totalPages,
    onChangePage,
}: TPaginationComponentProps) {
    const [ currentPage, setCurrentPage ] = useState<number>(1)

    useEffect(() => {
        onChangePage?.(currentPage)
    }, [currentPage])

    const calcPagesNumber = () => {
        const pages: (number | "ellipsis")[] = [];
        pages.push(1);
        if (page > 3) {
            pages.push("ellipsis");
        }
        const start = Math.max(2, page - 1);
        const end = Math.min(totalPages - 1, page + 1);
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        if (page < totalPages - 2) {
            pages.push("ellipsis");
        }
        pages.push(totalPages);
        return pages;
    }

    if (!totalPages || totalPages < 2)
        return <span />

    return (
        <Pagination className="justify-center">
            <Pagination.Content>
                <Pagination.Item>
                    <Pagination.Previous isDisabled={page === 1} onPress={() => setCurrentPage((p) => p - 1)}>
                        <Pagination.PreviousIcon>
                            <HiChevronDoubleLeft />
                        </Pagination.PreviousIcon>
                    </Pagination.Previous>
                </Pagination.Item>
                {calcPagesNumber().map((p, i) => p === "ellipsis" ? (
                        <Pagination.Item key={`ellipsis-${i}`}>
                            <Pagination.Ellipsis />
                        </Pagination.Item>
                    ) : (
                        <Pagination.Item key={p}>
                            <Pagination.Link isActive={p === page} onPress={() => setCurrentPage(p)}>
                                {p}
                            </Pagination.Link>
                        </Pagination.Item>
                    ),
                )}
                <Pagination.Item>
                    <Pagination.Next isDisabled={page === totalPages} onPress={() => setCurrentPage((p) => p + 1)}>
                        <Pagination.NextIcon>
                            <HiChevronDoubleRight />
                        </Pagination.NextIcon>
                    </Pagination.Next>
                </Pagination.Item>
            </Pagination.Content>
        </Pagination>
    )
}