import { AuthForm } from "@/components/auth/auth-form"

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100svh-130px)] items-center justify-center p-4">
      <AuthForm type="register" />
    </div>
  )
}
