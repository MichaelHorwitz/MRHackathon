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

type Props = {
  riskId: number
  location: string
  onDelete: (id: number) => Promise<void> | void
}

export function DeleteRiskDialog({ riskId, location, onDelete }: Props) {
  const [open, setOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  const handleConfirm = async () => {
    setDeleting(true)
    await onDelete(riskId)
    setDeleting(false)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="text-red-600">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          {/* This visible DialogTitle satisfies Radix’s a11y requirement */}
          <DialogTitle>Delete Travel Risk</DialogTitle>
        </DialogHeader>
        <p className="py-2">
          Are you sure you want to delete <strong>{location}</strong>?
        </p>
        <DialogFooter className="flex justify-end space-x-2">
          <Button
            variant="destructive"
            onClick={handleConfirm}
            disabled={deleting}
          >
            {deleting ? "Deleting…" : "Yes"}
          </Button>
          <Button onClick={() => setOpen(false)} disabled={deleting}>
            No
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
