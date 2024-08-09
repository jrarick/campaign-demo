"use client"

import { buttonVariants } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import CRUDCRUD_ID from "@/constants/crudcrud-id"
import { formatMoney } from "@/lib/utils"
import { Campaign } from "@/schemas/campaign-form"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function CampaignPage({ params }: { params: { id: string } }) {
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
    <div className="flex flex-col space-y-8 items-center">
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader className="bg-accent text-accent-foreground p-6 rounded-t-lg flex flex-row items-center justify-between">
          <CardTitle>{campaign?.name}</CardTitle>
          <Link
            href={`/campaigns/${campaign?._id}/edit`}
            className={buttonVariants({ variant: "default" })}
          >
            Edit
          </Link>
        </CardHeader>
        <CardContent className="p-6 grid gap-4">
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="text-lg font-medium">
              {campaign ? formatMoney(campaign?.budget) : ""}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Start Date</p>
            <p className="text-lg font-medium">
              {new Date(campaign?.start_date ?? 0).toLocaleDateString()}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">End Date</p>
            <p className="text-lg font-medium">
              {new Date(campaign?.end_date ?? 0).toLocaleDateString()}
            </p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Target Country</p>
            <p className="text-lg font-medium">{campaign?.target_country}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Target Audience</p>
            <p className="text-lg font-medium">{`${campaign?.target_gender}s aged ${campaign?.target_age} in ${campaign?.target_city}, ${campaign?.target_state} ${campaign?.target_zip_code}`}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Publishers</p>
            <p className="text-lg font-medium">{campaign?.publishers}</p>
          </div>
          <div className="grid gap-1">
            <p className="text-sm text-muted-foreground">Device</p>
            <p className="text-lg font-medium">{campaign?.device}</p>
          </div>
        </CardContent>
      </Card>
      <div>
        <Link
          href="/campaigns"
          className={buttonVariants({ variant: "secondary" })}
        >
          Go back
        </Link>
      </div>
    </div>
  )
}
