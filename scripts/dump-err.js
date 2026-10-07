const fs = require("fs");
const h = fs.readFileSync("./scripts/err.html", "utf8");
const m = h.match(/__NEXT_DATA__[^>]*>(.+?)<\/script>/s);
if (m) {
  const data = JSON.parse(m[1]);
  console.log("statusCode:", data.props?.pageProps?.statusCode);
  console.log("message:", (data.err?.message || "").slice(0, 1200));
}
