import { z } from "zod"
import STATES from "../constants/states"
import AGE_RANGES from "../constants/age-ranges"
import PUBLISHERS from "../constants/publishers"
import DEVICES from "../constants/devices"
import GENDERS from "../constants/genders"

export const campaignFormSchema = z
  .object({
    name: z.string(),
    budget: z.coerce
      .number({
        required_error: "Budget is required",
        invalid_type_error: "Budget must be a number",
      })
      .positive()
      .min(1, { message: "Must be at least $1" })
      .max(100_000_000, { message: "Cannot exceed $100,000,000" }),
    start_date: z.date(),
    end_date: z.date(),
    target_age: z.enum(AGE_RANGES),
    target_gender: z.enum(GENDERS),
    target_country: z.string(),
    target_city: z.string(),
    target_state: z.enum(STATES),
    // test if zip code matches XXXXX or XXXXX-XXXX then trim -XXXX if applicable
    target_zip_code: z
      .string()
      .regex(/(^\d{5}$)|(^\d{5}-\d{4}$)/, {
        message: "Must be XXXXX or XXXXX-XXXX format",
      })
      .transform((val) => val.replace(/-\d{4}$/, "")),
    publishers: z.enum(PUBLISHERS),
    device: z.enum(DEVICES),
  })
  .refine((data) => data.start_date < data.end_date, {
    message: "End date must be after start date",
    path: ["end_date"],
  })

export type Campaign = z.infer<typeof campaignFormSchema> & {
  username: string
  _id: string
}
