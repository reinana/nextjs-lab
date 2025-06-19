"use server";

export async function drawOmikuji(): Promise<string> {
    const results = ["大吉", "中吉", "小吉", "末吉", "凶", "大凶"];
    const random = Math.floor(Math.random() * results.length);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // 演出
    return results[random];
}
