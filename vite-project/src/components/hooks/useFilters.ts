import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store/store';
import { FilterDataType } from '../../store/authReducer';
import { setFilters, updateFilter, resetFilters, setSearch, setSort  } from '../../store/authReducer';

export const useFilters = () => {
  const filters = useSelector((state: RootState) => state.auth.filters);
  const totalAmount = useSelector((state:RootState) => state.auth.totalAmount);
  const dispatch = useDispatch();

  return {
    filters,
    totalAmount,
    setFilters: (newFilters: Partial<FilterDataType>) => dispatch(setFilters(newFilters)),
    updateFilter: <K extends keyof FilterDataType>(key: K, value: FilterDataType[K]) => 
      dispatch(updateFilter({ key, value })),
    resetFilters: () => dispatch(resetFilters()),
    setSearch: (search: string) => dispatch(setSearch(search)),
    setSort: (sortBy: string | null, sortOrder: 'asc' | 'desc' | null) => 
      dispatch(setSort({ sortBy, sortOrder })),
  };
};