// Front/src/components/home/NoticeCarousel.tsx
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { getNoticeList } from "../../api/NoticeApi";
import type { Notice } from "../../pages/NoticesPage";
import CategoryBadge from "../common/CategoryBadge";

function formatPeriod(start: string | null, end: string | null) {
  const s = start ?? "-";
  const e = end ?? "-";
  return `${s} ~ ${e}`;
}

function getDDayInfo(endDate: string | null) {
  if (!endDate) return null;

  const end = new Date(endDate);
  if (Number.isNaN(end.getTime())) return null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const diffDays = Math.floor(
    (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return null;
  if (diffDays === 0) return { text: "D-DAY", daysLeft: 0 };
  return { text: `D-${diffDays}`, daysLeft: diffDays };
}

function DDayText({ endDate }: { endDate: string | null }) {
  const info = getDDayInfo(endDate);
  if (!info) return null;

  let tone = "text-gray-500";

  if (info.daysLeft <= 3) {
    tone = "text-red-600";
  } else if (info.daysLeft <= 7) {
    tone = "text-primary";
  }

  return <span className={`text-xs font-bold ${tone}`}>{info.text}</span>;
}

function SkeletonCard() {
  return (
    <div className="glass p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <div className="h-6 w-24 rounded-full bg-gray-100 animate-pulse" />
        <div className="h-4 w-12 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="h-6 w-4/5 rounded bg-gray-100 animate-pulse mb-3" />
      <div className="h-6 w-3/5 rounded bg-gray-100 animate-pulse mb-6" />
      <div className="flex items-center gap-2 mb-6">
        <div className="h-5 w-5 rounded bg-gray-100 animate-pulse" />
        <div className="h-4 w-40 rounded bg-gray-100 animate-pulse" />
      </div>
      <div className="h-12 w-full rounded-xl bg-gray-100 animate-pulse" />
    </div>
  );
}

function useColumnsByBreakpoint() {
  const calc = () => {
    const w = window.innerWidth;

    // Tailwind 기본 브레이크포인트:
    // sm: 640, md: 768, lg: 1024, xl: 1280
    if (w >= 1280) return 4;
    if (w >= 1024) return 3;
    if (w >= 768) return 2;
    return 1;
  };

  // 초기값은 여기서 계산 (effect 안에서 setState 금지)
  const [cols, setCols] = useState<number>(() => calc());

  useEffect(() => {
    const onResize = () => {
      setCols(calc());
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return cols;
}

export default function NoticeCarousel() {
  const navigate = useNavigate();

  const [items, setItems] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cols = useColumnsByBreakpoint();

  useEffect(() => {
    let ignore = false;

    const fetchList = async () => {
      try {
        setLoading(true);
        setErrorMessage(null);

        const list = await getNoticeList();
        if (ignore) return;

        setItems(list ?? []);
      } catch {
        if (ignore) return;
        setErrorMessage("공고를 불러오지 못했습니다.");
        setItems([]);
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchList();
    return () => {
      ignore = true;
    };
  }, []);

  const latest = useMemo(() => {
    // 1) 마감 공고 제외 (D-Day 계산이 null이면 마감/종료로 간주)
    const openOnly = items.filter((n) => getDDayInfo(n.endDate) !== null);

    // 2) 마감 임박순 정렬 (endDate가 가까운 순)
    const sorted = [...openOnly].sort((a, b) => {
      const aInfo = getDDayInfo(a.endDate);
      const bInfo = getDDayInfo(b.endDate);

      const aLeft = aInfo ? aInfo.daysLeft : Number.POSITIVE_INFINITY;
      const bLeft = bInfo ? bInfo.daysLeft : Number.POSITIVE_INFINITY;

      if (aLeft !== bLeft) return aLeft - bLeft;

      const aReg = a.regDate ? new Date(a.regDate).getTime() : 0;
      const bReg = b.regDate ? new Date(b.regDate).getTime() : 0;
      if (bReg !== aReg) return bReg - aReg;

      return (Number(b.id) || 0) - (Number(a.id) || 0);
    });

    // 3) 화면 크기(cols)에 맞게 "한 줄만" 보여주기
    return sorted.slice(0, cols);
  }, [items, cols]);

  const goDetail = (id: number) => {
    navigate(`/notices/${id}`);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between px-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">최근 주거 공고</h2>
          <p className="text-gray-500 dark:text-gray-400 font-medium">
            지금 신청 가능한 서울시 맞춤형 공고입니다.
          </p>
        </div>

        <Link
          to="/notices"
          className="cursor-pointer group text-primary font-bold flex items-center gap-1 transition-colors"
        >
          <span className="group-hover:underline">전체보기</span>
          <span className="material-symbols-outlined text-sm transform group-hover:translate-x-1 transition-transform">
            chevron_right
          </span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 px-2">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : errorMessage ? (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full px-2">
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-sm text-gray-500">{errorMessage}</p>
              <Link
                to="/notices"
                className="cursor-pointer inline-flex items-center gap-1 mt-4 text-primary font-bold"
              >
                공고 목록으로 이동
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>
        ) : latest.length === 0 ? (
          <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 w-full px-2">
            <div className="rounded-3xl border border-dashed border-gray-200 bg-gray-50 p-8 text-center">
              <p className="text-sm text-gray-500">
                지금 신청 가능한 공고가 없습니다.
              </p>
              <Link
                to="/notices"
                className="cursor-pointer inline-flex items-center gap-1 mt-4 text-primary font-bold"
              >
                전체 공고 보기
                <span className="material-symbols-outlined text-sm">
                  chevron_right
                </span>
              </Link>
            </div>
          </div>
        ) : (
          latest.map((item) => (
            <div
              key={item.id}
              className="glass p-6 rounded-3xl border border-gray-100 dark:border-white/10 shadow-sm hover:shadow-xl transition-all group flex flex-col"
            >
              <div className="flex justify-between items-start mb-4">
                <CategoryBadge category={item.category} size="sm" />
                <DDayText endDate={item.endDate} />
              </div>

              <div className="flex-1">
                <h3 className="text-lg font-bold mb-4 line-clamp-2">
                  {item.title}
                </h3>

                <div className="space-y-2 mb-6">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="material-symbols-outlined text-sm">
                      calendar_month
                    </span>
                    <span>{formatPeriod(item.startDate, item.endDate)}</span>
                  </div>
                </div>
              </div>

              <div className="mt-auto">
                <button
                  type="button"
                  onClick={() => goDetail(item.id)}
                  className="cursor-pointer w-full py-3 bg-gray-50 dark:bg-white/5 rounded-xl text-sm font-bold group-hover:bg-primary group-hover:text-white transition-all"
                >
                  공고 상세보기
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
