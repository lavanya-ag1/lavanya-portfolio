import { useEffect, useState } from "react";

export default function Typewriter({ words = [] }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
    const word = words[i % words.length];
    const delay = deleting ? 45 : text === word ? 1800 : 85;

    const t = setTimeout(() => {
      if (!deleting && text === word) {
        return setDeleting(true);
      }
      if (deleting && text === "") {
        setDeleting(false);
        return setI((prev) => prev + 1);
      }
      setText(word.slice(0, text.length + (deleting ? -1 : 1)));
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, i, words]);

  return (
    <span className="typewriter-container">
      <span className="typewriter-text">{text}</span>
      <span className="typewriter-cursor" aria-hidden="true" />
    </span>
  );
}
