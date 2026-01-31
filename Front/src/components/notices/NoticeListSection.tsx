// Front\src\components\notices\NoticeListSection.tsx => 컨테이너(정렬/드롭다운/찜 상태/정렬된 배열 생성)
import { useEffect, useMemo, useRef, useState } from "react";
import { AxiosError } from "axios";
import type { Notice } from "../../pages/NoticesPage";
import { statusLabel } from "../../utils/noticeFormat";
import { useNavigate } from "react-router-dom";
import {
  addFavoriteNotice,
  getFavoriteNotices,
  removeFavoriteNotice,
} from "../../api/NoticeApi";
import NoticeList from "./NoticeList";

type SortType = "REG_DATE" | "END_DATE";

type Props = {
  totalCount: number;
  items: Notice[];
  loading: boolean;
  errorMessage: string | null;
  onChangedFavorites?: () => void;
  favoritesVersion?: number;
};

type ApiErrorResponse = {
  code?: string;
  message?: string;
};

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

function dateToMs(dateStr: string | null, fallback: string) {
  return new Date(dateStr ?? fallback).getTime();
}

export default function NoticeListSection({ totalCount, items, loading, onChangedFavorites }: Props) {
  const navigate = useNavigate();

  const [sortType, setSortType] = useState<SortType>("REG_DATE");
  const [open, setOpen] = useState(false);

  const [favoriteMap, setFavoriteMap] = useState<Record<number, boolean>>({});
  const [favoritePending, setFavoritePending] = useState<Record<number, boolean>>({});

  useEffect(() => {
    let ignore = false;

    (async () => {
      try {
        const list = await getFavoriteNotices();
        if (ignore) return;

        const next: Record<number, boolean> = {};
        for (const fav of list) {
          if (typeof fav?.id === "number") next[fav.id] = true;
        }
        setFavoriteMap(next);
      } catch (err) {
        const ax = err as AxiosError<ApiErrorResponse>;
        const status = ax.response?.status;
        if (status === 401 || status === 403) {
          setFavoriteMap({});
          return;
        }
      }
    })();

    return () => {
      ignore = true;
    };
  }, []);

  const toggleFavorite = async (noticeId: number) => {
    if (favoritePending[noticeId]) return;

    const currently = Boolean(favoriteMap[noticeId]);

    setFavoritePending((prev) => ({ ...prev, [noticeId]: true }));
    setFavoriteMap((prev) => ({ ...prev, [noticeId]: !currently }));

    try {
      const data = currently ? await removeFavoriteNotice(noticeId) : await addFavoriteNotice(noticeId);

      setFavoriteMap((prev) => ({
        ...prev,
        [data.noticeId]: data.isFavorite,
      }));

      onChangedFavorites?.();
    } catch (err) {
      setFavoriteMap((prev) => ({ ...prev, [noticeId]: currently }));

      const ax = err as AxiosError<ApiErrorResponse>;
      const status = ax.response?.status;
      const msg = ax.response?.data?.message ?? "요청 처리 중 오류가 발생했습니다.";

      if (status === 401 || status === 403) {
        alert("로그인이 필요합니다.");
        return;
      }
      if (status === 409) {
        alert(msg);
        setFavoriteMap((prev) => ({ ...prev, [noticeId]: true }));
        return;
      }
      alert(msg);
    } finally {
      setFavoritePending((prev) => ({ ...prev, [noticeId]: false }));
    }
  };

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const el = dropdownRef.current;
      if (!el) return;
      if (e.target instanceof Node && !el.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  const sortedItems = useMemo(() => {
    const copied = [...items];

    return copied.sort((a, b) => {
      if (sortType === "REG_DATE") {
        return dateToMs(b.regDate, "1970-01-01") - dateToMs(a.regDate, "1970-01-01");
      }

      const aClosed = isClosedNotice(a);
      const bClosed = isClosedNotice(b);
      if (aClosed !== bClosed) return aClosed ? 1 : -1;

      const endDiff = dateToMs(a.endDate, "9999-12-31") - dateToMs(b.endDate, "9999-12-31");
      if (endDiff !== 0) return endDiff;

      return dateToMs(b.regDate, "1970-01-01") - dateToMs(a.regDate, "1970-01-01");
    });
  }, [items, sortType]);

  return (
    <section className="space-y-6">
      <div className="flex items-end justify-between px-1">
        <h3 className="text-xl font-bold text-gray-900 leading-none">
          전체 공고 리스트 <span className="text-gray-900">({totalCount})</span>
        </h3>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setOpen((prev) => !prev)}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="정렬"
          >
            {sortType === "REG_DATE" ? "최신 등록순" : "마감 임박순"}
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            >
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-36 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-10">
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => {
                  setSortType("REG_DATE");
                  setOpen(false);
                }}
              >
                최신 등록순
              </button>
              <button
                type="button"
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                onClick={() => {
                  setSortType("END_DATE");
                  setOpen(false);
                }}
              >
                마감 임박순
              </button>
            </div>
          )}
        </div>
      </div>

      <NoticeList
        loading={loading}
        items={sortedItems}
        isFavorite={(id) => Boolean(favoriteMap[id])}
        isPending={(id) => Boolean(favoritePending[id])}
        onOpen={(id) => navigate(`/notices/${id}`)}
        onToggleFavorite={toggleFavorite}
      />
    </section>
  );
}
