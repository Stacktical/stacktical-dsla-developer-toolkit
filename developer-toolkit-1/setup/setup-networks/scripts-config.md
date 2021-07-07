---
description: >-
  To create scripts and get access to the same information when jumping between
  networks.
---

# Scripts config

### ScriptsConfiguration

This is an optional field. We use it to configure the `deploy_sla`script.

{% code title="types.ts" %}
```typescript
export type ScriptsConfiguration = {
  deploy_sla?: DeploySLAConfiguration;
};
```
{% endcode %}



