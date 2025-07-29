// components/ui/columns.ts
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { EditRiskDialog } from "@/components/ui/editriskdialog";
import { DeleteRiskDialog } from "@/components/ui/deleteriskdialog";
import { Risk } from "@/api";

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
      const lvl = row.getValue("riskLevel") as Risk["riskLevel"];
      const color =
        lvl === "do_not_travel" || lvl === "high_risk"
          ? "text-red-500"
          : lvl === "mild_risk"
          ? "text-yellow-500"
          : "text-green-500";
      return <span className={color}>{lvl}</span>;
    },
  },
  {
    accessorKey: "lastChecked",
    header: "Checked Date",
    cell: ({ row }) => {
      return new Date(row.getValue<string>("lastChecked"))
        .toISOString()
        .slice(0, 10);
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const risk = row.original;
      return (
        <div className="flex gap-2">
          <EditRiskDialog risk={risk} onSave={async (u) => onEditRisk(u)} />
          <DeleteRiskDialog
            riskId={risk.id}
            location={risk.location}
            onDelete={async (id) => onDeleteRisk(id)}
          />
        </div>
      );
    },
  },
];
