import { useEffect, useState } from 'react'

function Menu() {
  const [pizzas, setPizzas] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      try {
        const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
        const res = await fetch(`${baseUrl}/api/pizzas`)
        if (!res.ok) throw new Error('Failed to load pizzas')
        const data = await res.json()
        setPizzas(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  return (
    <section id="menu" className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-red-900">Our Menu</h2>
          <p className="text-red-800/70 mt-2">Signature pies made with San Marzano tomatoes and fresh mozzarella.</p>
        </div>
        <a href="#order" className="text-red-700 hover:text-red-800 font-semibold">Start Order →</a>
      </div>

      {loading && <p className="mt-8 text-red-800/70">Loading...</p>}
      {error && <p className="mt-8 text-red-700">{error}</p>}

      <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {pizzas.map(p => (
          <div key={p.id} className="bg-white rounded-xl shadow ring-1 ring-red-100 overflow-hidden">
            <img src={p.image || 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop'} alt={p.name} className="h-40 w-full object-cover" />
            <div className="p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-red-900">{p.name}</h3>
                <span className="text-red-700 font-bold">${p.price.toFixed(2)}</span>
              </div>
              {p.description && <p className="text-sm text-red-800/70 mt-1">{p.description}</p>}
              <div className="mt-3 flex items-center gap-2 text-xs text-red-800/70">
                {p.vegetarian && <span className="px-2 py-0.5 rounded bg-green-50 text-green-700 ring-1 ring-green-200">Veg</span>}
                {p.spicy && <span className="px-2 py-0.5 rounded bg-orange-50 text-orange-700 ring-1 ring-orange-200">Spicy</span>}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Menu
