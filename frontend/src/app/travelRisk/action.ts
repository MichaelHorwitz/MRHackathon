"use server"


import { Risk } from "@/components/ui/columns"

// Temporary mock data (replace with DB call later)
const mockData: Risk[] = [
    { id: 1, location: "Cairo, Egypt",checkedDate: "2025-07-28", riskLevel: "High" },
    { id: 2, location: "Oslo, Norway",checkedDate: "2025-07-28", riskLevel: "Low" },
    { id: 3, location: "Bangkok, Thailand",checkedDate: "2025-07-28", riskLevel: "Medium" },
]
// Mock function to simulate fetching travel risks  
export async function getTravelRisks(): Promise<Risk[]> {
  // Simulate a delay like fetching from a DB
    await new Promise(res => setTimeout(res, 500))
    return mockData
}
// Mock functions to simulate DB operations
export async function updateRisk(risk: Risk): Promise<{ success: boolean }> {
  // Replace with real DB logic
  console.log("Updating risk:", risk)
  await new Promise(res => setTimeout(res, 500))
  // Find and update the risk in mock data
  const index = mockData.findIndex(r => r.id === risk.id)
  if (index !== -1) {
    mockData[index] = risk
  }
  // add current data to checkedDate
  console.log("Updated risks:", mockData)
  // Return success status
  return { success: true }
}
// Mock function to simulate deleting a risk
export async function deleteRisk(id: number): Promise<{ success: boolean }> {
  console.log("Deleting risk id:", id)
  // simulate DB latency
  await new Promise((r) => setTimeout(r, 500))
  // Remove the risk from mock data
  const index = mockData.findIndex(r => r.id === id)
  if (index !== -1) {
    mockData.splice(index, 1)
  }
  console.log("Remaining risks after deletion:", mockData)
  // Return success status
  return { success: true }
}
// Mock function to simulate inserting a new risk
export async function insertRisk(payload: Omit<Risk, "id">): Promise<Risk> {
  await new Promise((r) => setTimeout(r, 500))
  const nextId = mockData.reduce((max, r) => Math.max(max, r.id), 0) + 1
  const newRisk: Risk = { id: nextId, ...payload }
  mockData.push(newRisk)
  return newRisk
}

