export const MessageType = {
  FETCH_TEXTS: "fetch-texts",
  SHOW_TEXTS: "show-texts",
  APPLY_TEXT: "apply-text",
  CLOSE_PLUGIN: "close-plugin",
} as const;

export interface TextOption {
  key: string;
  language: {
    ko: string;
    en: string;
  };
}

export const options: TextOption[] = [
  {
    key: "title",
    language: {
      ko: "제목",
      en: "Title",
    },
  },
  {
    key: "description",
    language: {
      ko: "설명",
      en: "Description",
    },
  },
  {
    key: "button",
    language: {
      ko: "버튼",
      en: "Button",
    },
  },
  {
    key: "placeholder",
    language: {
      ko: "플레이스홀더",
      en: "Placeholder",
    },
  },
  {
    key: "error",
    language: {
      ko: "에러",
      en: "Error",
    },
  },
  {
    key: "success",
    language: {
      ko: "성공",
      en: "Success",
    },
  },
];
