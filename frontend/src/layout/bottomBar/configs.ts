import { faPen, faSchool, faTrophy, faUser } from '@fortawesome/free-solid-svg-icons';

export type TabName = "school" | "arena" | "practice" | "clan"

type TabConfig = {
    name: TabName;
    icon: typeof faSchool;
    path: string;
};

export const tabs: TabConfig[] = [
    {name: "school", icon: faSchool, path: ""},
    {name: "arena", icon: faTrophy, path: "arena"},
    {name: "practice", icon: faPen, path: "practice"},
    {name: "clan", icon: faUser, path: "clan"},
];

export function getActiveTab(pathname: string): TabName {
    if (pathname.includes("/home/arena")) return "arena";
    if (pathname.includes("/home/practice")) return "practice";
    if (pathname.includes("/home/clan")) return "clan";
    return "school";
}
