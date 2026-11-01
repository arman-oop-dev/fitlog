"use client";
import { Tabs } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import { useContext, useMemo, useState } from "react";
import { PlanContext } from "../ContextProvider/MyPlanContext";

interface PlanItem {
  id: string | number;
  name: string;
  equipment: string;
  duration: number; // minutes
  caloriesBurned: number; // kcal
  rating: number;
  image: string;
}

type SortKey = "duration" | "caloriesBurned" | "rating";
type TabKey = "today" | "saved";
type Id = string | number;

// Change this to the page where users pick exercises.
const BROWSE_HREF = "/";

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "duration", label: "Duration (shortest)" },
  { value: "caloriesBurned", label: "Calories (highest)" },
  { value: "rating", label: "Rating (highest)" },
];

const FOCUS =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C2F800]";

const toNumber = (value: unknown): number => {
  const n = Number(value);
  return Number.isFinite(n) ? n : 0;
};

// Drops removed + duplicate ids, then sorts.
// duration: shortest first | calories & rating: highest first
const prepareItems = (
  items: PlanItem[],
  sortBy: SortKey,
  removedIds: Id[],
): PlanItem[] => {
  const seen = new Set<Id>();

  return items
    .filter((item) => {
      if (removedIds.includes(item.id) || seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    })
    .sort((a, b) =>
      sortBy === "duration"
        ? toNumber(a.duration) - toNumber(b.duration)
        : toNumber(b[sortBy]) - toNumber(a[sortBy]),
    );
};

const MyPlanCard = () => {
  const { addToPlan, savedPlan } = useContext(PlanContext) as {
    addToPlan: PlanItem[];
    savedPlan: PlanItem[];
  };

  const [activeTab, setActiveTab] = useState<TabKey>("today");
  const [sortBy, setSortBy] = useState<SortKey>("duration");
  const [doneIds, setDoneIds] = useState<Id[]>([]);
  const [removedIds, setRemovedIds] = useState<Id[]>([]);

  const todayItems = useMemo(
    () => prepareItems(addToPlan ?? [], sortBy, removedIds),
    [addToPlan, sortBy, removedIds],
  );
  const savedItems = useMemo(
    () => prepareItems(savedPlan ?? [], sortBy, removedIds),
    [savedPlan, sortBy, removedIds],
  );

  const activeItems = activeTab === "today" ? todayItems : savedItems;

  const totalMinutes = activeItems.reduce(
    (sum, i) => sum + toNumber(i.duration),
    0,
  );
  const totalCalories = activeItems.reduce(
    (sum, i) => sum + toNumber(i.caloriesBurned),
    0,
  );

  const doneCount = todayItems.filter((i) => doneIds.includes(i.id)).length;
  const progress =
    todayItems.length > 0
      ? Math.round((doneCount / todayItems.length) * 100)
      : 0;

  const toggleDone = (id: Id) =>
    setDoneIds((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  const removeItem = (id: Id) =>
    setRemovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));

  const stats = [
    { label: "Exercises", value: activeItems.length, accent: true },
    { label: "Minutes", value: totalMinutes, accent: false },
    { label: "Calories (kcal)", value: totalCalories, accent: false },
  ];

  const renderEmpty = (tab: TabKey) => (
    <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-[#2A2F3A] bg-[#0F1116] px-6 py-12 text-center">
      <p className="text-sm font-semibold text-white">
        {tab === "today"
          ? "No exercises in today's plan"
          : "No saved exercises yet"}
      </p>
      <p className="max-w-xs text-xs leading-relaxed text-[#9CA3AF]">
        {tab === "today"
          ? "Add exercises to build a plan for today."
          : "Save exercises to find them here later."}
      </p>
      <Link
        href={BROWSE_HREF}
        className={`mt-1 rounded-full bg-[#C2F800] px-4 py-2 text-xs font-bold text-black transition-opacity hover:opacity-90 ${FOCUS}`}
      >
        Browse exercises
      </Link>
    </div>
  );

  const renderList = (items: PlanItem[], tab: TabKey) => {
    if (items.length === 0) return renderEmpty(tab);

    const showDone = tab === "today";

    return (
      <ul className="flex flex-col gap-3">
        {items.map((item) => {
          const isDone = showDone && doneIds.includes(item.id);

          return (
            <li
              key={item.id}
              className={`flex flex-col gap-3 rounded-xl border p-3 transition-colors sm:flex-row sm:items-center sm:gap-4 ${
                isDone
                  ? "border-[#C2F800]/30 bg-[#C2F800]/5"
                  : "border-[#1B1F28] bg-[#0F1116] hover:border-[#2A2F3A]"
              }`}
            >
              <div className="flex min-w-0 flex-1 items-center gap-3">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={112}
                  height={64}
                  className={`h-16 w-28 shrink-0 rounded-lg object-cover ${
                    isDone ? "opacity-60" : ""
                  }`}
                />

                <div className="min-w-0 flex-1">
                  <h3
                    className={`truncate text-sm font-bold text-white ${
                      isDone ? "line-through opacity-60" : ""
                    }`}
                  >
                    {item.name}
                  </h3>
                  <p className="truncate text-xs text-[#9CA3AF]">
                    {item.equipment}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-[#9CA3AF]">
                    <span aria-label={`${item.duration} minutes`}>
                      🕒 {item.duration} min
                    </span>
                    <span aria-label={`${item.caloriesBurned} kilocalories`}>
                      🔥 {item.caloriesBurned} kcal
                    </span>
                    <span aria-label={`Rating ${item.rating}`}>
                      ⭐ {item.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 sm:ml-auto">
                <Link
                  href={`/workdetails/${item.id}`}
                  className={`rounded-full border border-[#2A2F3A] px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#15171D] ${FOCUS}`}
                >
                  View details
                </Link>

                {showDone && (
                  <button
                    type="button"
                    aria-pressed={isDone}
                    onClick={() => toggleDone(item.id)}
                    className={`rounded-full px-3.5 py-2 text-xs font-bold transition-opacity hover:opacity-90 ${FOCUS} ${
                      isDone
                        ? "border border-[#C2F800] bg-transparent text-[#C2F800]"
                        : "bg-[#C2F800] text-black"
                    }`}
                  >
                    {isDone ? "✓ Done" : "Mark as done"}
                  </button>
                )}

                <button
                  type="button"
                  aria-label={`Remove ${item.name}`}
                  title="Remove"
                  onClick={() => removeItem(item.id)}
                  className={`ml-auto flex h-9 w-9 items-center justify-center rounded-full text-[#9CA3AF] transition-colors hover:bg-[#15171D] hover:text-white sm:ml-0 ${FOCUS}`}
                >
                  ✕
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  const tabClass = `flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-bold text-[#9299A8] outline-none transition-all data-[selected=true]:bg-[#C2F800] data-[selected=true]:text-black data-[selected=true]:shadow-none ${FOCUS}`;

  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 py-6">
      {/* Stats */}
      <div className="rounded-xl border border-[#1B1F28] bg-[#0F1116]">
        <div className="grid grid-cols-3 divide-x divide-[#1B1F28] px-2 py-6 sm:px-6 sm:py-8">
          {stats.map((stat) => (
            <div key={stat.label} className="px-3 sm:px-6">
              <p className="text-xs text-[#9CA3AF]">{stat.label}</p>
              <p
                className={`mt-1 text-3xl font-bold tabular-nums sm:text-4xl ${
                  stat.accent ? "text-[#C2F800]" : "text-white"
                }`}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {activeTab === "today" && todayItems.length > 0 && (
          <div className="flex items-center gap-3 border-t border-[#1B1F28] px-4 py-3 sm:px-6">
            <div
              role="progressbar"
              aria-label="Exercises completed today"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#1B1F28]"
            >
              <div
                className="h-full rounded-full bg-[#C2F800] transition-[width] duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="shrink-0 text-xs text-[#9CA3AF]">
              {doneCount} of {todayItems.length} done
            </p>
          </div>
        )}
      </div>

      <Tabs
        className="w-full"
        selectedKey={activeTab}
        onSelectionChange={(key) => setActiveTab(String(key) as TabKey)}
      >
        <div className="flex flex-col gap-4 border-b border-[#222630] pb-4 sm:flex-row sm:items-center sm:justify-between">
          <Tabs.ListContainer className="w-fit max-w-full overflow-x-auto rounded-xl border border-[#222630] bg-[#151921] p-1 shadow-none">
            <Tabs.List
              aria-label="Plan options"
              className="flex items-center gap-1"
            >
              <Tabs.Tab id="today" className={tabClass}>
                {`Today's plan`}
                <span className="text-[11px] opacity-70">
                  {todayItems.length}
                </span>
                <Tabs.Indicator className="hidden" />
              </Tabs.Tab>

              <Tabs.Tab id="saved" className={tabClass}>
                Saved
                <span className="text-[11px] opacity-70">
                  {savedItems.length}
                </span>
                <Tabs.Indicator className="hidden" />
              </Tabs.Tab>
            </Tabs.List>
          </Tabs.ListContainer>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            {removedIds.length > 0 && (
              <button
                type="button"
                onClick={() => setRemovedIds([])}
                className={`rounded-full px-3 py-2 text-xs font-semibold text-[#C2F800] transition-colors hover:bg-[#15171D] ${FOCUS}`}
              >
                Restore removed ({removedIds.length})
              </button>
            )}

            <div className="flex items-center gap-2">
              <label htmlFor="sortBy" className="text-xs text-[#9CA3AF]">
                Sort by
              </label>
              <select
                id="sortBy"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className={`rounded-lg border border-[#222630] bg-[#151921] px-3 py-2 text-xs font-semibold text-white ${FOCUS}`}
              >
                {SORT_OPTIONS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <Tabs.Panel id="today" className="pt-6">
          {renderList(todayItems, "today")}
        </Tabs.Panel>

        <Tabs.Panel id="saved" className="pt-6">
          {renderList(savedItems, "saved")}
        </Tabs.Panel>
      </Tabs>
    </section>
  );
};

export default MyPlanCard;
