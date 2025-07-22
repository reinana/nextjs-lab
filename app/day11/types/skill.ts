// app/day11/types/skill.ts

export type ProficiencyLevel = 1 | 2 | 3 | 4 | 5;

// スキルアイテムの型に、関連プロジェクトIDの配列と「成果物/学習内容」のフィールドを追加
export type SkillItem = {
    id: string; // ユニークなID
    name: string; // スキル名（例: HTML, React, Git）
    proficiency: ProficiencyLevel | ""; // 習熟度
    learningPeriod: string; // 学習期間（例: 2年, 6ヶ月）
    // output: string; // ★削除：これはプロジェクトから自動生成されるため不要
    relatedProjectIds: string[]; // このスキルが使われたプロジェクトのIDリスト
};

// 汎用的なプロジェクト経験の型
export type ProjectExperience = {
  // --- 基本情報 ---
  id: string;               // ユニークなID
  projectName: string;      // プロジェクト名
  period: string;           // 期間（例: 2025/01 ~ 2025/03）
  overview: string;         // 概要
  type: "team" | "hackathon" | "personal"; // プロジェクトのタイプ

  // --- スキルとリンク ---
  techUsedSkillIds: string[]; // このプロジェクトで使用したスキルのIDリスト
  githubUrl?: string;         // GitHubリンク
  projectUrl?: string;        // プロジェクトURL

  // --- 詳細な経験・成果（★ここを整理）---
  responsibilities?: string;  // 主な担当業務・役割
  innovations?: string;       // 工夫した点・技術的な挑戦
  learnings?: string;         // 成果・学んだこと

  // --- 補足情報 ---
  teamComposition?: string;   // チーム構成
  organizer?: string;         // 主催（ハッカソン向け）
};

export type SkillSheetData = {
    // すべてのスキルを保持するフラットなリストに変更
    skills: SkillItem[];
    // プロジェクト経験もフラットなリストに
    projects: ProjectExperience[];
};

// 初期スキルの定義（SkillSelection.tsxで使うため、ここに移動）
export const initialAllSkills: SkillItem[] = [
    // プログラミング言語
    {
        id: "html",
        name: "HTML",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "css",
        name: "CSS",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "javascript",
        name: "JavaScript",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "typescript",
        name: "TypeScript",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "gas",
        name: "GAS",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "vbscript",
        name: "VBScript",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "perl",
        name: "Perl",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "python",
        name: "Python",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "ruby",
        name: "Ruby",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "php",
        name: "PHP",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "r",
        name: "R言語",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "matlab",
        name: "MATLAB",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "scratch",
        name: "Scratch",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "lua",
        name: "Lua",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "java",
        name: "Java",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "csharp",
        name: "C#",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "swift",
        name: "Swift",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "kotlin",
        name: "Kotlin",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "c",
        name: "C言語",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "cpp",
        name: "C++",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "go",
        name: "Go言語",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "objectivec",
        name: "Objective-C",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "visualbasic",
        name: "Visual Basic",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "basic",
        name: "BASIC",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "haskell",
        name: "Haskell",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "scala",
        name: "Scala",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "groovy",
        name: "Groovy",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "delphi",
        name: "Delphi",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "dart",
        name: "Dart",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "dlang",
        name: "D言語",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "cobol",
        name: "COBOL",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "fortran",
        name: "FORTRAN",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "rust",
        name: "Rust",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "elixir",
        name: "Elixir",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "sql",
        name: "SQL",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // フレームワーク / ライブラリ
    {
        id: "bootstrap",
        name: "Bootstrap",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "tailwindcss",
        name: "Tailwind CSS",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "react",
        name: "React",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "redux",
        name: "Redux",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "nextjs",
        name: "Next.js",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "vuejs",
        name: "Vue.js",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "laravel",
        name: "Laravel",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "django",
        name: "Django",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "angular",
        name: "Angular",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "rubyonrails",
        name: "Ruby on Rails",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "springboot",
        name: "Spring Boot",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "aspnet",
        name: "ASP.NET",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // データベース
    {
        id: "mysql",
        name: "MySQL",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "postgresql",
        name: "PostgreSQL",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "mongodb",
        name: "MongoDB",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "sqlite",
        name: "SQLite",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "oracle",
        name: "Oracle Database",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // バージョン管理ツール
    {
        id: "git",
        name: "Git",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "svn",
        name: "Subversion (SVN)",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "github",
        name: "GitHub",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "gitlab",
        name: "GitLab",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "bitbucket",
        name: "Bitbucket",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // 開発ツール / 環境
    {
        id: "dbeaver",
        name: "DBeaver",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "wsl",
        name: "WSL",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "vscode",
        name: "VSCode",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "eclipse",
        name: "Eclipse",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "filezilla",
        name: "FileZilla",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "intellijidea",
        name: "IntelliJ IDEA",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "pycharm",
        name: "PyCharm",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "xcode",
        name: "Xcode",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "androidstudio",
        name: "Android Studio",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // サーバー / ミドルウェア
    {
        id: "nginx",
        name: "Nginx",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "apache",
        name: "Apache",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "microsoftiis",
        name: "Microsoft IIS",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // クラウドサービス / ホスティング
    {
        id: "aws",
        name: "AWS",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "vercel",
        name: "Vercel",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "firebase",
        name: "Firebase",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "supabase",
        name: "Supabase",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "microsoftazure",
        name: "Microsoft Azure",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "gcp",
        name: "GCP",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // オペレーティングシステム
    {
        id: "linux",
        name: "Linux",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "ubuntu",
        name: "Ubuntu",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "windows",
        name: "Windows",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "Mac",
        name: "Mac",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // コミュニケーションツール
    {
        id: "slack",
        name: "Slack",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "microsoftteams",
        name: "Microsoft Teams",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "zoom",
        name: "Zoom",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "chatwork",
        name: "Chatwork",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },

    // ナレッジ管理ツール
    {
        id: "notion",
        name: "Notion",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "confluence",
        name: "Confluence",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "esa",
        name: "esa",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "kibela",
        name: "Kibela",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
    {
        id: "sharepoint",
        name: "SharePoint",
        proficiency: "",
        learningPeriod: "",
        relatedProjectIds: [],
    },
];

// スキルカテゴリのマップ（表示用）
export const skillCategories: { [key: string]: string[] } = {
    プログラミング言語: [
        "html",
        "css",
        "javascript",
        "typescript",
        "gas",
        "vbscript",
        "perl",
        "python",
        "ruby",
        "php",
        "r",
        "matlab",
        "scratch",
        "lua",
        "java",
        "csharp",
        "swift",
        "kotlin",
        "c",
        "cpp",
        "go",
        "objectivec",
        "visualbasic",
        "basic",
        "haskell",
        "scala",
        "groovy",
        "delphi",
        "dart",
        "dlang",
        "cobol",
        "fortran",
        "rust",
        "elixir",
        "sql",
    ],
    "フレームワーク / ライブラリ": [
        "bootstrap",
        "tailwindcss",
        "react",
        "redux",
        "nextjs",
        "vuejs",
        "laravel",
        "django",
        "angular",
        "rubyonrails",
        "springboot",
        "aspnet",
    ],
    データベース: ["mysql", "postgresql", "mongodb", "sqlite", "oracle"],
    バージョン管理ツール: ["git", "svn", "github", "gitlab", "bitbucket"],
    "開発ツール / 環境": [
        "dbeaver",
        "wsl",
        "vscode",
        "eclipse",
        "filezilla",
        "intellijidea",
        "pycharm",
        "xcode",
        "androidstudio",
    ],
    "サーバー / ミドルウェア": ["nginx", "apache", "microsoftiis"],
    "クラウドサービス / ホスティング": [
        "aws",
        "vercel",
        "firebase",
        "supabase",
        "microsoftazure",
        "gcp",
    ],
    オペレーティングシステム: ["linux", "ubuntu", "windowsserver"],
    コミュニケーションツール: ["slack", "microsoftteams", "zoom", "chatwork"],
    ナレッジ管理ツール: ["notion", "confluence", "esa", "kibela", "sharepoint"],
};
