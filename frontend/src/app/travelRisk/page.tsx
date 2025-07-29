// app/(your-route)/page.tsx
import { DataTable } from "@/components/ui/risktable"
import { createRiskColumns } from "@/components/ui/columns"
import { InsertRiskDialog } from "@/components/ui/insertriskdialog"
import { Risk } from "@/components/ui/columns"

import {
  getTravelRisks,
  updateRisk,
  deleteRisk,
  insertRisk,
} from "./action"

export default async function Page() {
  const data = await getTravelRisks()

  const handleEditRisk = async (risk: any) => {
    "use server"
    await updateRisk(risk)
  }

  const handleDeleteRisk = async (id: number) => {
    "use server"
    await deleteRisk(id)
  }

    const handleInsertRisk = async (payload: Omit<Risk, "id" | "checkedDate"> & { checkedDate:  Date}) => {
    "use server"
    await insertRisk(payload)
    }

  

    return (
    <main className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Travel Risk Monitor</h1>
        <DataTable
        data={data}
        columns={createRiskColumns} 
        onEditRisk={handleEditRisk}
        onDeleteRisk={handleDeleteRisk}
        />
    <InsertRiskDialog onInsert={handleInsertRisk} />
    </main>
    )
}
