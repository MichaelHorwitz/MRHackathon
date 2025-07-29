"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Risk } from "@/components/ui/columns"

type Props = {
  risk: Risk
  onSave: (updated: Risk) => Promise<void> | void
}

export function EditRiskDialog({ risk, onSave }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Risk>(risk)
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onSave(form)
    setSaving(false)
    setOpen(false) // ✅ Close dialog after save
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">Edit</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Travel Risk</DialogTitle>
        </DialogHeader>
        <div className="space-y-2">
          <input
            type="text"
            className="w-full border p-2 rounded"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
          />
          <select
            className="w-full border p-2 rounded"
            value={form.riskLevel}
            onChange={(e) =>
              setForm({ ...form, riskLevel: e.target.value as Risk["riskLevel"] })
            }
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
