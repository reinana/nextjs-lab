"use server";

export type Pokemon = {
    name: string;
    image: string;
    types: string[];
};

// ランダムに1体取得
export async function fetchRandomPokemon(): Promise<Pokemon> {
    const maxId = 1010;
    const randomId = Math.floor(Math.random() * maxId) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

    const data = await res.json();
    return {
        name: data.name,
        image: data.sprites.front_default || "",
        types: data.types.map((t: { type: { name: string } }) => t.type.name),
    };
}

// コレクションに追加
export async function addToCollection(
    collection: Pokemon[],
    newPokemon: Pokemon
): Promise<Pokemon[]> {
    const exists = collection.find((p) => p.name === newPokemon.name);
    return exists ? collection : [...collection, newPokemon];
}

/**
 * IDまたは名前からポケモンを取得
 */
export async function fetchPokemonByIdOrName(
    idOrName: string
): Promise<Pokemon | null> {
    try {
        const res = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${idOrName}`
        );
        if (!res.ok) return null;

        const data = await res.json();
        return {
            name: data.name,
            image: data.sprites?.front_default ?? "",
            types: data.types.map(
                (t: { type: { name: string } }) => t.type.name
            ),
        };
    } catch (e) {
        console.error("Fetch failed:", e);
        return null;
    }
}

/**
 * 名前からポケモンを取得（例: pikachu）
 */
export async function getPokemonByName(name: string): Promise<Pokemon | null> {
    return await fetchPokemonByIdOrName(name.toLowerCase());
}

export async function getRandomPokemon(): Promise<Pokemon> {
    const maxId = 1010; // 現在のポケモン数（お好みで調整可能）
    const randomId = Math.floor(Math.random() * maxId) + 1;
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`);

    if (!res.ok) {
        throw new Error("ポケモン取得に失敗しました");
    }

    const data = await res.json();

    return {
        name: data.name,
        image: data.sprites.front_default || "",
        types: data.types.map((t: { type: { name: string } }) => t.type.name),
    };
}