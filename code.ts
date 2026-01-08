/**
 * SANDBOX CODE
 */

const MessageType = {
  FETCH_TEXTS: "fetch-texts",
  SHOW_TEXTS: "show-texts",
  APPLY_TEXT: "apply-text",
  CLOSE_PLUGIN: "close-plugin",
} as const;

interface TextOption {
  key: string;
  language: {
    ko: string;
    en: string;
  };
}

const options: TextOption[] = [
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

figma.showUI(__html__, { width: 400, height: 700 });

figma.ui.onmessage = async (msg) => {
  // 이것은 실제론 api 통신 코드가 포함되어야 함
  if (msg.type === MessageType.FETCH_TEXTS) {
    figma.ui.postMessage({
      type: MessageType.SHOW_TEXTS,
      options,
    });
  }

  if (msg.type === MessageType.APPLY_TEXT) {
    const selectedText = msg.text;
    const selection = figma.currentPage.selection;

    if (selection.length === 0) {
      figma.notify("먼저 텍스트 레이어를 선택하세요.");
      return;
    }

    for (const node of selection) {
      if (node.type === "TEXT") {
        await figma.loadFontAsync(node.fontName as FontName);
        node.characters = selectedText;
      }
    }
  }
  if (msg.type === MessageType.CLOSE_PLUGIN) {
    figma.closePlugin();
  }
};
