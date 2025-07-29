import { DataTable } from "@/components/ui/risktable"
import { createRiskColumns } from "@/components/ui/columns"
import { getTravelRisks, updateRisk } from "./action"

export default async function Page() {
  const data = await getTravelRisks()

  const handleEditRisk = async (risk: any) => {
    "use server"
    await updateRisk(risk)
  }

  return (
    <main className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Travel Risk Monitor</h1>
      <DataTable columns={createRiskColumns} data={data} onEditRisk={handleEditRisk} />
    </main>
  )
}
