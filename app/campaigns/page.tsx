"use client"

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card"
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button, buttonVariants } from "@/components/ui/button"
import Link from "next/link"
import { EyeIcon, MoreHorizontal, PenIcon, TrashIcon } from "lucide-react"

import { type Campaign } from "@/schemas/campaign-form"
import { useEffect, useState } from "react"
import { formatMoney } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import CRUDCRUD_ID from "@/constants/crudcrud-id"

export default function Campaigns() {
  const { user } = useAuth()

  const [campaigns, setCampaigns] = useState<Campaign[]>([])

  useEffect(() => {
    async function fetchCampaigns() {
      try {
        const response = await fetch(
          `https://crudcrud.com/api/${CRUDCRUD_ID}/campaigns`
        )

        if (!response.ok) {
          throw new Error("Network response was not ok")
        }

        const data = await response.json()

        const authorizedCampaigns = data.filter(
          (campaign: Campaign) => campaign.username === user?.username
        )

        setCampaigns(authorizedCampaigns)
      } catch (error) {
        console.error("Error fetching campaigns:", error)
      }
    }

    fetchCampaigns()
  }, [user?.username])

  async function deleteCampaign(id: string) {
    try {
      const response = await fetch(
        `https://crudcrud.com/api/${CRUDCRUD_ID}/campaigns/${id}`,
        {
          method: "DELETE",
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      setCampaigns(campaigns.filter((campaign) => campaign._id !== id))
      console.log("Delete successful")
    } catch (error) {
      console.error("Error deleting campaign:", error)
    }
  }

  return (
    <div className="py-24">
      <Card className="max-w-6xl mx-auto">
        <CardHeader className="flex flex-row justify-between">
          <div>
            <CardTitle>Ad Campaigns</CardTitle>
            <CardDescription>View and manage your campaigns.</CardDescription>
          </div>
          <Link
            href="/campaigns/new"
            className={buttonVariants({ variant: "default" })}
          >
            Create New Campaign
          </Link>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Campaign Name</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {campaigns.length === 0 && (
                <TableRow>
                  <TableCell className="text-center col-span-5">
                    No campaigns found.
                  </TableCell>
                </TableRow>
              )}
              {campaigns.map((campaign) => (
                <TableRow key={campaign.name}>
                  <TableCell className="font-medium">{campaign.name}</TableCell>
                  <TableCell>
                    {new Date(campaign.start_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(campaign.end_date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{formatMoney(campaign.budget)}</TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="space-y-1">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem asChild>
                          <Link href={`/campaigns/${campaign._id}`}>
                            <EyeIcon className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link href={`/campaigns/${campaign._id}/edit`}>
                            <PenIcon className="h-4 w-4 mr-2" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          className="text-destructive"
                          onClick={() => deleteCampaign(campaign._id)}
                        >
                          <TrashIcon className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
