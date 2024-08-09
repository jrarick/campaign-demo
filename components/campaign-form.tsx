"use client"

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { campaignFormSchema, Campaign } from "@/schemas/campaign-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "./ui/input"
import { Button, buttonVariants } from "./ui/button"
import { Calendar } from "./ui/calendar"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { Separator } from "./ui/separator"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import AGE_RANGES from "@/constants/age-ranges"
import GENDERS from "@/constants/genders"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command"
import COUNTRIES from "@/constants/countries"
import DEVICES from "@/constants/devices"
import PUBLISHERS from "@/constants/publishers"
import STATES from "@/constants/states"
import Link from "next/link"
import { useAuth } from "@/context/AuthContext"
import { useRouter } from "next/navigation"
import CRUDCRUD_ID from "@/constants/crudcrud-id"

export default function CampaignForm({ campaign }: { campaign?: Campaign }) {
  const { user } = useAuth()
  const router = useRouter()

  const form = useForm<Campaign>({
    resolver: zodResolver(campaignFormSchema),
    defaultValues: {
      name: campaign?.name ?? "",
      budget: campaign?.budget ?? undefined,
      start_date: campaign ? new Date(campaign.start_date) : undefined,
      end_date: campaign ? new Date(campaign.end_date) : undefined,
      target_age: campaign?.target_age ?? "<18",
      target_gender: campaign?.target_gender ?? "Male",
      target_country: campaign?.target_country ?? "",
      target_city: campaign?.target_city ?? "",
      target_state: campaign?.target_state ?? "AL",
      target_zip_code: campaign?.target_zip_code ?? "",
      publishers: campaign?.publishers ?? "Hulu",
      device: campaign?.device ?? "Mobile",
    },
  })

  async function onSubmit(values: Campaign) {
    try {
      const response = await fetch(
        campaign
          ? `https://crudcrud.com/api/${CRUDCRUD_ID}/campaigns/${campaign._id}`
          : `https://crudcrud.com/api/${CRUDCRUD_ID}/campaigns`,
        {
          method: campaign ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values, username: user?.username }),
        }
      )

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const data = await response.json()
      console.log("Success:", data)
      router.push(`/campaigns/${data._id}`)
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <Form {...form}>
      <Separator className="mb-12" />
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="space-y-8">
          <legend className="text-xl font-semibold text-primary">
            Campaign Details
          </legend>
          {/* Name field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Campaign Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Budget field */}
          <FormField
            control={form.control}
            name="budget"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Budget (in USD)</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="$" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Start date field */}
          <FormField
            control={form.control}
            name="start_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Start Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date("2050-01-01") || date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* End date field */}
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>End Date</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date("2050-01-01") || date < new Date()
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <Separator className="my-12" />
        <fieldset className="space-y-8">
          <legend className="text-xl font-semibold text-primary">
            Target Audience
          </legend>
          {/* Target age Field */}
          <FormField
            control={form.control}
            name="target_age"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Age</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select an age group" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {AGE_RANGES.map((ageRange) => (
                      <SelectItem key={ageRange} value={ageRange}>
                        {ageRange}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Target gender field */}
          <FormField
            control={form.control}
            name="target_gender"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Gender</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {GENDERS.map((gender) => (
                      <FormItem
                        key={gender}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={gender} />
                        </FormControl>
                        <FormLabel className="font-normal">{gender}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Target country field */}
          <FormField
            control={form.control}
            name="target_country"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Target Country</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ?? "Select country"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search country..." />
                      <CommandList>
                        <CommandEmpty>No country found.</CommandEmpty>
                        <CommandGroup>
                          {COUNTRIES.map((country) => (
                            <CommandItem
                              value={country}
                              key={country}
                              onSelect={() => {
                                form.setValue("target_country", country)
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  country === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {country}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Target city, state, zip fields */}
          <div className="grid grid-cols-1 sm:grid-cols-8 gap-y-8 sm:gap-y-0 sm:gap-x-4">
            <FormField
              control={form.control}
              name="target_city"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-3">
                  <FormLabel>Target City</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target_state"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-3">
                  <FormLabel>Target State</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "w-full justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ?? "Select state"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="max-w-[175px] p-0">
                      <Command>
                        <CommandInput placeholder="Search state..." />
                        <CommandList>
                          <CommandEmpty>No state found.</CommandEmpty>
                          <CommandGroup>
                            {STATES.map((state) => (
                              <CommandItem
                                value={state}
                                key={state}
                                onSelect={() => {
                                  form.setValue("target_state", state)
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    state === field.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                                {state}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="target_zip_code"
              render={({ field }) => (
                <FormItem className="flex flex-col col-span-2 w-full">
                  <FormLabel>Target Zip Code</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </fieldset>
        <Separator className="my-12" />
        <fieldset className="space-y-8">
          <legend className="text-xl font-semibold text-primary">
            Advertiser Details
          </legend>
          {/* Publishers field */}
          <FormField
            control={form.control}
            name="publishers"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Publishers</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a publisher" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {PUBLISHERS.map((publisher) => (
                      <SelectItem key={publisher} value={publisher}>
                        {publisher}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Device field */}
          <FormField
            control={form.control}
            name="device"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Device</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex flex-col space-y-1"
                  >
                    {DEVICES.map((device) => (
                      <FormItem
                        key={device}
                        className="flex items-center space-x-3 space-y-0"
                      >
                        <FormControl>
                          <RadioGroupItem value={device} />
                        </FormControl>
                        <FormLabel className="font-normal">{device}</FormLabel>
                      </FormItem>
                    ))}
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
        <Separator className="my-12" />
        <div className="flex space-x-4">
          <Button type="submit">Submit</Button>
          <Link
            href={campaign ? `/campaigns/${campaign._id}` : "/campaigns"}
            className={buttonVariants({ variant: "secondary" })}
          >
            Cancel
          </Link>
        </div>
      </form>
    </Form>
  )
}
