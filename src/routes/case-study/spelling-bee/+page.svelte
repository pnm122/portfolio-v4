<script lang="ts">
	import CaseStudyImage from '$components/CaseStudyImage.svelte'
	import CaseStudyIntro from '$components/CaseStudyIntro.svelte'
	import NextCaseStudyScroller from '$components/NextCaseStudyScroller.svelte'
</script>

<main class="case-study">
	<CaseStudyIntro
		title="Spelling Bee"
		description="A replica of the New York Times’ Spelling Bee game with additional features, including hints and leaderboards."
		source="https://github.com/pnm122/spelling-bee"
		liveSite="https://www.thebetterspellingbee.com"
	/>
	<section>
		<CaseStudyImage
			src="/images/spelling-bee/gameplay.png"
			alt="Screenshot of the Spelling Bee game"
			placement="full-width"
      aspectRatio="2"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Overview</h2>
		<div class="section__text">
			<p>
				Spelling Bee is an improved version of the New York Times’ Spelling Bee game, which I
				designed and developed from scratch. It includes a replica of the original game, with
				custom-built solutions for accounts, a points system, in-game hints, game generation, and
				leaderboards. I was inspired to create the Spelling Bee by the original game both being
				locked behind a paywall and missing features that I believed would improve the game.
			</p>
			<p>
				In the Spelling Bee, the player tries to find as many words as possible using the provided
				letters, with the only restriction being that they must use the center letter in each word.
			</p>
		</div>
		<ul class="section__details skill-list">
			<li class="skill-list__item">Svelte</li>
			<li class="skill-list__item">MongoDB</li>
			<li class="skill-list__item">Figma</li>
			<li class="skill-list__item">Node.js</li>
			<li class="skill-list__item">Express.js</li>
			<li class="skill-list__item">TypeScript</li>
			<li class="skill-list__item">Python</li>
		</ul>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/spelling-bee/game-complete.png"
			alt="A completed Spelling Bee puzzle"
			placement="small-first"
      aspectRatio="1"
		/>
		<CaseStudyImage
			src="/images/spelling-bee/pangram.png"
			alt="A screenshot of the animation that appears when the user finds a pangram"
			placement="large-last"
      aspectRatio="16/9"
		/>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Process</h2>
			<h3 class="subtext">pt. 1 of 2</h3>
		</div>
		<div class="section__text">
			<p>
				I started creating the Spelling Bee by outlining what features I wanted to keep from the
				original, and what I believed needed improvement. Following this, I created layout mockups
				in Figma to figure out how to organize the content I wanted on the page. The layout needed
				to include the main game, header, leaderboard, found words list, and more, while remaining
				mobile-friendly.
			</p>
			<p>
				I then decided on the style of the game, choosing typography and colors, and molding a
				visual identity. I aimed to create a design that was light and fun, but also soft and
				smooth. I chose bright accent colors with soft supporting colors, a friendly yet readable
				and inobtrusive font, and crafted micro-interactions and animations to build a full,
				exciting user experience.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/spelling-bee/wireframe.png"
			alt="Initial wireframes for the Spelling Bee layout"
			placement="full-width"
      aspectRatio="1440/1024"
		/>
		<CaseStudyImage
			src="/images/spelling-bee/color-palette.png"
			alt="The Spelling Bee color palette, with light and dark modes"
			placement="full-width"
      aspectRatio="1088/666"
		/>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Process</h2>
			<h3 class="subtext">pt. 2 of 2</h3>
		</div>
		<div class="section__text">
			<p>
				This project also served as an opportunity to learn a new tech stack that excited me. I
				chose Svelte on the frontend, since I had briefly explored it and found its syntax and
				features interesting. I chose Node.js with the Express.js library as my backend, attempting
				to broaden my knowledge on server-side tools, standards, and best practices. Finally, I
				chose MongoDB as my database, since I already had experience with document-based databases
				like Firebase, but wanted to explore other solutions.
			</p>
			<p>
				I also used Python to filter a dictionary down to words that could appear in Spelling Bee
				puzzles—common nouns at least 4 letters long, with at most 7 unique letters (since puzzles
				only have 7 unique letters each) and no non-alphabetic characters.
			</p>
			<p>
				In addition, I attempted to solve problems from scratch, like user and session management.
				While this is practically a bad idea because it creates more code to maintain and more room
				for bugs than using standard libraries or tools, I chose to do so in an effort to learn more
				about these problems.
			</p>
			<p>
				As the game became nearly complete, I invited friends to play the game and give feedback.
				From this feedback, I found some usability and gameplay issues that I fixed, including
				adding popups to explain features and moving the cursor to the front of “ghost letters” that
				appear after the user has asked for a hint, but has no letters entered. I also found that
				users highly prioritized a “good” dictionary; when I was testing with a dictionary that
				included too many words, the users became frustrated to the point that they wanted to stop
				playing the game.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/spelling-bee/help-text.png"
			alt="A screenshot of the warning that appears when users click the hint button. It contains a description of hints, 'cancel' and 'use hint' buttons, as well as a toggle to not show the warning again"
			placement="half-first"
      aspectRatio="740/791"
		/>
		<CaseStudyImage
			src="/images/spelling-bee/hint-letters.png"
			alt="A screenshot the Spelling Bee game, where the user has taken a hint and the ghost letters are visible"
			placement="half-last"
      aspectRatio="1492/925"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Challenges</h2>
		<div class="section__text">
			<p>
				One of the biggest challenges I faced while working on this project was trying to learn new
				tools as I worked. I ran into difficult state management problems in Svelte, project
				organization difficulties with Node.js, syntax confusion with MongoDB and more.
			</p>
			<p>
				I also spent a considerable amount of time trying to find a usable dictionary for the game.
				All open source dictionaries I found suffered from one of two problems: including “words”
				that weren't real words (i.e. can’t be found on any other dictionary), or the exact
				opposite—missing words. Ultimately, the dictionary I currently use suffers from missing
				words, though it comes fairly close. I made the decision to use a dictionary with some
				missing words rather than too many, because I believed it was more enjoyable than playing
				the game with unguessable words. From testing, users also agreed with this sentiment.
			</p>
			<p>
				Another challenge I faced was creating a layout that worked for both mobile and desktop. For
				mobile, given limited screen space, I had to balance fitting lots of controls and
				information while keeping them large enough and spaced reasonably so the user can still
				easily interact with and read the page. On desktop, my goal was to minimize scrolling while
				accounting for a variety of screen sizes. I wanted the game to seem like it was designed to
				“fit” on-screen. For all devices, I wanted as much of the game to be visible on the screen
				as possible, to minimize the need for interactions to view content. To achieve these goals,
				I heavily relied on CSS grid and media queries.
			</p>
		</div>
	</section>
	<section class="section">
		<h2 class="section__title">Final Product</h2>
		<div class="section__text">
			<p>The final game includes the following features:</p>
			<ul>
				<li>A fully functioning Spelling Bee replica</li>
				<li>Light and dark modes</li>
				<li>Accounts and tracking of statistics such as words found, points earned, etc.</li>
				<li>Random puzzle generated daily</li>
				<li>
					<i>Hints</i> - the user is given the first 3 letters of a random word at the cost of the word
					being worth 1 less point
				</li>
				<li>
					<i>Word previews</i> - the user is given the length and position of the center letter for all
					words in alphabetic order, at the cost of all future words being worth 20% less
				</li>
				<li>A leaderboard to view top scores for each puzzle</li>
				<li>A list of past puzzles to play</li>
				<li>Letter shuffling</li>
				<li>
					Keyboard support for typing letters, submitting words, shuffling letters, and filling in
					hints
				</li>
				<li>Popups for each potentially confusing feature</li>
				<li>Many animations to improve the richness of the user experience</li>
			</ul>
			<p>
				Today, the game still has some known issues and I have many ideas for new features that I
				may slowly add over time. However, it’s still a project I’m very proud of, given that, in
				the process of creating it, I learned new technologies, solved difficult problems, and
				turned an idea into a real product.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/spelling-bee/light-and-dark.png"
			alt="A screenshot of the Spelling Bee game, split to show both the light and dark themes"
			placement="full-width"
      aspectRatio="2"
		/>
		<CaseStudyImage
			src="/images/spelling-bee/word-previews.png"
			alt="An example of word previews for a Spelling Bee puzzle. Each preview has one gray box for each letter, with a yellow box where the center letter appears. One pangram is visible, distinguishable by its letters being purple instead of gray"
			placement="large-first"
      aspectRatio="718/678"
		/>
		<CaseStudyImage
			src="/images/spelling-bee/mobile.png"
			alt="A screenshot of the Spelling Bee game on a mobile screen"
			placement="small-last"
      aspectRatio="449/868"
		/>
		<CaseStudyImage
			src="/images/spelling-bee/profile.png"
			alt="An example of a user's profile. It shows the user's name, rank, points, words found, pangrams found, puzzles played, puzzles solved, and their longest word found"
			placement="full-width"
      aspectRatio="1424/793"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Insights</h2>
		<div class="section__text">
			<p>
				I used an iterative process with user testing and feedback for the first time in one of my
				personal projects. From this process, I reiterated the importance of the idea that “you are
				not the user.” I found that oftentimes, what I thought was crucial for a great user
				experience didn’t align with the actual users’ beliefs. It is, in my opinion, absolutely
				necessary to get feedback from real users to make a great product.
			</p>
			<p>
				I also spent a lot of time working with tools that were new to me, so I was able to develop
				a working knowledge with them. This project gives me a foundation to start from for any
				future project that I want to use Svelte, Node+Express, or MongoDB for. These tools also
				don’t exist in a vacuum—many concepts I tackled are applicable to other frameworks and
				tools.
			</p>
		</div>
	</section>
</main>
<NextCaseStudyScroller
  slug='chatham-financial'
  title='Chatham Financial'
/>

<style lang="scss">
	@import '$scss/case-study';
</style>
