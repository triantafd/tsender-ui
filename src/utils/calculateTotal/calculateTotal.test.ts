import { describe, it, expect } from "vitest"
import { calculateTotal, calculateTotalAsNumber } from "./calculateTotal"

describe("calculateTotal", () => {
    // Tests for the new BigInt version
    it("sums valid numbers with BigInt", () => {
        expect(calculateTotal("100,200,300")).toBe(BigInt(600))
    })

    it("handles whitespace with BigInt", () => {
        expect(calculateTotal("100, 200, 300")).toBe(BigInt(600))
    })

    it("handles empty string with BigInt", () => {
        expect(calculateTotal("")).toBe(BigInt(0))
    })

    it("handles invalid inputs with BigInt", () => {
        expect(calculateTotal("100,abc,300")).toBe(BigInt(400))
    })

    it("handles trailing comma with BigInt", () => {
        expect(calculateTotal("100,200,")).toBe(BigInt(300))
    })

    // Tests for the backward-compatible number version
    it("sums valid numbers", () => {
        expect(calculateTotalAsNumber("100,200,300")).toBe(600)
    })

    it("handles whitespace", () => {
        expect(calculateTotalAsNumber("100, 200, 300")).toBe(600)
    })

    it("handles empty string", () => {
        expect(calculateTotalAsNumber("")).toBe(0)
    })

    it("handles invalid inputs", () => {
        expect(calculateTotalAsNumber("100,abc,300")).toBe(400)
    })

    it("handles trailing comma", () => {
        expect(calculateTotalAsNumber("100,200,")).toBe(300)
    })
})