import { ReactNode, createContext, useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';

export type FilterParams = {
    categoryId?: number;
    minPrice?: number;
    maxPrice?: number;
    keywords?: string;
    sortBy?: string;
    sortDir?: string;
    itemsPerPage: number;
};

type FilterContextType = {
    filters: FilterParams;
    updateFilter: (name: keyof FilterParams, value: any) => void;
};

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export const useFilters = () => {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilters must be used within a FilterProvider');
    }
    return context;
};

export const FilterProvider = ({ children }: { children: ReactNode }) => {
    const [searchParams, setSearchParams] = useSearchParams();

    const filters = useMemo<FilterParams>(() => {
        return {
            categoryId: searchParams.get('categoryId') ? Number(searchParams.get('categoryId')) : undefined,
            keywords: searchParams.get('keywords') || '',
            minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
            maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
            sortBy: searchParams.get('sortBy') || 'name',
            sortDir: searchParams.get('sortDir') || 'asc',
            itemsPerPage: Number(searchParams.get('itemsPerPage')) || 9,
        };
    }, [searchParams]);

    const updateFilter = (name: keyof FilterParams, value: any) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (value === undefined || value === '') {
            newParams.delete(name);
        } else {
            newParams.set(name, String(value));
        }
        setSearchParams(newParams);
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter }}>
            {children}
        </FilterContext.Provider>
    );
};
