function ConvCard({ title, desc, icon }) {
  return (
    <div className="w-[15em] md:w-[20em] shrink-0 bg-white border border-gray-200 rounded-xl px-5 py-6 
      flex flex-col items-center text-center gap-3 
      transition-all duration-200 hover:-translate-y-1 hover:border-gray-400">
      <div className="text-gray-800">{icon}</div>
      <p className="text-[15px] font-medium text-gray-900">{title}</p>
      <p className="text-[13px] text-gray-500">{desc}</p>
    </div>
  )
}

export {ConvCard}