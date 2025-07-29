"use server"


import { Risk } from "@/components/ui/columns"

// Temporary mock data (replace with DB call later)
const mockData: Risk[] = [
    { id: 1, location: "Cairo, Egypt", riskLevel: "High" },
    { id: 2, location: "Oslo, Norway", riskLevel: "Low" },
    { id: 3, location: "Bangkok, Thailand", riskLevel: "Medium" },
]

export async function getTravelRisks(): Promise<Risk[]> {
  // Simulate a delay like fetching from a DB
    await new Promise(res => setTimeout(res, 500))
    return mockData
}

export async function updateRisk(risk: Risk): Promise<{ success: boolean }> {
  // Replace with real DB logic
  console.log("Updating risk:", risk)
  await new Promise(res => setTimeout(res, 500))
  return { success: true }
}




