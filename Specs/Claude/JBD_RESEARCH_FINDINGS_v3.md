# Reddit Research Findings
## Journey Before Destination

Source: one discussion thread in r/Stormlight_Archive plus one DM, June 2, 2026. 23 responses logged and scored, then pressure-tested in discussion. This is qualitative signal from engaged fans, not market sizing. Read Section 12 for what it does and does not tell us.

---

## 1. The headline

Demand is not the open question. It is settled. Fans connect to these themes with an intensity that showed up in nearly every reply, much of it unprompted and personal. The real question this thread answered is the harder one: **what do people actually do with the themes, and where do they fail.** That is where the build signal is.

One sentence for the call: the concept is validated, and the central design risk is retention, not interest.

**Scoping lens that overrides everything below.** v1 is a learning project that happens to be real, not a product launch. Its first job is to teach the build (React, hooks, Context, state). So every finding here is filtered through one question: does this serve the v1 learning build, or does it describe the eventual product "for others"? Most of the research describes the future product. For v1, the research does two things only: it confirms the core loop (oaths, actions, reflection) is the right thing to learn on, and it hands over a few cheap refinements that make the practice version feel real without adding hard new engineering. Everything ambitious (wallpaper, AI art, streaks, capture-and-resurface) is the reward v1 earns, and not coincidentally the same material that could make a future Sanderson conversation interesting.

---

## 2. The numbers

- 23 responses logged.
- 8 scored a 6 (real, specific, past-or-present behavior with effort already invested). These are the build inputs.
- 14 of 23 were Behavior types. The thread skewed toward people describing what they actually do, not hypotheticals, which is unusually strong signal.
- The "most important step / next step" idea was cited independently by at least four separate respondents, more than any other single reference. The concept the app is named after is the one that resonates most.

---

## 3. The core insight: ambient presence over active retrieval

This came out of pressure-testing, and it is the most useful principle in the document. It reframes nearly everything below.

People do not return to a tool to look up their own meaningful words. The proof is in the room: the most reflective person in this conversation keeps a notes app full of quotes that hit him and almost never reopens it. If the most self-aware end of the audience will not do active retrieval, no one will. A feature whose value depends on the user deciding to go look at something is a dead feature.

What works is the opposite. A tattoo "works" precisely because you never open it. It is ambient, always present, tied to a feeling, woven into your environment without any act of retrieval. The design principle that follows: **put the meaning in front of the user without requiring them to seek it out.** Anything that depends on a deliberate visit is suspect. Anything that surfaces the meaning passively is on-target. This single distinction rules a lot of features in and out fast, and it is the deeper reason the struggler ideas in Section 9 work.

---

## 4. The three behavior modes

The high-scoring replies sorted into three different jobs people do with the material.

**Mode A: Authoring and refining personal oaths (reflective, deliberate).**
Decent_Mind_2564 takes a canonical Windrunner oath and appends a personal clause ("even if they may hate me because of it") tied to a real recurring struggle, and revisits it. SinfulIndy is doing sustained, themes-driven growth work over time. This is the app's core loop, confirmed by real people doing it by hand. Concrete feature insight: people personalize a known oath rather than write from a blank page.

**Mode B: In-the-moment intervention (reactive, at the point of friction).**
Three separate people, so it is a pattern. evlblueyes repeats "journey before destination" when they do not want to work out, and does it anyway. Ornery_Abroad repeats the second Dustbringer ideal during the first 20% of every race. Glassman918 redirects to the present moment when their thoughts race to an outcome. Important caveat, see Section 5: this is almost entirely a phone-in-your-pocket behavior, and it is largely out of reach for a desktop app. The underlying need (the line being present at the moment it is needed) is real, but the answer is ambient presence, not a feature you open.

**Mode C: Self-built progression and streaks (earned advancement).**
Ornery_Abroad only upgrades bike parts when ready to "swear the next ideal," gating real rewards on demonstrated self-mastery. amadnomad runs an unbroken daily habit chain as their biggest deterrent against quitting. Both invented a progression mechanic the spec deferred to Future. Worth deeper ideation later (see Section 7); not a v1 commitment.

---

## 5. Platform reality (this constrains everything)

The app is desktop-first, possibly a companion website later, not a mobile app for now. That is a real constraint on the findings, not a footnote.

A meaningful share of the in-the-moment behavior the thread revealed (Mode B) happens away from a computer: mid-workout, mid-race, mid-spiral. A desktop app structurally cannot be present at those moments. The honest conclusion is to not contort a desktop app into faking a phone use case, and instead focus on what a desktop reflective tool is genuinely good at: authoring and revisiting oaths, sit-down reflection, and owning the one ambient surface a desktop has, the screen you stare at all day.

Note for the future: the ambient-presence insight (Section 3) is the single strongest argument for a phone or companion version later, because the ambient surface most people actually live on is a phone lock screen. Not a reason to build mobile now. A reason to know which idea is quietly pointing there.

---

## 6. What works and what does not

**What works:**
- Personal, self-authored framing. Every high scorer made the material their own rather than using it as-is.
- Lines tied to a real, recurring struggle.
- Ambient presence over retrieval (Section 3).
- Starting from a known oath and personalizing it, rather than a blank page.
- The Stormlight framing itself, and Order identity specifically, which is psychologically active rather than decorative. Respondents flair themselves by Order, quote the oaths verbatim, and several describe belonging to an Order as something that carried them through hard times ("seeing myself as part of an Order with ideals has helped me," and "we call each other Radiants, to be a Radiant is to commit to being a better version of yourself"). One person noted the canonical online test "led me to more in-depth conversations with myself about what I actually want out of life," which means choosing an Order is itself a reflective act, not a setting. Design implication: the onboarding "choose your Order" step is potentially one of the app's most meaningful screens, not a throwaway, and a richer, quiz-style Order-selection experience deserves consideration earlier than originally planned. Lean into Order identity throughout.

**What does not:**
- Anything requiring active retrieval of your own saved content.
- Reflection during reading, which fights the narrative pull (Section 8).
- Anything that assumes the user is already disciplined.
- A blank page.

(Correction from the prior draft: an earlier version treated one respondent's distaste for the Ideals framing as a load-bearing signal. That was a single dissenter out of 23, given far too much weight. Cut. The dominant signal is the opposite: the framing is the attraction.)

---

## 7. The gamification question

amadnomad, asked whether the habit chain works because of the streak or the meaning, said "a bit of both, but more the streak itself. After enough time, not doing the habit feels as uncomfortable as doing it did on day one." The streak flips the friction from doing to not-doing, and once flipped it is self-sustaining. The meaning gets you started; the streak takes over.

The resolution is a sharper rule than the spec's current "avoid streaks": **streaks on things that matter, never streaks for their own sake.** A streak on oath actions, framed as a commitment you are keeping rather than points you are earning, is consistent with the app's philosophy. A streak for logging in is the hollow kind to avoid. The distinction is meaning, not the mechanic. This needs more ideation before it becomes a feature; flag it, do not lock it.

---

## 8. The retention problem, named precisely

The most valuable single exchange was the fortnight14 DM. He wants to capture and reflect on the moments that hit him, believes it is valuable, and is certain he will not sustain it: "I just know I will not." The reason is specific and not what you would guess. It is narrative pull. When a moment lands, "the urge to continue on fades the moment." The story drags him forward faster than he can stop, and he reads via audiobook while running.

This is reinforced by the resonance-without-mechanism group, the thread's majority: ArsenalinAlabama ("bad at habits and routine-development"), Glassman ("trying to not rush through life," no described practice), and the many lines-as-touchstones replies. They feel the themes deeply and have built no structure around them. They are the truest target audience and the hardest to retain.

Design implication: capture must be near-zero-friction, reflection should come after the session rather than during, and the app cannot assume users bring discipline. For the strugglers, the app has to supply the scaffolding. See Section 9.

---

## 9. Helping the strugglers (desktop, no social, no therapy)

The design problem: a struggler has to deliberately open a desktop app, so it must earn the open and make the few minutes count. The unifying principle: **lower the cost of a single use, raise the value of returning, never use pressure.** Five directions, all on-premise:

1. **Never show a blank page.** Opening the app shows one thing, today's line or your current oath, plus an optional single box ("anything stirring on this?"). One sentence is a complete, successful use. Strugglers fail at journaling because the implied unit is a paragraph. Shrink the unit until success is trivial.

2. **Cheap capture, reflect later, in one place.** The moment of resonance and the moment you can reflect are different moments. Make dropping a raw fragment (a quote, a word) effortless and pressure-free, then make the reflective surface simply "here are the fragments you saved, want to sit with one?" The in-the-moment job becomes near-zero; the thoughtful part happens when there is headspace.

3. **Returning resumes a thought, it does not start over.** A struggler who reopens the app after five days usually feels behind and bounces. Instead of a guilt-shaped empty state, open on what they last said and carry it forward ("last week you were sitting with being more present, still true?"). Removes the cold-start tax that kills reflection tools. Not a streak, not a notification.

4. **The oath ladder.** Strugglers lack structure; Stormlight hands you one. The Ideals are a sequence. Frame growth as working toward your next personal Ideal, where you define what swearing it means (Decent_Mind and Ornery both did this by hand). The motivation is intrinsic and direction-giving, not a leaderboard. Deeply on-brand.

5. **Their own words, returned.** People come back to the books for the emotional hits, not discipline. Occasionally resurface the user's own past entries or saved lines at the right time ("a month ago this wrecked you, still landing?"). Their own words are more motivating than any prompt you could write, and this is a direct expression of ambient presence (Section 3).

6. **Suggested, personalizable progression for those who cannot define it.** Some users struggle to name meaningful progress in their own lives. Rather than leave them a blank goal, offer gentle starting points rooted in their Order and the Ideals ("many Windrunners focus on protecting one specific person this week"), framed as optional language clearly meant to be rewritten into their own. Guardrail: this must stay fiction-flavored and non-prescriptive. Optional starting templates the user adapts, yes. Advice about their actual problems, no. The moment it reads as life coaching it has drifted into the therapy lane (Section 11).

**The through-line: scaffold, then personalize.** Items 1, 4, and 6 above, plus the personalize-a-canonical-oath insight from Mode A, are all the same move: the app never asks the user to start from nothing. It offers a Stormlight-derived starting point and lets them make it their own. This is the strongest unifying design principle in the research, and it is not a bolted-on self-help framework. It is how the Ideals already work in the books. Every Radiant swears the same Oath and means something personal by it; the higher Ideals are fill-in-the-blank vows each character completes differently. The product pattern mirrors the fiction, which is exactly what will make the app feel native to fans rather than like a habit tracker in costume. Protect this alignment.

**Per-Order ethics map to specific practices.** Fans do not relate to "the ideals" generically. Each Order carries a distinct ethic that people translate into distinct real actions. An Edgedancer learns and tries to remember the names of forgotten victims ("remember the forgotten"). Windrunners frame theirs around protection, Willshapers around freedom. This is direct grounding for the suggested-progression idea (item 6) and for the per-Order prompt content: the Order-specific material is not interchangeable filler, and the suggested starting points should honor each Order's distinct character. It also reinforces the realization above that Order identity is the hook, not the decoration.

---

## 10. How to incorporate the visual/feeling idea without losing the point

The strongest expression of ambient presence for a desktop app is the screen itself. A generated image of your oath, themed to your Order, sized for a desktop wallpaper, is the desktop-native version of the tattoo. You do not open it; it is the backdrop to your day. The existing prototype design language (the stormlight glow, the serif, the night-over-Roshar palette) is already most of the way toward it. The prototype is halfway to a wallpaper.

Decision: this is v2, not v1. It is a genuinely good idea and the most on-brand expression of ambient presence, but it is a novel visual/export feature that would pull focus from the React fundamentals v1 exists to teach. It belongs to the "product for others" version, not the learning build. Park it as a strong, well-understood v2 candidate.

AI-generated, Order-themed art is the same idea with the dial turned up, and clearly later still. Visual, emotional, shareable, on-brand, and exactly the kind of thing that photographs well in a future pitch.

The guardrail. The app cannot manufacture calm, and the moment it adds soundscapes and breathing exercises it becomes a wellness app with Stormlight paint, which is not this product. So do not build a feelings-engine. Let the meaning and the art carry the feeling, borrowed from the source material and from the user's own commitment. The emotion is already attached to the words and the world; render them beautifully and get out of the way.

---

## 11. Duty of care: the heaviest pattern, and it is not a feature

A meaningful share of respondents brought serious personal stakes to these themes, unprompted: 22 months sober alongside Dalinar's recovery arc (Potential-Basis-9853), living with DID and cPTSD (BreakerOfModpacks), growing through a hard upbringing (SinfulIndy), a monumental life change (amadnomad). People are telling you that Stormlight's ideals show up for them at moments of genuine crisis.

This is not a feature, and the app must not become or imply therapy. It is a responsibility line. The product invites people to attach personal oaths and reflection to exactly these themes, so some users will be in fragile places. The tone must stay gentle, non-prescriptive, never pressuring toward heavy self-examination, never positioned as treatment, with a soft, optional, unobtrusive pointer to real resources. This sharpens the existing "not fake therapy language" principle and raises the stakes on getting tone right.

---

## 12. Caveats (so we do not over-read this)

- Self-selected, highly engaged sample from one subreddit. These are people who already apply the themes and chose to reply. They are your enthusiastic core, not the general market, and not the people who would bounce off the app in week one.
- n = 23, qualitative. Patterns are directional, not statistical. Three people doing the same thing is a real pattern at this scale; it is not a measured percentage.
- The strugglers are underrepresented by definition. The people who feel the themes but do nothing are less likely to write a detailed reply, so the retention problem is probably larger than the thread shows.
- This document already self-corrected once (the Ideals-framing over-read in Section 6). Treat every conclusion as revisable signal, not proof.

---

## 13. Strategic north star (not a roadmap item)

Nothing like this exists for Stormlight fans, and a credible long-term possibility is a tasteful, well-used tool that could one day be shown to Brandon Sanderson. The version he would respond to is the one that obviously respects the work and the readers: spoiler-safe, original content, link-out with attribution, non-commercial in posture. That discipline is not just legal cover, it is the exact posture that makes such a conversation conceivable, so keep it religiously.

But this is a consequence of building something genuinely good and used, not a goal to design toward. Build for the pitch and the product bends toward what is impressive instead of what works. Build the thing fans love. The rest, if it happens, follows from that.

---

## 14. Decisions: settled here, and still open for the call

Settled in discussion:
- The Stormlight/Order/Ideals framing is the draw. Lean in, do not soften it.
- "Scaffold, then personalize" is a core design principle (Section 9).
- The oath wallpaper is v2, not v1 (Section 10).
- v1 is a learning build; ambitious features are what it earns (Section 1).

Still open, and genuinely the brother's to weigh in on:
1. **Which of the struggler mechanics (Section 9) make v1 versus v1.1?** The philosophy parts (never a blank page, returning resumes a thought, smallest action feels complete) can shape v1's existing dashboard, journal, and empty states cheaply. The new features (cheap-capture-reflect-later, own-words-returned, suggested progression) depend on more machinery and likely land in v1.1. Decide the split.
2. **Does any meaning-anchored progression (streak or oath-ladder) enter v1, or stay in Future pending ideation?** Leaning Future, given the learning-build scope.
3. **How near-zero-friction capture and reflection-after-not-during get designed**, since that is the retention answer and deserves explicit thought rather than a polish-phase afterthought.
