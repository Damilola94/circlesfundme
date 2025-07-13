interface StatsSectionProps {
  stats: Array<{
    value: string
    label: string
    description?: string
  }>
}

export default function StatsSection({ stats }: StatsSectionProps) {
  return (
    <section className="py-16 bg-emerald-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center text-white">
              <div className="text-4xl lg:text-5xl font-bold mb-2">{stat.value}</div>
              <div className="text-lg font-semibold mb-1">{stat.label}</div>
              {stat.description && <div className="text-sm opacity-90">{stat.description}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
