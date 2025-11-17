import { Pizza } from 'lucide-react'

function Hero({ onOrderClick }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-50 via-orange-50 to-amber-50">
      <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/70 backdrop-blur px-3 py-1 rounded-full text-sm font-medium text-red-700 ring-1 ring-red-200"> 
            <Pizza size={18} /> Hand-tossed. Wood-fired. Wow.
          </div>
          <h1 className="mt-6 text-4xl md:text-6xl font-extrabold tracking-tight text-red-900">
            Fresh Pizza, Fast Delivery
          </h1>
          <p className="mt-4 text-lg text-red-800/80">
            Craft your perfect pie from our signature recipes or build your own. Delivered piping-hot in under 30 minutes.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <button onClick={onOrderClick} className="px-6 py-3 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold shadow">
              Order Now
            </button>
            <a href="#menu" className="px-6 py-3 rounded-lg bg-white hover:bg-red-50 text-red-700 font-semibold shadow ring-1 ring-red-200">
              Explore Menu
            </a>
          </div>
          <div className="mt-6 text-sm text-red-800/70">
            Free delivery on orders over $20 • Open 10am – 11pm
          </div>
        </div>
        <div className="relative">
          <img src="https://images.unsplash.com/photo-1513104890138-7c749659a591?ixid=M3w3OTkxMTl8MHwxfHNlYXJjaHwxfHxQaXp6YXxlbnwwfDB8fHwxNzYzMjk4MDI5fDA&ixlib=rb-4.1.0&w=1600&auto=format&fit=crop&q=80" alt="Pizza" className="rounded-2xl shadow-2xl border border-red-100" />
          <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow p-4 ring-1 ring-red-100">
            <p className="text-sm font-semibold text-red-900">Top Rated</p>
            <p className="text-xs text-red-800/70">4.9/5 from 2k+ reviews</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
