export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-[calc(100vh-65px)] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
      {children}
    </div>
  )
}
