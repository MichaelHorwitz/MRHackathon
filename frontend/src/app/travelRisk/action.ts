"use server";

import { client, Risk, toResult } from "@/api";
import { revalidatePath } from "next/cache";

// Mock function to simulate fetching travel risks
export async function getTravelRisks(): Promise<Risk[]> {
  return client.GET("/monitored-destination").then((d) => d.data!);
}
// Mock functions to simulate DB operations
export async function updateRisk(risk: Risk): Promise<{ success: boolean }> {
  const result = await client
    .PATCH("/monitored-destination/{id}", {
      params: { path: { id: risk.id.toString() } },
      body: {
        location: risk.location,
        riskLevel: risk.riskLevel,
        lastChecked: risk.lastChecked,
      },
    })
    .then(toResult);

  revalidatePath("/travelRisk");
  return {
    success: !result.error,
  };
}
// Mock function to simulate deleting a risk
export async function deleteRisk(id: number): Promise<{ success: boolean }> {
  const result = await client
    .DELETE("/monitored-destination/{id}", { params: { path: { id: id } } })
    .then(toResult);
  revalidatePath("/travelRisk");

  return {
    success: !result.error,
  };
}

// Mock function to simulate inserting a new risk
export async function insertRisk(payload: Omit<Risk, "id">) {
  const result = await client
    .POST("/monitored-destination", {
      body: {
        location: payload.location,
        riskLevel: payload.riskLevel,
        lastChecked: payload.lastChecked,
      },
    })
    .then(toResult);
  revalidatePath("/travelRisk");
  return {
    success: !result.error,
  };
}
