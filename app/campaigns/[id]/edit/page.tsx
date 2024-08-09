"use client"

import CampaignForm from "@/components/campaign-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import CRUDCRUD_ID from "@/constants/crudcrud-id"
import { Campaign } from "@/schemas/campaign-form"
import { useState, useEffect } from "react"

export default function EditCampaign({ params }: { params: { id: string } }) {
  const [campaign, setCampaign] = useState<Campaign | null>(null)

  useEffect(() => {
    async function fetchCampaign() {
      try {
        const response = await fetch(
          `https://crudcrud.com/api/${CRUDCRUD_ID}/campaigns/${params.id}`
        )

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()

        setCampaign(data)
      } catch (error) {
        console.error("Error fetching campaign:", error)
      }
    }

    fetchCampaign()
  }, [params.id])

  return (
    <div className="py-24">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Edit {campaign?.name}</CardTitle>
          <CardDescription>Make changes below.</CardDescription>
        </CardHeader>
        <CardContent>
          {campaign && <CampaignForm campaign={campaign} />}
        </CardContent>
      </Card>
    </div>
  )
}
