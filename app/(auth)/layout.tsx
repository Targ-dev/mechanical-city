export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col">
      {children}
    </div>
  )
}
