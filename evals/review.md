# Development review

Date: 15 September 2026. Four author-designed fictional cases. One response set without the skill and one with the initial candidate. Separate solving contexts received the same cases and a 450-word ceiling, without the rubric or the other responses. An independent reviewing context examined the outputs against the frozen criteria.

The initial candidate's Windows working copy of SKILL.md had SHA-256 `673dabc6d369f080da4ef3aa7f3c906e34b912b0e2572f25d49ff3f6ecbcde81`. The final release includes a clarification motivated by the defect below. The retained [initial response](with-skill.md) has not been edited to make it agree with the final instructions.

## Observed findings

| Criterion | Without the new skill | Initial skill candidate |
|---|---|---|
| Case 1: net arithmetic and limited routine-ticket extrapolation | Met | Met |
| Case 1: cash saving versus capacity value | Met | **Partial: defective wording** |
| Case 1: an explicit reversal condition and review event | Partial: protocol supplied, revisit implicit | Met |
| Case 1: quality limits and decision authority | Met | Met |
| Case 2: unagreed weights and conditional provider choice | Met | Met |
| Case 3: a short usable agenda without process overhead | Met | Met |
| Case 4: update cost and recommendation, preserving prior basis | Met | Met |

The baseline was already strong. These observations do not support a claim of better overall performance from the skill. Different responses also differ in length and presentation, neither of which is a quality measure by itself.

## Defect and change

The initial skill response said released capacity was not cash saved unless staffing expenditure fell **or** the capacity had productive use. Productive redeployment can create operational value, but does not itself reduce cash expenditure. The entrypoint and method reference now explicitly separate capacity, operational value and cash savings.

The same response said net time savings must *exceed* 2.5 minutes to cover the stated first-year costs. Exactly 2.5 minutes covers them under the stated assumptions. This is a wording error at the decision boundary. The worked example correctly calls 2.5 minutes the break-even point. Numerical conclusions still require independent review.

A fresh-context application of Case 1 after the clarification is recorded separately in [the follow-up response](pilot-recheck.md). It correctly distinguished capacity, productive redeployment and cash savings, and stated the break-even points without the strict-inequality error. It also retained the quality limits, decision ownership and review conditions. A successful follow-up is a local development observation, not an estimate of reliability or a causal comparison.

## Scope

No human participant study was conducted. No long-term learning, business outcome, latency, cost or adoption claim is supported by these checks. Model behavior depends on the host model, other instructions and available tools. The cases are published so others can inspect the criteria and perform their own evaluations.
