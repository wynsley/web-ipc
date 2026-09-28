import { STATS_GRADUATES } from "../../../data/alumni/statsGraduates";
import { ScrollReveal } from "../../layouts/scrollReveal";

function StatisticsGradautes() {
  

  return (
    <section>
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between gap-6 py-20 px-5 ">

        {STATS_GRADUATES.map((stat, index) => {
          const Icon = stat.icon
          return (
            <ScrollReveal
            delay={0.2 * index} y={60}
            key={index}
            className="flex-1 min-w-50 flex flex-col items-center text-center"
          >
            <div className="w-14 h-14 rounded-full bg-[#0b3556] flex items-center justify-center mb-3">
              <Icon className="w-6 h-6 text-white"/>
            </div>
            <span className="text-2xl md:text-3xl font-extrabold text-[#0b3556] leading-none mb-1">
              {stat.number}
            </span>
            <p className="text-sm text-gray-500 font-medium">
              {stat.label}
            </p>
          </ScrollReveal>
          )
        })}
      </div>
    </section>
  );
}

export { StatisticsGradautes };