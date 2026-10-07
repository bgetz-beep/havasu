import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ExternalLink } from "../ExternalLink";

describe("ExternalLink", () => {
  it("renders children with trailing arrow glyph", () => {
    render(<ExternalLink href="https://example.com">Buy Tickets</ExternalLink>);
    expect(screen.getByRole("link")).toHaveTextContent("Buy Tickets ↗");
  });

  it("opens in new tab with noopener", () => {
    render(<ExternalLink href="https://example.com">Visit</ExternalLink>);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", expect.stringContaining("noopener"));
  });
});
