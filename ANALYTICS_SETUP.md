# SIRONIC – GA4 & Attribution Tracking Setup Guide

This document defines the Google Analytics 4 (GA4) configuration, event schema, custom dimensions, key conversion events, and first-party attribution data pipeline implemented for SIRONIC (`sironic.eu`).

---

## 1. GA4 Admin Configuration Checklist

The following setup must be completed in the GA4 Property Admin console (`Admin → Data Display`):

### A. Key Events (Conversions)
Mark the following event as a **Key Event**:
- `generate_lead` *(Triggered strictly after successful server-side form submission response via Nodemailer routes)*

### B. Custom Dimensions (Event-Scoped)
Navigate to `Admin → Data Display → Custom Definitions` and create the following **Event-scoped Custom Dimensions**:

| Dimension Name | Event Parameter | Description |
| :--- | :--- | :--- |
| `customer_type` | `customer_type` | `b2b` (Céges / Üzleti) or `b2c` (Magánszemély / Egyéni) |
| `request_type` | `request_type` | `new_it`, `expansion`, `relocation`, `modernization`, `ops`, `issue` |
| `project_type` | `project_type` | Specific project slug or solution scope |
| `service` | `service` | Associated service category (`rendszeruzemeltetes`, `halozatepites`, etc.) |
| `region` | `region` | User target region (e.g. `HU`, `Fejér megye`, `Budapest`) |
| `cta_location` | `cta_location` | Location of CTA element (`hero`, `home_4cards`, `footer`, `contact_form`) |
| `source_site` | `source_site` | Origin hostname (`sironic.eu`) |
| `form_type` | `form_type` | `contact`, `assessment`, `incident` |

---

## 2. Event Taxonomy & Triggers

All tracking logic is encapsulated inside `lib/analytics.ts`. No PII (Personally Identifiable Information like email, phone, or name) is ever dispatched to GA4.

### A. Recommended Conversion Event (`generate_lead`)
- **Trigger**: Fired inside `ContactFormClient.tsx` and `SmartFormClient.tsx` upon receiving HTTP 200 `{ ok: true }` from Nodemailer API endpoints.
- **Payload Parameters**:
  - `lead_source`: `"website_form"`
  - `form_type`: `"contact"` \| `"assessment"` \| `"incident"`
  - `customer_type`: `"b2b"` \| `"b2c"`
  - `request_type`: `"new_it"` \| `"expansion"` \| `"relocation"` \| `"modernization"` \| `"ops"` \| `"issue"`
  - `region`: `"HU"`
  - `cta_location`: Form location ID
  - `landing_page`: Initial landing URL path

### B. Micro-Interaction Custom Events
1. **`form_start`**
   - **Trigger**: First focus or interaction with form fields.
   - **Parameters**: `form_type`, `cta_location`
2. **`form_step_complete`**
   - **Trigger**: Moving between multi-step wizard screens in Smart Form.
   - **Parameters**: `form_type`, `step_name`, `step_number`
3. **`form_error`**
   - **Trigger**: Client-side validation failure or API error response.
   - **Parameters**: `form_type`, `error_type`
4. **`phone_click`**
   - **Trigger**: Clicking `tel:` phone links.
   - **Parameters**: `cta_location`, `page_type`, `service`, `request_type`
5. **`email_click`**
   - **Trigger**: Clicking `mailto:` email links.
   - **Parameters**: `cta_location`, `page_type`
6. **`cta_click`**
   - **Trigger**: Clicking primary/secondary business CTAs.
   - **Parameters**: `cta_label`, `destination`, `cta_location`, `cta_type`, `page_type`
7. **`request_type_select`**
   - **Trigger**: Selecting primary request category.
   - **Parameters**: `request_type`
8. **`customer_type_select`**
   - **Trigger**: Toggling B2B vs B2C selector.
   - **Parameters**: `customer_type`
9. **`service_select`**
   - **Trigger**: Selecting service options.
   - **Parameters**: `service`
10. **`outbound_division_click`**
    - **Trigger**: Clicking links leading to sister SIROTECH group domains.
    - **Parameters**: `destination_brand`, `context`, `cta_location`

---

## 3. First-Party Attribution Storage Engine

To guarantee reliable multi-touch campaign attribution without relying on third-party tracking cookies:

- **Storage Key**: `sironic_attribution_v1` in `localStorage`.
- **First Touch**: Written on initial visit to `sironic.eu`. Captures original `utm_source`, `utm_medium`, `utm_campaign`, `utm_content`, `utm_term`, `gclid`, `gbraid`, `wbraid`, `referrer`, `landing_page`, and ISO timestamp. Never overwritten.
- **Last Touch**: Updated whenever a user lands with fresh campaign parameters or new GCLID.
- **Nodemailer Integration**: Client forms retrieve attribution data via `getAttributionData()` and append it to API POST requests. Nodemailer route handlers format these attribution values into clear HTML tables within admin lead notification emails.

---

## 4. Privacy & Consent Mode Compliance

- Existing `CookieConsent` and Google Consent Mode logic is fully preserved.
- GA4 events fire only according to current user consent settings.
- Virtual `page_view` events are handled by `@next/third-parties` without causing duplicate pageview counts.
