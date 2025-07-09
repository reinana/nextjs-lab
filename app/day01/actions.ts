"use server";

export type Pokemon = {
    name: string;
    image: string;
    types: string[];
};

export async function getRandomPokemon(): Promise<Pokemon> {
    const maxId = 1010; // 現在のポケモン数
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
