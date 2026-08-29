/**
 * Mark this plugin's row in the DSH settings navigation so a style block can
 * replace the shell's fallback gear with the maestro glyph.
 *
 * DSH 0.1.x projects only `id`, `order`, and `label` from a `settings.section`
 * registration and picks icons from a closed built-in list, so each external
 * plugin identifies its own localized row by visible text after the dialog
 * mounts. The marker owns no shell structure and is removed on disposal.
 */
export declare const SETTINGS_NAV_MARKER = "data-maestro-settings-nav";
/** Minimal DOM surface used here; tests inject a stub instead of `document`. */
/** The two DOM iteration shapes this module touches (querySelector results). */
type NodeSeq = Iterable<Element> & {
    forEach(fn: (el: Element) => void): unknown;
};
interface DomScope {
    querySelectorAll(selector: string): NodeSeq;
}
export declare function registerSettingsNavIcon(label: () => string, root?: DomScope): () => void;
export {};
//# sourceMappingURL=settings-nav-icon.d.ts.map