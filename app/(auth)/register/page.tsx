import { AuthForm } from "@/components/auth/auth-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100svh-65px)] items-center justify-center bg-gray-100 dark:bg-gray-900">
      <AuthForm type="register" />
    </div>
  )
}
