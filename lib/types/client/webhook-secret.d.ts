/** Generate an opaque 256-bit secret suitable for GitLab's webhook token. */
export declare function generateWebhookSecret(randomValues?: <T extends ArrayBufferView>(array: T) => T): string;
/** GitLab's Merge Request webhook endpoint for the configured public hostname. */
export declare function gitlabWebhookUrl(hostname?: string): string;
//# sourceMappingURL=webhook-secret.d.ts.map