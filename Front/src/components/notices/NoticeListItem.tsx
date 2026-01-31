// Front\src\components\notices\NoticeListItem.tsx => 카드(개별) UI
import { useMemo } from "react";
import type { Notice } from "../../pages/NoticesPage";
import { categoryLabel, statusLabel } from "../../utils/noticeFormat";

type Props = {
  notice: Notice;
  isFavorite: boolean;
  isPending: boolean;
  onOpen: (id: number) => void;
  onToggleFavorite: (id: number) => void;
};

function formatDateRange(start: string | null, end: string | null) {
  const s = start ?? "-";
  const e = end ?? "-";
  return `${s} - ${e}`;
}

function calcDDay(endDate: string | null) {
  if (!endDate) return null;
  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return null;

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diffMs = startOfEnd.getTime() - startOfToday.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return `D-${diffDays}`;
  if (diffDays === 0) return "D-DAY";
  return null;
}

function getDDayInfo(endDate: string | null) {
  if (!endDate) return { text: null as string | null, daysLeft: null as number | null };

  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return { text: null, daysLeft: null };

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  const diffMs = startOfEnd.getTime() - startOfToday.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays > 0) return { text: `D-${diffDays}`, daysLeft: diffDays };
  if (diffDays === 0) return { text: "D-DAY", daysLeft: 0 };
  return { text: null, daysLeft: diffDays };
}

function ddayTone(daysLeft: number | null) {
  if (daysLeft === null) return "text-gray-400";
  if (daysLeft <= 3) return "text-red-500";
  if (daysLeft <= 10) return "text-primary";
  return "text-gray-400";
}

function rightTone() {
  return "text-primary";
}

function isNew(regDate: string | null, days = 7) {
  if (!regDate) return false;

  const reg = new Date(regDate);
  if (Number.isNaN(reg.getTime())) return false;

  const now = new Date();
  const diffMs = now.getTime() - reg.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  return diffDays <= days;
}

function isClosedNotice(n: Notice) {
  if (n.endDate) {
    const end = new Date(n.endDate);
    if (!Number.isNaN(end.getTime())) {
      const now = new Date();
      const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const startOfEnd = new Date(end.getFullYear(), end.getMonth(), end.getDate());

      if (startOfEnd.getTime() >= startOfToday.getTime()) return false;
      return true;
    }
  }

  const label = statusLabel(n.status);
  const normalized = String(label).replace(/\s+/g, "");
  return normalized.includes("마감") || normalized.includes("종료");
}

export default function NoticeListItem({
  notice: n,
  isFavorite,
  isPending,
  onOpen,
  onToggleFavorite,
}: Props) {
  const statusText = useMemo(() => String(statusLabel(n.status)), [n.status]);
  const dday = useMemo(() => calcDDay(n.endDate), [n.endDate]);
  const rightText = dday ?? statusLabel(n.status);

  const { text: ddayText, daysLeft } = useMemo(() => getDDayInfo(n.endDate), [n.endDate]);

  const isClosed = useMemo(() => isClosedNotice(n), [n]);

  const rightTextClass = isClosed ? "text-gray-400" : ddayText ? ddayTone(daysLeft) : rightTone();

  const normalizedStatus = statusText.replace(/\s+/g, "");
  const badgeText =
    normalizedStatus === "접수중"
      ? "접수중"
      : normalizedStatus === "마감임박" || n.status === "DEADLINE_APPROACHING"
      ? "마감임박"
      : null;

  return (
    <article
      onClick={() => onOpen(n.id)}
      className="group relative flex flex-col md:flex-row items-stretch md:items-center gap-6 rounded-[20px] bg-white p-6 shadow-[0_2px_8px_rgba(0,0,0,0.04)] border border-[#F2F4F6] hover:border-gray-300 hover:shadow-md transition-all duration-200"
    >
      <div className="shrink-0 w-full md:w-32 flex flex-col justify-center items-center rounded-2xl bg-[#F3F4F6] py-3 px-2 text-center">
        <span className="text-xs text-[#7D8592] mb-1">주택유형</span>
        <span className="text-[15px] font-bold text-[#191F28] break-keep leading-tight">
          {categoryLabel(n.category)}
        </span>
      </div>

      <div className="flex-1 min-w-0 py-1">
        <div className="flex items-center gap-2 mb-2">
          {isNew(n.regDate) && (
            <span className="inline-flex shrink-0 items-center justify-center rounded px-[6px] py-[2px] text-[10px] font-bold text-primary">
              NEW
            </span>
          )}
          <h4 className="truncate text-lg md:text-[15px] font-bold text-[#191F28] tracking-tight">
            {n.title}
          </h4>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#8B95A1] font-medium">
          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#9CA3AF]">
              calendar_today
            </span>
            <span className="tracking-tight">{formatDateRange(n.startDate, n.endDate)}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[17px] text-[#9CA3AF]">
              location_on
            </span>
            <span>서울특별시 전역</span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between md:justify-end gap-6 md:pl-2">
        <div className="flex flex-col items-center justify-center text-center min-w-[72px]">
          {badgeText && (
            <span
              className={[
                "mb-1.5 inline-flex shrink-0 items-center justify-center rounded-md px-2 py-1 text-[11px] font-bold leading-none tracking-tight",
                badgeText === "접수중"
                  ? "bg-emerald-50 text-emerald-600 ring-1 ring-inset ring-emerald-600/20"
                  : "bg-rose-50 text-rose-600 ring-1 ring-inset ring-rose-600/20",
              ].join(" ")}
            >
              {badgeText}
            </span>
          )}

          <div className={`text-l font-bold tracking-tight whitespace-nowrap ${rightTextClass}`}>
            {rightText}
          </div>
        </div>

        <button
          type="button"
          className={[
            "p-1 rounded-full transition-colors disabled:opacity-60",
            "hover:bg-gray-50",
            isFavorite ? "text-red-500 hover:text-red-600" : "text-gray-400 hover:text-red-400",
          ].join(" ")}
          aria-label={isFavorite ? "찜 해제" : "찜"}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(n.id);
          }}
          disabled={isPending}
        >
          ❤
        </button>
      </div>
    </article>
  );
}
