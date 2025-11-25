import type { CollectionEntry } from 'astro:content';

export interface DocGroup {
  name: string;
  docs: CollectionEntry<'docs'>[];
  subgroups?: DocGroup[];
}

export function groupDocsByPath(docs: CollectionEntry<'docs'>[]): DocGroup[] {
  const groups = new Map<string, CollectionEntry<'docs'>[]>();

  for (const doc of docs) {
    const parts = doc.slug.split('/');
    const groupName = parts.length > 1 ? parts[0] : 'root';

    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }
    groups.get(groupName)!.push(doc);
  }

  const result: DocGroup[] = [];

  for (const [name, groupDocs] of groups.entries()) {
    const sortedDocs = groupDocs.sort((a, b) => {
      const orderA = a.data.order ?? 999;
      const orderB = b.data.order ?? 999;
      if (orderA !== orderB) return orderA - orderB;
      return a.slug.localeCompare(b.slug);
    });

    result.push({
      name,
      docs: sortedDocs,
    });
  }

  return result.sort((a, b) => a.name.localeCompare(b.name));
}

export function getDocNavigation(
  docs: CollectionEntry<'docs'>[],
  currentSlug: string
): { prev?: CollectionEntry<'docs'>; next?: CollectionEntry<'docs'> } {
  const sortedDocs = docs.sort((a, b) => {
    const orderA = a.data.order ?? 999;
    const orderB = b.data.order ?? 999;
    if (orderA !== orderB) return orderA - orderB;
    return a.slug.localeCompare(b.slug);
  });

  const currentIndex = sortedDocs.findIndex(doc => doc.slug === currentSlug);

  return {
    prev: currentIndex > 0 ? sortedDocs[currentIndex - 1] : undefined,
    next: currentIndex < sortedDocs.length - 1 ? sortedDocs[currentIndex + 1] : undefined,
  };
}

export function formatGroupName(name: string): string {
  // Convert folder names to readable titles
  // e.g., "getting-started" -> "Getting Started"
  return name
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
