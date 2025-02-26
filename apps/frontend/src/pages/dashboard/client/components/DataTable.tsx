import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { googleSheetParser } from 'google-sheet-parser';

type DataRow = {
  Id: number;
  Name: string;
  Category: string;
  Subcategory: string;
  Link: string;
  Icon?: {
    name: string;
    size?: number;
    color?: string;
  };
};

const sheetUrl = 'https://docs.google.com/spreadsheets/d/16PUrL0214-0oajfnmoTge14m8xA4lWsjXq2Fq2POUAU/edit?gid=0';

const fetchData = async (): Promise<DataRow[]> => {
  const data = await googleSheetParser(sheetUrl);
  return data.map((item: any) => ({
    Id: Number(item.Id),
    Name: item.Name,
    Category: item.Category,
    Subcategory: item.Subcategory,
    Link: item.Link,
    Icon: item.Icon ? JSON.parse(item.Icon) : undefined
  }));
};

export const DataTable: React.FC = () => {
  const { data, isLoading, isError } = useQuery<DataRow[]>({
    queryKey: ['data'],
    queryFn: fetchData
  });

  if (isLoading) return <p>Loading data...</p>;
  if (isError) return <p>Error loading data.</p>;

  if (!data || data.length === 0) {
    return <p>No data available. Please fetch data.</p>;
  }

  return (
    <div>
      <h2>Fetched Data</h2>
      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Link (CDN)</th>
            <th>Icon</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.Id}>
              <td>{row.Id}</td>
              <td>{row.Name}</td>
              <td>{row.Category}</td>
              <td>{row.Subcategory}</td>
              <td><a href={row.Link} target="_blank" rel="noopener noreferrer">{row.Link}</a></td>
              <td>{row.Icon ? `${row.Icon.name} (${row.Icon.size || 'default'}px, ${row.Icon.color || 'default'})` : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
