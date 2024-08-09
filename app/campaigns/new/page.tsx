import CampaignForm from "@/components/campaign-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function NewCampaign() {
  return (
    <div className="py-24">
      <Card className="mx-auto max-w-2xl">
        <CardHeader>
          <CardTitle>Create A New Campaign</CardTitle>
          <CardDescription>Fill out the form below.</CardDescription>
        </CardHeader>
        <CardContent>
          <CampaignForm />
        </CardContent>
      </Card>
    </div>
  )
}
