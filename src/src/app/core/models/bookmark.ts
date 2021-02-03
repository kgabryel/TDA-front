export interface Bookmark {
  id: number;
  title: string;
  href: string;
  backgroundColor: string;
  textColor: string;
  icon: string | null;
  assignedToDashboard: boolean;
}
