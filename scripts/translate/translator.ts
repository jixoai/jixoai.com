import type { OpenAI } from 'openai';
import type { Language, I18nRule } from './types.js';

export class ContentTranslator {
  constructor(private readonly client: OpenAI) {}

  async translate(
    content: string,
    sourceLang: Language,
    targetLang: Language,
    rules: I18nRule[]
  ): Promise<string> {
    const rulePrompts = rules.map(rule => `Scope: ${rule.path}\n${rule.rules}`).join('\n\n');

    const systemPrompt = `You are a professional translator specializing in technical documentation.
Translate the following Markdown content from ${sourceLang} to ${targetLang}.

IMPORTANT RULES:
1. Preserve ALL Markdown formatting (headers, links, code blocks, etc.)
2. Do NOT translate code blocks, URLs, or technical identifiers
3. Keep frontmatter YAML unchanged except for title and description fields
4. Maintain consistent terminology throughout
5. Use natural, fluent language in the target language

${rulePrompts ? `\nADDITIONAL TRANSLATION RULES:\n${rulePrompts}` : ''}

Output ONLY the translated content, no explanations.`;

    const response = await this.client.chat.completions.create({
      model: 'deepseek-chat',
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content },
      ],
      temperature: 0.3,
    });

    return response.choices[0]?.message?.content || '';
  }

  async translateToAllLanguages(
    content: string,
    sourceLang: Language,
    targetLangs: Language[],
    rules: I18nRule[]
  ): Promise<Map<Language, string>> {
    // Parallel translation for all languages
    const results = await Promise.allSettled(
      targetLangs.map(async (lang) => ({
        lang,
        content: await this.translate(content, sourceLang, lang, rules),
      }))
    );

    const translations = new Map<Language, string>();
    for (const result of results) {
      if (result.status === 'fulfilled') {
        translations.set(result.value.lang, result.value.content);
      } else {
        console.error(`Translation failed:`, result.reason);
      }
    }

    return translations;
  }
}
