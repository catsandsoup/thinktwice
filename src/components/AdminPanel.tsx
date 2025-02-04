import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types/database";

const ALLOWED_TABLES = ['challenges', 'journeys', 'user_progress', 'profiles', 'user_roles'] as const;
type AllowedTable = typeof ALLOWED_TABLES[number];

export function AdminPanel() {
  const [selectedTable, setSelectedTable] = useState<AllowedTable>('challenges');
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from(selectedTable)
        .select('*');

      if (error) {
        console.error('Error fetching data:', error);
        return;
      }

      setData(data || []);
    };

    fetchData();
  }, [selectedTable]);

  return (
    <div className="space-y-4">
      <div>
        <select
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value as AllowedTable)}
          className="border p-2 rounded"
        >
          {ALLOWED_TABLES.map(table => (
            <option key={table} value={table}>{table}</option>
          ))}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              {data[0] && Object.keys(data[0]).map((key) => (
                <th key={key} className="border p-2">{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i}>
                {Object.values(row).map((value: any, j) => (
                  <td key={j} className="border p-2">
                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}