import { byKey, isExtensionInfo, toNavLink } from "@/utils";
import { Button } from "@/components/Button";

const Extensions: React.FC<ExtensionsProps> = ({ extensions, onLinkClick }) => {
  const links = Object.values(extensions)
    .filter(isExtensionInfo)
    .map(toNavLink)
    .sort(byKey);

  return (
    <nav
      aria-label="Extensions"
      className="flex flex-col gap-2 max-h-max p-1 overflow-x-hidden"
    >
      {links.map((link) => (
        <Button
          key={link.key}
          variant="ghost"
          className="cursor-pointer min-h-[content] justify-start p-1 text-left w-full"
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            onLinkClick?.(e, link);
          }}
        >
          {link.name}
        </Button>
      ))}
    </nav>
  );
};

export default Extensions;
