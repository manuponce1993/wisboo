import { PaginationLinks } from './paginationLinks';

export interface HttpBaseResponse<Data> extends PaginationLinks {
   total: number,
   total_pages: number,
   results: Data[],
   errors?: string[]
}
