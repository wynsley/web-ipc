import { CardMissionVission } from "@/components/molecules/aboutUs/cardMissionVission"
import { MISSION_VISSION } from "@/data/aboutUs/missionVission"

function MissionAndVission () {
  return(
    <section
      className=" flex items-center gap-10
      mx-auto py-8 mt-8 w-[92%] max-w-7xl md:w-[90%] 
      md:py-10"
    >
    
    <CardMissionVission
      list={MISSION_VISSION}
    />
    </section>
  )
}

export {MissionAndVission}