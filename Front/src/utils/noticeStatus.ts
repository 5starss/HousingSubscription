// Front/src/utils/noticeStatus.ts

export type ComputedNoticeStatus =
  | "UPCOMING"        // 청약 예정
  | "RECRUITING"      // 청약 접수중
  | "DEADLINE_SOON"   // 마감 임박
  | "CLOSED";         // 청약 마감

export function computeNoticeStatus(
  startDate: string | null,
  endDate: string | null,
  today: Date = new Date()
): ComputedNoticeStatus | null {
  if (!startDate || !endDate) return null;

  const start = new Date(startDate);
  const end = new Date(endDate);

  if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
    return null;
  }

  const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
  const s = new Date(start.getFullYear(), start.getMonth(), start.getDate());
  const e = new Date(end.getFullYear(), end.getMonth(), end.getDate());

  if (t < s) return "UPCOMING";
  if (t > e) return "CLOSED";

  const diffDays = Math.floor(
    (e.getTime() - t.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 3) return "DEADLINE_SOON";
  return "RECRUITING";
}
