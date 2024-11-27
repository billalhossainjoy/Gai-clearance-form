import { createColumnHelper } from "@tanstack/react-table";

export interface AccountUsers {
  id: string;
  name: string;
  email: string;
  role: "STAFF" | "ADMIN";
}

const column = createColumnHelper<AccountUsers>();

export const accountUsersColumns = [
  column.display({
    id: "serial",
    header: "Serial",
    cell: ({ row }) => row.index + 1,
  }),
  column.accessor("name", {
    header: "Name",
    cell: (row) => row.getValue(),
  }),
  column.accessor("email", {
    header: "Technology",
    cell: (row) => row.getValue(),
  }),
  column.accessor("role", {
    header: "Roll",
    cell: (row) => row.getValue(),
  }),
];
