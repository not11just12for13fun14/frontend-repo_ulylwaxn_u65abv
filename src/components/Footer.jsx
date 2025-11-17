function Footer() {
  return (
    <footer className="bg-red-900 text-red-50 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm">© {new Date().getFullYear()} FirePie. All rights reserved.</p>
        <nav className="flex items-center gap-6 text-sm">
          <a href="#menu" className="hover:text-white/90">Menu</a>
          <a href="#order" className="hover:text-white/90">Order</a>
          <a href="/test" className="hover:text-white/90">System Status</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer
