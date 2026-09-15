# Evaluation scope

Version 0.1.0 is a documented workflow with development checks. Its effectiveness in professional decisions and its effect on human understanding have not been established.

## What can be checked directly

- The skill package contains its referenced local resources and a valid entrypoint.
- Local documentation links resolve and the seven SVG figures have text, titles and descriptions.
- PNG exports match the source dimensions at twice the resolution.
- The fictional pilot's arithmetic is reproducible.
- An agent can apply the skill to concrete advisory requests.

The first four are repository integrity checks. The last is a behavioral development check. None measures business outcomes or retained human competence.

## Development protocol

The [four cases](../evals/cases.md) and [review criteria](../evals/rubric.md) were frozen before the initial skill was authored. The cases cover a misleading pilot summary, unagreed preference weights, a trivial reversible task, and a recommendation invalidated by new evidence.

One agent context answered all four cases without the new skill. A separate context received the skill and the same cases. Both were limited to the supplied facts and 450 words per case. No web search or external actions were allowed. The criteria and other response were withheld from the solving contexts. Repository authoring and these checks used the same host environment, whose other instructions can affect behavior.

The responses are grouped within each context, not statistically independent repeated trials. This is a small, author-designed development exercise. It does not isolate a causal effect of the skill, compare all relevant alternatives or estimate a general failure rate. The baseline already handled the principal arithmetic and judgment issues well.

Actual responses and the [review](../evals/review.md) are retained in `evals/`. The initial skill-assisted response contained an imprecise cash-saving statement, while the baseline left its review trigger implicit. The skill was clarified and the affected case was repeated in a fresh context. A strong baseline and a failed detail are useful findings, not reasons to invent an improvement claim.

In that [follow-up](../evals/pilot-recheck.md), the response correctly separated released capacity, operational value and cash savings. It also identified exactly 2.5 net minutes as the first-year break-even point and 1.5 minutes as the recurring break-even point. This single observed correction does not establish reliability across future cases. The tested release entrypoint has SHA-256 `7fa522586c6c429de2f2200bb08b8309e4e86e10f3ad6f28bb4e004779e91d70`.

## Evidence needed for stronger claims

An effectiveness study would need a declared question, appropriate sample size, unseen cases, comparable models and tool budgets, repeated runs, and independent blinded assessment. At minimum it should compare ordinary assistance, a simple Pólya instruction and this skill. Assess factual correctness, omitted material assumptions, option quality, decision traceability and time or interruption cost separately.

Human understanding requires human participants. A study could ask participants to explain the recommendation, identify its decisive assumption and respond to a changed scenario without the original answer. Consent, appropriate study design and a distinction between immediate understanding and lasting competence are necessary. The skill's request for reflection is not itself evidence that reflection occurred.

## Reporting policy

Publish unsuccessful cases and changes in criteria. Separate absolute usefulness from improvement over an alternative. Do not turn compliance with a template into a claim of correct judgment. Do not describe this project as preventing hallucinations, eliminating overreliance or preserving intelligence.
