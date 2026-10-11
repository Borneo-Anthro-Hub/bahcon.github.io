import PageHero from "@/components/server/layout/PageHero";
import Section from "@/components/server/layout/Section";
import { requireFeature } from "@/lib/site-state/require-feature";
import { withBasePath } from "@/lib/utils";

export default function TermsPage() {
  requireFeature("termsAndConditions");

  return (
    <div
      className="flex flex-1 flex-col"
      style={{
        backgroundImage: `url("${withBasePath("/2027_images/repeat_background.png")}")`,
        backgroundRepeat: "repeat",
        backgroundSize: "3000px auto",
      }}
    >
      <PageHero
        eyebrow="Policies"
        title="Terms &amp; Conditions"
        description="Rules, policies, and terms for attending Borneo Anthro Hub."
      />

      <Section index="01" eyebrow="Terms &amp; Conditions">
        <div className="mx-auto max-w-3xl">
          <iframe
            src="https://docs.google.com/document/d/e/2PACX-1vT7hRxbs1ZGeMqcKcfcMeHhcTRTXScU60KvV0NrnoE-8J3gSPxiVrBiY4FP2HJDzA/pub?embedded=true"
            className="border-border h-150 w-full border"
            title="Terms &amp; Conditions"
          />
        </div>
      </Section>
    </div>
  );
}
