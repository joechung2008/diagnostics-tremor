import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRoot,
  TableRow,
} from "@/components/Table";

const BuildInfo: React.FC<BuildInfoProps> = ({ buildVersion }) => {
  const items = [
    {
      name: "Build Version",
      value: buildVersion,
    },
  ];

  return (
    <TableRoot>
      <Table aria-label="Build Info">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Value</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.name}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableRoot>
  );
};

export default BuildInfo;
