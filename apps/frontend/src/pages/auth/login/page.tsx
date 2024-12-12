import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from '@phosphor-icons/react';
import { loginSchema } from '@ketero/dto';
import { usePasswordToggle } from '@ketero/hooks';
import {
  Button,
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@ketero/ui';
import { useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { z } from 'zod';

import { useLogin } from '@/client/services/auth';

type FormValues = z.infer<typeof loginSchema>;

export const LoginPage = () => {
  const { login, loading } = useLogin();

  const formRef = useRef<HTMLFormElement>(null);
  usePasswordToggle(formRef);

  const form = useForm<FormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { identifier: '', password: '' },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await login(data);
    } catch {
      form.reset();
    }
  };

  return (
    <div className="space-y-8">
      <Helmet>
        <title>Sign in to your account - Ketero</title>
      </Helmet>

      <div className="space-y-1.5">
        <h2 className="text-2xl font-semibold tracking-tight">
          Sign in to your account
        </h2>
        <h6>
          <span className="opacity-75">Don't have an account?</span>
          <Button asChild variant="link" className="px-1.5">
            <Link to="/auth/register">
              Create one now
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
        </h6>
      </div>

      <div>
        <Form {...form}>
          <form
            ref={formRef}
            className="flex flex-col gap-y-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    You can also enter your username.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Hold <code className="text-xs font-bold">Ctrl</code> to
                    display your password temporarily.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-4 flex items-center gap-x-4">
              <Button type="submit" disabled={loading} className="flex-1">
                Sign in
              </Button>

              <Button asChild variant="link" className="px-4">
                <Link to="/auth/forgot-password">Forgot Password?</Link>
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};