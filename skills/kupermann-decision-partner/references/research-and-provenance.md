# Research and provenance

The sources below motivate design choices. None evaluates Kupermann Decision Partner. The application to experienced advisers and decision-makers is a design hypothesis, not an established treatment effect.

## Pólya: a structure for problem solving

**G. Pólya. _How to Solve It: A New Aspect of Mathematical Method_. Princeton University Press, first published 1945.** [Publisher's book on JSTOR](https://www.jstor.org/stable/j.ctvc773pk).

The book supplies the organising idea: understand a problem, develop an approach, execute it and examine the result. This skill adapts that structure to organisational decisions. It adds explicit decision authority, trade-offs, proportionate evidence work and a revisitable brief. Those additions are this project's synthesis, not claims about Pólya's original text.

## Cognitive offloading

**Risko, E. F., and Gilbert, S. J. (2016). Cognitive Offloading. _Trends in Cognitive Sciences_, 20(9), 676–688.** [Author manuscript](https://discovery.ucl.ac.uk/id/eprint/1508770/1/gilbert_TiCS_OFFLOADING_RPS.pdf).

This review explains the use of external resources to reduce cognitive demands. Offloading can help; its consequences depend on what is delegated. It predates current generative AI and is not a trial of this workflow. Our design separates useful delegation from the ownership of goals and judgment.

## Critical thinking in knowledge work

**Lee et al. (2025). The Impact of Generative AI on Critical Thinking. _CHI 2025_.** [Original paper](https://www.microsoft.com/en-us/research/wp-content/uploads/2025/01/lee_2025_ai_critical_thinking_survey.pdf).

A survey of 319 knowledge workers links confidence in generative AI with less reported critical thinking. It also describes a shift toward verification and task stewardship. Self-report and association do not establish loss of ability or causation. We treat active scrutiny as a design priority, not a proven outcome of the skill.

## Interventions against overreliance

**Buçinca, Z., Malaya, M. B., and Gajos, K. Z. (2021). To Trust or to Think. _Proceedings of the ACM on Human-Computer Interaction_, 5(CSCW1), Article 188.** [Original paper](https://kgajos.seas.harvard.edu/papers/bucinca21trust.pdf).

In a controlled experiment with simulated AI, interventions reduced acceptance of incorrect advice. Overall performance did not significantly improve over simple explanation interfaces, and friction affected user ratings. The limited task differs from professional advisory work. This supports testing selective reflection, not making every step slower.

## Supported performance and independent learning

**Bastani et al. (2025). Generative AI without guardrails can harm learning. _PNAS_, 122(26), e2422633122.** [Published study](https://doi.org/10.1073/pnas.2422633122) · [Author manuscript](https://hamsabastani.github.io/education_llm.pdf).

In a school mathematics field experiment, improved assisted practice did not necessarily carry over to unaided performance. Tutor safeguards largely mitigated the negative effect found with a basic interface. This is not evidence of lasting impairment or effects in experienced managers. We separate output quality from human understanding. [Correction](https://doi.org/10.1073/pnas.2518204122) concerns an author affiliation.

## Attribution and scope

Michael Kupermann developed this implementation from his [Kupermann Agent Skills](https://github.com/mkupermann/KupermannAgentSkills), with the sources above credited for their distinct contributions. The repository does not reproduce the book or papers. No affiliation or endorsement by their authors or publishers is implied.

The research motivates the choice of safeguards. Instruction compliance, decision quality, cognitive outcomes and economic benefit are separate claims. Each needs its own evidence. The project's development checks are described in [the evaluation record](https://github.com/mkupermann/kupermann-decision-partner/blob/main/docs/evaluation.md); using the skill does not require that page.
