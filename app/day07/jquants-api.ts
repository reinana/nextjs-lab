// Next_lab/app/day07/jquants-api.ts
"use server";

const JQUANTS_API_URL = "https://api.jquants.com/v1";

const EMAIL = process.env.JQUANTS_API_EMAIL;
const PASSWORD = process.env.JQUANTS_API_PASSWORD;

class JQuantsApiError extends Error {
    constructor(message: string, public status?: number) {
        super(message);
        this.name = "JQuantsApiError";
    }
}

// ユーザー認証を行い、refreshToken を取得する関数
async function getRefreshToken(): Promise<string> {
    if (!EMAIL || !PASSWORD) {
        throw new JQuantsApiError(
            "JQuants API Email or Password is not set in environment variables.",
            500
        );
    }

    try {
        const res = await fetch(`${JQUANTS_API_URL}/token/auth_user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ mailaddress: EMAIL, password: PASSWORD }),
            cache: "no-store",
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new JQuantsApiError(
                `Failed to get refresh token: ${
                    errorData.message || res.statusText
                }`,
                res.status
            );
        }

        const data = await res.json();
        console.log("J-Quants Auth User Response (for refresh token):", data);
        if (!data.refreshToken) {
            throw new JQuantsApiError(
                "Refresh token not found in response from auth_user.",
                500
            );
        }
        return data.refreshToken;
    } catch (error) {
        console.error("Error getting J-Quants refresh token:", error);
        throw new JQuantsApiError(
            `Could not authenticate with J-Quants API. Details: ${
                error instanceof Error ? error.message : String(error)
            }`,
            500
        );
    }
}

// リフレッシュトークンを使って idToken (アクセストークン) を取得する関数
async function getIdToken(refreshToken: string): Promise<string> {
    try {
        // ★★★ ここを修正！エンドポイントとクエリパラメータの渡し方 ★★★
        const res = await fetch(
            `${JQUANTS_API_URL}/token/auth_refresh?refreshtoken=${refreshToken}`,
            {
                method: "POST", // POSTメソッドは維持
                // Request Bodyは不要なので削除
                headers: {
                    "Content-Type": "application/json", // ヘッダーは残しておく方が安全
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new JQuantsApiError(
                `Failed to get ID token: ${
                    errorData.message || res.statusText
                }`,
                res.status
            );
        }

        const data = await res.json();
        console.log("J-Quants Auth Refresh Response (for ID token):", data);
        if (!data.idToken) {
            throw new JQuantsApiError(
                "ID token not found in auth_refresh response.",
                500
            );
        }
        return data.idToken;
    } catch (error) {
        console.error("Error getting J-Quants ID token:", error);
        throw new JQuantsApiError(
            `Could not refresh token for J-Quants API. Details: ${
                error instanceof Error ? error.message : String(error)
            }`,
            500
        );
    }
}

export type DailyPrice = {
    Date: string;
    Code: string;
    Open: number;
    High: number;
    Low: number;
    Close: number;
    Volume: number;
};

// 特定の銘柄の株価データを取得するServer Action
export async function fetchDailyPrices(
    code: string,
    startDate: string,
    endDate: string
): Promise<DailyPrice[]> {
    try {
        // 1. リフレッシュトークンを取得
        const refreshToken = await getRefreshToken();
        // 2. リフレッシュトークンを使って idToken (アクセストークン) を取得
        const idToken = await getIdToken(refreshToken);

        // 意図的な遅延を挿入（useTransitionの効果確認用）
        await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒の遅延

        // 株価データを取得
        const res = await fetch(
            `${JQUANTS_API_URL}/prices/daily_quotes?code=${code}&from=${startDate}&to=${endDate}`,
            {
                headers: {
                    Authorization: `Bearer ${idToken}`, // idToken を使用
                },
                cache: "no-store",
            }
        );

        if (!res.ok) {
            const errorData = await res.json();
            throw new JQuantsApiError(
                `Failed to fetch daily prices: ${
                    errorData.message || res.statusText
                }`,
                res.status
            );
        }

        const data = await res.json();
        return data.daily_quotes || [];
    } catch (error) {
        console.error(`Error fetching daily prices for ${code}:`, error);
        if (error instanceof JQuantsApiError) {
            throw error;
        }
        throw new JQuantsApiError(
            `Failed to fetch stock data. Details: ${
                error instanceof Error ? error.message : String(error)
            }`,
            500
        );
    }
}
