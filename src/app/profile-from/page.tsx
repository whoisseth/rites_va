"use client"

import Link from "next/link"
import DatePickerDemo from "@/date-picker"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFieldArray, useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

const profileFormSchema = z.object({
    vendorID: z
        .string()
        .min(18, {
            message: "VA-ID must be at least 18 characters.",
        })
        .max(18, {
            message: "Username must not be longer than 18 characters.",
        }),
    firmName: z
        .string()
        .min(2, {
            message: "Firm Name must be at least 2 characters.",
        })
        .max(30, {
            message: "Firm Name must not be longer than 30 characters.",
        }),
    sellerType: z
        .string({
            required_error: "Please select the Seller Type to display.",
        })
    ,
    applicationDate: z
        .string({
            required_error: "Please select the  application Date.",
        })

    ,
    applicationStage: z
        .string({
            required_error: "Please select the Application Stage.",
        })
    ,
    bio: z.string().max(160).min(4),
    urls: z
        .array(
            z.object({
                value: z.string().url({ message: "Please enter a valid URL." }),
            })
        )
        .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
    bio: "I own a computer.",
    urls: [
        { value: "https://shadcn.com" },
        { value: "http://twitter.com/shadcn" },
    ],
}

export default function ProfileForm() {
    const form = useForm<ProfileFormValues>({
        resolver: zodResolver(profileFormSchema),
        defaultValues,
        mode: "onChange",
    })

    const { fields, append } = useFieldArray({
        name: "urls",
        control: form.control,
    })

    function onSubmit(data: ProfileFormValues) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="vendorID"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>VA-ID</FormLabel>
                            <FormControl>
                                <Input placeholder="VA-123451234512345" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter Vendor Assessement ID.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="firmName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Firm Name</FormLabel>
                            <FormControl>
                                <Input placeholder="ABCD LIMITED" {...field} />
                            </FormControl>
                            <FormDescription>
                                Enter the firm name.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="sellerType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Seller Type</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Seller Type" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Deemed OEM">Deemed OEM</SelectItem>
                                    <SelectItem value="OEM">OEM</SelectItem>
                                    <SelectItem value="Reseller">Reseller</SelectItem>
                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select the Seller Type{" "}
                                {/* <Link href="/examples/forms">email settings</Link>. */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                // DatePickerDemo
                />

                <FormField
                    control={form.control}
                    name="applicationDate"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Application Date</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <DatePickerDemo />
                                </FormControl>

                            </Select>
                            <FormDescription>
                                Select the date {" "}
                                {/* <Link href="/examples/forms">email settings</Link>. */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}




                // DatePickerDemo
                />

                {/* <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tell us a little bit about yourself"
                                    className="resize-none"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                You can <span>@mention</span> other users and organizations to
                                link to them.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                /> */}
                {/* <div>
                    {fields.map((field, index) => (
                        <FormField
                            control={form.control}
                            key={field.id}
                            name={`urls.${index}.value`}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className={cn(index !== 0 && "sr-only")}>
                                        URLs
                                    </FormLabel>
                                    <FormDescription className={cn(index !== 0 && "sr-only")}>
                                        Add links to your website, blog, or social media profiles.
                                    </FormDescription>
                                    <FormControl>
                                        <Input {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => append({ value: "" })}
                    >
                        Add URL
                    </Button>
                </div> */}

                <FormField
                    control={form.control}
                    name="applicationStage"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel> Status</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select application Stage" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="Pending">Pending</SelectItem>

                                    <SelectItem value="Desktop Assessment In Progress">Desktop Assessment In Progress</SelectItem>
                                    <SelectItem value="Desktop Assessment Completed">Desktop Assessment Completed</SelectItem>
                                    <SelectItem value="Video Assessment  In Progress">Video Assessment  In Progress</SelectItem>
                                    <SelectItem value="Video Assessment completed">Video Assessment completed</SelectItem>
                                    <SelectItem value="Report Pass">Report Pass</SelectItem>
                                    <SelectItem value="Report Failed">Report Failed</SelectItem>

                                </SelectContent>
                            </Select>
                            <FormDescription>
                                Select current status of the application{" "}
                                {/* <Link href="/examples/forms">email settings</Link>. */}
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                // DatePickerDemo
                />
                <Button type="submit">Update profile</Button>
            </form>
        </Form>
    )
}
