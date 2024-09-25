<script lang="ts">
	interface Props {
		text: string
		noOverflow?: boolean
	}

	const { text, noOverflow }: Props = $props()
</script>

{#each text.split(/[ \n\t]/) as word}
	{#if noOverflow}
		<span class="word-wrapper">
			<span class="word">
				{#each word as letter}
					<span class="letter">{letter}</span>
				{/each}
			</span>
		</span>
	{:else}
		<span class="word">
			{#each word as letter}
				<span class="letter">{letter}</span>
			{/each}
		</span>
	{/if}
	{' '}
{/each}

<style lang="scss">
	.word {
		position: relative;
		display: inline-block;
	}

	.word-wrapper {
		display: inline-block;
		overflow: hidden;
		vertical-align: top;
	}

	.letter {
		position: relative;
		display: inline-block;
	}
</style>
