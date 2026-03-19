import { useEffect } from "react";
import InsightsFilters from "../components/insights/InsightFilter";
import InsightsHero from "../components/insights/InsightsHero";


export default function Insights() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
  return (
    <div className="bg-white text-slate-900">
      <InsightsHero />
      <InsightsFilters />
      
    </div>
  );
}