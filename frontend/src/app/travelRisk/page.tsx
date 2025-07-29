import { Card, CardContent } from "@/components/ui/card"
import { DataTable } from "@/components/ui/risktable"
import { columns } from "@/components/ui/columns"
import { getTravelRisks } from "./action"

export default async function Page() {
    const data = await getTravelRisks()

    return (
    <main className="p-6 space-y-4">
        <h1 className="text-2xl font-semibold">Travel Risk Monitor</h1>
        <DataTable columns={columns} data={data} />
    </main>
    );
}
