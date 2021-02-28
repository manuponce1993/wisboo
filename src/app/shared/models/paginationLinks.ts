import { ImagesQPS } from 'src/app/core/services/images.service';

export interface PaginationLinks {
    first: ImagesQPS,
    last: ImagesQPS,
    prev: ImagesQPS,
    next: ImagesQPS,
}
