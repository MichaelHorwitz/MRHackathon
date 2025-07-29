// components/ui/insertriskdialog.tsx
"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import type { Risk } from "@/components/ui/columns"

type Props = {
  onInsert: (payload: Omit<Risk, "id">) => Promise<void> | void
}

export function InsertRiskDialog({ onInsert }: Props) {
  const [open, setOpen] = useState(false)
  const [form, setForm] = useState<Omit<Risk, "id">>({ 
   location: "", 
   riskLevel: "Low", 
   checkedDate: new Date().toISOString().slice(0, 10), // YYYY-MM-DD 
 })
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    await onInsert(form)
    setSaving(false)
    setOpen(false)
    // reset form for next time
    setForm({ location: "", riskLevel: "Low" ,checkedDate: new Date().toISOString().slice(0, 10)})
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-black text-white">Add new Location</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Travel Risk</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-2">
          <div>
            <label className="block text-sm font-medium mb-1">Location</label>
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={form.location}
              onChange={(e) =>
                setForm((f) => ({ ...f, location: e.target.value }))
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Risk Level</label>
            <select
              className="w-full border p-2 rounded"
              value={form.riskLevel}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  riskLevel: e.target.value as Risk["riskLevel"],
                }))
              }
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
        </div>
        <DialogFooter className="flex justify-end space-x-2">
          <Button onClick={() => setOpen(false)} disabled={saving}>
            Cancel
          </Button>
          <Button
            variant="secondary"
            onClick={handleSave}
            disabled={saving || !form.location}
          >
            {saving ? "Saving…" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
