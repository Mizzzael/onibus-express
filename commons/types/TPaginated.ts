type TPaginated<T> = {
    first: number | null,
    items: number | null,
    last: number | null,
    next: number | null,
    pages: number | null,
    prev: number | null,
    data: T[]
}