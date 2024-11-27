import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "../ui/select";

interface Props<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export const DataTable = <TData, TValue>({
  columns,
  data,
}: Props<TData, TValue>) => {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });
  console.log(pagination)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: Math.ceil(data.length / pagination.pageSize),
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
  });

  const handlePaginate = (skip: number) => {
      setPagination((prev) => ({
        ...prev,
        pageIndex: Math.max(
          0,
          Math.min(table.getPageCount() - 1, prev.pageIndex + skip)
        ),
      }));
  };

  return (
    <div>
      <div className=" flex justify-end">
        <div className="flex items-center gap-3 max-w-80 ">
          <span className="font-semibold">Search:</span>
          <div className="flex items-center gap-3 border rounded pr-3">
            <Input
              type="text"
              className="focus-visible:ring-0 focus-visible:outline-none shadow-none border-none"
            />
            <Search className="text-primary" />
          </div>
          <div>
            <Select
              value={String(pagination.pageSize)}
              onValueChange={(e) =>
                setPagination((prev) => ({ ...prev, pageSize: Number(e) }))
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={"10"}>10</SelectItem>
                <SelectItem value={"20"}>20</SelectItem>
                <SelectItem value={"50"}>40</SelectItem>
                <SelectItem value={"100"}>100</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className=" text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex justify-between mt-5">
        <div className="flex gap-3">
          <Button
            onClick={() => handlePaginate(-10)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            onClick={() => handlePaginate(10)}
            disabled={!table.getCanNextPage()}
          >
            next
          </Button>
        </div>
        <div className="">
          <div className="w-full">
            <span>page {pagination.pageIndex + 1}</span> of{" "}
            {table.getPageCount()}
          </div>
        </div>
      </div>
    </div>
  );
};
