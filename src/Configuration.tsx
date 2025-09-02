import {
  TableRoot,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/Table";

const Configuration: React.FC<ConfigurationProps> = ({ config }) => {
  const items = Object.entries(config).reduce<KeyValuePair<string>[]>(
    (previous, [key, value]) => [...previous, { key, value }],
    []
  );

  return (
    <div>
      <h3 className="text-2xl">Configuration</h3>
      <TableRoot>
        <Table aria-label="Configuration">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Key</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item, idx) => (
              <TableRow key={idx}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.value}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
};

export default Configuration;
