<script>
	import CaseStudyImage from '$components/CaseStudyImage.svelte'
	import CaseStudyIntro from '$components/CaseStudyIntro.svelte'
	import NextCaseStudyScroller from '$components/NextCaseStudyScroller.svelte'
</script>

<svelte:head>
  <title>Case Study | Chatham Financial</title>
</svelte:head>

<main class="case-study">
	<CaseStudyIntro
		title="Chatham Financial"
		description="A collection of projects from my internship at Chatham Financial, primarily focused on improving their design system"
		smallTitle={true}
	/>
	<section class="section">
		<CaseStudyImage
			src="/images/chatham-financial/icons.png"
			alt="A grid of icons relating to projects I worked on at Chatham Financial"
			placement="full-width"
			aspectRatio="1280/1088"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Overview</h2>
		<div class="section__text">
			<p>
				I was hired at Chatham Financial as an intern on the design system team. This team
				maintained internal tools focused on keeping the look and feel of their products consistent.
				My primary role was to contribute to their component library by writing code. I also worked
				in Figma with UI designers to improve the design of several components and pages.
			</p>
		</div>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Component Library</h2>
			<h3 class="subtext">pt. 1 of 2</h3>
		</div>
		<div class="section__text">
			<p>
				My main task throughout my 10-week internship was to address issues from a backlog for the
				component library. These issues were generally either bugs or feature requests submitted by
				developers using the component library throughout Chatham. Over the course of my internship,
				I created, added features to, or maintained 15 components, making 28 changes. These changes
				ranged from simple 30-minute bug fixes to week-long component overhauls.
			</p>
			<p>
				Of these changes, I spent the most time working on their date picker and date range picker
				components, making three changes:
			</p>
			<ul>
				<li>Adding keyboard navigation to the date picker</li>
				<li>Adding keyboard navigation to the date range picker</li>
				<li>Updating the designs of both components</li>
			</ul>
			<p>
				First, I worked on adding keyboard navigation to the date picker components. Prior to
				tackling these issues, the components had popups that were hidden from accessibility tooling
				and keyboard navigation. This posed several accessibility and user experience problems,
				including:
			</p>
			<ul>
				<li>
					The component becomes significantly harder to use for people who can’t or don’t use a
					mouse.
				</li>
				<li>
					Users familiar with keyboard navigation patterns will be frustrated by the components’
					lack of support.
				</li>
			</ul>
			<p>
				Adding keyboard navigation took a significant amount of time and effort because it came with
				many considerations. For one, the functionality should follow best practices and common
				patterns. I followed the ARIA Authoring Practices Guide while working on these issues to
				ensure my implementation met the gold standard. My implementation also had to be accessible,
				so all Chatham clients would be able to use the components easily. For example, visual
				indicators such as focus and selected states had to be clearly visible (i.e. meet a minimum
				standard for contrast and spacing). I worked with the screen reader NVDA to optimize the
				components for screen readers. I also wrote a custom solution for “focus trapping,” where
				keyboard-based focus is contained within the popup once the user focuses into the popup.
				This ensures that the keyboard users (and particularly screen reader users) won’t get
				confused by accidentally leaving the context of the popup while expecting to navigate within
				the popup.
			</p>
			<p>
				These new features needed to be tested extensively, to ensure they work both at the time of
				writing the code as well as when future changes are made. I wrote dozens of unit tests in
				Jasmine for these changes, as well as refactoring many existing tests and deleting many that
				were obsolete.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/chatham-financial/date-range-picker-keyboard.gif"
			alt="Date range picker keyboard navigation demonstration"
			placement="half-first"
			aspectRatio="512/391"
			contain
		/>
		<CaseStudyImage
			src="/images/chatham-financial/date-picker-keyboard.gif"
			alt="Date picker keyboard navigation demonstration"
			placement="small-last"
			aspectRatio="334/402"
			contain
		/>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Component Library</h2>
			<h3 class="subtext">pt. 2 of 2</h3>
		</div>
		<div class="section__text">
			<p>
				I also took initiative to update the design of their date picker components. Originally, I
				noticed that they had a design in Figma that improved upon the version that had been coded.
				My initial plan was to simply implement this new design—however, I realized that it actually
				could be improved further. I collaborated with UI designers to make these improvements in
				Figma, then I implemented the changes in Stencil and SCSS.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/chatham-financial/date-range-picker-changes.png"
			alt="Date range picker design changes"
			placement="full-width"
			aspectRatio="1144/432"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Design Tokens</h2>
		<div class="section__text">
			<p>
				I also spent around 2 weeks helping with Chatham’s implementation of design tokens<sup
					><a id="design-tokens" href="#design-tokens-footnote">[1]</a></sup
				>. Their design system suffered from inconsistencies between designs and implementations,
				largely stemming from not having a system for variables; design tokens were an attempt at
				fixing this problem. My role in this process was to create a system for automatically
				transferring design tokens in Figma to variables usable by our developers.
			</p>
			<p>
				Originally, I was given some research done by another employee into how such a system should
				be designed, weighing several different options. After doing plenty of my own research,
				testing, and talking to my mentors, I decided on the following system: a GitLab pipeline
				that runs daily, fetching variables from Chatham’s design system Figma file and converting
				them into SCSS variables. The pipeline then compares these variables to the most recently
				published package; if they’ve changed, it then uploads a new package.
			</p>
			<p>The system I created came with several benefits:</p>
			<ul>
				<li>
					It automatically keeps the code up to date with UI designers’ decisions, while leaving the
					flexibility to manually run the pipeline in the case that an update is needed immediately.
				</li>
				<li>
					It is flexible, accounting for new variables and variables with different units, as well
					as future light and dark modes.
				</li>
			</ul>
			<dl>
				<dt id="design-tokens-footnote">[1]</dt>
				<dd>
					design tokens: "...[a representation of] the small, repeated design decisions that make up
					a design system’s visual style.” (<a
						href="https://m3.material.io/foundations/design-tokens/overview"
						rel="noopener noreferrer"
						target="_blank">Material Design</a
					>). They’re essentially organized variables for color, font styles, sizes, etc.
					<a href="#design-tokens">↩</a>
				</dd>
			</dl>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/chatham-financial/pipeline-diagram.png"
			alt="Diagram of pipeline explained in previous paragraph"
			placement="half-center"
			aspectRatio="546/730"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Challenges</h2>
		<div class="section__text">
			<p>
				While my experiences from freelancing, schoolwork, and personal projects made me comfortable
				with TypeScript, frontend frameworks, SCSS, and more, I also had to overcome many
				challenges.
			</p>
			<p>
				My greatest challenge was unit testing. I had only a surface-level understanding of unit
				tests from schoolwork, so throwing myself into a large project with complex unit tests was
				difficult. I spent a lot of my time learning syntax, understanding best practices, and
				debugging many tests.
			</p>
			<p>
				Adding keyboard navigation to the date pickers was also particularly challenging. I had to
				try several different approaches before finding one that was best suited for Chatham’s
				needs. It also tested my knowledge of accessibility, Stencil and frontend frameworks
				generally, and TypeScript.
			</p>
			<p>
				I spent a considerable amount of time creating a system design for the design tokens project
				as well. Without any template and very few examples to pull from, I had to find answers to
				questions like: How will Figma updates feed into code? What libraries do we need? What’s the
				best way to name things so that they’re understandable for designers and usable for code?
			</p>
			<p>
				Finally, I had to learn how to use GitLab pipelines for the design tokens project. I had
				very seldom worked with pipelines before, so almost everything I created was new to me. I
				used examples from Chatham, researched, and talked to my mentors extensively throughout the
				process.
			</p>
		</div>
	</section>
	<section class="section">
		<h2 class="section__title">Insights</h2>
		<div class="section__text">
			<p>
				Overall, my experience at Chatham was incredibly rewarding. I learned much more than I had
				expected in such a short time frame. I deepened my knowledge of TypeScript, shadow DOMs,
				ARIA and accessibility, Stencil, SCSS, Git, and Figma. I also gained a working knowledge of
				pipelines, unit testing, and design systems. Additionally, I was lucky enough to work with
				talented, knowledgeable people, so I learned a lot about asking good questions.
			</p>
			<p>
				One of the most valuable takeaways I had from working closely with experienced designers was
				to materialize every idea. When I first saw their Figma files, I was shocked to see how many
				ideas they would put down for one problem. I realized by watching and trying myself that
				it’s often easiest to generate great ideas when you’re not afraid to try everything.
			</p>
		</div>
	</section>
</main>
<NextCaseStudyScroller
	slug="club-tennis"
	title="Club Tennis"
	image="/images/club-tennis/hero-section.png"
/>

<style lang="scss">
	@import '$scss/case-study';
</style>
