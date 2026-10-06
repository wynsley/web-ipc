import { CardMissionVission } from "@/components/molecules/aboutUs/cardMissionVission"
import { MISSION_VISSION } from "@/data/aboutUs/missionVission"

function MissionAndVission () {
  return(
    <section
      className=" flex flex-col sm:flex-row  items-center gap-5 sm:gap-10
      mx-auto py-8 lg:mt-8 w-[92%] max-w-6xl md:w-[90%] "
    >
    
    <CardMissionVission
      list={MISSION_VISSION}
    />
    </section>
  )
}

export {MissionAndVission}