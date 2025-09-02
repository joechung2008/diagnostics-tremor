import {
  TableRoot,
  Table,
  TableHead,
  TableHeaderCell,
  TableBody,
  TableRow,
  TableCell,
} from "@/components/Table";

const StageDefinition: React.FC<StageDefinitionProps> = ({
  stageDefinition,
}) => {
  const items = Object.entries(stageDefinition).reduce<
    KeyValuePair<string[]>[]
  >((previous, [key, value]) => [...previous, { key, value }], []);

  return (
    <div>
      <h3 className="text-2xl">Stage Definitions</h3>
      <TableRoot>
        <Table aria-label="Stage Definitions">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Key</TableHeaderCell>
              <TableHeaderCell>Value</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((item) => (
              <TableRow key={item.key}>
                <TableCell>{item.key}</TableCell>
                <TableCell>{item.value.join(", ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableRoot>
    </div>
  );
};

export default StageDefinition;
