"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.apply = apply;
// Verbatim legacy-card port (fields/styles preserved; see maestro-card.tsx).
const maestro_card_jsx_1 = require("./maestro-card.jsx");
const api_js_1 = require("./api.js");
const settings_nav_icon_js_1 = require("./settings-nav-icon.js");
/**
 * DSH 0.1.x gives external settings sections a generic gear and exposes no
 * icon field in the settings.section contract (mirrors dsh-better-sidebar):
 * the marker only claims this plugin's localized row and this CSS paints the
 * Lucide "audio-lines" glyph as a currentColor mask so it follows native nav
 * hover/active colors at the shell's 16px icon rhythm.
 */
const SETTINGS_NAV_CSS = `

/* maestro: replace the settings-nav fallback gear with the maestro glyph */
[${settings_nav_icon_js_1.SETTINGS_NAV_MARKER}] > svg:first-child {
  display: none;
}

[${settings_nav_icon_js_1.SETTINGS_NAV_MARKER}]::before {
  content: '';
  flex: none;
  width: 16px;
  height: 16px;
  background: currentColor;
  -webkit-mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 10v3'/%3E%3Cpath d='M6 4v16'/%3E%3Cpath d='M10 8v8'/%3E%3Cpath d='M14 4v16'/%3E%3Cpath d='M18 6v12'/%3E%3Cpath d='M22 10v3'/%3E%3C/svg%3E") center / contain no-repeat;
  mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='black' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2 10v3'/%3E%3Cpath d='M6 4v16'/%3E%3Cpath d='M10 8v8'/%3E%3Cpath d='M14 4v16'/%3E%3Cpath d='M18 6v12'/%3E%3Cpath d='M22 10v3'/%3E%3C/svg%3E") center / contain no-repeat;
}
`;
function installNavIconStyle() {
    const tag = document.createElement('style');
    tag.dataset.plugin = '@ddtcorex/dsh-maestro-config';
    tag.dataset.pluginCss = 'maestro/settings-nav.css';
    tag.textContent = SETTINGS_NAV_CSS;
    document.head.appendChild(tag);
    return () => {
        document.querySelector('style[data-plugin-css="maestro/settings-nav.css"]')?.remove();
    };
}
function apply(ctx) {
    const slots = ctx.get?.('slots');
    if (slots === undefined)
        return;
    // The card speaks the granular dsh-maestro-review settings-rpc surface.
    const rpcCall = (endpoint, payload, signal) => {
        const connection = ctx.get?.('connection');
        if (!connection?.rpc?.call)
            return Promise.reject(new Error('RPC not available'));
        return connection.rpc.call(api_js_1.MAESTRO_RPC_CHANNEL, endpoint, payload, signal);
    };
    // Reversible effects: nav-row marker observer + owned style tag.
    ctx.effect(() => (0, settings_nav_icon_js_1.registerSettingsNavIcon)(() => 'Maestro'), 'maestro: settings nav icon');
    ctx.effect(installNavIconStyle, 'maestro: settings nav css');
    slots.inject('settings.section', () => slots.register({ name: 'settings.section', id: 'maestro', order: 25, label: () => 'Maestro', inject: () => ({ rpcCall }) }, maestro_card_jsx_1.MaestroSettingsTab));
}
//# sourceMappingURL=index.js.map