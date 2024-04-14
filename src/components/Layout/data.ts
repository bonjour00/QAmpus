export const adminMenu = [
  {
    title: '待解決問題',
    icon: 'pending_actions',
    label: 'pending',
  },
  {
    title: '資源管理',
    icon: 'create_new_folder',
    label: 'resource',
  },
  {
    title: '近期刪除問題',
    icon: 'delete',
    label: 'trash-qa',
  },
  {
    title: '近期刪除資源',
    icon: 'delete',
    label: 'trash-resource',
  },
  {
    title: '權限管理',
    icon: 'groups',
    label: 'member',
  },
];
export const assignerMenu = [
  { title: '待指派問題', icon: 'assignment_late', label: 'assign' },
  ...adminMenu,
];
