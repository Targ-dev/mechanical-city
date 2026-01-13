export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
      <div className="layout-container">
        <p className="text-center text-gray-600 text-sm">
          © {currentYear} Mechanical City. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
