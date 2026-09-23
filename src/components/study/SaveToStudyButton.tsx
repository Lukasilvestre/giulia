"use client";

import {
  useEffect,
  useState,
} from "react";

import type {
  NewStudyItem,
  StudyItem,
} from "@/types/study";

const STORAGE_KEY =
  "giulia.study.v1";

interface SaveToStudyButtonProps {
  item: NewStudyItem;

  compact?: boolean;
}

function readStudyItems():
  StudyItem[] {
  if (
    typeof window ===
    "undefined"
  ) {
    return [];
  }

  const raw =
    window.localStorage.getItem(
      STORAGE_KEY
    );

  if (!raw) {
    return [];
  }

  try {
    const parsed =
      JSON.parse(raw);

    return Array.isArray(parsed)
      ? parsed
      : [];
  } catch {
    return [];
  }
}

function writeStudyItems(
  items: StudyItem[]
) {
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(items)
  );

  window.dispatchEvent(
    new CustomEvent(
      "giulia-study-updated"
    )
  );
}

function itemKey(
  type: string,
  id: string
) {
  return `${type}:${id}`;
}

export default function SaveToStudyButton({
  item,
  compact = false,
}: SaveToStudyButtonProps) {
  const [
    saved,
    setSaved,
  ] =
    useState(false);

  useEffect(() => {
    const updateState = () => {
      const items =
        readStudyItems();

      const target =
        itemKey(
          item.type,
          item.id
        );

      setSaved(
        items.some(
          (
            current
          ) =>
            itemKey(
              current.type,
              current.id
            ) === target
        )
      );
    };

    updateState();

    window.addEventListener(
      "storage",
      updateState
    );

    window.addEventListener(
      "giulia-study-updated",
      updateState
    );

    return () => {
      window.removeEventListener(
        "storage",
        updateState
      );

      window.removeEventListener(
        "giulia-study-updated",
        updateState
      );
    };
  }, [
    item.id,
    item.type,
  ]);

  function toggleStudy() {
    const items =
      readStudyItems();

    const target =
      itemKey(
        item.type,
        item.id
      );

    const exists =
      items.some(
        (
          current
        ) =>
          itemKey(
            current.type,
            current.id
          ) === target
      );

    if (exists) {
      writeStudyItems(
        items.filter(
          (
            current
          ) =>
            itemKey(
              current.type,
              current.id
            ) !== target
        )
      );

      setSaved(false);

      return;
    }

    const newItem:
      StudyItem = {
        ...item,

        savedAt:
          new Date()
            .toISOString(),

        note: "",
      };

    writeStudyItems([
      newItem,
      ...items,
    ]);

    setSaved(true);
  }

  return (
    <button
      type="button"
      onClick={
        toggleStudy
      }
      className={[
        "study-save-button",

        compact
          ? "study-save-button-compact"
          : "",

        saved
          ? "saved"
          : "",
      ]
        .filter(
          Boolean
        )
        .join(" ")}
    >
      {saved
        ? "Salvo no Estudo ✓"
        : "Salvar no Estudo +"}
    </button>
  );
}