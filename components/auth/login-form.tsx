"use client";

import React, { useCallback, useState, useTransition } from "react";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { LoginSchema } from "@/schemas";
import { Form } from "@/components/ui/form";
import CardWrapper from "@/components/auth/card-wrapper";
import { Button } from "@/components/ui/button";
import FormError from "@/components/form-error";
import FormSuccess from "@/components/form-success";
import { login } from "@/actions/login";
import FromInput from "@/components/auth/form-input";

export const LoginForm =
  // eslint-disable-next-line react/display-name
  React.memo(() => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof LoginSchema>>({
      resolver: zodResolver(LoginSchema),
      defaultValues: {
        email: "",
        password: "",
      },
    });

    const onSubmit = useCallback((values: z.infer<typeof LoginSchema>) => {
      startTransition(() => {
        login(values).then((res) => {
          if (res !== undefined) {
            if (res.error) {
              setError(res.error);
            } else if (res.success) {
              setSuccess(res.success);
            }
          }
        });
      });
    }, []);
    return (
      <CardWrapper
        headerLabel="Welcome Back !"
        backButtonHref="/auth/register"
        backButtonLabel="Don't have an account ?"
        showSocials
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <FromInput
                control={form.control}
                name="email"
                label="Email"
                placeholder="john.doe@gmail.com"
                isPending={isPending}
                type="email"
              />
              <FromInput
                control={form.control}
                name="password"
                label="Password"
                placeholder="********"
                isPending={isPending}
                type="password"
              />
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button disabled={isPending} className="w-full" type="submit">
              Login
            </Button>
          </form>
        </Form>
      </CardWrapper>
    );
  });
