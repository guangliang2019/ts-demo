import "./headless-tabs";
import {
  HeadlessTabs,
  HeadlessTabsContent,
  HeadlessTabsTrigger,
} from "./headless-tabs";
export class ShadcnTabs extends HeadlessTabs {}
export class ShadcnTabsTrigger extends HeadlessTabsTrigger {}
export class ShadcnTabsContent extends HeadlessTabsContent {}
export class ShadcnTabsList extends HTMLElement {}

customElements.define("shadcn-tabs", ShadcnTabs);
customElements.define("shadcn-tabs-trigger", ShadcnTabsTrigger);
customElements.define("shadcn-tabs-content", ShadcnTabsContent);
customElements.define("shadcn-tabs-list", ShadcnTabsList);
