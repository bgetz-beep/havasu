import { ImageResponse } from "next/og";

export const alt = "Havasu Stampede · PRCA Rodeo · March 19-21, 2027";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#F2EBD9",
          color: "#1A1A1A",
          padding: "72px 80px",
        }}
      >
        <div
          style={{
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#1A1A1A",
          }}
        >
          PRCA Rodeo · Lake Havasu City, AZ
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 180,
            fontWeight: 900,
            lineHeight: 0.9,
            textTransform: "uppercase",
            letterSpacing: 2,
            color: "#1A1A1A",
          }}
        >
          <span>HAVASU</span>
          <span>STAMPEDE</span>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
          }}
        >
          <div
            style={{
              background: "#D4421A",
              color: "#F2EBD9",
              padding: "16px 28px",
              fontSize: 44,
              fontWeight: 900,
              letterSpacing: 2,
              textTransform: "uppercase",
            }}
          >
            March 19-21, 2027
          </div>
          <div
            style={{
              fontSize: 24,
              textTransform: "uppercase",
              letterSpacing: 4,
              color: "#0F6E6E",
            }}
          >
            havasustampede.com
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
