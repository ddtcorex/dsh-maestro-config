/**
 * Maestro Settings — DSH-native redesign.
 * Reuses DeepSeek Harness design tokens & primitive geometry maximally:
 *  - --dsw-alias-* color family (no hard-coded hex except QR tile #fff)
 *  - Button variants primary/ghost/outline (h36 capsule / h28 small) — same as @deepseek-ai/dsh-client-ui-primitives/Button
 *  - Input atom (h32, radius 8, bg-layer-1, focus border brand) — same as primitives/Input
 *  - DisclosureRow (24px row, 14px glyph, chevron hover) — same as primitives/DisclosureRow
 *  - Panel chroma: inner cards use bg-layer-2 / border-l2 / radius 12 / shadow lv3 where needed
 */
export declare function MaestroSettingsTab({ rpcCall, configRpcCall, guardRpcCall }: {
    rpcCall: any;
    configRpcCall?: any;
    guardRpcCall?: any;
}): import("react").DetailedReactHTMLElement<{
    'data-maestro-settings-card': string;
    style: {
        display: "flex";
        flexDirection: "column";
        gap: number;
        width: string;
        maxWidth: number;
        minWidth: number;
        boxSizing: any;
    };
}, HTMLElement>;
//# sourceMappingURL=MaestroSettings.d.ts.map