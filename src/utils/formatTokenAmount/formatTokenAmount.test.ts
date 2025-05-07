import { describe, it, expect } from "vitest"
import { formatTokenAmount } from "./formatTokenAmount"

describe("formatTokenAmount", () => {
    it("formats whole numbers correctly", () => {
        expect(formatTokenAmount(BigInt("1000000000000000000"), 18)).toBe("1.00")
    })

    it("handles different decimal places", () => {
        expect(formatTokenAmount(BigInt("1234000000"), 6)).toBe("1,234.00")
    })

    it("handles small numbers", () => {
        expect(formatTokenAmount(BigInt("100"), 18)).toBe("0.00")
    })

    it("handles zero", () => {
        expect(formatTokenAmount(BigInt("0"), 18)).toBe("0.00")
    })

    it("handles large numbers with commas", () => {
        expect(formatTokenAmount(BigInt("1234000000000000000000"), 18)).toBe("1,234.00")
    })

    it("respects decimal precision", () => {
        // For a 6 decimal token like USDC
        expect(formatTokenAmount(BigInt("1234567"), 6)).toBe("1.23")
    })

    // Additional tests for the enhanced functionality
    it("handles custom display decimals", () => {
        expect(formatTokenAmount(BigInt("1234567890123456789"), 18, 4)).toBe("1.2346")
    })

    it("handles very small numbers with custom decimals", () => {
        expect(formatTokenAmount(BigInt("1"), 18, 6)).toBe("0.000000")
    })

    it("handles numbers just below 1", () => {
        expect(formatTokenAmount(BigInt("999999999999999999"), 18)).toBe("1.00")
    })
})