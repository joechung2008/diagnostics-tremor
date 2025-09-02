import BuildInfo from "@/BuildInfo";
import { Button } from "@/components/Button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/DropdownMenu";
import { TabNavigation, TabNavigationLink } from "@/components/TabNavigation";
import Extension from "@/Extension";
import Extensions from "@/Extensions";
import ServerInfo from "@/ServerInfo";
import { isExtensionInfo } from "@/utils";
import { RiArrowUpSLine } from "@remixicon/react";
import { useEffect, useMemo, useState } from "react";

const Environment = {
  Public: "https://hosting.portal.azure.net/api/diagnostics",
  Fairfax: "https://hosting.azureportal.usgovcloudapi.net/api/diagnostics",
  Mooncake: "https://hosting.azureportal.chinacloudapi.cn/api/diagnostics",
} as const;

type Environment = (typeof Environment)[keyof typeof Environment];

const App: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<Diagnostics>();
  const [extension, setExtension] = useState<ExtensionInfo>();
  const [environment, setEnvironment] = useState<Environment>(
    Environment.Public
  );
  const [open, setOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState<string>("extensions");

  const environmentName = useMemo(() => {
    switch (environment) {
      case Environment.Public:
        return "Public Cloud";
      case Environment.Fairfax:
        return "Fairfax";
      case Environment.Mooncake:
        return "Mooncake";
      default:
        return "Select environment";
    }
  }, [environment]);

  const showPaasServerless = useMemo(
    () => isExtensionInfo(diagnostics?.extensions["paasserverless"]),
    [diagnostics?.extensions]
  );

  const environments = useMemo(
    () => [
      {
        key: "public",
        text: "Public Cloud",
        selected: environment === Environment.Public,
        onClick: () => {
          setEnvironment(Environment.Public);
          setExtension(undefined);
        },
      },
      {
        key: "fairfax",
        text: "Fairfax",
        selected: environment === Environment.Fairfax,
        onClick: () => {
          setEnvironment(Environment.Fairfax);
          setExtension(undefined);
        },
      },
      {
        key: "mooncake",
        text: "Mooncake",
        selected: environment === Environment.Mooncake,
        onClick: () => {
          setEnvironment(Environment.Mooncake);
          setExtension(undefined);
        },
      },
    ],
    [environment]
  );

  useEffect(() => {
    const getDiagnostics = async () => {
      const response = await fetch(environment);
      setDiagnostics(await response.json());
    };
    getDiagnostics();
  }, [environment]);

  if (!diagnostics) {
    return null;
  }

  const { buildInfo, extensions, serverInfo } = diagnostics;

  const handleLinkClick = (_?: React.MouseEvent, item?: KeyedNavLink) => {
    if (item) {
      const extension = extensions[item.key];
      if (isExtensionInfo(extension)) {
        setExtension(extension);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 h-screen p-1">
      <div className="flex flex-row gap-2">
        <div>
          <DropdownMenu open={open} onOpenChange={setOpen}>
            <DropdownMenuTrigger asChild>
              <Button>
                {environmentName}
                <RiArrowUpSLine
                  aria-hidden="true"
                  className={`ml-2 size-4 ${open ? " " : "rotate-180"}`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {environments.map(({ key, onClick, selected, text }) => (
                <DropdownMenuCheckboxItem
                  key={key}
                  checked={selected}
                  onSelect={onClick}
                >
                  {text}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        {showPaasServerless && (
          <Button
            variant="secondary"
            onClick={() => {
              const paasserverless = diagnostics?.extensions["paasserverless"];
              if (isExtensionInfo(paasserverless)) {
                setExtension(paasserverless);
              }
            }}
          >
            paasserverless
          </Button>
        )}
        <Button
          variant="secondary"
          onClick={() => {
            const websites = diagnostics?.extensions["websites"];
            if (isExtensionInfo(websites)) {
              setExtension(websites);
            }
          }}
        >
          websites
        </Button>
      </div>
      <TabNavigation>
        <TabNavigationLink
          active={selectedTab === "extensions"}
          onClick={() => setSelectedTab("extensions")}
        >
          Extensions
        </TabNavigationLink>
        <TabNavigationLink
          active={selectedTab === "build"}
          onClick={() => setSelectedTab("build")}
        >
          Build Information
        </TabNavigationLink>
        <TabNavigationLink
          active={selectedTab === "server"}
          onClick={() => setSelectedTab("server")}
        >
          Server Information
        </TabNavigationLink>
      </TabNavigation>
      {selectedTab === "extensions" && (
        <div className="flex-1 overflow-y-auto">
          <div className="flex flex-row gap-1 h-full">
            <Extensions extensions={extensions} onLinkClick={handleLinkClick} />
            {extension && <Extension {...extension} />}
          </div>
        </div>
      )}
      {selectedTab === "build" && (
        <div className="flex-1 overflow-y-auto">
          <BuildInfo {...buildInfo} />
        </div>
      )}
      {selectedTab === "server" && (
        <div className="flex-1 overflow-y-auto">
          <ServerInfo {...serverInfo} />
        </div>
      )}
    </div>
  );
};

export default App;
