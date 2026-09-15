# Public claim register — HOLD-FOR-BRANDON on remaining homepage strings

Branch: `copy/nsf-honest-kinetics`
This file is the checklist for `src/pages/index.astro`, which was not rewritten in this commit because the file is large and tests/visual layout are tight. Apply these replacements on the homepage before merge if they are still present.

## NSF thesis (keep)

The program is a generalization of chemical-kinetics *bookkeeping* to information movement.
Derived transfers: direction as projection; rate-estimate noise floor; source independence as Kish design effect; stiffness as a numerical problem.
Does not transfer: conservation of copies; K_eq for belief; Arrhenius temperature.
Stiff-PINN / stiff training ≠ restoring conservation.

## Homepage replacements

| Find | Replace |
|---|---|
| Before an AI acts on something, it should know whether it&rsquo;s true. | Before an AI acts on something, it should know whether the information holds up for that action. |
| It works like a credit check, except it checks the information an AI is about to rely on instead of checking a borrower. | Delete. |
| U.S. Patent 11,949,124 | Remove from homepage. Keep Celgard one-liner. Patent may stay on /investors. |
| 326 Delaware Street | Remove street. Keep Johnson City, TN. |
| Lane Vector applies the same kind of math to how information and intent move between people and machines. | Chemical kinetics is bookkeeping for rate, direction, and what raises or lowers a barrier. Lane Vector uses that bookkeeping where the transfer is derived (WP-01, WP-02) and stops where conservation, reversibility, or an equilibrium constant would be required. Stiff numerical methods address timescale separation; they do not restore conservation. |

Do not add NSF declined, pre-revenue, sole proprietor, cap table, or first-order language.
Do not invent accuracy % or corpus scores.
