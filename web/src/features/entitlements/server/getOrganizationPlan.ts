import { env } from "@/src/env.mjs";
import { type Plan } from "@/src/features/entitlements/constants/plans";
import { type CloudConfigSchema } from "@/src/features/organizations/utils/cloudConfigSchema";

/**
 * Get the plan of the organization based on the cloud configuration. Used to add this plan to the organization object in JWT via NextAuth.
 */
export function getOrganizationPlan(cloudConfig?: CloudConfigSchema): Plan {
  if (process.env.NEXT_PUBLIC_LANGFUSE_CLOUD_REGION) {
    if (cloudConfig) {
      switch (cloudConfig.plan) {
        case "Hobby":
          return "cloud:hobby";
        case "Pro":
          return "cloud:pro";
        case "Team":
        case "Enterprise":
          return "cloud:team";
      }
    }
    return "cloud:hobby";
  }

  if (env.LANGFUSE_EE_LICENSE_KEY !== undefined)
    return "self-hosted:enterprise";

  return "oss";
}
