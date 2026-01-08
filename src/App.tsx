import { useEffect, useState } from 'react'
import './App.css'
import { MessageType, options as defaultOptions, type TextOption } from './figma'

type Language = 'ko' | 'en'

function App() {
  const [options, setOptions] = useState<TextOption[]>(defaultOptions)
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('ko')
  const [selectedKey, setSelectedKey] = useState<string | null>(null)

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === MessageType.FETCH_TEXTS) {
        parent.postMessage({ pluginMessage: { type: MessageType.SHOW_TEXTS, options } }, "*");
      }
      if (event.data.type === MessageType.SHOW_TEXTS) {
        setOptions(event.data.options)
      }
    }
    window.addEventListener('message', handleMessage)
    return () => {
      window.removeEventListener('message', handleMessage)
    }
  }, [options])

  const handleKeySelect = (key: string) => {
    setSelectedKey(key === selectedKey ? null : key)
    parent.postMessage({ pluginMessage: { type: MessageType.APPLY_TEXT, text: options.find(o => o.key === key)?.language[selectedLanguage] } }, "*");
  }

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language)
    if (selectedKey) {
      parent.postMessage({ pluginMessage: { type: MessageType.APPLY_TEXT, text: options.find(o => o.key === selectedKey)?.language[language] } }, "*");
    }
  }

  return (
    <div className="app-container">
      <div className="language-selector">
        <label>언어 선택:</label>
        <div className="radio-group">
          <label>
            <input
              type="radio"
              value="ko"
              checked={selectedLanguage === 'ko'}
              onChange={(e) => handleLanguageSelect(e.target.value as Language)}
            />
            한국어 (KO)
          </label>
          <label>
            <input
              type="radio"
              value="en"
              checked={selectedLanguage === 'en'}
              onChange={(e) => handleLanguageSelect(e.target.value as Language)}
            />
            English (EN)
          </label>
        </div>
      </div>

      <div className="options-list">
        <h3>텍스트 옵션</h3>
        <table className="options-table">
          <thead>
            <tr>
              <th>Key</th>
              <th>KO Value</th>
              <th>EN Value</th>
            </tr>
          </thead>
          <tbody>
            {options.map((option) => (
              <tr
                key={option.key}
                className={selectedKey === option.key ? 'selected' : ''}
                onClick={() => handleKeySelect(option.key)}
              >
                <td className="option-key">{option.key}</td>
                <td className="option-text">{option.language.ko}</td>
                <td className="option-text">{option.language.en}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedKey && (
        <div className="selected-info">
          <p>선택된 항목: <strong>{selectedKey}</strong></p>
          <p>텍스트: <strong>{options.find(o => o.key === selectedKey)?.language[selectedLanguage]}</strong></p>
        </div>
      )}
    </div>
  )
}

export default App
