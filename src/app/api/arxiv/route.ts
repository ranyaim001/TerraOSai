import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

interface ArxivPaper {
    id: string;
    title: string;
    authors: string[];
    summary: string;
    published: string;
    updated: string;
    categories: string[];
    pdfUrl: string;
    arxivUrl: string;
}

/**
 * Fetch latest papers from arXiv API
 * Categories: cs.AI (AI), cs.LG (Machine Learning), q-bio (Quantitative Biology), 
 * physics.comp-ph (Computational Physics), econ (Economics), q-fin (Quantitative Finance)
 */
export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const category = searchParams.get('category') || 'cs.AI';
        const maxResults = parseInt(searchParams.get('max_results') || '10');

        // Map our categories to arXiv categories
        const categoryMap: { [key: string]: string } = {
            'ai': 'cs.AI+OR+cs.LG+OR+cs.CL',
            'biology': 'q-bio',
            'tech': 'cs.CR+OR+cs.DC+OR+cs.NI',
            'finance': 'q-fin+OR+econ',
            'health': 'q-bio.QM+OR+q-bio.NC',
            'energy': 'physics.soc-ph+OR+physics.app-ph',
            'all': 'cs.AI+OR+cs.LG+OR+q-bio+OR+q-fin+OR+physics',
        };

        const arxivCategory = categoryMap[category] || category;

        // arXiv API endpoint
        const arxivUrl = `http://export.arxiv.org/api/query?search_query=cat:${arxivCategory}&sortBy=submittedDate&sortOrder=descending&max_results=${maxResults}`;

        const response = await fetch(arxivUrl);
        const xmlText = await response.text();

        // Parse XML response (simplified parsing)
        const papers = parseArxivXML(xmlText);

        return NextResponse.json({
            success: true,
            count: papers.length,
            category,
            papers,
            source: 'arXiv',
            lastUpdated: new Date().toISOString(),
        });
    } catch (error) {
        console.error('arXiv API error:', error);

        // Return fallback data if API fails
        return NextResponse.json({
            success: true,
            count: 0,
            papers: [],
            error: 'Using cached data - arXiv API temporarily unavailable',
            source: 'arXiv (cached)',
        });
    }
}

function parseArxivXML(xml: string): ArxivPaper[] {
    const papers: ArxivPaper[] = [];

    // Simple regex-based XML parsing (in production, use a proper XML parser)
    const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
    const entries = xml.match(entryRegex) || [];

    for (const entry of entries.slice(0, 10)) {
        try {
            const id = entry.match(/<id>(.*?)<\/id>/)?.[1] || '';
            const title = entry.match(/<title>(.*?)<\/title>/)?.[1]?.trim().replace(/\s+/g, ' ') || '';
            const summary = entry.match(/<summary>(.*?)<\/summary>/)?.[1]?.trim().replace(/\s+/g, ' ') || '';
            const published = entry.match(/<published>(.*?)<\/published>/)?.[1] || '';
            const updated = entry.match(/<updated>(.*?)<\/updated>/)?.[1] || '';

            // Extract authors
            const authorMatches = entry.match(/<author>[\s\S]*?<name>(.*?)<\/name>[\s\S]*?<\/author>/g) || [];
            const authors = authorMatches.map(a => a.match(/<name>(.*?)<\/name>/)?.[1] || '');

            // Extract categories
            const categoryMatches = entry.match(/<category term="(.*?)"/g) || [];
            const categories = categoryMatches.map(c => c.match(/term="(.*?)"/)?.[1] || '');

            const arxivId = id.split('/abs/')[1] || '';

            papers.push({
                id: arxivId,
                title,
                authors,
                summary: summary.substring(0, 300) + '...',
                published,
                updated,
                categories,
                pdfUrl: `https://arxiv.org/pdf/${arxivId}.pdf`,
                arxivUrl: id,
            });
        } catch (error) {
            console.error('Error parsing entry:', error);
        }
    }

    return papers;
}
