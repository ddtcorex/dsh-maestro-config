"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MaestroSettingsTab = MaestroSettingsTab;
// Verbatim port of the proven dsh-maestro-harness Settings card: fields and
// styles preserved (--dsw-alias-* tokens, masked SecretInput, sectioned
// layout, QR + model selector + project mappings). The RPC channel now
// resolves to the granular dsh-maestro-review settings-rpc row (see api.ts).
// Kept byte-faithful by design; typed entry lives in index.tsx.
/* @ts-nocheck */
const react_1 = require("react");
const qrcode_1 = __importDefault(require("qrcode"));
const api_js_1 = require("./api.js");
const webhook_secret_js_1 = require("./webhook-secret.js");
// Styling mirrors the host settings cards (ui-settings-plugins fields.module.css
// / ModelsSection.module.css) through the shared --dsw-alias-* tokens, so the
// card follows the active light/dark theme instead of hard-coding colors.
const inputStyle = {
    height: 34,
    padding: '0 12px',
    border: '1px solid var(--dsw-alias-border-l2)',
    borderRadius: 8,
    background: 'var(--dsw-alias-bg-layer-3)',
    font: 'inherit',
    fontSize: 13,
    color: 'var(--dsw-alias-label-primary)',
    width: '100%',
    boxSizing: 'border-box',
};
const fieldLabelStyle = {
    display: 'block',
    fontSize: 12,
    lineHeight: 1.5,
    color: 'var(--dsw-alias-label-secondary)',
    margin: '10px 0 4px',
};
const secondaryButtonStyle = {
    height: 32,
    padding: '0 14px',
    borderRadius: 16,
    border: '1px solid var(--dsw-alias-border-l2)',
    background: 'transparent',
    color: 'var(--dsw-alias-label-primary)',
    font: 'inherit',
    fontSize: 13,
    cursor: 'pointer',
    flex: 'none',
};
const primaryButtonStyle = {
    ...secondaryButtonStyle,
    border: 'none',
    background: 'var(--dsw-alias-button-primary-fill)',
    color: 'var(--dsw-alias-label-primary-foreground)',
};
const captionStyle = {
    fontSize: 12,
    lineHeight: 1.5,
    margin: '4px 0',
    color: 'var(--dsw-alias-label-secondary)',
};
const sectionStyle = {
    marginTop: 20,
    paddingTop: 16,
    borderTop: '1px solid var(--dsw-alias-border-l2)',
};
const headingStyle = {
    margin: '0 0 6px',
    fontSize: 13,
    fontWeight: 600,
    color: 'var(--dsw-alias-label-primary)',
};
const errorStyle = {
    color: 'var(--dsw-alias-state-error-primary)',
    fontSize: 12,
    margin: '8px 0 0',
};
const codeStyle = {
    fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
    fontSize: 12,
    color: 'var(--dsw-alias-label-primary)',
    wordBreak: 'break-all',
};
/** QR code centered in a light tile with an even scanner-friendly quiet zone. */
function QrImage({ url, size = 104 }) {
    const [dataUrl, setDataUrl] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        let live = true;
        qrcode_1.default.toDataURL(url, { margin: 0, width: size * 2 })
            .then((d) => { if (live)
            setDataUrl(d); })
            .catch(() => { });
        return () => { live = false; };
    }, [url, size]);
    return (0, react_1.createElement)('div', {
        style: {
            background: '#ffffff',
            borderRadius: 10,
            boxSizing: 'border-box',
            width: size + 20,
            height: size + 20,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            lineHeight: 0,
            flex: 'none',
            alignSelf: 'flex-start',
        },
    }, dataUrl === null
        ? (0, react_1.createElement)('div', { style: { width: size, height: size, background: 'var(--dsw-alias-bg-skeleton)', borderRadius: 4 } })
        : (0, react_1.createElement)('img', { src: dataUrl, alt: url, width: size, height: size, style: { display: 'block' } }));
}
function NamedTunnelSetupNote() {
    return (0, react_1.createElement)('div', { style: captionStyle }, (0, react_1.createElement)('p', { style: { ...captionStyle, marginBottom: 4 } }, 'Named tunnel needs a one-time manual setup (requires your own Cloudflare account — cannot be automated):'), (0, react_1.createElement)('ol', { style: { margin: '4px 0', paddingLeft: 20 } }, (0, react_1.createElement)('li', null, 'cloudflared tunnel login'), (0, react_1.createElement)('li', null, 'cloudflared tunnel create dsh-maestro-webhook'), (0, react_1.createElement)('li', null, 'cloudflared tunnel route dns dsh-maestro-webhook <your-hostname>'), (0, react_1.createElement)('li', null, 'Paste the printed Tunnel ID, the credentials file path (~/.cloudflared/<id>.json), and the hostname below.')));
}
function ReviewModelSelector({ value, catalog, fallbackValue, fallbackLabel, onChange, label }) {
    const groups = catalog?.groups ?? [];
    const providers = groups.map(g => g.provider);
    const selectedProvider = value?.provider ?? '';
    const providerGroup = groups.find(g => g.provider === selectedProvider);
    const models = providerGroup?.models ?? [];
    const selectedEffort = value?.reasoningEffort ?? '';
    const [open, setOpen] = (0, react_1.useState)(false);
    const [pane, setPane] = (0, react_1.useState)('root');
    const rootRef = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!open)
            return;
        const onDown = (e) => { if (rootRef.current && !rootRef.current.contains(e.target)) {
            setOpen(false);
            setPane('root');
        } };
        const onKey = (e) => { if (e.key === 'Escape') {
            setOpen(false);
            setPane('root');
        } };
        document.addEventListener('mousedown', onDown);
        document.addEventListener('keydown', onKey);
        return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
    }, [open]);
    const update = (field, newVal) => {
        if (newVal === '' && field === 'provider') {
            onChange(null);
            setOpen(false);
            setPane('root');
            return;
        }
        const next = { provider: value?.provider ?? '', model: value?.model ?? '', ...(value?.reasoningEffort ? { reasoningEffort: value.reasoningEffort } : {}) };
        if (field === 'provider') {
            const g = groups.find(x => x.provider === newVal);
            next.provider = newVal;
            next.model = g?.models[0] ?? '';
        }
        else if (field === 'model') {
            next.model = newVal;
        }
        else if (field === 'reasoningEffort') {
            if (newVal === '')
                delete next.reasoningEffort;
            else
                next.reasoningEffort = newVal;
        }
        if (!next.provider || !next.model) {
            onChange(null);
        }
        else {
            onChange(next);
        }
    };
    const effectiveFallback = fallbackValue !== undefined ? fallbackValue : (catalog?.current ?? null);
    const effectiveFallbackLabel = fallbackLabel ?? 'Use DSH default';
    const triggerLabel = value
        ? `${value.provider} / ${value.model}${value.reasoningEffort ? ` · ${value.reasoningEffort}` : ''}`
        : effectiveFallback
            ? `${effectiveFallbackLabel} · ${effectiveFallback.provider}/${effectiveFallback.model}${effectiveFallback.reasoningEffort ? ` · ${effectiveFallback.reasoningEffort}` : ''}`
            : effectiveFallbackLabel;
    const triggerStyle = {
        height: 32,
        padding: '0 12px 0 14px',
        borderRadius: 20,
        border: '1px solid var(--dsw-alias-border-l2)',
        background: 'var(--dsw-alias-bg-layer-2)',
        color: 'var(--dsw-alias-label-primary)',
        font: 'inherit',
        fontSize: 13,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        cursor: 'pointer',
        maxWidth: 320,
        whiteSpace: 'nowrap',
    };
    const menuStyle = {
        position: 'absolute',
        top: 'calc(100% + 8px)',
        left: 0,
        minWidth: 300,
        maxWidth: 360,
        background: 'var(--dsw-alias-bg-layer-1)',
        border: '1px solid var(--dsw-alias-border-l2)',
        borderRadius: 12,
        boxShadow: '0 8 24px rgba(0,0,0,.12)',
        zIndex: 20,
        padding: 6,
    };
    const rowStyle = {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
        padding: '9px 10px',
        borderRadius: 8,
        border: 'none',
        background: 'transparent',
        color: 'var(--dsw-alias-label-primary)',
        font: 'inherit',
        fontSize: 13,
        cursor: 'pointer',
        textAlign: 'left',
    };
    const check = (active) => active ? (0, react_1.createElement)('svg', { width: 16, height: 16, viewBox: '0 0 16 16', style: { flex: 'none' } }, (0, react_1.createElement)('path', { d: 'M3.5 8.2l2.8 2.8L12.5 4.8', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round' })) : (0, react_1.createElement)('span', { style: { width: 16, flex: 'none' } });
    const chevronDown = (0, react_1.createElement)('svg', { width: 14, height: 14, viewBox: '0 0 14 14', style: { flex: 'none', opacity: 0.7 } }, (0, react_1.createElement)('path', { d: 'M3.5 5L7 8.5L10.5 5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    const chevronRight = (0, react_1.createElement)('svg', { width: 14, height: 14, viewBox: '0 0 14 14', style: { flex: 'none', opacity: 0.6 } }, (0, react_1.createElement)('path', { d: 'M5 3.5L8.5 7L5 10.5', fill: 'none', stroke: 'currentColor', strokeWidth: 1.4, strokeLinecap: 'round', strokeLinejoin: 'round' }));
    const effortLabel = selectedEffort === '' ? 'Default effort' : selectedEffort;
    const modelLabel = selectedProvider === '' ? 'Select model' : (value?.model ?? 'Select model');
    return (0, react_1.createElement)('div', { ref: rootRef, style: { position: 'relative', display: 'inline-block', maxWidth: '100%' } }, label && (0, react_1.createElement)('span', { style: fieldLabelStyle }, label), (0, react_1.createElement)('button', { type: 'button', style: triggerStyle, onClick: () => { setOpen(v => !v); setPane('root'); }, 'aria-expanded': open, 'aria-haspopup': 'menu', title: triggerLabel }, (0, react_1.createElement)('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, triggerLabel), chevronDown), open && (0, react_1.createElement)('div', { style: menuStyle, role: 'menu' }, pane === 'root' && (0, react_1.createElement)('div', null, (0, react_1.createElement)('button', { type: 'button', style: { ...rowStyle, background: !value ? 'var(--dsw-alias-bg-layer-2)' : 'transparent' }, onClick: () => { onChange(null); setOpen(false); } }, (0, react_1.createElement)('span', null, effectiveFallbackLabel), check(!value)), (0, react_1.createElement)('div', { style: { height: 1, background: 'var(--dsw-alias-border-l2)', margin: '6px 2px' } }), (0, react_1.createElement)('button', { type: 'button', style: rowStyle, onClick: () => setPane('model') }, (0, react_1.createElement)('span', null, 'Model'), (0, react_1.createElement)('span', { style: { display: 'flex', alignItems: 'center', gap: 8, color: 'var(--dsw-alias-label-secondary)', maxWidth: 160, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, (0, react_1.createElement)('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis' } }, modelLabel), chevronRight)), (0, react_1.createElement)('button', { type: 'button', style: rowStyle, onClick: () => setPane('effort') }, (0, react_1.createElement)('span', null, 'Effort'), (0, react_1.createElement)('span', { style: { display: 'flex', alignItems: 'center', gap: 8, color: 'var(--dsw-alias-label-secondary)' } }, effortLabel, chevronRight)), value && (0, react_1.createElement)('p', { style: { ...captionStyle, margin: '8px 4px 2px' } }, `Selected: ${value.provider} / ${value.model}${value.reasoningEffort ? ` (${value.reasoningEffort})` : ''}`), !value && effectiveFallback && (0, react_1.createElement)('p', { style: { ...captionStyle, margin: '8px 4px 2px' } }, `${effectiveFallbackLabel === 'Use Global' ? 'Using Global' : 'Using DSH default'}: ${effectiveFallback.provider} / ${effectiveFallback.model}${effectiveFallback.reasoningEffort ? ` (${effectiveFallback.reasoningEffort})` : ''}`)), pane === 'model' && (0, react_1.createElement)('div', null, (0, react_1.createElement)('button', { type: 'button', style: { ...rowStyle, color: 'var(--dsw-alias-label-secondary)' }, onClick: () => setPane('root') }, (0, react_1.createElement)('span', null, '← Back'), (0, react_1.createElement)('span', { style: { fontSize: 12 } }, 'Model')), (0, react_1.createElement)('div', { style: { maxHeight: 260, overflowY: 'auto', marginTop: 4 } }, providers.length === 0 ? (0, react_1.createElement)('p', { style: captionStyle }, 'No providers') :
        providers.map(p => {
            const g = groups.find(x => x.provider === p);
            const ms = g?.models ?? [];
            return (0, react_1.createElement)('div', { key: p, style: { marginBottom: 8 } }, (0, react_1.createElement)('div', { style: { fontSize: 11, fontWeight: 600, color: 'var(--dsw-alias-label-secondary)', padding: '6px 10px 2px', textTransform: 'uppercase', letterSpacing: 0.4, display: 'flex', alignItems: 'center', gap: 6 } }, (0, react_1.createElement)('span', { style: { width: 6, height: 6, borderRadius: 3, background: 'var(--dsw-alias-border-l2)', flex: 'none' } }), g?.name ?? p), ms.length === 0 ? (0, react_1.createElement)('p', { style: { ...captionStyle, padding: '2px 10px 2px 28px' } }, 'No models') :
                (0, react_1.createElement)('div', { style: { marginLeft: 12, borderLeft: '1px solid var(--dsw-alias-border-l2)', paddingLeft: 6, display: 'flex', flexDirection: 'column', gap: 2 } }, ms.map(m => (0, react_1.createElement)('button', { key: m, type: 'button', style: { ...rowStyle, paddingLeft: 10, background: value?.provider === p && value?.model === m ? 'var(--dsw-alias-bg-layer-2)' : 'transparent' }, onClick: () => { update('model', m); if (value?.provider !== p)
                        update('provider', p);
                    else {
                        const next = { provider: p, model: m, ...(selectedEffort ? { reasoningEffort: selectedEffort } : {}) };
                        onChange(next);
                        setPane('root');
                    } } }, (0, react_1.createElement)('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis' } }, m), check(value?.provider === p && value?.model === m)))));
        }))), pane === 'effort' && (0, react_1.createElement)('div', null, (0, react_1.createElement)('button', { type: 'button', style: { ...rowStyle, color: 'var(--dsw-alias-label-secondary)' }, onClick: () => setPane('root') }, (0, react_1.createElement)('span', null, '← Back'), (0, react_1.createElement)('span', { style: { fontSize: 12 } }, 'Effort')), (0, react_1.createElement)('div', { style: { marginTop: 4 } }, [
        { id: '', label: 'Default effort' },
        { id: 'low', label: 'low' },
        { id: 'medium', label: 'medium' },
        { id: 'high', label: 'high' },
    ].map(e => (0, react_1.createElement)('button', { key: e.id || 'default', type: 'button', style: { ...rowStyle, background: selectedEffort === e.id ? 'var(--dsw-alias-bg-layer-2)' : 'transparent' }, onClick: () => { update('reasoningEffort', e.id); setPane('root'); } }, (0, react_1.createElement)('span', null, e.label), check(selectedEffort === e.id)))))));
}
function ProjectMappingsEditor({ mappings, onChange, catalog, globalReviewModel }) {
    const rows = mappings.length > 0 ? mappings : [{ projectPath: '', localRepoPath: '', reviewProfile: 'magento2' }];
    const updateRow = (index, field, value) => {
        const next = rows.map((row, i) => (i === index ? { ...row, [field]: value } : row));
        onChange(next.filter(r => r.projectPath !== '' || r.localRepoPath !== ''));
    };
    const removeRow = (index) => onChange(rows.filter((_, i) => i !== index));
    const addRow = () => onChange([...rows, { projectPath: '', localRepoPath: '', reviewProfile: 'magento2' }]);
    return (0, react_1.createElement)('div', null, (0, react_1.createElement)('span', { style: fieldLabelStyle }, 'Tracked projects (GitLab path → local repo checkout → review profile → review model override)'), rows.map((row, i) => (0, react_1.createElement)('div', { key: i, 'data-maestro-mapping-row': '', style: { display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center', flexWrap: 'wrap' } }, (0, react_1.createElement)('input', { placeholder: 'group/project', style: { ...inputStyle, flex: '1 1 120px' }, value: row.projectPath, onChange: e => updateRow(i, 'projectPath', e.target.value) }), (0, react_1.createElement)('input', { placeholder: '/path/to/local/clone', style: { ...inputStyle, flex: '1 1 140px' }, value: row.localRepoPath, onChange: e => updateRow(i, 'localRepoPath', e.target.value) }), (0, react_1.createElement)('select', { style: { ...inputStyle, flex: '0 0 130px' }, value: row.reviewProfile ?? 'magento2', onChange: e => updateRow(i, 'reviewProfile', e.target.value) }, (0, react_1.createElement)('option', { value: 'magento2' }, 'Magento 2'), (0, react_1.createElement)('option', { value: 'generic' }, 'Generic')), (0, react_1.createElement)('div', { style: { flex: '0 0 auto' } }, (0, react_1.createElement)(ReviewModelSelector, {
        value: row.reviewModel ?? null,
        catalog,
        fallbackValue: globalReviewModel ?? catalog?.current ?? null,
        fallbackLabel: globalReviewModel ? 'Use Global' : 'Use DSH default',
        onChange: v => updateRow(i, 'reviewModel', v),
        label: null,
    })), (0, react_1.createElement)('button', { onClick: () => removeRow(i), style: secondaryButtonStyle, title: 'Remove mapping' }, '✕'))), (0, react_1.createElement)('button', { onClick: addRow, style: secondaryButtonStyle }, '+ Add mapping'));
}
/**
 * Password field for a stored secret the server never echoes back
 * (`getConfig` masks secrets). Empty by default; a typed value saves on blur,
 * an untouched field keeps the stored secret, and Clear writes '' to erase it.
 */
function SecretInput({ label, placeholder, hasSaved, onSave }) {
    const [draft, setDraft] = (0, react_1.useState)('');
    const clear = () => { setDraft(''); onSave(''); };
    return (0, react_1.createElement)('div', null, (0, react_1.createElement)('label', { style: fieldLabelStyle }, label), (0, react_1.createElement)('div', { style: { display: 'flex', gap: 8 } }, (0, react_1.createElement)('input', {
        placeholder: hasSaved === true ? 'saved — leave blank to keep' : placeholder,
        type: 'password',
        autoComplete: 'off',
        style: inputStyle,
        value: draft,
        onChange: e => setDraft(e.target.value),
        onBlur: () => { if (draft !== '')
            onSave(draft); },
    }), hasSaved === true && (0, react_1.createElement)('button', { type: 'button', style: secondaryButtonStyle, onClick: clear }, 'Clear')));
}
/** Simple checked/unchecked toggle bound to a boolean settings key. */
function ToggleField({ label, caption, checked, onChange }) {
    return (0, react_1.createElement)('label', { style: { display: 'flex', alignItems: 'flex-start', gap: 8, margin: '8px 0', cursor: 'pointer' } }, (0, react_1.createElement)('input', { type: 'checkbox', checked: checked === true, onChange: e => onChange(e.target.checked), style: { marginTop: 3 } }), (0, react_1.createElement)('span', null, (0, react_1.createElement)('div', { style: { fontSize: 13 } }, label), caption != null && (0, react_1.createElement)('div', { style: captionStyle }, caption)));
}
/** Newest-first list of recorded review runs from the host's reviews.json. */
function ReviewHistoryPanel({ rpcCall }) {
    const [entries, setEntries] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        rpcCall(api_js_1.MAESTRO_ENDPOINTS.reviewsList, {})
            .then(res => { if (res?.ok)
            setEntries(res.value ?? []); })
            .catch(() => setEntries([]));
    }, []);
    if (entries === null)
        return (0, react_1.createElement)('p', { style: captionStyle }, 'Loading review history…');
    if (entries.length === 0)
        return (0, react_1.createElement)('p', { style: captionStyle }, 'No reviews recorded yet.');
    const icon = entry => entry.status === 'completed' ? '✅' : entry.status === 'failed' ? '⚠️' : '👀';
    return (0, react_1.createElement)('ul', { style: { listStyle: 'none', margin: 0, padding: 0 } }, entries.map(entry => (0, react_1.createElement)('li', { key: entry.id, style: { padding: '6px 0', borderBottom: '1px solid var(--dsw-alias-separator-default, #333)', fontSize: 13 } }, (0, react_1.createElement)('span', null, `${icon(entry)} ${entry.projectPath} !${entry.mrIid} · ${entry.mode}${entry.trigger !== 'mention' ? ` · ${entry.trigger}` : ''}`), (0, react_1.createElement)('div', { style: captionStyle }, `${new Date(entry.startedAt).toLocaleString()}${entry.summary ? ` — ${entry.summary}` : ''}${entry.error ? ` — ${entry.error}` : ''}`))));
}
/** One selectable LAN address chip + the QR of the currently selected URL. */
function LanAccess({ proxyStatus, lanPin }) {
    const urls = proxyStatus?.lanUrls ?? [];
    const [selected, setSelected] = (0, react_1.useState)(0);
    const index = Math.min(selected, Math.max(urls.length - 1, 0));
    if (!proxyStatus?.running) {
        return (0, react_1.createElement)('p', { style: errorStyle }, proxyStatus?.errorMessage ?? 'Proxy not running');
    }
    return (0, react_1.createElement)('div', null, (0, react_1.createElement)('p', { style: captionStyle }, lanPin?.enabled === true
        ? 'Open this full DSH UI from any device on your network — visitors enter the LAN PIN below.'
        : 'Open this full DSH UI from any device on your network — no PIN needed.'), urls.length > 0 && (0, react_1.createElement)('div', { style: { display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 } }, urls.map((url, i) => (0, react_1.createElement)('button', {
        key: url,
        onClick: () => setSelected(i),
        style: {
            ...secondaryButtonStyle,
            height: 26,
            padding: '0 10px',
            fontSize: 12,
            borderRadius: 13,
            ...(i === index
                ? { background: 'var(--dsw-alias-button-primary-fill)', borderColor: 'transparent', color: 'var(--dsw-alias-label-primary-foreground)' }
                : {}),
        },
    }, url.replace(/^http:\/\//, '')))), urls.length > 0 && (0, react_1.createElement)('div', { style: { display: 'flex', gap: 14, alignItems: 'center' } }, (0, react_1.createElement)(QrImage, { url: urls[index], size: 116 }), (0, react_1.createElement)('div', null, (0, react_1.createElement)('div', { style: codeStyle }, urls[index]), (0, react_1.createElement)('p', { style: captionStyle }, 'Scan with a phone connected to the same network.'))), lanPin !== null && (0, react_1.createElement)(LanPinRow, { lanPin }));
}
/** Opt-in LAN PIN: off keeps the LAN open; on shows the PIN with Show/Rotate. */
function LanPinRow({ lanPin }) {
    return (0, react_1.createElement)('div', { style: { marginTop: 12 } }, (0, react_1.createElement)('label', { style: { display: 'flex', gap: 8, alignItems: 'center', cursor: 'pointer' } }, (0, react_1.createElement)('input', {
        type: 'checkbox',
        checked: lanPin.enabled,
        onChange: e => lanPin.onToggle(e.target.checked),
        style: { width: 15, height: 15, accentColor: 'var(--dsw-alias-button-primary-fill)' },
    }), (0, react_1.createElement)('span', { style: { ...fieldLabelStyle, margin: 0 } }, 'Require a PIN on the LAN')), lanPin.enabled && (0, react_1.createElement)('div', { style: { display: 'flex', gap: 8, alignItems: 'center', marginTop: 8 } }, (0, react_1.createElement)('span', { style: { ...fieldLabelStyle, margin: 0 } }, 'LAN PIN'), (0, react_1.createElement)('code', { style: { ...codeStyle, fontSize: 15, letterSpacing: 2 } }, lanPin.show ? lanPin.pin ?? '••••••••' : '••••••••'), lanPin.show
        ? (0, react_1.createElement)('button', { onClick: lanPin.onHide, style: secondaryButtonStyle }, 'Hide')
        : (0, react_1.createElement)('button', { onClick: lanPin.onShow, style: secondaryButtonStyle }, 'Show'), (0, react_1.createElement)('button', { onClick: lanPin.onRotate, style: secondaryButtonStyle }, 'Rotate')));
}
function PublicAccess({ status, pin, showPin, onRevealPin, onHidePin, onRotatePin }) {
    return (0, react_1.createElement)('div', null, status?.running && status?.publicUrl
        ? (0, react_1.createElement)('div', null, (0, react_1.createElement)('div', { style: { display: 'flex', gap: 14, alignItems: 'center', marginBottom: 12 } }, (0, react_1.createElement)(QrImage, { url: status.publicUrl, size: 116 }), (0, react_1.createElement)('div', null, (0, react_1.createElement)('div', { style: codeStyle }, status.publicUrl), (0, react_1.createElement)('p', { style: captionStyle }, 'Works from anywhere; visitors enter the PIN below.'))))
        : (0, react_1.createElement)('p', { style: captionStyle }, 'Start the tunnel to get a public address.'), (0, react_1.createElement)('div', { style: { display: 'flex', gap: 8, alignItems: 'center' } }, (0, react_1.createElement)('span', { style: { ...fieldLabelStyle, margin: 0 } }, 'Access PIN'), (0, react_1.createElement)('code', { style: { ...codeStyle, fontSize: 15, letterSpacing: 2 } }, showPin && pin !== null ? pin : '••••••••'), showPin
        ? (0, react_1.createElement)('button', { onClick: onHidePin, style: secondaryButtonStyle }, 'Hide')
        : (0, react_1.createElement)('button', { onClick: onRevealPin, style: secondaryButtonStyle }, 'Show'), (0, react_1.createElement)('button', { onClick: onRotatePin, style: secondaryButtonStyle }, 'Rotate')), (0, react_1.createElement)('p', { style: captionStyle }, 'Stays the same across tunnel and DSH restarts; use Rotate when you need a new PIN.'));
}
function MaestroSettingsTab({ rpcCall }) {
    const [status, setStatus] = (0, react_1.useState)(null);
    const [proxyStatus, setProxyStatus] = (0, react_1.useState)(null);
    const [config, setConfig] = (0, react_1.useState)({ tunnelMode: 'quick', projectMappings: [] });
    const [catalog, setCatalog] = (0, react_1.useState)(null);
    const [busy, setBusy] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [pin, setPin] = (0, react_1.useState)(null);
    const [showPin, setShowPin] = (0, react_1.useState)(false);
    const [lanPinEnabled, setLanPinEnabled] = (0, react_1.useState)(false);
    const [lanPin, setLanPin] = (0, react_1.useState)(null);
    const [showLanPin, setShowLanPin] = (0, react_1.useState)(false);
    const call = async (endpoint, payload) => {
        const res = await rpcCall(endpoint, payload);
        if (!res?.ok)
            throw new Error(res?.error?.message ?? 'RPC failed');
        return res.value;
    };
    const refresh = async () => {
        try {
            setStatus(await call(api_js_1.MAESTRO_ENDPOINTS.status, {}));
        }
        catch { /* transient failure, ignore */ }
        try {
            setProxyStatus(await call(api_js_1.MAESTRO_ENDPOINTS.proxyStatus, {}));
        }
        catch { /* proxy row may be starting */ }
    };
    // Load previously-saved config once on mount — without this, every field
    // (including project mappings) would render empty on every page load even
    // after being saved, since RPC state is not persisted in the component.
    (0, react_1.useEffect)(() => {
        call(api_js_1.MAESTRO_ENDPOINTS.getConfig, {})
            .then(saved => setConfig(prev => ({ ...prev, ...saved })))
            .catch(() => { });
        call(api_js_1.MAESTRO_ENDPOINTS.lanPinStatus, {})
            .then(value => { setLanPinEnabled(value.enabled); if (value.enabled)
            setLanPin(value.pin ?? null); })
            .catch(() => { });
        call(api_js_1.MAESTRO_ENDPOINTS.modelsList, {})
            .then(value => setCatalog(value))
            .catch(() => { });
    }, []);
    (0, react_1.useEffect)(() => {
        refresh();
        const t = setInterval(refresh, 3000);
        return () => clearInterval(t);
    }, []);
    const revealPin = async () => {
        if (pin === null) {
            try {
                setPin((await call(api_js_1.MAESTRO_ENDPOINTS.getPin, {})).pin);
            }
            catch (err) {
                setError(err.message);
            }
        }
        setShowPin(true);
    };
    const rotatePin = async () => {
        setError(null);
        try {
            const fresh = (await call(api_js_1.MAESTRO_ENDPOINTS.rotatePin, {})).pin;
            setPin(fresh);
            setShowPin(true);
        }
        catch (err) {
            setError(err.message);
        }
    };
    const toggleLanPin = async (enabled) => {
        setError(null);
        const previous = lanPinEnabled;
        setLanPinEnabled(enabled);
        try {
            await call(api_js_1.MAESTRO_ENDPOINTS.lanPinSetEnabled, { enabled });
            if (enabled) {
                const value = await call(api_js_1.MAESTRO_ENDPOINTS.lanPinStatus, {});
                setLanPin(value.pin ?? null);
                setShowLanPin(true);
            }
            else {
                setLanPin(null);
                setShowLanPin(false);
            }
        }
        catch (err) {
            setLanPinEnabled(previous);
            setError(err.message);
        }
    };
    const revealLanPin = async () => {
        if (lanPin === null) {
            try {
                setLanPin((await call(api_js_1.MAESTRO_ENDPOINTS.lanPinStatus, {})).pin ?? null);
            }
            catch (err) {
                setError(err.message);
            }
        }
        setShowLanPin(true);
    };
    const rotateLanPin = async () => {
        setError(null);
        try {
            const fresh = (await call(api_js_1.MAESTRO_ENDPOINTS.lanPinRotate, {})).pin;
            setLanPin(fresh);
            setShowLanPin(true);
        }
        catch (err) {
            setError(err.message);
        }
    };
    const startTunnel = async () => {
        setBusy(true);
        setError(null);
        try {
            setStatus(await call(api_js_1.MAESTRO_ENDPOINTS.tunnelStart, {}));
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setBusy(false);
        }
    };
    const stopTunnel = async () => {
        setBusy(true);
        setError(null);
        try {
            setStatus(await call(api_js_1.MAESTRO_ENDPOINTS.tunnelStop, {}));
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setBusy(false);
        }
    };
    const saveField = async (field, value) => {
        setError(null);
        setConfig(prev => ({ ...prev, [field]: value }));
        try {
            await call(api_js_1.MAESTRO_ENDPOINTS.saveConfig, { [field]: value });
        }
        catch (err) {
            setError(err.message);
        }
    };
    return (0, react_1.createElement)('div', { 'data-maestro-settings-card': '', style: { maxWidth: 520 } }, (0, react_1.createElement)('h3', { style: { ...headingStyle, fontSize: 15, margin: '0 0 12px' } }, 'Maestro'), (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'Tunnel mode'), (0, react_1.createElement)('select', { value: config.tunnelMode, style: inputStyle, onChange: e => saveField('tunnelMode', e.target.value) }, (0, react_1.createElement)('option', { value: 'quick' }, 'Quick (no setup, URL changes on restart)'), (0, react_1.createElement)('option', { value: 'named' }, 'Named (stable URL, one-time setup)')), config.tunnelMode === 'named' && (0, react_1.createElement)(NamedTunnelSetupNote), config.tunnelMode === 'named' && (0, react_1.createElement)('div', null, (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'Tunnel ID'), (0, react_1.createElement)('input', { placeholder: 'Tunnel ID', style: inputStyle, value: config.tunnelId ?? '', onChange: e => saveField('tunnelId', e.target.value) }), (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'Credentials file path'), (0, react_1.createElement)('input', { placeholder: '~/.cloudflared/<id>.json', style: inputStyle, value: config.tunnelCredentialsFile ?? '', onChange: e => saveField('tunnelCredentialsFile', e.target.value) }), (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'Hostname'), (0, react_1.createElement)('input', { placeholder: 'dsh.example.com', style: inputStyle, value: config.tunnelHostname ?? '', onChange: e => saveField('tunnelHostname', e.target.value) })), (0, react_1.createElement)('div', { style: { marginTop: 12 } }, status?.running
        ? (0, react_1.createElement)('button', { disabled: busy, onClick: stopTunnel, style: secondaryButtonStyle }, 'Stop tunnel')
        : (0, react_1.createElement)('button', { disabled: busy, onClick: startTunnel, style: primaryButtonStyle }, 'Start tunnel')), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'Remote access (LAN)'), (0, react_1.createElement)(LanAccess, {
        proxyStatus,
        lanPin: lanPinEnabled === null ? null : {
            enabled: lanPinEnabled,
            pin: lanPin,
            show: showLanPin,
            onShow: revealLanPin,
            onHide: () => setShowLanPin(false),
            onRotate: rotateLanPin,
            onToggle: toggleLanPin,
        },
    })), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'Public access'), (0, react_1.createElement)(PublicAccess, { status, pin, showPin, onRevealPin: revealPin, onHidePin: () => setShowPin(false), onRotatePin: rotatePin })), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'Telegram notifications'), (0, react_1.createElement)('p', { style: captionStyle }, 'Send one protected startup update with the current public-access PIN to a single Telegram chat.'), (0, react_1.createElement)(SecretInput, {
        label: 'Bot token',
        placeholder: '123456:ABC-DEF...',
        hasSaved: config.hasTelegramBotToken,
        onSave: value => saveField('telegramBotToken', value),
    }), (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'Chat ID'), (0, react_1.createElement)('input', { placeholder: '-1001234567890', autoComplete: 'off', style: inputStyle, value: config.telegramChatId ?? '', onChange: e => saveField('telegramChatId', e.target.value) }), (0, react_1.createElement)(ToggleField, {
        label: 'Also notify about finished reviews',
        caption: 'One message per review run with its outcome and a short summary.',
        checked: config.telegramReviewNotifications,
        onChange: checked => saveField('telegramReviewNotifications', checked),
    }), (0, react_1.createElement)('p', { style: captionStyle }, 'Leave either credential blank to disable notifications. Telegram delivery failures never prevent DSH from starting.')), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'GitLab'), (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'GitLab base URL'), (0, react_1.createElement)('input', { placeholder: 'https://gitlab.example.com', style: inputStyle, value: config.gitlabBaseUrl ?? '', onChange: e => saveField('gitlabBaseUrl', e.target.value) }), (0, react_1.createElement)(SecretInput, {
        label: 'GitLab token',
        placeholder: 'GitLab token',
        hasSaved: config.hasGitlabToken,
        onSave: value => saveField('gitlabToken', value),
    }), (0, react_1.createElement)('label', { style: fieldLabelStyle }, 'Bot username'), (0, react_1.createElement)('input', { placeholder: 'maestro-bot', style: inputStyle, value: config.botUsername ?? '', onChange: e => saveField('botUsername', e.target.value) }), (0, react_1.createElement)(SecretInput, {
        label: 'Webhook secret',
        placeholder: 'Webhook secret',
        hasSaved: config.hasWebhookSecret,
        onSave: value => saveField('webhookSecret', value),
    }), (0, react_1.createElement)('button', { type: 'button', style: { ...secondaryButtonStyle, marginTop: 10 }, onClick: () => saveField('webhookSecret', (0, webhook_secret_js_1.generateWebhookSecret)()) }, 'Generate new secret'), (0, react_1.createElement)('p', { style: captionStyle }, 'In GitLab: Settings → Webhooks, set Secret token to this value and enable Merge request events.'), (0, react_1.createElement)('p', { style: captionStyle }, 'Webhook URL:'), (0, react_1.createElement)('code', { style: codeStyle }, (0, webhook_secret_js_1.gitlabWebhookUrl)(config.tunnelHostname)), (0, react_1.createElement)('p', { style: captionStyle }, 'Overrides MAESTRO_GITLAB_WEBHOOK_SECRET immediately, no restart needed.')), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'Review automation'), (0, react_1.createElement)(ToggleField, {
        label: 'Re-review when new commits are pushed',
        caption: 'After a completed review, further pushes to the same MR trigger an automatic quick re-review.',
        checked: config.autoRereviewOnPush,
        onChange: checked => saveField('autoRereviewOnPush', checked),
    }), (0, react_1.createElement)(ReviewHistoryPanel, { rpcCall })), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'Review model'), (0, react_1.createElement)('p', { style: captionStyle }, 'Model used for automated GitLab reviews (reviewer & auditor). Empty = DSH default. Per-project empty = inherits Global, or DSH default when Global is empty.'), (0, react_1.createElement)(ReviewModelSelector, {
        value: config.reviewModel ?? null,
        catalog,
        fallbackValue: catalog?.current ?? null,
        fallbackLabel: 'Use DSH default',
        onChange: v => saveField('reviewModel', v),
        label: 'Global review model',
    })), (0, react_1.createElement)('div', { style: sectionStyle }, (0, react_1.createElement)('h4', { style: headingStyle }, 'Projects'), (0, react_1.createElement)(ProjectMappingsEditor, { mappings: config.projectMappings ?? [], onChange: mappings => saveField('projectMappings', mappings), catalog, globalReviewModel: config.reviewModel ?? null })), error && (0, react_1.createElement)('p', { style: errorStyle }, error));
}
// Injected synchronously at apply time (deferred effects can stall behind
// unavailable slot scopes); the external plugin's stylesheet handles
// everything outside this card.
function installMaestroMobileCss() {
    if (document.querySelector('style[data-plugin-css="maestro/mobile-maestro.css"]') !== null)
        return;
    const tag = document.createElement('style');
    tag.dataset.plugin = name;
    tag.dataset.pluginCss = 'maestro/mobile-maestro.css';
    tag.textContent = MAESTRO_MOBILE_CSS + SETTINGS_NAV_CSS;
    document.head.appendChild(tag);
}
//# sourceMappingURL=maestro-card.js.map