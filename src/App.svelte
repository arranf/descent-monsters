<script lang="ts">
  import { onMount } from "svelte";
  import { monsters } from "./monsters";
  import { Act, Trait, Expansion, Monster, Tier } from "./models";
  import { traitTooltip, valueForTier } from "./utils";

  let loading = false;
  let loadingCancel;
  let activeTraits: Trait[];
  let activeExpansions: Expansion[];
  let activeAct: Act | null = "I";
  let filteredMonsters: Monster[];

  const persist = (): void => {
    loading = true;
    if (loadingCancel) {
      clearTimeout(loadingCancel);
    }
    localStorage.setItem(
      "settings",
      JSON.stringify({ activeExpansions, activeTraits })
    );
    loadingCancel = setTimeout(() => (loading = false), 400);
  };

  function filter(monsters: Monster[]) {
    let filtered = monsters
      .filter((m) => (m.act ? m.act === activeAct : true))
      .filter((m) =>
        activeTraits.length == 0
          ? true
          : m.traits.some((t) => activeTraits.includes(t))
      )
      .filter((m) =>
        activeExpansions.length == 0
          ? true
          : activeExpansions.includes(m.expansion)
      );
    if (activeTraits.length > 0 || activeExpansions.length > 0) {
      filtered = filtered.sort(
        (a, b) => valueForTier(a.tier) - valueForTier(b.tier)
      );
    }
    return filtered;
  }

  function toggleExpansion(expansion: Expansion) {
    const indexOf = activeExpansions.indexOf(expansion);
    if (indexOf >= 0) {
      activeExpansions.splice(indexOf, 1);
    } else {
      activeExpansions.push(expansion);
    }
    activeExpansions = activeExpansions;
    filteredMonsters = filter(monsters);
    persist();
  }

  function toggleTrait(trait: Trait) {
    const indexOf = activeTraits.indexOf(trait);
    if (indexOf >= 0) {
      activeTraits.splice(indexOf, 1);
    } else {
      activeTraits.push(trait);
    }
    activeTraits = activeTraits;
    filteredMonsters = filter(monsters);
    persist();
  }

  function getSettings(): { activeTraits: Trait[]; activeExpansions: [] } {
    return (
      JSON.parse(localStorage.getItem("settings")) || {
        activeTraits: [],
        activeExpansions: [],
      }
    );
  }

  onMount(async () => {
    loading = true;
    let settings = getSettings();
    activeExpansions = settings.activeExpansions;
    activeTraits = settings.activeTraits;
    filteredMonsters = filter(monsters);

    loadingCancel = setTimeout(() => (loading = false), 400);
  });
</script>

<main>
  {#if activeTraits && activeExpansions && filteredMonsters}
    <header class="bg-white shadow">
      <div class="py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">
          {filteredMonsters.length} Monsters
        </h1>
      </div>
    </header>
    <main>
      <div class="mx-4 py-6 sm:px-6 lg:px-8">
        <div class="bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="my-2 pb-5 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Expansions
              </h3>
            </div>

            <div>
              {#each Object.values(Expansion) as expansion}
                <button
                  on:click={() => toggleExpansion(expansion)}
                  type="button"
                  class="inline-flex items-center mx-2 my-1 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 {activeExpansions.includes(
                    expansion
                  )
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 '
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 '}"
                  >{expansion}</button
                >
              {/each}
            </div>
          </div>
        </div>

        <div class="my-6 bg-white overflow-hidden shadow rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <div class="my-2 pb-5 border-b border-gray-200">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Environments
              </h3>
            </div>

            <div>
              {#each Object.values(Trait) as trait}
                <button
                  type="button"
                  class="inline-flex items-center mx-2 my-1 px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 {activeTraits.includes(
                    trait
                  )
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500 '
                    : 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500 '}"
                  data-tooltip={traitTooltip(trait)}
                  on:click={() => toggleTrait(trait)}>{trait}</button
                >
              {/each}
            </div>
          </div>
        </div>

        <ul
          role="list"
          class="mt-3 grid grid-cols-1 gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {#each filteredMonsters as monster}
            <li class="col-span-1 flex shadow-sm rounded-md">
              <div
                class="flex-shrink-0 flex items-center justify-center w-16 bg-pink-600 text-white text-sm font-medium rounded-l-md"
              >
                {monster.attack}
              </div>
              <div
                class="flex-1 flex items-center justify-between border-t border-r border-b border-gray-200 bg-white rounded-r-md truncate"
              >
                <div class="flex-1 px-4 py-2 text-sm truncate">
                  <a
                    href={monster.link}
                    target="_blank"
                    class="text-gray-900 font-medium hover:text-gray-600"
                    >{monster.name}</a
                  >
                  <p class="text-gray-500">{monster.traits}</p>
                </div>

                <span
                  class="flex-shrink-0 inline-block mx-1 px-2 py-0.5 text-xs font-medium rounded-full {monster.tier ===
                  Tier.ONE
                    ? 'bg-green-100  text-green-800'
                    : monster.tier === Tier.TWO
                    ? 'bg-yellow-100  text-yellow-800'
                    : 'bg-red-100  text-red-800'}">{monster.tier}</span
                >
              </div>
            </li>
          {/each}
        </ul>
      </div>
    </main>
  {/if}
</main>
