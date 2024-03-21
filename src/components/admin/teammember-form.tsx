"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";
import { TeamMemberFormSchema } from "@/zodSchemas";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import React from "react";

import { Input } from "@/components/ui/input";
import { addTeamMember,updateTeamMember } from "@/actions/team_member";

interface TeamFormProps {
    member?: {
        name: string;
        email:string;
        role:string;
    };
    memberId?: string;
}

export const TeamMemberForm: React.FC<TeamFormProps> = ({
    member,
    memberId,
}) => {
    const router = useRouter();

    const form = useForm<z.infer<typeof TeamMemberFormSchema>>({
        resolver: zodResolver(TeamMemberFormSchema),
        defaultValues: {
            name: memberId ? member?.name : "",
            email: memberId ? member?.email : "",
            role: memberId ? member?.role : "",
        },
    });

    const onSubmit = async (values: z.infer<typeof TeamMemberFormSchema>) => {
        const toastId = toast.loading(
            `${memberId ? "Updating" : "Adding"} Team Member, Please Wait...`,
        );

        try {
            if (memberId) {
                await updateTeamMember(memberId, values);
            } else {
                await addTeamMember(values);
            }
            toast.success(
                `Team Member ${memberId ? "Updated" : "Added"} Successfully`,
                {
                    id: toastId,
                },
            );
            router.refresh();
            router.back();
        } catch (error) {
            toast.error(`Team Member ${memberId ? "update" : "add"} failed`, {
                id: toastId,
            });
        }
    };

    return (
        <>
            <Card className="mx-auto max-w-[500px]">
                <CardHeader>
                    <CardTitle>
                        {memberId ? "Update Team Member" : "Add a new Team Member"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-8"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter member's name"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter member's email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="role"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Role</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter member's role"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                disabled={form.formState.isSubmitting}
                                className="disabled:cursor-not-allowed"
                            >
                                {form.formState.isSubmitting ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="mr-2 animate-spin"
                                        />
                                        Please Wait
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </>
    );
};
