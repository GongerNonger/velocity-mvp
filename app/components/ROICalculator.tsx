"use client";

import { useMemo, useState } from "react";

// Pricing tiers mirror app/api/store.ts pricingTiers so this can run client-side
// without a fetch. Update both if pricing changes.
const TIERS = [
  { name: "Small", max: 5000, platformFee: 50000, perStudent: 30 },
  { name: "Mid", max: 20000, platformFee: 100000, perStudent: 25 },
  { name: "Large", max: Infinity, platformFee: 250000, perStudent: 20 },
];

function tierFor(students: number) {
  return TIERS.find((t) => students <= t.max) ?? TIERS[TIERS.length - 1];
}

// Assumptions  conservative, defensible. Documented in pilot-proposal.md.
const HOURLY_ADVISOR_COST = 45;       // fully-loaded
const HOURS_SAVED_PER_ADVISOR_WK = 3; // conservative pilot target
const ADVISOR_TO_STUDENT_RATIO = 300;
const WEEKS_PER_YEAR = 40;            // academic year, not 52
const TUITION_PER_STUDENT = 6700;     // UVU full-time annual resident tuition ballpark
const RETENTION_LIFT = 0.025;         // 2.5 pp, well below Civitas' published 3pp claim

export function ROICalculator({ defaultStudents = 20000 }: { defaultStudents?: number }) {
  const [students, setStudents] = useState(defaultStudents);

  const result = useMemo(() => {
    const tier = tierFor(students);
    const velocityCost = tier.platformFee + tier.perStudent * students;

    const advisors = Math.ceil(students / ADVISOR_TO_STUDENT_RATIO);
    const advisorSavings = advisors * HOURS_SAVED_PER_ADVISOR_WK * WEEKS_PER_YEAR * HOURLY_ADVISOR_COST;

    const retainedStudents = students * RETENTION_LIFT;
    const retentionRevenue = retainedStudents * TUITION_PER_STUDENT;

    const totalValue = advisorSavings + retentionRevenue;
    const netROI = totalValue - velocityCost;
    const roiMultiple = velocityCost > 0 ? totalValue / velocityCost : 0;

    return {
      tier,
      velocityCost,
      advisors,
      advisorSavings,
      retainedStudents,
      retentionRevenue,
      totalValue,
      netROI,
      roiMultiple,
    };
  }, [students]);

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 md:p-8">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <div>
          <h3 className="text-2xl font-bold text-white">Estimate the impact at your institution</h3>
          <p className="text-sm text-gray-400 mt-1">
            Slide to match your enrollment. Numbers assume a conservative 3 advisor-hours saved per week and a 2.5 pp retention lift.
          </p>
        </div>
        <div className="text-right">
          <div className="text-xs text-gray-500 uppercase tracking-wide">Pricing tier</div>
          <div className="text-xl font-bold text-white">{result.tier.name}</div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="enrollment" className="text-sm text-gray-300 font-medium">Enrollment</label>
          <span className="text-2xl font-black" style={{ color: "#4CAF50" }}>{students.toLocaleString()}</span>
        </div>
        <input
          id="enrollment"
          type="range"
          min={1000}
          max={60000}
          step={500}
          value={students}
          onChange={(e) => setStudents(Number(e.target.value))}
          className="w-full accent-green-600"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>1,000</span>
          <span>20,000</span>
          <span>40,000</span>
          <span>60,000+</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Metric
          label="Velocity annual cost"
          value={`$${result.velocityCost.toLocaleString()}`}
          sub={`$${result.tier.platformFee.toLocaleString()} platform + $${result.tier.perStudent}/student`}
          tone="neutral"
        />
        <Metric
          label="Advisor time recaptured"
          value={`$${Math.round(result.advisorSavings).toLocaleString()}`}
          sub={`${result.advisors} advisors  ${HOURS_SAVED_PER_ADVISOR_WK} hrs/wk  ${WEEKS_PER_YEAR} wks  $${HOURLY_ADVISOR_COST}/hr`}
          tone="positive"
        />
        <Metric
          label="Retention revenue"
          value={`$${Math.round(result.retentionRevenue).toLocaleString()}`}
          sub={`+${(RETENTION_LIFT * 100).toFixed(1)} pp retention  ${Math.round(result.retainedStudents)} students retained  $${TUITION_PER_STUDENT.toLocaleString()} tuition`}
          tone="positive"
        />
        <Metric
          label="Net annual ROI"
          value={`$${Math.round(result.netROI).toLocaleString()}`}
          sub={`${result.roiMultiple.toFixed(1)}x return on Velocity spend`}
          tone="hero"
        />
      </div>

      <p className="text-xs text-gray-500 mt-6">
        Assumptions are conservative and editable in <code className="text-gray-400">app/components/ROICalculator.tsx</code>.
        For a tailored model with your actual advisor headcount, tuition revenue per student, and historical retention,
        request a pilot.
      </p>
    </div>
  );
}

function Metric({
  label,
  value,
  sub,
  tone,
}: {
  label: string;
  value: string;
  sub: string;
  tone: "neutral" | "positive" | "hero";
}) {
  const styles =
    tone === "hero"
      ? { borderColor: "#275D38", backgroundColor: "rgba(39, 93, 56, 0.12)" }
      : tone === "positive"
      ? { borderColor: "rgba(39, 93, 56, 0.4)", backgroundColor: "rgba(39, 93, 56, 0.06)" }
      : { borderColor: "rgb(31 41 55)", backgroundColor: "transparent" };
  return (
    <div className="rounded-xl border p-4" style={styles}>
      <div className="text-xs text-gray-400 uppercase tracking-wide">{label}</div>
      <div className="text-2xl md:text-3xl font-black text-white mt-1">{value}</div>
      <div className="text-xs text-gray-500 mt-1 leading-relaxed">{sub}</div>
    </div>
  );
}
