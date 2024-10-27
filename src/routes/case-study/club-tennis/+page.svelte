<script>
	import CaseStudyImage from '$components/CaseStudyImage.svelte'
	import CaseStudyIntro from '$components/CaseStudyIntro.svelte'
	import NextCaseStudyScroller from '$components/NextCaseStudyScroller.svelte'
</script>

<main class="case-study">
	<CaseStudyIntro
		title="Club Tennis"
		description="A website created for the Club Tennis team at the University of Pittsburgh, featuring a bespoke design and admin panel made from scratch"
		source="https://github.com/pnm122/pittclubtennis"
		liveSite="https://clubtennisatpitt.org/"
	/>
	<section class="section">
		<CaseStudyImage
			src="/images/club-tennis/cover.png"
			alt="Members page with an announcement visible. The members page of the admin panel points to the members, and the respective announcement page points to the announcement."
			placement="full-width"
			aspectRatio="1512/1152"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Overview</h2>
		<div class="section__text">
			<p>
				I created this website for the Club Tennis team at the University of Pittsburgh. It features
				5 public-facing pages: a homepage, about, fundraisers, tournaments, and members. It also has
				a fully-custom admin panel, allowing Club Tennis board members to easily edit data
				throughout the website. I created the public website in mid-2023, and then added the admin
				panel in mid-2024.
			</p>
		</div>
	</section>
	<section class="section">
		<h2 class="section__title">Motivation</h2>
		<div class="section__text">
			<p>
				Like many other students, looking for clubs to join was one of the first things I did when I
				decided to attend the University of Pittsburgh. Since I was an avid tennis player, the Club
				Tennis team was one of the first clubs I looked at. However, I struggled to find accurate
				and up-to-date information, since the team had three separate websites, all of which were no
				longer updated. In fact, I initially didn’t try out for the club because these websites gave
				me the impression that practices and travel tournaments were mandatory, so joining the club
				would likely be overwhelming for me.
			</p>
			<p>
				When I ultimately did try out and make the team, I realized that my impression wasn’t right.
				I also imagined how valuable it would have been to have clear and up-to-date information
				about the club when I had looked initially. When I took the role of Social Chair in the
				club, I made the promise to create a new website for club, with transparent information and
				a way to be maintained after I graduated.
			</p>
		</div>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Process</h2>
			<h3 class="subtext">pt. 1 of 3</h3>
		</div>
		<div class="section__text">
			<p>
				My process began with a discovery and content writing phase. Before creating any mockups or
				designs, I needed to first identify what content I wanted on the website.
			</p>
			<p>
				When I was looking into the club, I knew that I wanted specific information about practices,
				tournaments, and tryouts. One of my main goals from the start was to introduce as much
				transparency as possible, so I included specific details about costs, times, expectations of
				members, and more.
			</p>
			<p>
				Since the club relies fairly heavily on fundraisers, I realized a fundraiser page on the
				website could help bring more visibility to them. While thinking about this, I noted that I
				need some way of announcing to visitors when the club has an active fundraiser or any other
				important announcement.
			</p>
			<p>
				I also believed a tournaments page with information about upcoming and previous tournaments
				could be useful for multiple reasons: it allows people interested in joining the club to get
				a sense of how often and where the club goes to tournaments, tells those who want to watch
				the tournaments when and where to go, and gives a place for the club to show off when they
				place in tournaments.
			</p>
			<p>
				Finally, I chose to include a members page with pictures and names of all the players in the
				club. I thought this page could bring some personality to the site, as well as give current
				members some recognition.
			</p>
			<p>
				Throughout this phase, I worked closely with the presidents of the club to ensure I had
				accurate and complete information and was maximizing the value of having a website.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/club-tennis/about.png"
			alt="About page"
			placement="half-first"
			aspectRatio="1146/625"
		/>
		<CaseStudyImage
			src="/images/club-tennis/tryouts.png"
			alt="Tryouts page"
			placement="half-last"
			aspectRatio="1146/625"
		/>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Process</h2>
			<h3 class="subtext">pt. 2 of 3</h3>
		</div>
		<div class="section__text">
			<p>
				After the discovery and content writing phase, I started iterating design ideas in Figma. My
				goal was generally to keep the layout simple and flexible enough to look great on both
				mobile and desktop. After several iterations, I ultimately settled on a design that
				incorporates the University of Pittsburgh colors with a style inspired by other sports-based
				websites. I used a font I found on the <a
					href="https://cincinnatiopen.com/"
					rel="noopener noreferrer"
					target="_blank">Cincinnati Open tennis tournament website</a
				>, and designed quick, snappy animations to enhance the “sporty” aesthetic. At this point, I
				also needed to create the hero image from scratch. The hero image comes from an action shot
				taken at a tournament, with the background removed and effects added.
			</p>
			<p>
				Once I had created both desktop and mobile designs and ideated animations, I started
				bringing it to life. I used React for the frontend, since it was the framework I was most
				comfortable and familiar with at the time. I also chose to use Firebase for storing
				information that would change over time: tournaments, members, fundraisers tryouts
				information, and the announcement on the site. Firebase also comes with storage, which I
				used to store images of the members. When I was creating the site, my plan was to maintain
				all of this information by manually entering data into Firebase’s web interface until
				eventually creating an admin panel that would make editing data easy and accessible for
				future maintainers. I chose this route because I was creating the site at the same time I
				had classes, and felt that creating the admin panel would be too time-intensive until I had
				more time.
			</p>
			<p>
				I created animations on the site using a mixture of CSS and GSAP. I had explored GSAP in
				some small side projects, but I wanted to learn more since I found its capabilities
				fascinating. I ultimately used GSAP for all scroll-triggered animations on the website, as
				well as the hero section entrance animation.
			</p>
		</div>
	</section>
	<section class="section">
		<CaseStudyImage
			src="/images/club-tennis/hero-animation.gif"
			alt="Hero section animation"
			placement="large-first"
			aspectRatio="800/450"
		/>
    <CaseStudyImage
			src="/images/club-tennis/members.png"
			alt="Members page on mid-sized screen, showing two members per row"
			placement="small-last"
			aspectRatio="724/864"
		/>
	</section>
	<section class="section">
		<div class="section__title">
			<h2>Process</h2>
			<h3 class="subtext">pt. 3 of 3</h3>
		</div>
		<div class="section__text">
			<p>
				Nearly a year after finishing the public-facing side of the site, I began working on an
				admin panel that would allow future members to edit the site without any technical
				knowledge. Inspired by working on the component library at Chatham Financial, I created
				several custom components from scratch. These components included a date picker, highly
				customizable table, file dropper, select, checkbox, input, text area, drawer, and popup. The
				process of creating these components was challenging, but insightful.
			</p>
			<p>
				Once these components were ready for use, I began creating pages that enabled maintainers to
				create, update, and delete content. This process was mostly an exercise in state management
				and using Firebase’s APIs.
			</p>
		</div>
	</section>
  <section class="section">
		<CaseStudyImage
			src="/images/club-tennis/members-admin.png"
			alt="Admin panel members page. It contains a table with each of the members' name, year, role, and whether their image has been uploaded."
			placement="half-first"
			aspectRatio="1144/1014"
		/>
		<CaseStudyImage
			src="/images/club-tennis/members-admin-edit.png"
			alt="Admin panel members page with a side panel visible. The side panel contains a form to let an admin edit the selected member."
			placement="half-last"
			aspectRatio="1144/1014"
		/>
    <CaseStudyImage
			src="/images/club-tennis/tournaments-admin-edit.png"
			alt="Admin panel tournaments page with a side panel visible. The side panel contains a form to edit the tournament, and a date is current being selected using a date picker."
			placement="full-width"
			aspectRatio="1596/1079"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Final Product</h2>
		<div class="section__text">
			<p>
				Since its creation, the Club Tennis website has averaged about 450 impressions and 60 clicks
				per month (as of October 2024). The completed site has the following features:
			</p>
			<ul>
				<li>A homepage with an animated hero section</li>
				<li>
					About, tryouts, fundraisers, tournaments, and members pages with up-to-date information
				</li>
				<li>An announcement that appears when the page loads if one exists</li>
				<li>
					An admin panel allowing club tennis board members to edit tryouts, fundraisers,
					tournaments, members, and the announcement
				</li>
				<li>A responsive design</li>
				<li>Scroll-driven section animations</li>
				<li>
					Basic SEO optimizations to ensure the site appears in search results (historically appears
					first for searches “pitt club tennis” and “pitt tennis club”)
				</li>
			</ul>
		</div>
	</section>
  <section class="section">
		<CaseStudyImage
			src="/images/club-tennis/hero-section.png"
			alt="Hero section of the homepage on a desktop screen."
			placement="large-first"
			aspectRatio="1150/625"
		/>
		<CaseStudyImage
			src="/images/club-tennis/hero-mobile.png"
			alt="Hero section of the homepage on a mobile screen."
			placement="small-last"
			aspectRatio="492/805"
		/>
    <CaseStudyImage
			src="/images/club-tennis/announcement-admin-mobile.png"
			alt="Admin panel announcement page."
			placement="small-first"
			aspectRatio="384/1009"
		/>
    <CaseStudyImage
			src="/images/club-tennis/tournaments.png"
			alt="Tournaments page. It shows information about several past tournaments, including the name, dates, location, and team's placement."
			placement="large-last"
			aspectRatio="1144/1248"
		/>
	</section>
	<section class="section">
		<h2 class="section__title">Insights</h2>
		<div class="section__text">
			<p>
				My biggest takeaway from this project was expanding my knowledge of web development tools
				significantly. I learned how to use GSAP to bring my animation ideas to life. I also
				deepened my knowledge of React, using state reducers for the first time and learning how to
				create protected routes integrated with Firebase. Additionally, while working on the custom
				components for the admin panel, I explored more advanced TypeScript features, like generics,
				keyof & typeof, and mapped types.
			</p>
			<p>
				While creating the Club Tennis site, I handled every part of the process: ideation, design,
				development, and deployment. This project boosted my skills and confidence in each of these
				areas, and made me a more well-rounded developer and designer.
			</p>
		</div>
	</section>
</main>
<NextCaseStudyScroller
  slug="spelling-bee"
  title="Spelling Bee"
  image="/images/spelling-bee/gameplay.png"
/>

<style lang="scss">
	@import '$scss/case-study';
</style>
