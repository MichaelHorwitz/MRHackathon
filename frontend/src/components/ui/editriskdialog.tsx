"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Risk } from "@/components/ui/columns";

type Props = {
  risk: Risk;
  onSave: (updated: Risk) => Promise<void> | void;
};

export function EditRiskDialog({ risk, onSave }: Props) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<Risk>(risk);
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await onSave(form);
    setSaving(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Edit
        </Button>
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
            onChange={(e) => {
              const newLocation = e.target.value;
              setForm((prev) => ({
                ...prev,
                location: newLocation,
                // reset lastChecked to current date as date type
                // to ensure it is always updated when editing
                lastChecked: new Date(),
              }));
            }}
          />
          <select
            className="w-full border p-2 rounded"
            value={form.riskLevel}
            onChange={(e) => {
              const newLevel = e.target.value as Risk["riskLevel"];
              setForm((prev) => ({
                ...prev,
                riskLevel: newLevel,
                // bump lastChecked to today:
                lastChecked: new Date(),
              }));
            }}
          >
            <option value="do_not_travel">Do Not Travel</option>
            <option value="high_risk">High Risk</option>
            <option value="mild_risk">Mild Risk</option>
            <option value="normal">Normal</option>
          </select>
          <Button onClick={handleSave} disabled={saving} className="w-full">
            {saving ? "Saving..." : "Save"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
