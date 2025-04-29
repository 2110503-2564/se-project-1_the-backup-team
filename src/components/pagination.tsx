import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Pagination as PaginationType } from '@/interfaces/interface'
import { PaginationFor } from '@/types/types'

const PaginationBar = ({
  currentPage,
  pagination,
  paginationFor
}: {
  currentPage: number
  pagination: PaginationType
  paginationFor : PaginationFor
}) => {
  return (
    <Pagination className='w-full'>
      <PaginationContent className='flex justify-center w-full'>
        <PaginationItem
          className={
            pagination.hasPrevPage ? '' : 'pointer-events-none opacity-50 '
          }
        >
          <PaginationPrevious href={`/${paginationFor}?page=${pagination.page - 1}`} />
        </PaginationItem>

        {(() => {
          let startPage: number
          let endPage: number

          if (pagination.totalPages <= 3) {
            startPage = 1
            endPage = pagination.totalPages
          } else {
            if (currentPage <= 2) {
              startPage = 1
              endPage = 3
            } else if (currentPage >= pagination.totalPages - 1) {
              startPage = pagination.totalPages - 2
              endPage = pagination.totalPages
            } else {
              startPage = currentPage - 1
              endPage = currentPage + 1
            }
          }

          const pages = Array.from(
            { length: endPage - startPage + 1 },
            (_, i) => startPage + i,
          )

          return pages.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`/${paginationFor}?page=${page}`}
                isActive={currentPage === page}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))
        })()}

        <PaginationItem
          className={
            pagination.hasNextPage ? '' : 'pointer-events-none opacity-50 '
          }
        >
          <PaginationNext href={`/${paginationFor}?page=${pagination.page + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default PaginationBar
