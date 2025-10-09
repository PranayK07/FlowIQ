import { PriceData } from '@/types/trading';

/**
 * Parse CSV data into PriceData array
 */
export function parseCSVData(csvText: string): PriceData[] {
  const lines = csvText.trim().split('\n');
  const headers = lines[0].toLowerCase().split(',').map(h => h.trim());
  
  const data: PriceData[] = [];
  
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    if (values.length < headers.length) continue;
    
    const row: Record<string, string> = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx];
    });
    
    try {
      const priceData: PriceData = {
        timestamp: new Date(row.date || row.timestamp).getTime(),
        date: row.date || row.timestamp,
        open: parseFloat(row.open),
        high: parseFloat(row.high),
        low: parseFloat(row.low),
        close: parseFloat(row.close),
        volume: row.volume ? parseFloat(row.volume) : undefined,
      };
      
      if (!isNaN(priceData.close)) {
        data.push(priceData);
      }
    } catch (e) {
      console.warn(`Skipping invalid row ${i}:`, e);
    }
  }
  
  return data.sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Generate sample trading data for demo purposes
 */
export function generateSampleData(days: number = 180): PriceData[] {
  const data: PriceData[] = [];
  let price = 100;
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  
  for (let i = 0; i < days; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    
    // Generate realistic price movements
    const change = (Math.random() - 0.48) * 3; // Slight upward bias
    const volatility = Math.random() * 2;
    
    const open = price;
    const close = price + change;
    const high = Math.max(open, close) + volatility;
    const low = Math.min(open, close) - volatility;
    
    data.push({
      timestamp: date.getTime(),
      date: date.toISOString().split('T')[0],
      open,
      high,
      low,
      close,
      volume: Math.floor(Math.random() * 1000000) + 500000,
    });
    
    price = close;
  }
  
  return data;
}

/**
 * Fetch data from API (placeholder for real API integration)
 */
export async function fetchMarketData(symbol: string, days: number = 180): Promise<PriceData[]> {
  // This is a placeholder - in a real app, you'd call an actual API
  // For now, return sample data
  console.log(`Fetching data for ${symbol} (${days} days)`);
  return generateSampleData(days);
}
