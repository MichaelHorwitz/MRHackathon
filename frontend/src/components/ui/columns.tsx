"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { DialogTrigger } from "@/components/ui/dialog"

export type Risk = {
  id: number
  location: string
  riskLevel: "Low" | "Medium" | "High"
}

export const columns: ColumnDef<Risk>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => {
      const level = row.getValue("riskLevel") as "Low" | "Medium" | "High"
      const color =
        level === "High"
          ? "text-red-500"
          : level === "Medium"
          ? "text-yellow-500"
          : "text-green-500"
      return <span className={color}>{level}</span>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => alert("Edit " + row.original.id)}>
            Edit
          </Button>
          <Button variant="destructive" size="sm" onClick={() => alert("Delete " + row.original.id)}>
            Delete
          </Button>
        </div>
      )
    },
  },
]
