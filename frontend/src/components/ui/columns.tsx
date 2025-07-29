// components/ui/columns.ts
"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { EditRiskDialog } from "@/components/ui/editriskdialog"
import { DeleteRiskDialog } from "@/components/ui/deleteriskdialog"

export type Risk = {
  id: number
  location: string
  riskLevel: "Low" | "Medium" | "High"
}

export const createRiskColumns = (
  onEditRisk: (r: Risk) => void,
  onDeleteRisk: (id: number) => void
): ColumnDef<Risk>[] => [
  {
    accessorKey: "id",
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting()}>
        ID
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  { accessorKey: "location", header: "Location" },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => {
      const lvl = row.getValue("riskLevel") as Risk["riskLevel"]
      const color =
        lvl === "High"
          ? "text-red-500"
          : lvl === "Medium"
          ? "text-yellow-500"
          : "text-green-500"
      return <span className={color}>{lvl}</span>
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const risk = row.original
      return (
        <div className="flex gap-2">
          <EditRiskDialog
            risk={risk}
            onSave={async (u) => onEditRisk(u)}
          />
          <DeleteRiskDialog
            riskId={risk.id}
            location={risk.location}
            onDelete={async (id) => onDeleteRisk(id)}
          />
        </div>
      )
    },
  },
]
