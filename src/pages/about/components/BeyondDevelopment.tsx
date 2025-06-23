// Example color palette (rose/white shades)
import { MaxWidths } from "../../../theme/constants";

const colors = [
  "#FFF6F4", // lightest rose
  "#F6EBE9", // lighter rose
  "#F2D6D0", // light rose
  "#E4B4AB", // medium rose
  "#CF8B7F", // main rose (darkest)
  "rgba(207,139,127,0.15)", // rose with opacity
  "#F8E3DE", // extra light rose
  "#F9F6F5", // almost white
];

const funFacts = [
  "I have a beautiful cat named Oreo.",
  "My favorite snack is popcorn.",
  "I love spending time with my extended family.",
  "Astronomy and the night sky are my deepest passion.",
  "I love painting with watercolor to relax.",
  "I probably have more than 500 different markers.",
  "I love history novels and horror movies.",
];

const containerData = [
  { text: funFacts[0], style: { gridRow: "1 / 2", gridColumn: "1 / 2", background: colors[0] } },
  { text: funFacts[1], style: { gridRow: "1 / 3", gridColumn: "2 / 3", background: colors[1], alignItems: "flex-start", justifyContent: "flex-start" }, type: "long-vertical" },
  { text: funFacts[2], style: { gridRow: "1 / 2", gridColumn: "3 / 4", background: colors[2] } },
  { style: { gridRow: "1 / 2", gridColumn: "4 / 5", backgroundImage: "url('https://picsum.photos/302')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } },
  { text: funFacts[4], style: { gridRow: "2 / 4", gridColumn: "1 / 2", background: colors[4], color: "#fff" } },
  { text: funFacts[5], style: { gridRow: "2 / 4", gridColumn: "3 / 5", background: colors[5], alignItems: "flex-start", justifyContent: "flex-start" }, type: "long-vertical" },
  { style: { gridRow: "3 / 4", gridColumn: "2 / 3", backgroundImage: "url('https://picsum.photos/200')", backgroundSize: "cover", backgroundPosition: "center", backgroundRepeat: "no-repeat" } },
];

export const BeyondDevelopment = () => {
  return (
    <section style={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", marginBottom: 64, marginTop: 64 }}>
      <div style={{ maxWidth: MaxWidths.component, width: "100%", margin: "0 auto" }}>
        <h2 style={{
          fontSize: "2.7rem",
          color: "#CF8B7F",
          fontWeight: 700,
          marginBottom: 32,
          textAlign: "center",
          lineHeight: 1.1,
          fontFamily: "Golos Text, sans-serif",
        }}>Fun facts about me</h2>
        <div className="beyond-development-grid" style={{ gridTemplateRows: 'repeat(3, 1fr)' }}>
          {containerData.map((item, idx) => {
            return (
              <div
                key={idx}
                className={
                  item.type === "long-horizontal"
                    ? "beyond-development-cell long-horizontal"
                    : item.type === "long-vertical"
                    ? "beyond-development-cell long-vertical"
                    : "beyond-development-cell"
                }
                style={{ ...item.style }}
              >
                <div
                  className={
                    item.type === "long-horizontal" || item.type === "long-vertical"
                      ? "bdc-text"
                      : undefined
                  }
                  style={{ color: item.style.color || undefined }}
                >
                  {item.text}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}; 