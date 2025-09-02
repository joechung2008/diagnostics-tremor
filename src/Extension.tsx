import Configuration from "@/Configuration";
import StageDefinition from "@/StageDefinition";

const Extension: React.FC<ExtensionProps> = ({
  config,
  extensionName,
  stageDefinition,
}) => {
  return (
    <div className="flex flex-col gap-2 max-h-max overflow-y-auto p-1 grow">
      <h2 className="font-semibold text-3xl">{extensionName}</h2>
      {config && <Configuration config={config} />}
      {stageDefinition && <StageDefinition stageDefinition={stageDefinition} />}
    </div>
  );
};

export default Extension;
