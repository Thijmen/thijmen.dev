import { type Highlighter, createHighlighter } from "shiki";

export class ShikiSingleton {
	private static instance: ShikiSingleton;
	private highlighter: Highlighter | null = null;

	private constructor() {}

	public static getInstance(): ShikiSingleton {
		if (!ShikiSingleton.instance) {
			ShikiSingleton.instance = new ShikiSingleton();
		}
		return ShikiSingleton.instance;
	}

	public async getHighlighter(param: { themes: string[]; langs: string[] }) {
		if (!this.highlighter) {
			this.highlighter = await createHighlighter({
				themes: param.themes,
				langs: param.langs,
			});
		}
		return this.highlighter;
	}
}
