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
    pageNo: number;
};

type FilterContextType = {
    filters: FilterParams;
    updateFilter: (name: keyof FilterParams, value: any) => void;
    updateFilters: (updates: Partial<FilterParams>) => void;
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
            sortBy: searchParams.get('sortBy') || 'id',
            sortDir: searchParams.get('sortDir') || 'asc',
            itemsPerPage: Number(searchParams.get('itemsPerPage')) || 9,
            pageNo: Number(searchParams.get('pageNo')) || 1,
        };
    }, [searchParams]);

    const updateFilter = (name: keyof FilterParams, value: any) => {
        const newParams = new URLSearchParams(searchParams.toString());
        if (value === undefined || value === '') {
            newParams.delete(name);
        } else {
            newParams.set(name, String(value));
        }
        setSearchParams(newParams, { replace: true });
    };

    const updateFilters = (updates: Partial<FilterParams>) => {
        const newParams = new URLSearchParams(searchParams.toString());

        Object.entries(updates).forEach(([key, value]) => {
            if (value === undefined || value === '') {
                newParams.delete(key);
            } else {
                newParams.set(key, String(value));
            }
        });

        setSearchParams(newParams, { replace: true });
    };

    return (
        <FilterContext.Provider value={{ filters, updateFilter, updateFilters }}>
            {children}
        </FilterContext.Provider>
    );
};
