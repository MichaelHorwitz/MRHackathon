"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { EditRiskDialog } from "@/components/ui/editriskdialog"

export type Risk = {
  id: number
  location: string
  riskLevel: "Low" | "Medium" | "High"
}

export const createRiskColumns = (
  onEditRisk: (risk: Risk) => void
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
  {
    accessorKey: "location",
    header: "Location",
  },
  {
    accessorKey: "riskLevel",
    header: "Risk Level",
    cell: ({ row }) => {
      const level = row.getValue("riskLevel") as Risk["riskLevel"]
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
      const risk = row.original
      return (
        <div className="flex gap-2">
          <EditRiskDialog
            risk={risk}
            onSave={(updatedRisk) => {
              onEditRisk(updatedRisk)
            }}
          />
          <Button
            variant="destructive"
            size="sm"
            onClick={() => console.log("Delete", risk.id)}
          >
            Delete
          </Button>
        </div>
      )
    },
  },
]
